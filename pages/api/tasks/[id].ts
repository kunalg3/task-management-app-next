import dbConnect from '../../../utils/dbConnect';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ success: true, task: updatedTask });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
  if (req.method === 'DELETE') {
    try {
      await Task.findByIdAndDelete(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
  
}
