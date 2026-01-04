import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReportCard } from '@/components/reports/ReportCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Search,
  Filter,
  Sparkles,
  Send,
  Volume2,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Report } from '@/types';

const mockUser = {
  name: 'John Smith',
  email: 'john.smith@school.edu',
  role: 'Teacher',
};

// Mock reports data
const mockReports: Report[] = [
  {
    id: '1',
    student_id: 'R200194',
    student_name: 'C Gopi',
    class: 'E3',
    section: 'A',
    marks: [
      { subject: 'AI', score: 77, max_score: 100 },
      { subject: 'PSPC', score: 44, max_score: 100 },
      { subject: 'CNS', score: 60, max_score: 100 },
      { subject: 'DSA', score: 45, max_score: 100 },
      { subject: 'COA', score: 46, max_score: 100 },
    ],
    attendance_percentage: 80,
    events_participation: 75,
    assignments_completed: 35,
    generated_report: `Dear C Dhananjayulu,

I hope this report finds you well. We are pleased to share the progress of your ward, C Gopi, for the current academic term.

**Academic Performance Analysis:**
C Gopi has shown promising performance in Artificial Intelligence (77%) and demonstrates a good understanding of the subject concepts. However, there are areas that require additional attention, particularly in PSPC (44%) and DSA (45%).

**Strengths:**
- Strong analytical skills in AI-related topics
- Active participation in class discussions
- Good attendance record (80%)

**Areas for Improvement:**
- Programming fundamentals need more practice
- Data structures concepts require revision
- Time management during examinations

**Recommendations:**
We recommend additional tutoring sessions in PSPC and DSA. Please encourage regular practice of programming exercises at home.

Best regards,
John Smith
Class Teacher`,
    audio_url: '/audio/report_1.mp3',
    status: 'completed',
    delivery_status: { email: true, telegram: true },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 'user_1',
  },
  {
    id: '2',
    student_id: 'R200108',
    student_name: 'K Sai Teja',
    class: 'E3',
    section: 'B',
    marks: [
      { subject: 'AI', score: 89, max_score: 100 },
      { subject: 'PSPC', score: 55, max_score: 100 },
      { subject: 'CNS', score: 40, max_score: 100 },
      { subject: 'DSA', score: 84, max_score: 100 },
      { subject: 'COA', score: 80, max_score: 100 },
    ],
    attendance_percentage: 90,
    events_participation: 60,
    assignments_completed: 51,
    generated_report: 'Progress report for K Sai Teja...',
    status: 'sent',
    delivery_status: { email: true, telegram: true },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 'user_1',
  },
  {
    id: '3',
    student_id: 'R200036',
    student_name: 'M Gandhi',
    class: 'E3',
    section: 'A',
    marks: [
      { subject: 'AI', score: 75, max_score: 100 },
      { subject: 'PSPC', score: 72, max_score: 100 },
      { subject: 'CNS', score: 66, max_score: 100 },
      { subject: 'DSA', score: 83, max_score: 100 },
      { subject: 'COA', score: 37, max_score: 100 },
    ],
    attendance_percentage: 65,
    events_participation: 76,
    assignments_completed: 41,
    generated_report: 'Progress report for M Gandhi...',
    status: 'generating',
    delivery_status: { email: false, telegram: false },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 'user_1',
  },
  {
    id: '4',
    student_id: 'R200185',
    student_name: 'B Hema Sree',
    class: 'E3',
    section: 'A',
    marks: [
      { subject: 'AI', score: 95, max_score: 100 },
      { subject: 'PSPC', score: 96, max_score: 100 },
      { subject: 'CNS', score: 66, max_score: 100 },
      { subject: 'DSA', score: 68, max_score: 100 },
      { subject: 'COA', score: 77, max_score: 100 },
    ],
    attendance_percentage: 55,
    events_participation: 77,
    assignments_completed: 41,
    generated_report: 'Progress report for B Hema Sree...',
    status: 'pending',
    delivery_status: { email: false, telegram: false },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 'user_1',
  },
];

export default function ReportsPage() {
  const [reports] = useState<Report[]>(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.student_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: reports.length,
    pending: reports.filter((r) => r.status === 'pending').length,
    generating: reports.filter((r) => r.status === 'generating').length,
    completed: reports.filter((r) => r.status === 'completed').length,
    sent: reports.filter((r) => r.status === 'sent').length,
  };

  const handleGenerateAll = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast({
            title: 'Reports Generated!',
            description: 'All pending reports have been generated successfully.',
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleSendAll = () => {
    toast({
      title: 'Sending Reports',
      description: 'Reports are being sent to all parents via Email and Telegram.',
    });
  };

  const handleConvertToSpeech = () => {
    toast({
      title: 'Converting to Speech',
      description: 'All reports are being converted to audio files.',
    });
  };

  const handlePlayAudio = (reportId: string) => {
    if (playingAudioId === reportId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(reportId);
      toast({
        title: 'Playing Audio',
        description: 'Audio playback started',
      });
    }
  };

  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display">
              Student <span className="text-gradient-primary">Reports</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              View, generate, and send progress reports to parents
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={handleConvertToSpeech}
              className="gap-2"
            >
              <Volume2 className="h-4 w-4" />
              Convert to Speech
            </Button>
            <Button 
              variant="gradient" 
              onClick={handleGenerateAll}
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Generate All
            </Button>
            <Button 
              variant="success" 
              onClick={handleSendAll}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Send All
            </Button>
          </div>
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
                  <Sparkles className="h-6 w-6 text-primary-foreground animate-pulse" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Generating Reports...</p>
                    <span className="text-sm text-muted-foreground">{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'generating', 'completed', 'sent'] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="gap-2"
              >
                {status === 'pending' && <Clock className="h-3 w-3" />}
                {status === 'generating' && <Loader2 className="h-3 w-3" />}
                {status === 'completed' && <CheckCircle className="h-3 w-3" />}
                {status === 'sent' && <Send className="h-3 w-3" />}
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <Badge variant="secondary" className="ml-1 h-5 text-xs">
                  {statusCounts[status]}
                </Badge>
              </Button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="score">Score High-Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{statusCounts.completed + statusCounts.sent}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-warning/5 border-warning/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{statusCounts.pending}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-success/5 border-success/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <Mail className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold">{reports.filter(r => r.delivery_status.email).length}</p>
                  <p className="text-sm text-muted-foreground">Emailed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-info/5 border-info/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-info" />
                <div>
                  <p className="text-2xl font-bold">{reports.filter(r => r.delivery_status.telegram).length}</p>
                  <p className="text-sm text-muted-foreground">Telegram Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Grid */}
        {filteredReports.length === 0 ? (
          <Card className="py-12">
            <CardContent className="text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Reports Found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try a different search term' : 'Upload a CSV file to generate reports'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                isPlaying={playingAudioId === report.id}
                onPlayAudio={() => handlePlayAudio(report.id)}
                onSendEmail={() => toast({ title: 'Email Sent', description: `Report sent to ${report.student_name}'s parent` })}
                onSendTelegram={() => toast({ title: 'Telegram Sent', description: `Report sent via Telegram` })}
                onDownload={() => toast({ title: 'Download Started', description: 'Report PDF is downloading' })}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
