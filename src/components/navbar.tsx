import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/5 backdrop-blur-lg border-b border-white/10 dark:border-gray-800/50"
    >
      <div className="container flex h-16 items-center px-4 mx-auto">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260,
                damping: 20
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 9h.01" />
                <path d="M15 9h.01" />
                <path d="M9 15l.01-.011" />
                <path d="M15 15l.01-.011" />
              </svg>
            </motion.div>
            <span className="font-bold tracking-tight text-xl inline-block">
              Fake Profile Detector
            </span>
          </Link>
        </div>
        <nav className="ml-auto flex items-center space-x-6 text-sm font-medium">
          <Link 
            href="/" 
            className="transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link 
            href="/upload" 
            className="transition-colors hover:text-primary"
          >
            Verify
          </Link>
          <Link 
            href="/about" 
            className="transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>
      </div>
    </motion.header>
  )
} 