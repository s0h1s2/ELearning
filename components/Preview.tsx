"use client";
import "react-quill/dist/quill.bubble.css"
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react'


interface Props {
  value: string;
}

const Preview = ({ value }: Props) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), [])

  return (
    <div className="bg-white">
      <ReactQuill theme="bubble" value={value} readOnly />
    </div>
  )
}

export default Preview

