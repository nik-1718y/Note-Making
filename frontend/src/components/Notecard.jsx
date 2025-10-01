import React, { useContext, useState } from 'react'
import { NoteContext } from '../context/NoteContext'

function Notecard({ note }) {
  const { deleteNote, updateNote } = useContext(NoteContext)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content
  })

  const handleUpdate = () => {
    updateNote(note._id, editData)
    setIsEditing(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col justify-between">
      {isEditing ? (
        <>
          {/* Edit Mode */}
          <input
            type="text"
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 w-full mb-4 
                       focus:ring-2 focus:ring-blue-500 outline-none 
                       bg-gray-100 dark:bg-gray-700 
                       text-gray-900 dark:text-white transition"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          />
          <textarea
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 w-full mb-4 
                       focus:ring-2 focus:ring-blue-500 outline-none 
                       bg-gray-100 dark:bg-gray-700 
                       text-gray-900 dark:text-white transition resize-none"
            rows="4"
            value={editData.content}
            onChange={(e) => setEditData({ ...editData, content: e.target.value })}
          />
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition transform hover:scale-105"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md transition transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* View Mode */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {note.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 flex-1 mb-4">
            {note.content}
          </p>

          {/* Footer: date + actions */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span className="italic">
              {new Date(note.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-lg shadow-md transition transform hover:scale-105"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg shadow-md transition transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Notecard
