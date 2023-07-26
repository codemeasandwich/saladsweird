import dbConnect from '../../utils/dbConnect';
import Ingredient from '../../models/Ingredient';

export default async (req, res) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const ingredients = await Ingredient.find({});
                res.status(200).json({ success: true, data: ingredients });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'POST':
            try {
                const ingredient = await Ingredient.create(req.body);
                res.status(201).json({ success: true, data: ingredient });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};
