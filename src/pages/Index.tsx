"import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { LeaderboardWidget } from "@/components/dashboard/LeaderboardWidget";
import { motion } from "framer-motion";
import {
  BookOpen,
  Flame,
  Target,
  TrendingUp,
  Sparkles,
} from "lucide-react";
];
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
export default function Index() {
  return (
    <MainLayout>
      <div className="space-y-8">
      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          variants={fadeUp}
          custom={0}
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-xl bg-warning/10 px-4 py-2">
              <Flame className="h-5 w-5 text-warning" />
              <span className="font-bold text-warning">7 Day Streak!</span>
            </div>
          </div>
        </div>
          <motion.div
            className="flex items-center gap-2 rounded-xl bg-warning/10 px-4 py-2.5 border border-warning/20"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Flame className="h-5 w-5 text-warning" />
            <span className="font-bold text-warning">7 Day Streak!</span>
          </motion.div>
        </motion.div>
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Courses in Progress"
            value={5}
            subtitle="2 near completion"
            icon={BookOpen}
            variant="primary"
          />
          <StatsCard
            title="Total Learning Time"
            value="42h"
            subtitle="This month"
            icon={Clock}
            trend={{ value: 15, isPositive: true }}
            variant="default"
          />
          <StatsCard
            title="Current Streak"
            value="7 days"
            subtitle="Personal best: 14"
            icon={Flame}
            variant="accent"
          />
          <StatsCard
            title="Weekly Goal"
            value="85%"
            subtitle="5h 6m / 6h"
            icon={Target}
            variant="success"
          />
        </div>
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
        >
          {[
            { title: "Courses in Progress", value: 5, subtitle: "2 near completion", icon: BookOpen, variant: "primary" as const },
            { title: "Total Learning Time", value: "42h", subtitle: "This month", icon: Clock, trend: { value: 15, isPositive: true }, variant: "default" as const },
            { title: "Current Streak", value: "7 days", subtitle: "Personal best: 14", icon: Flame, variant: "accent" as const },
            { title: "Weekly Goal", value: "85%", subtitle: "5h 6m / 6h", icon: Target, variant: "success" as const },
          ].map((stat, i) => (
            <motion.div key={stat.title} variants={fadeUp} custom={i + 1}>
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
        {/* Main Content Grid */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Progress */}
            <div className="rounded-2xl bg-card border border-border/50 shadow-md p-6">
            <motion.div
              className="rounded-2xl bg-card border border-border/50 shadow-md p-6"
              variants={fadeUp}
              custom={5}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <ProgressRing progress={72} size={140} label="Overall" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">156</p>
                      <p className="text-xs text-muted-foreground">Lessons Done</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">24</p>
                      <p className="text-xs text-muted-foreground">Quizzes Passed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">13,750</p>
                      <p className="text-xs text-muted-foreground">Total XP</p>
                    </div>
                    {[
                      { value: "156", label: "Lessons Done" },
                      { value: "24", label: "Quizzes Passed" },
                      { value: "13,750", label: "Total XP", highlight: true },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center rounded-xl bg-secondary/50 py-3 px-2">
                        <p className={`text-xl font-bold ${stat.highlight ? "text-primary" : "text-foreground"}`}>
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </motion.div>
            {/* Continue Learning */}
            <div>
            <motion.div variants={fadeUp} custom={6}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  Continue Learning
                </h2>
                <button className="text-sm font-medium text-primary hover:underline">
                  View All Courses
                <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  View All Courses →
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.title} {...course} />
                {courses.map((course, i) => (
                  <motion.div
                    key={course.title}
                    variants={fadeUp}
                    custom={7 + i}
                  >
                    <CourseCard {...course} />
                  </motion.div>
                ))}
              </div>
            </div>
            </motion.div>
          </div>
          {/* Right Column - Widgets */}
          <div className="space-y-6">
            <AITutorWidget />
            <QuizWidget />
            <motion.div variants={fadeUp} custom={5}>
              <AITutorWidget />
            </motion.div>
            <motion.div variants={fadeUp} custom={6}>
              <QuizWidget />
            </motion.div>
          </div>
        </div>
        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ActivityFeed />
          <LeaderboardWidget />
        </div>
      </div>
        <motion.div
          className="grid gap-6 lg:grid-cols-2"
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={10}>
            <ActivityFeed />
          </motion.div>
          <motion.div variants={fadeUp} custom={11}>
            <LeaderboardWidget />
          </motion.div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );


"
