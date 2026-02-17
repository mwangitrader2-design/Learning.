"import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, ArrowRight, Zap } from "lucide-react";
interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}
interface QuizQuestion {
  question: string;
  options: QuizOption[];
}
const sampleQuiz: QuizQuestion = {
  question: "What is the time complexity of binary search?",
  options: [
    { id: "a", text: "O(n)", isCorrect: false },
    { id: "b", text: "O(log n)", isCorrect: true },
    { id: "c", text: "O(n²)", isCorrect: false },
    { id: "d", text: "O(1)", isCorrect: false },
  ],
};
export function QuizWidget() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };
  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsAnswered(true);
  };
  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };
  const selectedAnswer = sampleQuiz.options.find(
    (opt) => opt.id === selectedOption
  );
  const isCorrect = selectedAnswer?.isCorrect;
  return (
    <div className="rounded-2xl bg-card border border-border/50 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="gradient-accent p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-foreground/20 backdrop-blur-sm">
            <Zap className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-accent-foreground">Quick Quiz</h3>
            <p className="text-xs text-accent-foreground/80">
              Test your knowledge
            </p>
          </div>
        </div>
      </div>
      {/* Question */}
      <div className="p-5">
        <p className="text-base font-semibold text-foreground">
          {sampleQuiz.question}
        </p>
        {/* Options */}
        <div className="mt-4 space-y-2">
          {sampleQuiz.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const showCorrect = isAnswered && option.isCorrect;
            const showIncorrect = isAnswered && isSelected && !option.isCorrect;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={isAnswered}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition-all duration-200",
                  !isAnswered && !isSelected && "border-border hover:border-primary/50 hover:bg-secondary/50",
                  !isAnswered && isSelected && "border-primary bg-primary/10",
                  showCorrect && "border-success bg-success/10",
                  showIncorrect && "border-destructive bg-destructive/10"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
                    !isAnswered && !isSelected && "bg-secondary text-muted-foreground",
                    !isAnswered && isSelected && "gradient-primary text-primary-foreground",
                    showCorrect && "bg-success text-success-foreground",
                    showIncorrect && "bg-destructive text-destructive-foreground"
                  )}
                >
                  {option.id.toUpperCase()}
                </span>
                <span
                  className={cn(
                    "flex-1 text-sm font-medium",
                    showCorrect && "text-success",
                    showIncorrect && "text-destructive"
                  )}
                >
                  {option.text}
                </span>
                {showCorrect && <CheckCircle2 className="h-5 w-5 text-success" />}
                {showIncorrect && <XCircle className="h-5 w-5 text-destructive" />}
              </button>
            );
          })}
        </div>
        {/* Feedback */}
        {isAnswered && (
          <div
            className={cn(
              "mt-4 rounded-xl p-3 text-sm",
              isCorrect ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}
          >
            {isCorrect
              ? "🎉 Excellent! That's correct!"
              : "Not quite right. The correct answer is O(log n)."}
          </div>
        )}
        {/* Action */}
        <div className="mt-4">
          {!isAnswered ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="w-full"
              variant="accent"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-full">
              Next Question
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

Created
StatsCard.tsx
View file

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "accent" | "success";
}
export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatsCardProps) {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-md card-hover border border-border/50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            variant === "primary" && "gradient-primary shadow-glow",
            variant === "accent" && "gradient-accent shadow-accent-glow",
            variant === "success" && "bg-success",
            variant === "default" && "bg-secondary"
          )}
        >
          <Icon
            className={cn(
              "h-6 w-6",
              variant === "default" ? "text-foreground" : "text-primary-foreground"
            )}
          />
        </div>
      </div>
    </div>
  );
}

Created
MainLayout.tsx
View file

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
interface MainLayoutProps {
  children: ReactNode;
}
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

