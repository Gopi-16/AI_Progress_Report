import { useState, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Users,
  FileText,
  BookOpen,
  Trash2,
  Plus,
} from 'lucide-react';
import type { ChatMessage, ChatConversation } from '@/types';

const mockUser = {
  name: 'John Smith',
  email: 'john.smith@school.edu',
  role: 'Teacher',
};

// Mock conversations
const mockConversations: ChatConversation[] = [
  {
    id: '1',
    user_id: 'user_1',
    title: 'Class Performance Analysis',
    messages: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'user_1',
    title: 'Student Improvement Suggestions',
    messages: [],
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const suggestedTopics = [
  { icon: TrendingUp, label: 'Performance Trends', description: 'Analyze student progress over time' },
  { icon: Users, label: 'Class Comparison', description: 'Compare different class performances' },
  { icon: FileText, label: 'Report Insights', description: 'Get summaries from generated reports' },
  { icon: BookOpen, label: 'Recommendations', description: 'AI suggestions for improvements' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const handleSendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: getAIResponse(content),
        created_at: new Date().toISOString(),
        sources: ['Student Report Database', 'Class E3-A Records'],
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const getAIResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('average') || lowercaseQuery.includes('performance')) {
      return `Based on the latest reports, here's the performance analysis:

**Overall Class Performance:**
- Average Score: 78.5%
- Top Performing Subject: AI (Average: 82%)
- Subject Needing Attention: PSPC (Average: 62%)

**Key Insights:**
1. 15 out of 25 students scored above 75% overall
2. Attendance has improved by 8% this month
3. Assignment completion rate is at 85%

**Recommendations:**
- Consider additional practice sessions for PSPC
- The students showing improvement in AI could mentor peers
- Schedule parent-teacher meetings for students below 60%

Would you like me to dive deeper into any specific area?`;
    }
    
    if (lowercaseQuery.includes('attention') || lowercaseQuery.includes('need help')) {
      return `Based on the generated reports, here are students who may need additional attention:

**Students Below 60% Average:**
1. **Student A** - 54% average, struggling with DSA and COA
2. **Student B** - 58% average, low attendance (65%)
3. **Student C** - 52% average, missing assignments

**Common Patterns:**
- Most struggling students have attendance below 70%
- Assignment completion correlates with performance
- Morning classes show better engagement

**Suggested Actions:**
1. Schedule one-on-one meetings
2. Assign peer tutors from top performers
3. Send detailed progress reports to parents
4. Consider remedial classes for DSA

Would you like me to generate a detailed action plan for any specific student?`;
    }
    
    if (lowercaseQuery.includes('attendance') || lowercaseQuery.includes('trend')) {
      return `Here's the attendance trend analysis for your classes:

**Monthly Attendance Overview:**
- January: 88%
- February: 85%
- March: 91%
- Current Month: 89%

**Class-wise Breakdown:**
- Class E3-A: 92% (Best)
- Class E3-B: 88%
- Class E3-C: 87%
- Class E3-D: 85%

**Notable Observations:**
1. Mondays show lowest attendance (82%)
2. Attendance drops before holidays
3. 5 students have consistent low attendance

**Impact on Performance:**
Students with >90% attendance average 12% higher scores than those below 75% attendance.

Shall I identify specific students with attendance concerns?`;
    }
    
    if (lowercaseQuery.includes('compare') || lowercaseQuery.includes('class')) {
      return `Here's a comprehensive class comparison:

**Class E3-A (32 students)**
- Average: 82%
- Top Score: 95%
- Attendance: 92%
- Strength: AI & DSA

**Class E3-B (30 students)**
- Average: 78%
- Top Score: 91%
- Attendance: 88%
- Strength: PSPC & COA

**Class E3-C (28 students)**
- Average: 75%
- Top Score: 88%
- Attendance: 87%
- Needs: More DSA practice

**Key Findings:**
1. Class A leads in theoretical subjects
2. Class B excels in practical coding
3. All classes need improvement in CNS

Would you like suggestions for inter-class collaboration activities?`;
    }
    
    return `I understand you're asking about "${query}". 

Based on the student reports in our database, I can help you with:
- Performance analysis and trends
- Student comparisons
- Attendance patterns
- Subject-wise insights
- Personalized recommendations

Could you please be more specific about what you'd like to know? For example:
- "What's the average performance in Class E3-A?"
- "Which students need attention?"
- "Compare attendance trends across classes"
- "Give me recommendations for improving PSPC scores"`;
  };

  const handleNewConversation = () => {
    setMessages([]);
    setActiveConversationId(null);
  };

  return (
    <DashboardLayout user={mockUser}>
      <div className="h-[calc(100vh-12rem)]">
        <div className="grid h-full gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* New Chat Button */}
            <Button 
              variant="gradient" 
              className="w-full gap-2"
              onClick={handleNewConversation}
            >
              <Plus className="h-4 w-4" />
              New Conversation
            </Button>

            {/* Recent Conversations */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Recent Chats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-secondary/50 ${
                      activeConversationId === conv.id ? 'bg-secondary' : ''
                    }`}
                  >
                    <p className="text-sm font-medium truncate">{conv.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(conv.updated_at).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Suggested Topics */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Suggested Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedTopics.map((topic) => (
                  <button
                    key={topic.label}
                    onClick={() => handleSendMessage(topic.description)}
                    className="w-full text-left p-3 rounded-lg transition-colors hover:bg-secondary/50 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <topic.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{topic.label}</p>
                        <p className="text-xs text-muted-foreground">{topic.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* AI Info */}
            <Card className="bg-gradient-mesh">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">RAG-Powered</p>
                    <p className="text-xs text-muted-foreground">FAISS + Embeddings</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  This AI assistant uses Retrieval-Augmented Generation to answer questions 
                  based on your student reports and data.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3 h-full">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              placeholder="Ask about student performance, get insights, or analyze trends..."
              className="h-full"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
