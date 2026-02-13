'use client'
import React from 'react'

function Loader() {
  return (
    <div>
          <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-semibold animate-pulse">
        Loading...
      </p>
    </div>
    </div>
  )
}

export default Loader