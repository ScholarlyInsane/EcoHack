"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Camera, X, RefreshCcw, FlipVertical2 } from "lucide-react"

interface CameraScannerProps {
  onCapture: (imageData: string) => void
  onClose: () => void
}

export function CameraScanner({ onCapture, onClose }: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
  const [error, setError] = useState<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
      })

      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions.")
      console.error("Camera error:", err)
    }
  }, [facingMode])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsStreaming(false)
  }, [])

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg", 0.8)
        stopCamera()
        onCapture(imageData)
      }
    }
  }, [onCapture, stopCamera])

  const toggleCamera = useCallback(() => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }, [])

  const handleClose = useCallback(() => {
    stopCamera()
    onClose()
  }, [stopCamera, onClose])

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="flex items-center justify-between p-4 bg-black/80">
        <h3 className="text-white font-medium">Scan Waste Item</h3>
        <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:bg-white/20">
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 relative">
        {!isStreaming && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button onClick={startCamera} size="lg" className="gap-2">
              <Camera className="h-5 w-5" />
              Start Camera
            </Button>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-center text-white">
              <p className="mb-4">{error}</p>
              <Button onClick={startCamera} variant="secondary">
                Try Again
              </Button>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${isStreaming ? "block" : "hidden"}`}
        />

        {/* Scan overlay */}
        {isStreaming && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-white rounded-2xl relative">
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
              </div>
            </div>
            <p className="absolute bottom-32 left-0 right-0 text-center text-white text-sm">
              Position the waste item within the frame
            </p>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {isStreaming && (
        <div className="p-6 bg-black/80 flex items-center justify-center gap-6">
          <Button variant="ghost" size="icon" onClick={toggleCamera} className="text-white hover:bg-white/20 h-12 w-12">
            <FlipVertical2 className="h-6 w-6" />
          </Button>
          <Button
            onClick={captureImage}
            size="lg"
            className="h-16 w-16 rounded-full bg-white hover:bg-gray-200 text-black"
          >
            <Camera className="h-8 w-8" />
          </Button>
          <Button variant="ghost" size="icon" onClick={startCamera} className="text-white hover:bg-white/20 h-12 w-12">
            <RefreshCcw className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  )
}
