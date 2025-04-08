"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { verifyProfile } from '@/lib/api'

interface VerificationResult {
  chancesOfBeingFake: string
  verdict: string
  why: string
}

export default function ResultsPage() {
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkVerification = async () => {
      // Check if verification is in progress
      const isVerifying = localStorage.getItem('verificationInProgress')
      
      if (!isVerifying) {
        // If no verification in progress, redirect to upload page
        router.push('/upload')
        return
      }

      try {
        setLoading(true)
        
        // Get the uploaded image from localStorage
        const base64String = localStorage.getItem('uploadedImage')
        
        if (!base64String) {
          throw new Error('No image found')
        }
        
        // Call the API to verify the profile
        const response = await verifyProfile(base64String)
        
        // Clear verification flag and store result
        localStorage.removeItem('verificationInProgress')
        setResult(response)
      } catch (err) {
        console.error('Error during verification:', err)
        setError('Failed to verify profile. Please try again.')
        toast.error('Verification failed. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    checkVerification()
  }, [router])

  const handleTryAgain = () => {
    router.push('/upload')
  }

  // Calculate color based on fake chance percentage
  const getVerdictColor = (verdict: string) => {
    if (verdict === 'Real') return 'text-green-600 dark:text-green-400'
    if (verdict === 'Fake') return 'text-red-600 dark:text-red-400'
    return 'text-amber-600 dark:text-amber-400'
  }

  const getMeterColor = (verdict: string) => {
    if (verdict === 'Real') return 'bg-gradient-to-r from-green-500 to-green-600'
    if (verdict === 'Fake') return 'bg-gradient-to-r from-red-500 to-red-600'
    return 'bg-gradient-to-r from-amber-500 to-amber-600'
  }

  const getFakePercentage = (chance: string) => {
    return parseInt(chance.replace('%', ''))
  }

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
          <Link 
            href="/about" 
            className="transition-colors hover:text-primary px-3 py-2 rounded-md bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            About
          </Link>
        </nav>
      </div>
      
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-3xl">
                {loading ? 'Analyzing Profile...' : 'Verification Results'}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center py-12">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-6"></div>
                  <p className="text-muted-foreground text-lg">Our AI is analyzing the profile...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-16 h-16 mx-auto text-red-500 mb-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                    />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">Verification Failed</h3>
                  <p className="text-muted-foreground mb-6">{error}</p>
                  <Button onClick={handleTryAgain}>Try Again</Button>
                </div>
              ) : result && (
                <div className="py-6">
                  <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      <h3 className="text-lg text-muted-foreground mb-2">Our Verdict</h3>
                      <div className={`text-5xl font-bold ${getVerdictColor(result.verdict)}`}>
                        {result.verdict}
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2">
                      <h3 className="text-lg text-muted-foreground mb-2 text-center md:text-left">
                        Chances of being fake
                      </h3>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 mb-2">
                        <motion.div 
                          className={`h-6 rounded-full ${getMeterColor(result.verdict)}`}
                          initial={{ width: '0%' }}
                          animate={{ width: result.chancesOfBeingFake }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>0%</span>
                        <span className="font-medium">{result.chancesOfBeingFake}</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 border-t pt-6 border-gray-200 dark:border-gray-800">
                    <h3 className="text-xl font-semibold mb-4">Analysis Explanation</h3>
                    <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {result.why}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            {!loading && !error && result && (
              <CardFooter className="flex justify-center gap-4 pb-8">
                <Button onClick={handleTryAgain} variant="outline">
                  Verify Another Profile
                </Button>
                <Link href="/">
                  <Button variant="gradient">
                    Back to Home
                  </Button>
                </Link>
              </CardFooter>
            )}
          </Card>
        </motion.div>
      </main>
    </div>
  )
} 