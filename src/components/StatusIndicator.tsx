import { motion } from 'framer-motion'
import { StatusLevel } from '../types'

interface StatusIndicatorProps {
  status: StatusLevel
  size?: 'sm' | 'md' | 'lg'
}

const StatusIndicator = ({ status, size = 'md' }: StatusIndicatorProps) => {
  const statusConfig = {
    normal: {
      color: 'bg-success',
      text: 'All Systems Normal',
      ringColor: 'rgba(16, 185, 129, 0.4)',
    },
    warning: {
      color: 'bg-warning',
      text: 'Anomaly Detected',
      ringColor: 'rgba(245, 158, 11, 0.4)',
    },
    danger: {
      color: 'bg-danger',
      text: 'Critical Alert',
      ringColor: 'rgba(239, 68, 68, 0.4)',
    },
  }

  const sizeConfig = {
    sm: { dot: 'w-2 h-2', text: 'text-xs' },
    md: { dot: 'w-3 h-3', text: 'text-sm' },
    lg: { dot: 'w-4 h-4', text: 'text-base' },
  }

  const config = statusConfig[status]
  const sizes = sizeConfig[size]

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <motion.span
          animate={{
            boxShadow: [
              `0 0 0 0 ${config.ringColor}`,
              `0 0 0 8px transparent`,
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className={`absolute inset-0 ${sizes.dot} rounded-full ${config.color}`}
        />
        <span className={`relative block ${sizes.dot} rounded-full ${config.color}`} />
      </div>
      <span className={`font-medium ${sizes.text} text-gray-700 dark:text-gray-300`}>
        {config.text}
      </span>
    </div>
  )
}

export default StatusIndicator

