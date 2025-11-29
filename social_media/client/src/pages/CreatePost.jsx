import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { X, Image as ImageIcon } from 'lucide-react'

function CreatePost() {
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const user = dummyUserData

  const handleSubmit=async()=>{

  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <div className='max-w-6xl mx-auto p-6'>
        
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Create Post</h1>
          <p className='text-slate-600'>Share your thoughts with the world</p>
        </div>

        {/* Post Box */}
        <div className='max-w-xl bg-white rounded-xl p-4 sm:p-8 shadow-md space-y-4'>
          
          {/* User Info */}
          <div className='flex items-center gap-3'>
            <img src={user.profile_picture} className='w-12 h-12 rounded-full shadow' alt="" />
            <div>
              <h2 className='font-semibold'>{user.full_name}</h2>
              <p className='text-sm text-gray-500'>@{user.username}</p>
            </div>
          </div>

          {/* Content Input */}
          <textarea
            className='w-full resize-none max-h-20 mt-4 text-sm outline-none placeholder-gray-400'
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Image Preview */}
          {images.length > 0 && (
            <div className='flex gap-2 flex-wrap'>
              {images.map((image, i) => (
                <div key={i} className='relative group'>
                  <img
                    src={URL.createObjectURL(image)}
                    className='h-20 rounded-md object-cover'
                    alt=""
                  />
                  <div
                    onClick={() =>
                      setImages(images.filter((_, index) => index !== i))
                    }
                    className='absolute hidden group-hover:flex justify-center items-center 
                               top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer'
                  >
                    <X className='w-6 h-6 text-white' />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className='flex items-center justify-between pt-3 border-t border-gray-300'>

            {/* Image Upload Button */}
            <label
              htmlFor="images"
              className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700 cursor-pointer'
            >
              <ImageIcon className="size-6" />
              Add Image
            </label>

            <input
              type="file"
              id="images"
              className='hidden'
              accept="image/*"
              multiple
              onChange={(e) => setImages([...images, ...e.target.files])}
            />

            {/* Publish Post Button */}
            <button disabled={loading} onClick={()=> toast.promise(
              handleSubmit(),
              {
                loading:"uploading...",
                success:<p>Post Added</p>,
                error:<p>Post Not Added</p>,
              }
            )}  className='p-2 text-sm rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600
                               hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white'>
              Publish Post
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CreatePost
