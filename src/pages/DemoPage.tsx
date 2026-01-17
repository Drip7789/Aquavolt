import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  Droplets,
  DollarSign,
  Leaf,
  TrendingUp,
  Clock,
  AlertTriangle,
  Play,
  Pause,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import AlertCard from '../components/AlertCard'
import UsageChart from '../components/UsageChart'
import InsightCard from '../components/InsightCard'
import StatusIndicator from '../components/StatusIndicator'
import {
  generateHistoricalData,
  generateNewDataPoint,
  initialAlerts,
  mockInsights,
  defaultSettings,
  createAnomalyAlert,
  formatCurrency,
  formatTime,
} from '../utils/mockData'
import { DataPoint, Alert, StatusLevel, HomeSettings } from '../types'

interface DemoPageProps {
  darkMode: boolean
}

const DemoPage = ({ darkMode }: DemoPageProps) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [data, setData] = useState<DataPoint[]>([])
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const [settings, setSettings] = useState<HomeSettings>(defaultSettings)
  const [status, setStatus] = useState<StatusLevel>('normal')
  const [isLive, setIsLive] = useState(true)
  const [isAnomaly, setIsAnomaly] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [todaySavings, setTodaySavings] = useState(2.45)

  // Current readings from latest data point
  const currentElectricity = data.length > 0 ? data[data.length - 1].electricity : 2.3
  const currentWater = data.length > 0 ? data[data.length - 1].water : 0

  // Initialize historical data
  useEffect(() => {
    setData(generateHistoricalData(24))
  }, [])

  // Real-time data updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setData((prev) => {
        const newPoint = generateNewDataPoint(isAnomaly)
        const updated = [...prev.slice(1), newPoint]
        return updated
      })
      setCurrentTime(new Date())
      setTodaySavings((prev) => prev + Math.random() * 0.01)
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive, isAnomaly])

  // Simulate anomaly
  const simulateAnomaly = useCallback(() => {
    setIsAnomaly(true)
    setStatus('warning')
    
    // Create a new alert
    const newAlert = createAnomalyAlert(Math.random() > 0.5 ? 'water' : 'electricity')
    setAlerts((prev) => [newAlert, ...prev])

    // Reset after 10 seconds
    setTimeout(() => {
      setIsAnomaly(false)
      setStatus('normal')
    }, 10000)
  }, [])

  // Resolve alert
  const handleResolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, resolved: true } : alert
      )
    )
  }

  // Dismiss alert
  const handleDismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  // Toggle setting
  const toggleSetting = (key: keyof HomeSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const unresolvedAlerts = alerts.filter((a) => !a.resolved)

  return (
    <div className="min-h-screen pt-16 flex bg-gray-50 dark:bg-slate-900">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <StatusIndicator status={status} />
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-sm">{formatTime(currentTime)}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">Today's Savings</p>
                <p className="text-lg font-bold text-success font-mono">
                  +{formatCurrency(todaySavings)}
                </p>
              </div>

              <div className="h-8 w-px bg-gray-200 dark:bg-slate-700" />

              {/* Live toggle */}
              <button
                onClick={() => setIsLive(!isLive)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isLive
                    ? 'bg-success/10 text-success'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {isLive ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                    </span>
                    Live
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4" />
                    Paused
                  </>
                )}
              </button>

              {/* Simulate Anomaly Button */}
              <button
                onClick={simulateAnomaly}
                disabled={isAnomaly}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isAnomaly
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-red-500 text-white hover:from-amber-600 hover:to-red-600 shadow-lg hover:shadow-xl'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                {isAnomaly ? 'Anomaly Active!' : 'Simulate Anomaly'}
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Usage Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <UsageChart
                    data={data}
                    type="electricity"
                    title="Electricity Usage"
                    currentValue={currentElectricity}
                    unit="kW"
                    isAnomaly={isAnomaly && Math.random() > 0.5}
                  />
                  <UsageChart
                    data={data}
                    type="water"
                    title="Water Flow"
                    currentValue={currentWater}
                    unit="GPM"
                    isAnomaly={isAnomaly && Math.random() > 0.5}
                  />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Today's Cost"
                    value={formatCurrency(4.23)}
                    icon={DollarSign}
                    iconColor="text-green-600"
                    bgColor="bg-green-100 dark:bg-green-900/30"
                    delay={0}
                  />
                  <StatCard
                    title="This Month"
                    value={formatCurrency(87.50)}
                    subtitle="Est. $105 by month end"
                    icon={TrendingUp}
                    iconColor="text-blue-600"
                    bgColor="bg-blue-100 dark:bg-blue-900/30"
                    delay={0.1}
                  />
                  <StatCard
                    title="Savings vs Last Month"
                    value="+$12.30"
                    icon={DollarSign}
                    iconColor="text-emerald-600"
                    bgColor="bg-emerald-100 dark:bg-emerald-900/30"
                    trend={{ value: '15%', positive: true }}
                    delay={0.2}
                  />
                  <StatCard
                    title="Carbon Saved"
                    value="23 kg"
                    subtitle="CO₂ equivalent"
                    icon={Leaf}
                    iconColor="text-green-600"
                    bgColor="bg-green-100 dark:bg-green-900/30"
                    delay={0.3}
                  />
                </div>

                {/* Quick Stats Row */}
                <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-5 text-white"
                  >
                    <Zap className="w-8 h-8 mb-2 opacity-80" />
                    <p className="text-3xl font-bold font-mono">{currentElectricity.toFixed(1)}</p>
                    <p className="text-sm opacity-80">kW Current</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-5 text-white"
                  >
                    <Droplets className="w-8 h-8 mb-2 opacity-80" />
                    <p className="text-3xl font-bold font-mono">{currentWater.toFixed(1)}</p>
                    <p className="text-sm opacity-80">GPM Current</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400">Peak Today</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">4.8 kW</p>
                    <p className="text-xs text-gray-400">at 2:30 PM</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400">Active Alerts</p>
                    <p className="text-2xl font-bold text-danger font-mono">{unresolvedAlerts.length}</p>
                    <p className="text-xs text-gray-400">Need attention</p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Alerts Tab */}
            {activeTab === 'alerts' && (
              <motion.div
                key="alerts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Alerts
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      {unresolvedAlerts.length} unresolved alert{unresolvedAlerts.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      Mark All Read
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors">
                      Filter
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onResolve={handleResolveAlert}
                      onDismiss={handleDismissAlert}
                    />
                  ))}
                </div>

                {alerts.length === 0 && (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                      <Play className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No alerts
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Everything is running smoothly. Click "Simulate Anomaly" to see alerts in action.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Insights Tab */}
            {activeTab === 'insights' && (
              <motion.div
                key="insights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    AI Insights
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Personalized recommendations based on your usage patterns
                  </p>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white">
                    <p className="text-sm opacity-80 mb-1">Total Potential Savings</p>
                    <p className="text-3xl font-bold">$108.50</p>
                    <p className="text-sm opacity-80 mt-2">per month if you follow all tips</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Tips</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">5</p>
                    <p className="text-sm text-gray-400 mt-2">2 warnings, 3 suggestions</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg. Confidence</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">87%</p>
                    <p className="text-sm text-gray-400 mt-2">AI accuracy score</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockInsights.map((insight, index) => (
                    <InsightCard key={insight.id} insight={insight} delay={index * 0.1} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Settings
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Configure your monitoring preferences
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Notification Preferences */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Notification Preferences
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: 'notifyHighAlerts', label: 'High Priority Alerts', desc: 'Critical issues requiring immediate attention' },
                        { key: 'notifyMediumAlerts', label: 'Medium Priority Alerts', desc: 'Notable anomalies worth checking' },
                        { key: 'notifyLowAlerts', label: 'Low Priority Alerts', desc: 'Informational updates and tips' },
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive alerts via email' },
                        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser and mobile notifications' },
                        { key: 'weeklyReport', label: 'Weekly Report', desc: 'Summary of usage and savings' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {item.label}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.desc}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleSetting(item.key as keyof HomeSettings)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              settings[item.key as keyof HomeSettings]
                                ? 'bg-primary-500'
                                : 'bg-gray-300 dark:bg-slate-600'
                            }`}
                          >
                            <motion.div
                              animate={{
                                x: settings[item.key as keyof HomeSettings] ? 24 : 2,
                              }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Home Info */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Your Home
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Square Footage
                        </label>
                        <input
                          type="number"
                          value={settings.squareFootage}
                          onChange={(e) =>
                            setSettings({ ...settings, squareFootage: parseInt(e.target.value) })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Occupancy (people)
                        </label>
                        <input
                          type="number"
                          value={settings.occupancy}
                          onChange={(e) =>
                            setSettings({ ...settings, occupancy: parseInt(e.target.value) })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Registered Appliances
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {settings.appliances.map((appliance) => (
                            <span
                              key={appliance}
                              className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                            >
                              {appliance}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Baseline config */}
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Baseline Configuration
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        AI has learned your patterns. Last calibration: 3 days ago
                      </p>
                      <button className="w-full py-2 px-4 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                        Recalibrate Baseline
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default DemoPage

