import Link from 'next/link'
import { SparklesIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-surface-50 to-white dark:from-surface-950 dark:to-surface-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold gradient-text">AI Learn</div>
        <div className="space-x-6">
          <Link href="#features" className="text-surface-700 dark:text-surface-300 hover:text-primary-600">Features</Link>
          <Link href="#pricing" className="text-surface-700 dark:text-surface-300 hover:text-primary-600">Pricing</Link>
          <Link href="/dashboard" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          Master AI with
          <span className="gradient-text block mt-2">Personalized Learning</span>
        </h1>
        <p className="text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto mb-10">
          Join thousands of learners using AI to accelerate their skills. Interactive courses, real‑time feedback, and a community of experts.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="btn-primary text-lg px-8 py-3">Start Learning Free</button>
          <button className="btn-secondary text-lg px-8 py-3">Watch Demo</button>
        </div>
        <div className="mt-16 text-sm text-surface-500 dark:text-surface-500 animate-pulse-slow">
          ✨ Powered by GPT‑4 and Supabase
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">Why choose our platform?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<SparklesIcon className="w-8 h-8 text-primary-600" />}
            title="AI-Powered Tutors"
            description="Get instant answers and explanations from our advanced AI tutors, available 24/7."
          />
          <FeatureCard
            icon={<AcademicCapIcon className="w-8 h-8 text-secondary-600" />}
            title="Personalized Paths"
            description="Our algorithms adapt to your learning style, creating a custom curriculum just for you."
          />
          <FeatureCard
            icon={<ChartBarIcon className="w-8 h-8 text-primary-600" />}
            title="Progress Analytics"
            description="Track your improvement with detailed insights and milestones."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your learning?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Join the AI learning revolution today. No credit card required.
          </p>
          <button className="bg-white text-primary-700 hover:bg-surface-100 font-bold py-3 px-8 rounded-lg text-lg">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-100 dark:bg-surface-900 py-12">
        <div className="container mx-auto px-6 text-center text-surface-600 dark:text-surface-400">
          <p>© 2025 AI Learn. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="card group hover:scale-105 transition-transform duration-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-surface-600 dark:text-surface-400">{description}</p>
    </div>
  )
}
