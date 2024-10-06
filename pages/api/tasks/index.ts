import dbConnect from '../../../utils/dbConnect';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { title, description } = req.body;
      const newTask = new Task({ title, description });
      await newTask.save();
      res.status(201).json({ success: true, task: newTask });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
  if (req.method === 'GET') {
    try {
      const tasks = await Task.find({});
      res.status(200).json({ success: true, tasks });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
  
}
