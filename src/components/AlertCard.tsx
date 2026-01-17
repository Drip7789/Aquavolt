import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Check, X, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import { Alert } from '../types'
import { formatTimeAgo, formatCurrency } from '../utils/mockData'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

interface AlertCardProps {
  alert: Alert
  onResolve: (id: string) => void
  onDismiss: (id: string) => void
}

const AlertCard = ({ alert, onResolve, onDismiss }: AlertCardProps) => {
  const [expanded, setExpanded] = useState(false)

  const severityConfig = {
    high: {
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      iconBg: 'bg-red-100 dark:bg-red-900/40',
      iconColor: 'text-red-600 dark:text-red-400',
      icon: AlertCircle,
      badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    },
    medium: {
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
      iconBg: 'bg-amber-100 dark:bg-amber-900/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      icon: AlertTriangle,
      badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    },
    low: {
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      icon: Info,
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    },
  }

  const config = severityConfig[alert.severity]
  const Icon = config.icon

  // Generate mock anomaly chart data
  const generateAnomalyData = () => {
    const data = []
    for (let i = 0; i < 12; i++) {
      const isAnomaly = i >= 6 && i <= 8
      data.push({
        time: `${i * 5}m`,
        value: alert.type === 'electricity'
          ? isAnomaly ? 5.2 + Math.random() * 0.5 : 2.5 + Math.random() * 0.5
          : isAnomaly ? 0.3 + Math.random() * 0.1 : 0,
        baseline: alert.type === 'electricity' ? 2.8 : 0,
      })
    }
    return data
  }

  const anomalyData = generateAnomalyData()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`rounded-xl border-2 ${config.bgColor} ${config.borderColor} overflow-hidden transition-all ${
        alert.resolved ? 'opacity-60' : ''
      }`}
    >
      {/* Header */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-lg ${config.iconBg}`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {alert.title}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.badge}`}>
                {alert.severity.toUpperCase()}
              </span>
              {alert.resolved && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                  RESOLVED
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {alert.description}
            </p>
            {alert.likelyCause && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 italic">
                Likely cause: {alert.likelyCause}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              {formatTimeAgo(alert.timestamp)}
            </p>
          </div>

          <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 dark:border-slate-700"
          >
            <div className="p-4 space-y-4">
              {/* Mini chart */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Anomaly Detection Chart
                </h4>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={anomalyData}>
                      <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <ReferenceLine
                        y={anomalyData[0].baseline}
                        stroke="#9CA3AF"
                        strokeDasharray="5 5"
                        label={{ value: 'Baseline', fontSize: 10, fill: '#9CA3AF' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={alert.type === 'electricity' ? '#F59E0B' : '#3B82F6'}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4">
                {alert.costImpact && (
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Cost Impact</p>
                    <p className="text-lg font-bold text-danger">
                      +{formatCurrency(alert.costImpact)}
                    </p>
                  </div>
                )}
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                    {alert.type}
                  </p>
                </div>
              </div>

              {/* Suggested action */}
              {alert.suggestedAction && (
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    💡 Suggested Action
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {alert.suggestedAction}
                  </p>
                </div>
              )}

              {/* Action buttons */}
              {!alert.resolved && (
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onResolve(alert.id)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Mark as Resolved
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDismiss(alert.id)
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    False Alarm
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AlertCard

