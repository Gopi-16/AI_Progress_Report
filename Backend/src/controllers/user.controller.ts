import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { AuthRequest } from '../middleware/auth.middleware';

// Get current user
export async function getMe(req: AuthRequest, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    const user = await User.findById(req.user.id).select('-password').exec();
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
}

// List users (admin)
export async function listUsers(_req: Request, res: Response) {
  try {
    const users = await User.find().select('-password').exec();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
}
