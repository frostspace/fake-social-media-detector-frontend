import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  className?: string
}

export function FileUpload({ onFileSelect, className }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      handleFile(file)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }
    
    setSelectedFile(file)
    onFileSelect(file)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const resetSelection = () => {
    setSelectedFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={cn('w-full max-w-3xl mx-auto', className)}>
      {!selectedFile ? (
        <motion.div
          initial={{ opacity: 0.9 }}
          animate={{ 
            opacity: 1,
            scale: isDragging ? 1.02 : 1,
            borderColor: isDragging ? 'rgb(59, 130, 246)' : 'rgb(209, 213, 219)'
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer',
            'bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-sm',
            'transition-all duration-200 ease-in-out',
            isDragging ? 'border-blue-500 bg-blue-50/10' : 'border-gray-300 hover:border-gray-400'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="rounded-full bg-primary/10 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary w-8 h-8"
              >
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                <line x1="16" x2="22" y1="5" y2="5" />
                <line x1="19" x2="19" y1="2" y2="8" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Drag & drop your profile image here
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse your files
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supports: JPG, PNG, GIF
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md"
        >
          <div className="aspect-square max-h-[400px] overflow-hidden bg-black/5 dark:bg-white/5">
            <img 
              src={preview || ''} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
            <div className="truncate">
              <p className="text-sm font-medium truncate">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                resetSelection();
              }}
            >
              Change
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
} 