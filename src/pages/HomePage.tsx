import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Activity,
  Brain,
  Bell,
  Droplets,
  Zap,
  ArrowRight,
  Check,
  Star,
  ChevronRight,
  Wifi,
  Shield,
  TrendingDown,
} from 'lucide-react'
import AnimatedCounter from '../components/AnimatedCounter'

const HomePage = () => {
  const features = [
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Track water and electricity usage in real-time with second-by-second updates.',
      color: 'bg-blue-500',
    },
    {
      icon: Brain,
      title: 'AI Anomaly Detection',
      description: 'Machine learning algorithms identify unusual patterns before they become problems.',
      color: 'bg-purple-500',
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Get notified immediately when something unusual is detected in your home.',
      color: 'bg-amber-500',
    },
    {
      icon: Droplets,
      title: 'Water Tracking',
      description: 'Monitor every drop. Detect leaks, track usage patterns, and save water.',
      color: 'bg-cyan-500',
    },
    {
      icon: Zap,
      title: 'Electricity Insights',
      description: 'Understand your power consumption and identify energy vampires.',
      color: 'bg-yellow-500',
    },
    {
      icon: TrendingDown,
      title: 'Cost Reduction',
      description: 'Data-driven recommendations to reduce your utility bills every month.',
      color: 'bg-green-500',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Connect Your Meters',
      description: 'Link your smart meters or use our IoT sensors. Works with most utility providers via API.',
      icon: Wifi,
    },
    {
      number: '02',
      title: 'AI Learns Your Patterns',
      description: 'Our AI studies your home\'s unique usage patterns over 7 days to establish a baseline.',
      icon: Brain,
    },
    {
      number: '03',
      title: 'Get Alerts & Save',
      description: 'Receive instant alerts for anomalies and actionable insights to reduce waste.',
      icon: Shield,
    },
  ]

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Austin, TX',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      quote: 'AquaVolt detected a slow toilet leak that was costing us $40/month. Paid for itself in week one!',
      savings: '$480/year',
    },
    {
      name: 'James K.',
      location: 'Denver, CO',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
      quote: 'The AI insights helped us shift our energy usage to off-peak hours. Our bill dropped 20%.',
      savings: '$360/year',
    },
    {
      name: 'Maria L.',
      location: 'Miami, FL',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      quote: 'Caught a potential pipe burst at 2 AM. The alert woke me up before any damage occurred.',
      savings: '$5,000+ saved',
    },
  ]

  const alerts = [
    {
      type: 'water',
      severity: 'high',
      title: '🚨 Water leak detected',
      description: 'Continuous 0.3 GPM flow for 2 hours',
      time: '2 min ago',
    },
    {
      type: 'electricity',
      severity: 'medium',
      title: '⚡ Unusual power spike',
      description: 'HVAC running 40% over normal',
      time: '1 hour ago',
    },
    {
      type: 'tip',
      severity: 'low',
      title: '💡 Money-saving tip',
      description: 'Run dishwasher at 9 PM to save $0.35',
      time: 'Just now',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden hero-pattern">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                AI-Powered Resource Monitoring
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold text-gray-900 dark:text-white mb-6"
            >
              Stop Wasting Resources.
              <br />
              <span className="gradient-text">Start Saving Money.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
            >
              AquaVolt AI monitors your home's water and electricity usage 24/7, 
              detecting anomalies and alerting you before small issues become expensive problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/demo"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                View Live Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl border-2 border-gray-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
              <div className="text-4xl font-bold text-primary-500 mb-2">
                <AnimatedCounter target={500} prefix="$" suffix="" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">Avg. Saved per Year</p>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
              <div className="text-4xl font-bold text-success mb-2">
                <AnimatedCounter target={15} suffix="%" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">Resource Reduction</p>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700">
              <div className="text-4xl font-bold text-warning mb-2">
                <AnimatedCounter target={10000} suffix="+" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">Anomalies Detected</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Intelligent Features for Smart Homes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to monitor, analyze, and optimize your home's resource consumption.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-800 grid-pattern">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get started in three simple steps. No complex installation required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent -translate-x-1/2 z-0" />
                )}
                <div className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-slate-700">
                  <span className="text-6xl font-display font-bold text-primary-100 dark:text-primary-900/50">
                    {step.number}
                  </span>
                  <div className="mt-4 w-16 h-16 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Alerts */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Smart Alerts That Matter
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Get notified about real issues, not noise. Our AI filters out normal variations 
                and only alerts you when action is needed.
              </p>
              <ul className="space-y-4">
                {['Water leaks and unusual flow', 'Electricity spikes and vampires', 'Cost-saving opportunities', 'Maintenance reminders'].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <Check className="w-5 h-5 text-success mr-3" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-l-4 ${
                    alert.severity === 'high'
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                      : alert.severity === 'medium'
                      ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500'
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {alert.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {alert.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">{alert.time}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Trusted by Homeowners
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              See what our users are saying about their experience with AquaVolt AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full bg-gray-100"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Saved</p>
                    <p className="font-bold text-success">{testimonial.savings}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-2xl border border-gray-100 dark:border-slate-700"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Saving?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              See AquaVolt AI in action with our interactive demo. No sign-up required.
            </p>
            <Link
              to="/demo"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Try the Live Demo
              <ChevronRight className="ml-2 w-5 h-5" />
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

export default HomePage

