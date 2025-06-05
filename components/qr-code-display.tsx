"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Printer, Share2 } from "lucide-react"

interface QRCodeDisplayProps {
  qrCodeUrl: string
  spaceId: string
  spaceName: string
}

export function QRCodeDisplay({ qrCodeUrl, spaceId, spaceName }: QRCodeDisplayProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)

    // In a real app, you would implement the download functionality
    setTimeout(() => {
      setIsDownloading(false)
      // Simulate download
      alert("QR code downloaded successfully!")
    }, 1000)
  }

  const handlePrint = () => {
    setIsPrinting(true)

    // In a real app, you would implement the print functionality
    setTimeout(() => {
      setIsPrinting(false)
      // Simulate print
      alert("QR code sent to printer!")
    }, 1000)
  }

  const handleShare = () => {
    setIsSharing(true)

    // In a real app, you would implement the share functionality
    setTimeout(() => {
      setIsSharing(false)
      // Simulate share
      alert("QR code shared successfully!")
    }, 1000)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4">Your Unique QR Code</h3>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          This QR code is unique to {spaceName}. When scanned, it will show all active campaigns.
        </p>

        <div className="border rounded-lg p-4 mb-6 w-64 h-64 flex items-center justify-center">
          {qrCodeUrl ? (
            <img
              src={qrCodeUrl || "/placeholder.svg"}
              alt={`QR Code for ${spaceName}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">QR Code Placeholder</p>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full gap-2">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <Download className="h-4 w-4" />
            {isDownloading ? "Downloading..." : "Download QR Code"}
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handlePrint}
            disabled={isPrinting}
          >
            <Printer className="h-4 w-4" />
            {isPrinting ? "Printing..." : "Print QR Code"}
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleShare}
            disabled={isSharing}
          >
            <Share2 className="h-4 w-4" />
            {isSharing ? "Sharing..." : "Share QR Code"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
