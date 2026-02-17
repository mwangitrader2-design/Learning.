"import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  GraduationCap,
  Award,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};
const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
};
const CHART_COLORS = [
  "hsl(174, 72%, 40%)",   // primary
  "hsl(16, 85%, 60%)",    // accent
  "hsl(142, 71%, 45%)",   // success
  "hsl(38, 92%, 50%)",    // warning
  "hsl(215, 16%, 47%)",   // muted
  "hsl(200, 72%, 45%)",   // blue variant
];
export default function Analytics() {
  const { user } = useAuth();
  // Fetch all courses (teacher can see their own + published)
  const { data: courses = [] } = useQuery({
    queryKey: ["teacher-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
  // Fetch all student progress
  const { data: progress = [] } = useQuery({
    queryKey: ["all-student-progress"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_progress")
        .select("*");
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
  // Fetch all profiles (teachers/admins can view all)
  const { data: profiles = [] } = useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, user_id, display_name, email, total_xp, current_streak");
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
  // Derived stats
  const totalStudents = profiles.length;
  const totalCourses = courses.length;
  const totalEnrollments = progress.length;
  const avgCompletion = progress.length > 0
    ? Math.round(progress.reduce((sum, p) => sum + (p.progress_percentage || 0), 0) / progress.length)
    : 0;
  const totalTimeHours = Math.round(
    progress.reduce((sum, p) => sum + (p.time_spent_minutes || 0), 0) / 60
  );
  const completedCourses = progress.filter(p => p.completed_at).length;
  // Course enrollment distribution for pie chart
  const courseEnrollmentData = courses.map((course) => {
    const enrollments = progress.filter(p => p.course_id === course.id).length;
    return { name: course.title, value: enrollments };
  }).filter(d => d.value > 0);
  // Progress distribution for bar chart
  const progressBuckets = [
    { range: "0-20%", count: 0 },
    { range: "21-40%", count: 0 },
    { range: "41-60%", count: 0 },
    { range: "61-80%", count: 0 },
    { range: "81-100%", count: 0 },
  ];
  progress.forEach(p => {
    const pct = p.progress_percentage || 0;
    if (pct <= 20) progressBuckets[0].count++;
    else if (pct <= 40) progressBuckets[1].count++;
    else if (pct <= 60) progressBuckets[2].count++;
    else if (pct <= 80) progressBuckets[3].count++;
    else progressBuckets[4].count++;
  });
  // Course difficulty distribution
  const difficultyData = ["beginner", "intermediate", "advanced"].map(diff => ({
    difficulty: diff.charAt(0).toUpperCase() + diff.slice(1),
    courses: courses.filter(c => c.difficulty === diff).length,
  }));
  // Top students by XP
  const topStudents = [...profiles]
    .sort((a, b) => (b.total_xp || 0) - (a.total_xp || 0))
    .slice(0, 5);
  // Category distribution
  const categoryMap: Record<string, number> = {};
  courses.forEach(c => {
    categoryMap[c.category] = (categoryMap[c.category] || 0) + 1;
  });
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  const stats = [
    { title: "Total Students", value: totalStudents, icon: Users, variant: "primary" as const },
    { title: "Active Courses", value: totalCourses, icon: BookOpen, variant: "accent" as const },
    { title: "Avg. Completion", value: `${avgCompletion}%`, icon: TrendingUp, variant: "success" as const },
    { title: "Total Learning Hours", value: `${totalTimeHours}h`, icon: Clock, variant: "warning" as const },
    { title: "Enrollments", value: totalEnrollments, icon: GraduationCap, variant: "primary" as const },
    { title: "Completed", value: completedCourses, icon: Award, variant: "success" as const },
  ];
  const variantStyles = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
  };
  return (
    <MainLayout>
      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Header */}
        <motion.div variants={fadeUp} custom={0}>
          <h1 className="text-3xl font-bold text-foreground">
            Teacher <span className="text-gradient-primary">Analytics</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Monitor student performance and class progress at a glance.
          </p>
        </motion.div>
        {/* Stats Grid */}
        <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" variants={stagger}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              variants={fadeUp}
              custom={i + 1}
              className="rounded-2xl bg-card border border-border/50 shadow-sm p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.title}
                </span>
                <div className={`rounded-xl p-2 ${variantStyles[stat.variant]}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Progress Distribution */}
          <motion.div
            variants={fadeUp}
            custom={7}
            className="rounded-2xl bg-card border border-border/50 shadow-sm p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Student Progress Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={progressBuckets}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis dataKey="range" tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(214, 32%, 91%)",
                    borderRadius: "12px",
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="count" fill="hsl(174, 72%, 40%)" radius={[8, 8, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          {/* Course Enrollment Pie */}
          <motion.div
            variants={fadeUp}
            custom={8}
            className="rounded-2xl bg-card border border-border/50 shadow-sm p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Enrollment by Course</h3>
            {courseEnrollmentData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={courseEnrollmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={50}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name.slice(0, 15)}${name.length > 15 ? "…" : ""} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {courseEnrollmentData.map((_, idx) => (
                      <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[280px] text-muted-foreground text-sm">
                No enrollment data yet
              </div>
            )}
          </motion.div>
        </div>
        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Difficulty Distribution */}
          <motion.div
            variants={fadeUp}
            custom={9}
            className="rounded-2xl bg-card border border-border/50 shadow-sm p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Courses by Difficulty</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={difficultyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
                <YAxis dataKey="difficulty" type="category" tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(214, 32%, 91%)",
                    borderRadius: "12px",
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="courses" fill="hsl(16, 85%, 60%)" radius={[0, 8, 8, 0]} name="Courses" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          {/* Category Distribution */}
          <motion.div
            variants={fadeUp}
            custom={10}
            className="rounded-2xl bg-card border border-border/50 shadow-sm p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Courses by Category</h3>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value})`}
                  >
                    {categoryData.map((_, idx) => (
                      <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
                No courses yet
              </div>
            )}
          </motion.div>
        </div>
        {/* Top Students */}
        <motion.div
          variants={fadeUp}
          custom={11}
          className="rounded-2xl bg-card border border-border/50 shadow-sm p-6"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">Top Students by XP</h3>
          {topStudents.length > 0 ? (
            <div className="space-y-3">
              {topStudents.map((student, i) => (
                <div
                  key={student.id}
                  className="flex items-center gap-4 rounded-xl bg-secondary/30 p-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-primary-foreground text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">
                      {student.display_name || student.email || "Unknown"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {student.current_streak || 0} day streak
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{(student.total_xp || 0).toLocaleString()} XP</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No student data available yet.</p>
          )}
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
Now add the route to App.tsx:



"
