import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Report } from '../models/report.model';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth.middleware';

const createSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  status: z.enum(['draft', 'published', 'archived']).optional()
});

export async function createReport(req: AuthRequest, res: Response) {
  try {
    const parsed = createSchema.parse(req.body);
    const report = new Report({
      ...parsed,
      authorId: req.user?.id,
      authorName: (req.user?.email || '').split('@')[0]
    });
    const saved = await report.save();
    return res.status(201).json(saved);
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: (err as Error).message });
  }
}

export async function getReports(req: Request, res: Response) {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;
    const filter: any = {};
    if (req.query.status) filter.status = req.query.status;

    const [items, total] = await Promise.all([
      Report.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      Report.countDocuments(filter).exec()
    ]);

    return res.json({ items, total, page, limit });
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
}

export async function getReportById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const report = await Report.findById(id).exec();
    if (!report) return res.status(404).json({ error: 'Report not found' });
    return res.json(report);
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
}

export async function updateReport(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const parsed = createSchema.partial().parse(req.body);
    const updated = await Report.findByIdAndUpdate(id, parsed, { new: true, runValidators: true }).exec();
    if (!updated) return res.status(404).json({ error: 'Report not found' });
    return res.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: (err as Error).message });
  }
}

export async function deleteReport(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const deleted = await Report.findByIdAndDelete(id).exec();
    if (!deleted) return res.status(404).json({ error: 'Report not found' });
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message });
  }
}
