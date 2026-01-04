import { useState, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FileUploadZone } from '@/components/upload/FileUploadZone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Info,
  Sparkles,
  ArrowRight,
  Users,
  BookOpen,
  ClipboardList,
  Download,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const mockUser = {
  name: 'John Smith',
  email: 'john.smith@school.edu',
  role: 'Teacher',
};

interface ParsedData {
  totalRows: number;
  columns: string[];
  preview: Record<string, string>[];
  stats: {
    students: number;
    subjects: number;
    classes: string[];
  };
}

const sampleCSVFormat = `student_id,name,class,section,AI,PSPC,CNS,DSA,COA,assignments,attendance,events,parent_name,parent_phone,parent_email
R200194,C Gopi,E3,A,77,44,60,45,46,35,80%,75,C Dhananjayulu,7396257294,parent@email.com`;

export default function UploadPage() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'validating' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [validationResults, setValidationResults] = useState<{ errors: string[]; warnings: string[] } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileSelect = useCallback(async (file: File) => {
    setUploadStatus('uploading');
    setUploadProgress(0);
    setErrorMessage('');
    setValidationResults(null);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate file processing
    setTimeout(() => {
      clearInterval(uploadInterval);
      setUploadProgress(100);
      setUploadStatus('validating');

      // Simulate validation
      setTimeout(() => {
        // Mock parsed data
        const mockParsedData: ParsedData = {
          totalRows: 25,
          columns: ['student_id', 'name', 'class', 'section', 'AI', 'PSPC', 'CNS', 'DSA', 'COA', 'assignments', 'attendance', 'events', 'parent_name', 'parent_phone', 'parent_email'],
          preview: [
            { student_id: 'R200194', name: 'C Gopi', class: 'E3', section: 'A', AI: '77', attendance: '80%' },
            { student_id: 'R200108', name: 'K Sai Teja', class: 'E3', section: 'B', AI: '89', attendance: '90%' },
            { student_id: 'R200036', name: 'M Gandhi', class: 'E3', section: 'A', AI: '75', attendance: '65%' },
          ],
          stats: {
            students: 25,
            subjects: 5,
            classes: ['E3-A', 'E3-B', 'E3-C'],
          },
        };

        setParsedData(mockParsedData);
        setValidationResults({
          errors: [],
          warnings: ['2 students have low attendance (< 70%)'],
        });
        setUploadStatus('success');
        
        toast({
          title: 'CSV Uploaded Successfully',
          description: `${mockParsedData.totalRows} students found and validated`,
        });
      }, 1000);
    }, 1200);
  }, [toast]);

  const handleFileRemove = () => {
    setUploadStatus('idle');
    setUploadProgress(0);
    setParsedData(null);
    setValidationResults(null);
    setErrorMessage('');
  };

  const handleGenerateReports = () => {
    toast({
      title: 'Starting Report Generation',
      description: 'Navigating to reports page...',
    });
    navigate('/reports');
  };

  return (
    <DashboardLayout user={mockUser}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-display">
            Upload <span className="text-gradient-primary">Student Data</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload a CSV file containing student information to generate progress reports
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Zone */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                  Upload CSV File
                </CardTitle>
                <CardDescription>
                  Drag and drop or click to upload your student data file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploadZone
                  onFileSelect={handleFileSelect}
                  onFileRemove={handleFileRemove}
                  status={uploadStatus}
                  progress={uploadProgress}
                  errorMessage={errorMessage}
                />
              </CardContent>
            </Card>

            {/* Validation Results */}
            {validationResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {validationResults.errors.length === 0 ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    )}
                    Validation Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {validationResults.errors.length === 0 ? (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 text-success border border-success/20">
                      <CheckCircle className="h-5 w-5" />
                      <span>All data validated successfully! Ready to generate reports.</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {validationResults.errors.map((error, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                          <AlertCircle className="h-5 w-5" />
                          <span>{error}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {validationResults.warnings.length > 0 && (
                    <div className="space-y-2">
                      {validationResults.warnings.map((warning, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 text-warning border border-warning/20">
                          <Info className="h-5 w-5" />
                          <span>{warning}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Data Preview */}
            {parsedData && (
              <Card>
                <CardHeader>
                  <CardTitle>Data Preview</CardTitle>
                  <CardDescription>
                    Showing first {parsedData.preview.length} of {parsedData.totalRows} records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="data-table">
                      <table className="w-full">
                        <thead>
                          <tr>
                            {Object.keys(parsedData.preview[0] || {}).map((key) => (
                              <th key={key}>{key}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {parsedData.preview.map((row, idx) => (
                            <tr key={idx}>
                              {Object.values(row).map((value, vIdx) => (
                                <td key={vIdx}>{value}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

            {/* Generate Reports Button */}
            {uploadStatus === 'success' && validationResults?.errors.length === 0 && (
              <div className="flex justify-end">
                <Button variant="gradient" size="lg" onClick={handleGenerateReports} className="gap-2">
                  <Sparkles className="h-5 w-5" />
                  Generate Reports
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            {parsedData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upload Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{parsedData.stats.students}</p>
                      <p className="text-sm text-muted-foreground">Students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <BookOpen className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{parsedData.stats.subjects}</p>
                      <p className="text-sm text-muted-foreground">Subjects</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                      <ClipboardList className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{parsedData.stats.classes.length}</p>
                      <p className="text-sm text-muted-foreground">Classes</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm font-medium mb-2">Classes Detected:</p>
                    <div className="flex flex-wrap gap-2">
                      {parsedData.stats.classes.map((cls) => (
                        <Badge key={cls} variant="secondary">{cls}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CSV Format Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-info" />
                  CSV Format Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your CSV file should include the following columns:
                </p>
                <div className="space-y-2 text-sm">
                  {['student_id', 'name', 'class', 'section', 'Subject Marks', 'attendance', 'events', 'parent_name', 'parent_phone', 'parent_email'].map((col) => (
                    <div key={col} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>{col}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download Sample CSV
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
