import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedCounterProps {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}

const AnimatedCounter = ({
  target,
  prefix = '',
  suffix = '',
  duration = 2000,
  decimals = 0,
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const startValue = 0

    const updateCount = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      const currentValue = startValue + (target - startValue) * easeOut
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [target, duration])

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="font-mono"
    >
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </motion.span>
  )
}

export default AnimatedCounter

