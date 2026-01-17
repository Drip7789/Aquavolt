import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts'
import { DataPoint } from '../types'

interface UsageChartProps {
  data: DataPoint[]
  type: 'electricity' | 'water'
  title: string
  currentValue: number
  unit: string
  isAnomaly?: boolean
}

const UsageChart = ({ data, type, title, currentValue, unit, isAnomaly }: UsageChartProps) => {
  const chartColor = type === 'electricity' ? '#F59E0B' : '#3B82F6'
  const gradientId = `gradient-${type}`
  
  // Format data for the chart
  const chartData = data.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    }),
    value: type === 'electricity' ? point.electricity : point.water,
    baseline: type === 'electricity' ? point.electricityBaseline : point.waterBaseline,
  }))

  const baselineValue = type === 'electricity' ? 2.5 : 0.5

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border transition-all ${
        isAnomaly
          ? 'border-red-300 dark:border-red-800 glow-red'
          : 'border-gray-100 dark:border-slate-700'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last 24 hours</p>
        </div>
        <div className="text-right">
          <motion.p
            key={currentValue}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className={`text-3xl font-bold font-mono ${
              isAnomaly ? 'text-danger' : type === 'electricity' ? 'text-warning' : 'text-primary-500'
            }`}
          >
            {currentValue.toFixed(1)}
          </motion.p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{unit}</p>
        </div>
      </div>

      {/* Status indicator */}
      {isAnomaly && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 px-3 py-2 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-sm font-medium text-red-700 dark:text-red-400">
            Anomaly Detected!
          </span>
        </motion.div>
      )}

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              domain={type === 'water' ? [0, 4] : [0, 8]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {label}
                      </p>
                      <p className="text-lg font-bold" style={{ color: chartColor }}>
                        {payload[0].value?.toFixed(2)} {unit}
                      </p>
                      <p className="text-xs text-gray-400">
                        Baseline: {payload[0].payload.baseline?.toFixed(1)} {unit}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <ReferenceLine
              y={baselineValue}
              stroke="#9CA3AF"
              strokeDasharray="5 5"
              label={{
                value: 'Baseline',
                position: 'right',
                fontSize: 10,
                fill: '#9CA3AF',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColor }}></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Actual Usage</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-gray-400" style={{ borderStyle: 'dashed' }}></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Baseline</span>
        </div>
      </div>
    </motion.div>
  )
}

export default UsageChart

