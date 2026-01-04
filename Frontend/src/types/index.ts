// Core types for the Progress Report AI system

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'teacher' | 'parent';
  avatar_url?: string;
  created_at: string;
}

export interface Student {
  id: string;
  student_id: string;
  name: string;
  class: string;
  section: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  telegram_chat_id?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentMarks {
  subject: string;
  score: number;
  max_score: number;
  grade?: string;
}

export interface Report {
  id: string;
  student_id: string;
  student_name: string;
  class: string;
  section: string;
  marks: StudentMarks[];
  attendance_percentage: number;
  events_participation: number;
  assignments_completed: number;
  generated_report: string;
  audio_url?: string;
  status: 'pending' | 'generating' | 'completed' | 'failed' | 'sent';
  delivery_status: {
    email: boolean;
    telegram: boolean;
    whatsapp?: boolean;
  };
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface CSVUploadData {
  id: string;
  file_name: string;
  row_count: number;
  status: 'uploading' | 'validating' | 'processing' | 'completed' | 'failed';
  errors?: string[];
  uploaded_by: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  sources?: string[];
}

export interface ChatConversation {
  id: string;
  user_id: string;
  title: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalStudents: number;
  reportsGenerated: number;
  reportsSent: number;
  pendingReports: number;
  averageScore: number;
  lastGeneratedAt?: string;
}

export interface NotificationChannel {
  type: 'email' | 'telegram' | 'whatsapp';
  enabled: boolean;
  config?: Record<string, string>;
}

export interface SystemSettings {
  llm_model: string;
  tts_voice: string;
  default_language: string;
  notification_channels: NotificationChannel[];
  report_template?: string;
}

// CSV parsing types
export interface ParsedCSVRow {
  student_id: string;
  name: string;
  class: string;
  section: string;
  marks: Record<string, number>;
  attendance: string;
  events: number;
  assignments: number;
  parent_name: string;
  parent_phone: string;
  parent_email: string;
}

export interface CSVValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  rows: ParsedCSVRow[];
}
