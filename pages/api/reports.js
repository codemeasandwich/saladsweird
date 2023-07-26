import dbConnect from '../../utils/dbConnect';
import Report from '../../models/Report';

// Connect to the database
dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const reports = await Report.find({});
                res.status(200).json({ success: true, data: reports });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'POST':
            try {
                const report = await Report.create(req.body);
                res.status(201).json({ success: true, data: report });
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
