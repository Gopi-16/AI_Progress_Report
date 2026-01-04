import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  FileText,
  Send,
  Clock,
  TrendingUp,
  Upload,
  Sparkles,
  BarChart3,
  ArrowRight,
  Calendar,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

// Mock data
const mockUser = {
  name: 'John Smith',
  email: 'john.smith@school.edu',
  role: 'Teacher',
};

const mockStats = {
  totalStudents: 156,
  reportsGenerated: 142,
  reportsSent: 128,
  pendingReports: 14,
  averageScore: 78.5,
};

const recentReports = [
  { id: '1', student: 'Alice Johnson', class: 'Class 5A', status: 'sent', time: '2 hours ago' },
  { id: '2', student: 'Bob Williams', class: 'Class 5A', status: 'completed', time: '3 hours ago' },
  { id: '3', student: 'Carol Davis', class: 'Class 5B', status: 'pending', time: '4 hours ago' },
  { id: '4', student: 'David Miller', class: 'Class 5B', status: 'generating', time: '5 hours ago' },
];

const classPerformance = [
  { class: 'Class 5A', students: 32, avgScore: 82, attendance: 94 },
  { class: 'Class 5B', students: 30, avgScore: 78, attendance: 91 },
  { class: 'Class 5C', students: 28, avgScore: 75, attendance: 88 },
  { class: 'Class 5D', students: 31, avgScore: 80, attendance: 92 },
];

export default function Dashboard() {
  const [user] = useState(mockUser);

  const handleLogout = () => {
    // Handle logout
  };

  const statusColors: Record<string, string> = {
    sent: 'bg-success/10 text-success border-success/20',
    completed: 'bg-primary/10 text-primary border-primary/20',
    pending: 'bg-warning/10 text-warning border-warning/20',
    generating: 'bg-info/10 text-info border-info/20',
  };

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display">
              Welcome back, <span className="text-gradient-primary">{user.name.split(' ')[0]}</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your student reports today.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/upload">
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload CSV
              </Button>
            </Link>
            <Link to="/reports">
              <Button variant="gradient" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Generate Reports
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Students"
            value={mockStats.totalStudents}
            icon={Users}
            variant="primary"
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Reports Generated"
            value={mockStats.reportsGenerated}
            icon={FileText}
            variant="info"
            subtitle={`${Math.round((mockStats.reportsGenerated / mockStats.totalStudents) * 100)}% complete`}
          />
          <StatCard
            title="Reports Sent"
            value={mockStats.reportsSent}
            icon={Send}
            variant="success"
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            title="Pending Reports"
            value={mockStats.pendingReports}
            icon={Clock}
            variant="warning"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Recent Reports
                </CardTitle>
                <CardDescription>Latest student report activities</CardDescription>
              </div>
              <Link to="/reports">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-4 transition-colors hover:bg-secondary/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground font-semibold">
                        {report.student.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{report.student}</p>
                        <p className="text-sm text-muted-foreground">{report.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={`border ${statusColors[report.status]}`}>
                        {report.status === 'sent' && <CheckCircle className="mr-1 h-3 w-3" />}
                        {report.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                        {report.status === 'generating' && <Sparkles className="mr-1 h-3 w-3 animate-pulse" />}
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{report.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Performance */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/upload" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Upload className="h-4 w-4" />
                    Upload New CSV
                  </Button>
                </Link>
                <Link to="/reports" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <FileText className="h-4 w-4" />
                    View All Reports
                  </Button>
                </Link>
                <Link to="/chat" className="block">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <BarChart3 className="h-4 w-4" />
                    Ask AI Assistant
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Average Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Average Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-5xl font-bold text-gradient-primary">{mockStats.averageScore}%</p>
                  <p className="text-sm text-muted-foreground mt-2">Overall class average</p>
                </div>
                <Progress value={mockStats.averageScore} className="h-3 mt-4" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Class Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Class Performance Overview
            </CardTitle>
            <CardDescription>Compare performance across different classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="data-table">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Students</th>
                    <th>Avg Score</th>
                    <th>Attendance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {classPerformance.map((cls) => (
                    <tr key={cls.class}>
                      <td className="font-medium">{cls.class}</td>
                      <td>{cls.students}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <Progress value={cls.avgScore} className="h-2 w-24" />
                          <span className="text-sm">{cls.avgScore}%</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <Progress value={cls.attendance} className="h-2 w-24" />
                          <span className="text-sm">{cls.attendance}%</span>
                        </div>
                      </td>
                      <td>
                        {cls.avgScore >= 80 ? (
                          <Badge className="status-success">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Excellent
                          </Badge>
                        ) : cls.avgScore >= 70 ? (
                          <Badge className="status-info">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            Good
                          </Badge>
                        ) : (
                          <Badge className="status-warning">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Needs Attention
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
