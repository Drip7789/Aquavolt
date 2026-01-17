import { motion } from 'framer-motion'
import { Lightbulb, AlertTriangle, Info, Thermometer, Droplet, Zap } from 'lucide-react'
import { Insight } from '../types'
import { formatCurrency } from '../utils/mockData'

interface InsightCardProps {
  insight: Insight
  delay?: number
}

const InsightCard = ({ insight, delay = 0 }: InsightCardProps) => {
  const iconMap = {
    lightbulb: Lightbulb,
    'alert-triangle': AlertTriangle,
    info: Info,
    thermometer: Thermometer,
    droplet: Droplet,
    zap: Zap,
  }

  const typeConfig = {
    tip: {
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      iconBg: 'bg-green-100 dark:bg-green-900/40',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    warning: {
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
      iconBg: 'bg-amber-100 dark:bg-amber-900/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    info: {
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
  }

  const Icon = iconMap[insight.icon]
  const config = typeConfig[insight.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.01 }}
      className={`${config.bgColor} border ${config.borderColor} rounded-xl p-5 cursor-pointer transition-all hover:shadow-md`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${config.iconBg}`}>
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {insight.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300">
                {insight.confidence}% confident
              </span>
            </div>
          </div>
          
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {insight.description}
          </p>

          {insight.potentialSavings && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Potential savings:
              </span>
              <span className="text-lg font-bold text-success">
                {formatCurrency(insight.potentialSavings)}/month
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default InsightCard

