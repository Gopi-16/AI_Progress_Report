import { useState } from 'react';
import { 
  FileText, 
  Volume2, 
  VolumeX, 
  Send, 
  Download, 
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { Report } from '@/types';

interface ReportCardProps {
  report: Report;
  onSendEmail?: () => void;
  onSendTelegram?: () => void;
  onPlayAudio?: () => void;
  onDownload?: () => void;
  isPlaying?: boolean;
}

export function ReportCard({
  report,
  onSendEmail,
  onSendTelegram,
  onPlayAudio,
  onDownload,
  isPlaying,
}: ReportCardProps) {
  const [showFullReport, setShowFullReport] = useState(false);

  const statusConfig: Record<string, { icon: typeof Clock; label: string; color: string; animate?: boolean }> = {
    pending: { icon: Clock, label: 'Pending', color: 'bg-warning/10 text-warning border-warning/20' },
    generating: { icon: Loader2, label: 'Generating', color: 'bg-info/10 text-info border-info/20', animate: true },
    completed: { icon: CheckCircle, label: 'Completed', color: 'bg-success/10 text-success border-success/20' },
    failed: { icon: AlertCircle, label: 'Failed', color: 'bg-destructive/10 text-destructive border-destructive/20' },
    sent: { icon: Send, label: 'Sent', color: 'bg-primary/10 text-primary border-primary/20' },
  };

  const status = statusConfig[report.status];
  const StatusIcon = status.icon;

  const averageScore = report.marks.reduce((acc, m) => acc + (m.score / m.max_score) * 100, 0) / report.marks.length;

  return (
    <Card className="glass-hover overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground font-bold text-lg">
              {report.student_name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold">{report.student_name}</h3>
              <p className="text-sm text-muted-foreground">
                Class {report.class} • Section {report.section}
              </p>
            </div>
          </div>
          <Badge className={cn('border', status.color)}>
            <StatusIcon className={cn('mr-1 h-3 w-3', status.animate && 'animate-spin')} />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 rounded-lg bg-secondary/30 p-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{averageScore.toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground">Avg Score</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-2xl font-bold text-accent">{report.attendance_percentage}%</p>
            <p className="text-xs text-muted-foreground">Attendance</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{report.events_participation}</p>
            <p className="text-xs text-muted-foreground">Events</p>
          </div>
        </div>

        {/* Subject Scores Preview */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Subject Performance</p>
          <div className="grid gap-2">
            {report.marks.slice(0, 3).map((mark) => {
              const percentage = (mark.score / mark.max_score) * 100;
              return (
                <div key={mark.subject} className="flex items-center gap-3">
                  <span className="w-16 text-xs text-muted-foreground truncate">{mark.subject}</span>
                  <Progress value={percentage} className="h-2 flex-1" />
                  <span className="w-8 text-xs font-medium text-right">{mark.score}</span>
                </div>
              );
            })}
          </div>
          {report.marks.length > 3 && (
            <p className="text-xs text-muted-foreground">+{report.marks.length - 3} more subjects</p>
          )}
        </div>

        {/* Delivery Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Delivered via:</span>
          <Badge variant={report.delivery_status.email ? 'default' : 'outline'} className="h-5 text-xs">
            <Mail className="mr-1 h-3 w-3" />
            Email
          </Badge>
          <Badge variant={report.delivery_status.telegram ? 'default' : 'outline'} className="h-5 text-xs">
            <MessageCircle className="mr-1 h-3 w-3" />
            Telegram
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <Dialog open={showFullReport} onOpenChange={setShowFullReport}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Progress Report - {report.student_name}</DialogTitle>
                <DialogDescription>
                  Class {report.class}, Section {report.section}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap rounded-lg bg-secondary/30 p-4 text-sm">
                    {report.generated_report}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPlayAudio}
            disabled={!report.audio_url}
            className="flex-1"
          >
            {isPlaying ? (
              <VolumeX className="mr-2 h-4 w-4" />
            ) : (
              <Volume2 className="mr-2 h-4 w-4" />
            )}
            Audio
          </Button>

          <Button variant="outline" size="sm" onClick={onDownload} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>

          <Button 
            variant="gradient" 
            size="sm" 
            onClick={onSendEmail}
            disabled={report.status !== 'completed'}
            className="flex-1"
          >
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
