import csvs from '../old_csv';
import models from '../models';

let importRunning = false

function importOldCsvs() {

    if (importRunning) {
        console.log(" +++++++++++++ CSV import already running!!")
        return
    }
    importRunning = true

    // Record the start time
    var startTime = new Date();
    console.log(" =========== STARTING DB BUILD OUT")
    return csvs().then(csvs => {

        const lookup = Object.keys(csvs).reduce((all, key) => {
            all[key] = {}
            return all
        }, {})

        //+++++++++++++++++++++++++++++++++++++++ create staff
        //++++++++++++++++++++++++++++++++++++++++++++++++++++

        const staffGroupedBylocation = csvs.staff.reduce((staffGroupedBylocation, {
            staff_id, name, dob, role, iban, bic, location_id
        }) => {

            const staffPayload = { name, dob, role, iban, bic }
            lookup.staff[staff_id] = models.Staff.create(staffPayload)
            staffGroupedBylocation[location_id] = staffGroupedBylocation[location_id] || []
            staffGroupedBylocation[location_id].push(lookup.staff[staff_id])
            return staffGroupedBylocation
        }, {}) // END staff.forEach

        //+++++++++++++++++++++++++++++++++++ create locations
        //++++++++++++++++++++++++++++++++++++++++++++++++++++

        csvs.locations
            .forEach(({ location_id, name, address }) => {
                lookup.locations[location_id] = Promise.all(staffGroupedBylocation[location_id])
                    .then(staff => models.Location.create({
                        name,
                        address: address.replace('"', ''),
                        staff,
                        menu: []
                    }))
            })

        //+++++++++++++++++++++++++++++++++ create ingredients
        //++++++++++++++++++++++++++++++++++++++++++++++++++++

        csvs.ingredients.forEach(({ ingredient_id, name, unit, cost }) => {
            lookup.ingredients[ingredient_id] = models.Ingredient.create({
                name,
                unit,
                cost: parseFloat(cost)
            })
        })

        //+++++++++++++++++++++++++++++++++++++ create recipes
        //++++++++++++++++++++++++++++++++++++++++++++++++++++

        const recipes = csvs.recipes.reduce((all, { recipe_id, name, quantity, ingredient_id }) => {
            all[recipe_id] = all[recipe_id] || { name, items: [] }
            all[recipe_id].items.push({ quantity, ingredient: lookup.ingredients[ingredient_id] })
            return all
        }, {})

        Object.keys(recipes)
            .forEach(recipe_id => {
                const recipe = recipes[recipe_id]
                Promise.all(recipe.items.map(({ ingredient }) => ingredient))
                    .then(ingredientDBs => {

                        lookup.recipes[recipe_id] = models.Recipe.create({
                            name: recipe.name,
                            items: recipe.items.map(({ quantity }, index) => ({
                                quantity: parseFloat(quantity),
                                ingredient: ingredientDBs[index]
                            })) // END map 
                        }) // END create
                    })// END then
            })// END forEach

        //+++++++++++++++++++++++++++ group recipes into menus
        //++++++++++++++++++++++++++++++++++++++++++++++++++++

        const groupByLcations = csvs.menus.reduce((groupByLcation, { recipe_id, location_id, price, modifiers }) => {
            groupByLcation[location_id] = groupByLcation[location_id] || []
            groupByLcation[location_id].push({ recipe_id, price, modifiers })
            return groupByLcation
        }, {})

        //+++++++++++++++++++++++++++++++ add menu to location
        //++++++++++++++++++++++++++++++++++++++++++++++++++++

        Object.keys(groupByLcations)
            .forEach(location_id => {
                const menuForLcation = groupByLcations[location_id];
                lookup.locations[location_id]
                    .then(locationDB => {
                        return Promise.all(menuForLcation.map(({ recipe_id }) => recipes[recipe_id]))
                            .then(recipeDBs => {
                                locationDB.menu = menuForLcation.map(({ price, modifiers }, index) => ({
                                    price: parseFloat(price),
                                    extras: 1 == modifiers,
                                    recipe: recipeDBs[index]
                                }))
                                return locationDB.save()
                            }) // END then
                    })// END then
            }) // END forEach


        //++++++++++++++++++++++++++++ wait for DB to be build
        //++++++++++++++++++++++++++++++++++++++++++++++++++++

        return Promise.all(Object.keys(lookup).reduce((allProm, csvName) => {
            const proms = Object.keys(lookup[csvName]).map(ids => lookup[csvName][ids])
            return allProm.concat(proms)
        }, [])).then((ps) => {

            // Calculate the elapsed time
            var endTime = new Date();
            var elapsedSeconds = (endTime - startTime) / 1000;

            console.log();
            console.log(" =========== FINNISHED DB BUILD OUT")
            console.log(`Records:${ps.length}`);
            console.log(`Elapsed time: ${elapsedSeconds} s`);
            console.log();

            importRunning = false
            return true
        })

    }) // END csvs().then
} // END importOldCsvs

export default importOldCsvs;