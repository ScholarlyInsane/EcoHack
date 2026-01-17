"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CameraScanner } from "@/components/scan/camera-scanner"
import { ImageUploader } from "@/components/scan/image-uploader"
import { ClassificationResult } from "@/components/scan/classification-result"
import { SubmissionSuccess } from "@/components/scan/submission-success"
import { Button } from "@/components/ui/button"
import { Camera, Upload, QrCode, ArrowLeft, Loader2 } from "lucide-react"
import { mockCitizenUser, handleLogout } from "@/lib/mock-user"

type ScanMode = "select" | "camera" | "upload" | "qr"
type ScanState = "idle" | "scanning" | "processing" | "result" | "submitted"
type WasteCategory = "dry" | "wet" | "hazardous"

interface ClassificationData {
  category: WasteCategory
  confidence: number
  itemName: string
}

// Simulated AI classification
function simulateClassification(): Promise<ClassificationData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories: WasteCategory[] = ["dry", "wet", "hazardous"]
      const items = {
        dry: ["Plastic Bottle", "Cardboard Box", "Newspaper", "Aluminum Can", "Glass Jar"],
        wet: ["Food Scraps", "Fruit Peel", "Vegetable Waste", "Coffee Grounds", "Eggshells"],
        hazardous: ["Battery", "Light Bulb", "Paint Can", "Electronic Waste", "Medicine"],
      }

      const category = categories[Math.floor(Math.random() * categories.length)]
      const categoryItems = items[category]
      const itemName = categoryItems[Math.floor(Math.random() * categoryItems.length)]
      const confidence = 0.75 + Math.random() * 0.2

      resolve({ category, confidence, itemName })
    }, 2000)
  })
}

export default function ScanPage() {
  const [mode, setMode] = useState<ScanMode>("select")
  const [state, setState] = useState<ScanState>("idle")
  const [imageData, setImageData] = useState<string | null>(null)
  const [classification, setClassification] = useState<ClassificationData | null>(null)
  const [submissionId, setSubmissionId] = useState<string>("")

  const handleCapture = async (data: string) => {
    setImageData(data)
    setMode("select")
    setState("processing")

    // Simulate AI processing
    const result = await simulateClassification()
    setClassification(result)
    setState("result")
  }

  const handleConfirm = () => {
    // Simulate submission
    const id = `ECO-${Date.now().toString(36).toUpperCase()}`
    setSubmissionId(id)
    setState("submitted")
  }

  const handleReset = () => {
    setMode("select")
    setState("idle")
    setImageData(null)
    setClassification(null)
    setSubmissionId("")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={mockCitizenUser} onLogout={handleLogout} />
      <main className="flex-1">
        <section className="py-12 lg:py-20">
          <div className="mx-auto max-w-2xl px-4 lg:px-8">
            {/* Back button when not on select mode */}
            {(mode !== "select" || state !== "idle") && state !== "submitted" && (
              <Button
                variant="ghost"
                onClick={handleReset}
                className="mb-6 gap-2 -ml-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Start Over
              </Button>
            )}

            {/* Mode selection */}
            {state === "idle" && mode === "select" && (
              <div className="space-y-8">
                <div className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Scan Your Waste</h1>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Choose how you'd like to identify your waste item
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <button
                    onClick={() => setMode("camera")}
                    className="group flex flex-col items-center gap-4 rounded-xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Camera className="h-8 w-8" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">Camera</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Scan live with camera</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setMode("upload")}
                    className="group flex flex-col items-center gap-4 rounded-xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <Upload className="h-8 w-8" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">Upload</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Upload from gallery</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setMode("qr")}
                    className="group flex flex-col items-center gap-4 rounded-xl border-2 border-border bg-card p-6 transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-eco-orange/10 text-eco-orange group-hover:bg-eco-orange group-hover:text-white transition-colors">
                      <QrCode className="h-8 w-8" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold">QR Code</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Scan product QR</p>
                    </div>
                  </button>
                </div>

                {/* Quick tips */}
                <div className="rounded-xl bg-muted/50 p-6">
                  <h3 className="font-medium mb-3">Tips for better scanning:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      Ensure good lighting for accurate detection
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      Place a single item at a time for best results
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      Hold camera steady when scanning
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Upload mode */}
            {state === "idle" && mode === "upload" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold">Upload Waste Image</h1>
                  <p className="mt-2 text-muted-foreground">Select a photo from your device</p>
                </div>
                <ImageUploader onUpload={handleCapture} />
              </div>
            )}

            {/* QR mode placeholder */}
            {state === "idle" && mode === "qr" && (
              <div className="space-y-6 text-center">
                <div>
                  <h1 className="text-2xl font-bold">Scan Product QR Code</h1>
                  <p className="mt-2 text-muted-foreground">Point your camera at the product's QR code</p>
                </div>
                <div className="rounded-xl border-2 border-dashed border-border p-12">
                  <QrCode className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <p className="mt-4 text-sm text-muted-foreground">QR scanning coming soon</p>
                  <Button variant="outline" onClick={() => setMode("camera")} className="mt-4">
                    Use Camera Instead
                  </Button>
                </div>
              </div>
            )}

            {/* Processing state */}
            {state === "processing" && (
              <div className="py-16 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <Loader2 className="h-10 w-10 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold">Analyzing Your Waste</h2>
                <p className="mt-2 text-muted-foreground">Our AI is identifying the waste category...</p>
                {imageData && (
                  <div className="mt-8 rounded-xl overflow-hidden border border-border max-w-sm mx-auto">
                    <img
                      src={imageData || "/placeholder.svg"}
                      alt="Uploaded waste"
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Result state */}
            {state === "result" && imageData && classification && (
              <ClassificationResult
                imageData={imageData}
                category={classification.category}
                confidence={classification.confidence}
                itemName={classification.itemName}
                onReset={handleReset}
                onConfirm={handleConfirm}
              />
            )}

            {/* Submitted state */}
            {state === "submitted" && (
              <SubmissionSuccess
                submissionId={submissionId}
                estimatedReward={
                  classification?.category === "hazardous" ? 15 : classification?.category === "dry" ? 10 : 8
                }
                onScanAnother={handleReset}
              />
            )}
          </div>
        </section>

        {/* Camera scanner overlay */}
        {mode === "camera" && state === "idle" && (
          <CameraScanner onCapture={handleCapture} onClose={() => setMode("select")} />
        )}
      </main>
      <Footer />
    </div>
  )
}
