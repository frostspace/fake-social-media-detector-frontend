"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { convertToBase64 } from '@/lib/utils'
import { toast } from 'sonner'

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleVerify = async () => {
    if (!selectedFile) {
      toast.error('Please select an image to verify')
      return
    }

    try {
      setIsLoading(true)
      
      // Convert image to base64
      const base64String = await convertToBase64(selectedFile)
      
      // Store the base64 string in localStorage for the results page
      localStorage.setItem('uploadedImage', base64String)
      localStorage.setItem('verificationInProgress', 'true')
      
      // Navigate to results page
      router.push('/results')
    } catch (error) {
      console.error('Error processing file:', error)
      toast.error('Error processing file. Please try again.')
    } finally {
      setIsLoading(false)
    }
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
            href="/about" 
            className="transition-colors hover:text-primary px-3 py-2 rounded-md bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            About
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
          <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-3xl">
                Verify Profile Image
              </CardTitle>
              <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
                Upload a screenshot or image of the social media profile you want to verify
              </p>
            </CardHeader>
            <CardContent className="pb-6">
              <FileUpload onFileSelect={handleFileSelect} />
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
              <Button
                onClick={handleVerify}
                disabled={!selectedFile || isLoading}
                className="w-full max-w-xs"
                variant="gradient"
                size="lg"
              >
                {isLoading ? 'Processing...' : 'Verify Now'}
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>For the best results, ensure the image clearly shows the profile information.</p>
            <p className="mt-2">This tool works with Instagram, Facebook, Twitter, and LinkedIn profiles.</p>
          </div>
        </motion.div>
      </main>
    </div>
  )
} 