"import { cn } from "@/lib/utils";
import { Crown, Medal, TrendingUp } from "lucide-react";
interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  rank: number;
  trend: "up" | "down" | "same";
}
const leaderboardData: LeaderboardUser[] = [
  { id: "1", name: "Sarah Chen", avatar: "S", xp: 15420, rank: 1, trend: "same" },
  { id: "2", name: "Mike Johnson", avatar: "M", xp: 14890, rank: 2, trend: "up" },
  { id: "3", name: "Alex Johnson", avatar: "A", xp: 13750, rank: 3, trend: "up" },
  { id: "4", name: "Emma Davis", avatar: "E", xp: 12300, rank: 4, trend: "down" },
  { id: "5", name: "James Wilson", avatar: "J", xp: 11950, rank: 5, trend: "same" },
];
export function LeaderboardWidget() {
  return (
    <div className="rounded-2xl bg-card border border-border/50 shadow-md overflow-hidden">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-warning" />
          <h3 className="text-lg font-bold text-foreground">Leaderboard</h3>
        </div>
        <p className="text-xs text-muted-foreground mt-1">This week's top learners</p>
      </div>
      <div className="divide-y divide-border">
        {leaderboardData.map((user, index) => {
          const isCurrentUser = user.name === "Alex Johnson";
          
          return (
            <div
              key={user.id}
              className={cn(
                "flex items-center gap-3 p-4 transition-colors",
                isCurrentUser && "bg-primary/5"
              )}
            >
              {/* Rank */}
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
                  index === 0 && "bg-warning/20 text-warning",
                  index === 1 && "bg-muted text-muted-foreground",
                  index === 2 && "bg-accent/20 text-accent",
                  index > 2 && "bg-secondary text-muted-foreground"
                )}
              >
                {index === 0 ? (
                  <Crown className="h-4 w-4" />
                ) : index < 3 ? (
                  <Medal className="h-4 w-4" />
                ) : (
                  user.rank
                )}
              </div>
              {/* Avatar */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm",
                  isCurrentUser
                    ? "gradient-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                )}
              >
                {user.avatar}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-semibold truncate",
                    isCurrentUser ? "text-primary" : "text-foreground"
                  )}
                >
                  {user.name}
                  {isCurrentUser && " (You)"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.xp.toLocaleString()} XP
                </p>
              </div>
              {/* Trend */}
              {user.trend === "up" && (
                <TrendingUp className="h-4 w-4 text-success" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Created
ProgressRing.tsx
View file

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}
export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--success))" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{progress}%</span>
        {label && (
          <span className="text-xs text-muted-foreground">{label}</span>
        )}
      </div>
    </div>
  );
}

Created
QuizWidget.tsx
View file

import { useState } from "react";
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
        dest
