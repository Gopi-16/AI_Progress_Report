import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  status?: 'idle' | 'uploading' | 'validating' | 'success' | 'error';
  progress?: number;
  errorMessage?: string;
  className?: string;
}

export function FileUploadZone({
  onFileSelect,
  onFileRemove,
  accept = { 'text/csv': ['.csv'] },
  maxSize = 10 * 1024 * 1024, // 10MB
  status = 'idle',
  progress = 0,
  errorMessage,
  className,
}: FileUploadZoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  const handleRemove = () => {
    setSelectedFile(null);
    onFileRemove?.();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
      case 'validating':
        return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      default:
        return <FileSpreadsheet className="h-5 w-5 text-primary" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'validating':
        return 'Validating data...';
      case 'success':
        return 'Ready to process';
      case 'error':
        return errorMessage || 'Upload failed';
      default:
        return 'Ready';
    }
  };

  if (selectedFile) {
    return (
      <div
        className={cn(
          'rounded-xl border border-border bg-card p-6 transition-all',
          status === 'error' && 'border-destructive/50 bg-destructive/5',
          status === 'success' && 'border-success/50 bg-success/5',
          className
        )}
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'rounded-xl p-3',
              status === 'error' ? 'bg-destructive/10' : 'bg-primary/10'
            )}
          >
            {getStatusIcon()}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(selectedFile.size)} • {getStatusText()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleRemove}
                disabled={status === 'uploading' || status === 'validating'}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {(status === 'uploading' || status === 'validating') && (
              <Progress value={progress} className="h-2" />
            )}
            {status === 'error' && errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        'upload-zone group',
        isDragActive && !isDragReject && 'active',
        isDragReject && 'border-destructive bg-destructive/5',
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-medium">
            {isDragActive
              ? isDragReject
                ? 'Invalid file type'
                : 'Drop your file here'
              : 'Drag & drop your CSV file'}
          </p>
          <p className="text-sm text-muted-foreground">
            or click to browse • Max {formatFileSize(maxSize)}
          </p>
        </div>
        <Button variant="outline" size="sm" className="pointer-events-none">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Select CSV File
        </Button>
      </div>
    </div>
  );
}
