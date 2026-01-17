import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Bell,
  Lightbulb,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'alerts', name: 'Alerts', icon: Bell, badge: 3 },
    { id: 'insights', name: 'Insights', icon: Lightbulb },
    { id: 'settings', name: 'Settings', icon: Settings },
  ]

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-slate-700">
        {!collapsed && (
          <span className="font-semibold text-gray-900 dark:text-white">Navigation</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-500' : ''}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              {!collapsed && (
                <span className={`font-medium ${isActive ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                  {tab.name}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-slate-700">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 text-white">
            <p className="text-sm font-medium">Need Help?</p>
            <p className="text-xs text-primary-100 mt-1">
              Check our documentation or contact support
            </p>
            <button className="mt-3 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
              Get Support
            </button>
          </div>
        </div>
      )}
    </motion.aside>
  )
}

export default Sidebar