Created
Sidebar.tsx
View file

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Trophy,
  Mic,
  BarChart3,
  Settings,
  ChevronLeft,
  GraduationCap,
} from "lucide-react";
const studentNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: BookOpen, label: "My Courses", href: "/courses" },
  { icon: Brain, label: "AI Tutor", href: "/tutor" },
  { icon: Trophy, label: "Achievements", href: "/achievements" },
  { icon: Mic, label: "Voice Practice", href: "/voice" },
];
const teacherNavItems = [
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];
export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-glow">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-xl font-bold text-foreground">
                Learn<span className="text-primary">AI</span>
              </span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-2 hover:bg-secondary transition-colors"
          >
            <ChevronLeft
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          <div className="mb-4">
            {!collapsed && (
              <span className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Learning
              </span>
            )}
            <ul className="mt-2 space-y-1">
              {studentNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive && "text-primary"
                        )}
                      />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            {!collapsed && (
              <span className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Teacher Tools
              </span>
            )}
            <ul className="mt-2 space-y-1">
              {teacherNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive && "text-primary"
                        )}
                      />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        {/* User Profile */}
        <div className="border-t border-border p-3">
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl bg-secondary/50 p-3",
              collapsed && "justify-center"
            )}
          >
            <div className="h-10 w-10 rounded-full gradient-accent flex items-center justify-center text-accent-foreground font-bold">
              A
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  Alex Johnson
                </p>
                <p className="text-xs text-muted-foreground">Level 12 Learner</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

Modified
button.tsx
View file

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "gradient-accent text-accent-foreground shadow-md hover:shadow-lg hover:opacity-90",
        hero: "gradient-hero text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },

Modified
progress.tsx
View file

  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    className={cn("relative h-3 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      className="h-full w-full flex-1 gradient-progress transition-all duration-500 ease-out"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />

Modified
index.css
View file

@tailwind utilities;
/* Definition of the design system. All colors, gradients, fonts, etc should be defined here. 
All colors MUST be HSL.
*/
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --background: 210 40% 98%;
    --foreground: 222 47% 11%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --card-foreground: 222 47% 11%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --popover-foreground: 222 47% 11%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --primary: 174 72% 40%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222 47% 11%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --accent: 16 85% 60%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --success: 142 71% 45%;
    --success-foreground: 0 0% 100%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 100%;
    --radius: 0.5rem;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 174 72% 40%;
    --radius: 1rem;
    /* Custom gradients */
    --gradient-primary: linear-gradient(135deg, hsl(174, 72%, 40%) 0%, hsl(186, 72%, 45%) 100%);
    --gradient-accent: linear-gradient(135deg, hsl(16, 85%, 60%) 0%, hsl(28, 85%, 55%) 100%);
    --gradient-hero: linear-gradient(135deg, hsl(174, 72%, 35%) 0%, hsl(200, 72%, 45%) 50%, hsl(186, 72%, 40%) 100%);
    --gradient-card: linear-gradient(180deg, hsl(0, 0%, 100%) 0%, hsl(210, 40%, 98%) 100%);
    --gradient-progress: linear-gradient(90deg, hsl(174, 72%, 40%) 0%, hsl(142, 71%, 45%) 100%);
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 hsl(222 47% 11% / 0.05);
    --shadow-md: 0 4px 6px -1px hsl(222 47% 11% / 0.1), 0 2px 4px -2px hsl(222 47% 11% / 0.1);
    --shadow-lg: 0 10px 15px -3px hsl(222 47% 11% / 0.1), 0 4px 6px -4px hsl(222 47% 11% / 0.1);
    --shadow-xl: 0 20px 25px -5px hsl(222 47% 11% / 0.1), 0 8px 10px -6px hsl(222 47% 11% / 0.1);
    --shadow-glow: 0 0 20px hsl(174, 72%, 40%, 0.3);
    --shadow-accent-glow: 0 0 20px hsl(16, 85%, 60%, 0.3);
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --background: 222 47% 8%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card: 222 47% 11%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover: 222 47% 11%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --primary: 174 72% 50%;
    --primary-foreground: 222 47% 11%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary: 217 33% 17%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 
