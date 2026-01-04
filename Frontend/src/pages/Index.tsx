import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import {
  GraduationCap,
  Upload,
  Sparkles,
  Volume2,
  Send,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Users,
  Clock,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'CSV Upload',
    description: 'Simply upload student data in CSV format with marks, attendance, and participation details.',
  },
  {
    icon: Sparkles,
    title: 'AI Report Generation',
    description: 'Advanced LLM generates personalized, human-like progress reports for each student.',
  },
  {
    icon: Volume2,
    title: 'Text-to-Speech',
    description: 'Convert reports to audio files for parents with literacy barriers or visual impairments.',
  },
  {
    icon: Send,
    title: 'Multi-Channel Delivery',
    description: 'Send reports via Email and Telegram with WhatsApp integration coming soon.',
  },
  {
    icon: MessageSquare,
    title: 'RAG Chatbot',
    description: 'Interactive AI assistant that answers questions based on generated reports.',
  },
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Secure access for admins, teachers, and parents with appropriate permissions.',
  },
];

const stats = [
  { value: '10K+', label: 'Reports Generated', icon: BarChart3 },
  { value: '500+', label: 'Schools Using', icon: GraduationCap },
  { value: '50K+', label: 'Parents Reached', icon: Users },
  { value: '<5min', label: 'Generation Time', icon: Clock },
];

const steps = [
  {
    step: '01',
    title: 'Upload Student Data',
    description: 'Upload a CSV file containing student marks, attendance, and participation data.',
  },
  {
    step: '02',
    title: 'Generate Reports',
    description: 'Our AI analyzes the data and generates personalized progress reports.',
  },
  {
    step: '03',
    title: 'Convert to Audio',
    description: 'Reports are converted to speech for accessibility and convenience.',
  },
  {
    step: '04',
    title: 'Send to Parents',
    description: 'Deliver reports via Email and Telegram directly to parents.',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="container relative px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Education Technology
            </div>
            
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Progress Reports{' '}
              <span className="text-gradient-primary">Reimagined</span> with AI
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Generate personalized student progress reports, convert them to audio, 
              and deliver directly to parents via Email & Telegram. Bridging the 
              technology gap for rural and government schools.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/auth?mode=signup">
                <Button variant="hero" size="xl">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="xl">
                  Sign In
                </Button>
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              {[
                'No credit card required',
                'Free for government schools',
                'GDPR compliant',
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/50 bg-secondary/30">
        <div className="container px-4 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
              Everything You Need for{' '}
              <span className="text-gradient-primary">Smart Reporting</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A complete solution to automate student progress tracking and 
              parent communication for educational institutions.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                
                {/* Hover gradient */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary/20 py-24">
        <div className="container px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
              How It <span className="text-gradient-primary">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Four simple steps to transform your student progress reporting
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((item, index) => (
                <div key={item.step} className="relative">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent lg:block" />
                  )}
                  
                  <div className="relative z-10 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary font-display text-2xl font-bold text-primary-foreground">
                      {item.step}
                    </div>
                    <h3 className="mb-2 font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 text-center md:p-20">
            {/* Background decorations */}
            <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            
            <div className="relative z-10">
              <h2 className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                Ready to Transform Your School?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
                Join hundreds of schools already using ProgressAI to enhance 
                parent-teacher communication and student success tracking.
              </p>
              <Link to="/auth?mode=signup">
                <Button size="xl" className="bg-white text-primary hover:bg-white/90">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">ProgressAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 ProgressAI. Empowering Education Through AI.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
