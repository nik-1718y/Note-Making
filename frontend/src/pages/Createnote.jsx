import React from 'react'
import Noteform from '../components/Noteform'

function Createnote() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-2xl">
        <Noteform />
      </div>
    </div>
  )
}

export default Createnote
