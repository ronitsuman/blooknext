"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"
import { toast } from "sonner"

interface FileUploadProps {
  onFilesChange: (files: File[]) => void
  maxFiles?: number
  acceptedFileTypes?: string[]
  maxFileSize?: number
}

export function FileUpload({
  onFilesChange,
  maxFiles = 5,
  acceptedFileTypes = ["image/*"],
  maxFileSize = 5 * 1024 * 1024, // 5MB
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > maxFileSize) {
          toast.error(`File ${file.name} is too large. Maximum size is ${maxFileSize / 1024 / 1024}MB`)
          return false
        }
        return true
      })

      const newFiles = [...files, ...validFiles].slice(0, maxFiles)
      setFiles(newFiles)
      onFilesChange(newFiles)
    },
    [files, maxFiles, maxFileSize, onFilesChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles: maxFiles - files.length,
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesChange(newFiles)
  }

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <div>
            <p className="text-lg font-medium">Drag & drop files here</p>
            <p className="text-sm text-muted-foreground">or click to select files</p>
            <p className="text-xs text-muted-foreground mt-2">
              Maximum {maxFiles} files, up to {maxFileSize / 1024 / 1024}MB each
            </p>
          </div>
        )}
      </Card>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <Card key={index} className="relative p-2">
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xs mt-2 truncate">{file.name}</p>
              <Button
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={() => removeFile(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
