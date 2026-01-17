import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Droplets, Zap, Moon, Sun, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Demo', path: '/demo' },
    { name: 'About', path: '/about' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Droplets className="w-8 h-8 text-primary-500 wave" />
              <Zap className="w-4 h-4 text-warning absolute -right-1 -top-1 spark" />
            </div>
            <span className="text-xl font-display font-bold gradient-text">
              AquaVolt AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-500'
                    : darkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <Link
              to="/demo"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Try Demo
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                darkMode ? 'text-white' : 'text-gray-600'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden ${darkMode ? 'bg-slate-800' : 'bg-white'} border-t ${
            darkMode ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium ${
                  location.pathname === link.path
                    ? 'bg-primary-50 text-primary-600'
                    : darkMode
                    ? 'text-gray-300 hover:bg-slate-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2 bg-primary-500 text-white font-medium rounded-lg"
            >
              Try Demo
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar

