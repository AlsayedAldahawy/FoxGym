import express from 'express';
import backupData from '../services/backupService.js'; // Adjust the path to your backupData function

const router = express.Router();

router.post('/', async (req, res) => {
  const { filePath } = req.body;
  if (!filePath) {
    return res.status(400).json({ message: 'File path is required' });
  }

  try {
    await backupData(filePath); res.status(200).json({ message: 'Backup successful' });
  }
  catch (error) {
    console.error('Error during backup:', error);
    res.status(500).json({ message: 'Backup failed', error: error.message });
  }
});

export default router;
