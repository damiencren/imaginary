'use client'
import { CldUploadButton, CldUploadWidget } from 'next-cloudinary'
import React from 'react'
import { Button } from './ui/button'
import { Upload } from 'lucide-react'

const ImportButton = ({ uploadPath }: { uploadPath: string }) => {
  return (
    <div className="flex items-center">
      <Button asChild>
        <CldUploadButton uploadPreset="upload_preset"
          options={{ folder: uploadPath }}>
            Upload
          <Upload size={16} />
        </CldUploadButton>
      </Button>
    </div>
  )
}

export default ImportButton