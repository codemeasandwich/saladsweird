import dbConnect from '../../utils/dbConnect';
import Location from '../../models/Location';

export default async (req, res) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const locations = await Location.find({});
                res.status(200).json({ success: true, data: locations });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};
