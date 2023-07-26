import dbConnect from '../../utils/dbConnect';
import InventoryMovement from '../../models/InventoryMovement';

export default async (req, res) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const inventoryMovements = await InventoryMovement.find({});
                res.status(200).json({ success: true, data: inventoryMovements });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'POST':
            try {
                const inventoryMovement = await InventoryMovement.create(req.body);
                res.status(201).json({ success: true, data: inventoryMovement });
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
