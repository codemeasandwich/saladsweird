import dbConnect from '../../utils/dbConnect';
//import MenuItem from '../../models/MenuItem';

export default async (req, res) => {

    return;
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const menuItems = await MenuItem.find({});
                res.status(200).json({ success: true, data: menuItems });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'POST':
            try {
                const menuItem = await MenuItem.create(req.body);
                res.status(201).json({ success: true, data: menuItem });
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
