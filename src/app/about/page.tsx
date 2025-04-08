"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="absolute top-4 right-4 z-50">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link 
            href="/" 
            className="transition-colors hover:text-primary px-3 py-2 rounded-md bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            Home
          </Link>
          <Link 
            href="/upload" 
            className="transition-colors hover:text-primary px-3 py-2 rounded-md bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            Verify
          </Link>
        </nav>
      </div>
      
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <section className="mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              About This Project
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="prose dark:prose-invert max-w-none bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-4">What is Fake Profile Detector?</h2>
              <p className="mb-4">
                The Fake Social Media Profile Detector is an AI-powered tool designed to help users identify potentially fraudulent social media accounts. In today's digital world, fake profiles are increasingly common and are often used for scams, catfishing, spreading misinformation, or other malicious activities.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">How it Works</h2>
              <p className="mb-4">
                Our tool leverages artificial intelligence to analyze various aspects of a social media profile from an uploaded screenshot, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Profile picture authenticity</li>
                <li>Account activity patterns</li>
                <li>Follower-to-following ratio</li>
                <li>Content consistency</li>
                <li>Profile creation date and history</li>
              </ul>
              
              <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-md border-l-4 border-amber-500 my-8">
                <h3 className="text-lg font-medium text-amber-800 dark:text-amber-400">Important Disclaimer</h3>
                <p className="text-amber-700 dark:text-amber-300">
                  While our AI provides a helpful analysis, it's not infallible. The tool should be used as one of several methods to verify authenticity. False positives and negatives can occur, and users should apply critical thinking when evaluating results.
                </p>
              </div>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Privacy Consideration</h2>
              <p>
                We respect your privacy. Images uploaded to our service are not stored permanently and are only used for the purpose of analysis. The application processes the images to extract relevant information needed for detection but does not retain the images after processing.
              </p>
            </motion.div>
          </section>

          <section>
            <motion.h2 
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Our Team
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square relative bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900">
                    <Image 
                      src="/assets/aryan.jpeg" 
                      alt="Aryan Sharma" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-1">Aryan Sharma</h3>
                    <p className="text-sm text-muted-foreground mb-3">CSE A, 2230744</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Contributed to the AI model development and backend integration of the fake profile detection system.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square relative bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900">
                    <Image 
                      src="/assets/ayush.jpeg" 
                      alt="Ayush Prajapati" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-1">Ayush Prajapati</h3>
                    <p className="text-sm text-muted-foreground mb-3">CSE A, 2230752</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Focused on frontend development and user experience design for the application.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  )
} 