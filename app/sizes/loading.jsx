// src/app/sizes/[sizeSlug]/loading.jsx
'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center h-screen justify-center">
      <div className="text-center">
        <p className="text-lg font-medium">Loading size details...</p>
        <div className="mt-2 animate-spin border-t-4 border-blue-500 border-solid rounded-full w-10 h-10 mx-auto"></div>
      </div>
    </div>
  );
}
