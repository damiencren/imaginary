'use client'
import { CldUploadButton, CldUploadWidget } from 'next-cloudinary'
import React from 'react'
import { Button } from './ui/button'
import { Upload } from 'lucide-react'

const ImportButton = () => {
  return (
    <div className="flex items-center">
      <Button asChild>
        <div>
          <Upload size={16}/>
          <CldUploadButton uploadPreset="dlzdpbuu"/>
        </div>
      </Button>
    </div>
  )
}

export default ImportButton