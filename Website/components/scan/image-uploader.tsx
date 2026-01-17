"use client"

import type React from "react"

import { useCallback } from "react"
import { Upload, ImageIcon } from "lucide-react"

interface ImageUploaderProps {
  onUpload: (imageData: string) => void
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const result = reader.result as string
          onUpload(result)
        }
        reader.readAsDataURL(file)
      }
    },
    [onUpload],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files?.[0]
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const result = reader.result as string
          onUpload(result)
        }
        reader.readAsDataURL(file)
      }
    },
    [onUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  return (
    <div
      className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
        aria-label="Upload waste image"
      />
      <label htmlFor="image-upload" className="cursor-pointer">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
          <Upload className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-medium">Upload an Image</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Drag and drop or click to select a photo of your waste item
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ImageIcon className="h-4 w-4" />
          <span>JPG, PNG, HEIC up to 10MB</span>
        </div>
      </label>
    </div>
  )
}
