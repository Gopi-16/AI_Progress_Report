import mongoose, { Document, Schema } from 'mongoose';

export interface IReport extends Document {
  title: string;
  content: string;
  authorId?: mongoose.Types.ObjectId | string;
  authorName?: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: { type: String },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    }
  },
  { timestamps: true }
);

export const Report = mongoose.model<IReport>('Report', ReportSchema);
