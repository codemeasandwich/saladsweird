import csvs from '../old_csv';
import models from '../../models';
console.log(models)
function importOldCsvs() {

    csvs().then(csvs => {

        const lookup = Object.keys(csvs).reduce((all, key) => {
            all[key] = {}
            return all
        }, {})

        csvs.locations
            .forEach(({ location_id, name, address }) => {
                lookup.locations[location_id] = models.Location.create({ name, address })
            })

        csvs.staff.forEach(({ staff_id, name, dob, role, iban, bic, location_id }) => {

            lookup.locations[location_id]
                .then(locationDB => {
                    const staffPayload = { name, dob, role, iban, bic, location: locationDB }
                    lookup.staff[staff_id] = models.Staff.create(staffPayload)
                }) // END then(locationDB
        }) // END staff.forEach

        csvs.ingredients.forEach(({ ingredient_id, name, unit, cost }) => {
            lookup.ingredients[ingredient_id] = models.Location.create({ name, unit, cost })
        })

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
                                quantity, ingredient: ingredientDBs[index]
                            })) // END map 
                        }) // END create
                    })// END then
            })// END forEach

        const groupByLcations = csvs.menus.reduce((groupByLcation, { recipe_id, location_id, price, modifiers }) => {
            groupByLcation[location_id] = groupByLcation[location_id] || []
            groupByLcation[location_id].push(recipe_id, price, modifiers)
            return groupByLcation
        }, {})

        Object.keys(groupByLcations)
            .forEach(location_id => {
                const menuForLcation = groupByLcations[location_id];
                lookup.ingredients[ingredient_id]
                    .then(ingredientDB => {

                        return Promise.all(menuForLcation.map(({ recipe_id }) => recipes[recipe_id]))
                            .then(recipeDBs => {
                                ingredientDB.menu = menuForLcation.map(({ price, modifiers }, index) => ({
                                    price, extras: 1 == modifiers, recipe: recipeDBs[index]
                                }))
                                return ingredientDB.save()
                            }) // END then
                    })// END then
            }) // END forEach
    }) // END csvs().then
} // END importOldCsvs

export default importOldCsvs;