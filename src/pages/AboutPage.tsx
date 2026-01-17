import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Brain,
  Cpu,
  Database,
  Shield,
  Zap,
  Droplets,
  LineChart,
  Bell,
  Target,
  Users,
  Globe,
  Award,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react'

const AboutPage = () => {
  const missionPoints = [
    {
      icon: Target,
      title: 'Our Mission',
      description:
        'To empower homeowners with intelligent insights that reduce resource waste, lower utility bills, and promote sustainable living.',
    },
    {
      icon: Globe,
      title: 'Our Vision',
      description:
        'A world where every home operates efficiently, where resource waste is minimized, and where smart technology makes sustainability accessible to all.',
    },
    {
      icon: Award,
      title: 'Our Values',
      description:
        'Transparency, accuracy, and user empowerment. We believe in giving you complete control over your home\'s resource management.',
    },
  ]

  const howItWorks = [
    {
      step: 1,
      icon: Database,
      title: 'Data Collection',
      description:
        'Your smart meters send real-time usage data to our secure cloud platform. We support most utility APIs and IoT devices.',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      step: 2,
      icon: Brain,
      title: 'AI Analysis',
      description:
        'Our machine learning models analyze your consumption patterns, learning what\'s normal for your household.',
      color: 'from-purple-400 to-pink-400',
    },
    {
      step: 3,
      icon: LineChart,
      title: 'Pattern Recognition',
      description:
        'The AI identifies deviations from your baseline, distinguishing between intentional changes and potential problems.',
      color: 'from-amber-400 to-orange-400',
    },
    {
      step: 4,
      icon: Bell,
      title: 'Smart Alerts',
      description:
        'When anomalies are detected, you receive instant, actionable alerts with context and recommended actions.',
      color: 'from-green-400 to-emerald-400',
    },
  ]

  const techStack = [
    { name: 'React', desc: 'Frontend Framework' },
    { name: 'TensorFlow', desc: 'ML Engine' },
    { name: 'Python', desc: 'Backend API' },
    { name: 'PostgreSQL', desc: 'Time-series Data' },
    { name: 'Redis', desc: 'Real-time Cache' },
    { name: 'AWS', desc: 'Cloud Infrastructure' },
  ]

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former Google engineer, passionate about sustainable tech.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    },
    {
      name: 'Sarah Kim',
      role: 'CTO & Co-Founder',
      bio: 'ML researcher with 10+ years in predictive analytics.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarahk',
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Product',
      bio: 'Smart home enthusiast and UX specialist.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    },
    {
      name: 'Emily Zhang',
      role: 'Lead Data Scientist',
      bio: 'PhD in computational sustainability from MIT.',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <Droplets className="w-10 h-10" />
              <Zap className="w-8 h-8" />
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              About AquaVolt AI
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              We're building the future of home resource management, powered by artificial intelligence and driven by sustainability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 mx-auto bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-6">
                  <point.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {point.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How AI Works */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              How Our AI Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A simple explanation of the technology behind AquaVolt AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -translate-x-1/2 z-0" />
                )}
                <div className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-sm font-bold text-primary-500 mb-2 block">
                    Step {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              AI Detection Pipeline
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {[
                { icon: Cpu, label: 'Smart Meters', color: 'bg-blue-500' },
                { icon: Database, label: 'Data Lake', color: 'bg-purple-500' },
                { icon: Brain, label: 'ML Models', color: 'bg-pink-500' },
                { icon: LineChart, label: 'Analysis', color: 'bg-amber-500' },
                { icon: Bell, label: 'Alerts', color: 'bg-green-500' },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      {item.label}
                    </span>
                  </div>
                  {index < 4 && (
                    <ArrowRight className="hidden md:block w-6 h-6 text-gray-300 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Built With Modern Tech
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Enterprise-grade technology stack for reliability and scale
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 text-center border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all"
              >
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {tech.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {tech.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Passionate experts building the future of home automation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 text-center group hover:shadow-xl transition-all"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full bg-gray-100 group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-primary-500 font-medium text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {member.bio}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 mx-auto text-primary-500 mb-6" />
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Security & Privacy First
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Your data is encrypted end-to-end and never shared with third parties. 
              We only analyze patterns, not personal behavior.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['256-bit Encryption', 'GDPR Compliant', 'SOC 2 Certified', 'Data Anonymization'].map((item) => (
                <div
                  key={item}
                  className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-slate-700"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Users className="w-16 h-16 mx-auto text-white/80 mb-6" />
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Join Thousands of Smart Homeowners
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Start monitoring your resources today and see the savings for yourself.
            </p>
            <Link
              to="/demo"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Try the Live Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Droplets className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-display font-bold text-white">
                AquaVolt AI
              </span>
            </div>
            <p className="text-sm">
              © 2026 AquaVolt AI. Built for the future of smart homes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AboutPage

