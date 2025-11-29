import { Calendar, MapPin, PenBox, Verified } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function UserProfileInfo({ user, posts, profileId, setShowEdit }) {
  return (
    <div className="relative px-4 md:px-8 pb-6 bg-white">

      {/* Profile Image */}
      <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg absolute -top-16 left-4 md:left-8 overflow-hidden z-[10]">
        <img
          src={user.profile_picture}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* INFORMATION BLOCK */}
      <div className="pt-20 md:pt-10 md:pl-40">
        <div className="flex flex-col md:flex-row items-start justify-between gap-2">

          {/* Name + Verified */}
          <div>
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-900">
                {user.full_name}
                
                </h1>
                    <Verified className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-gray-600">
                    {user.username ? `@${user.username}` : 'Add a username'}
            </p>

          </div>
          

          {/* Username */}
         
          <div>
            {
            !profileId && 
            <button onClick={() => setShowEdit(true)} className='flex items-center cursor-pointer gap-2'>
                <PenBox className='w-4 h-4'/>Edit
            </button>

            }
          </div>
        </div>
        

        {/* BIO */}
        {user.bio && (
          <p className="mt-2 text-gray-700">
            {user.bio}
          </p>
        )}
        <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mt-4'>
            <span className='flex items-center gap-1.5'>
                <MapPin className='w-4 h-4'/>
                {user.location ? user.location:'Add location'}

            </span>
            <span className='flex items-center gap-1.5'>
                <Calendar className='w-4 h-4'/>
                    Joined {moment(user.createdAt).fromNow()}
            </span>
        </div>

        <div className='flex items-center gap-6 mt-6 border-t border-gray-200 pt-4'>
            <div >
                <span className='sm:text-xl font-bold text-gray-900'>{posts.length}</span>
                <span className='sm:text-sm text-xs ml-1.5 text-gray-500'>Posts</span>
            </div>
            <div>
                <span className='sm:text-xl font-bold text-gray-900'>{user.followers.length}</span>
                <span className='sm:text-sm text-xs ml-1.5 text-gray-500'>Followers</span>

            </div>
            <div>
                <span className='sm:text-xl font-bold text-gray-900'>{user.following.length}</span>
                <span className='sm:text-sm text-xs ml-1.5 text-gray-500'>Following</span>

            </div>

        </div>

    
                
      </div>
    </div>
  )
}

export default UserProfileInfo
