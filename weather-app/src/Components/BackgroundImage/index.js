import React from 'react'
import Image from 'next/image'

const BackgroundImage = () => (
    <>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-[1]" />
      <Image
        src={'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}
        alt="Weather Description Image"
        layout='fill'
        className="object-cover"
      />
    </>
  )
export default BackgroundImage