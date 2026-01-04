import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info';
  className?: string;
}

const variantStyles = {
  default: {
    icon: 'bg-secondary text-secondary-foreground',
    bg: 'from-card to-secondary/20',
  },
  primary: {
    icon: 'bg-gradient-primary text-primary-foreground',
    bg: 'from-primary/5 to-primary/10',
  },
  success: {
    icon: 'bg-success text-success-foreground',
    bg: 'from-success/5 to-success/10',
  },
  warning: {
    icon: 'bg-warning text-warning-foreground',
    bg: 'from-warning/5 to-warning/10',
  },
  info: {
    icon: 'bg-info text-info-foreground',
    bg: 'from-info/5 to-info/10',
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border/50 p-6 transition-all duration-300 hover:border-border hover:shadow-md',
        `bg-gradient-to-br ${styles.bg}`,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {trend && (
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.positive ? 'text-success' : 'text-destructive'
                )}
              >
                {trend.positive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={cn('rounded-xl p-3', styles.icon)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/5 to-transparent" />
    </div>
  );
}
