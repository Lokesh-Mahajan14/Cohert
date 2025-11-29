import React, { useState } from 'react'
import { Users, UserPlus, UserCheck, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnections
} from '../assets/assets'

function Connection() {
  const [currentTab, setCurrentTab] = useState('Followers')
  const navigate = useNavigate()

  const dataArray = [
    { label: 'Followers', value: followers, icon: Users },
    { label: 'Following', value: following, icon: UserCheck },
    { label: 'Pending', value: pendingConnections, icon: UserPlus },
    { label: 'Connections', value: connections, icon: Users }
  ]

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-6xl mx-auto p-6'>

        {/* PAGE HEADER */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Connections</h1>
          <p className='text-slate-600'>Manage your network and discover new connections</p>
        </div>

        {/* STATS CARDS */}
        <div className='mb-8 flex flex-wrap gap-6'>
          {dataArray.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center justify-center gap-1 border h-20 w-40
                         border-gray-200 bg-white shadow rounded-md'
            >
              <b>{item.value.length}</b>
              <p className='text-slate-600'>{item.label}</p>
            </div>
          ))}
        </div>

        {/* TAB BUTTONS */}
        <div className='inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm'>
          {dataArray.map(tab => (
            <button
              key={tab.label}
              onClick={() => setCurrentTab(tab.label)}
              className={`flex items-center cursor-pointer px-3 py-1 text-sm rounded-md transition-colors
              ${currentTab === tab.label
                  ? 'bg-white font-medium text-black'
                  : 'text-gray-500 hover:text-black'
                }`}
            >
              <tab.icon className='w-4 h-4' />
              <span className='ml-1'>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* USER LIST */}
        <div className='flex flex-wrap gap-6 mt-6'>
          {dataArray
            .find(item => item.label === currentTab)
            .value.map(user => (
              <div
                key={user._id}
                className='w-full max-w-88 bg-white p-4 shadow rounded-lg flex items-start gap-4'
              >
                {/* USER IMAGE */}
                <img
                  src={user.profile_picture}
                  alt=""
                  className='rounded-full w-14 h-14 shadow-md object-cover'
                />

                {/* USER INFO */}
                <div className='flex-1'>
                  <p className='font-medium text-slate-700'>{user.full_name}</p>
                  <p className='text-slate-500 text-sm'>@{user.username}</p>
                  <p className='text-sm text-gray-600'>{user.bio.slice(0, 30)}...</p>

                  {/* ACTION BUTTONS */}
                  <div className='flex max-sm:flex-col gap-2 mt-4'>
                    <button
                      onClick={() => navigate(`/profile/${user._id}`)}
                      className='w-full p-2 text-sm rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600
                                 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white'
                    >
                      View Profile
                    </button>

                    {/* Unfollow */}
                    {currentTab === 'Following' && (
                      <button
                        className='w-full p-2 text-sm rounded-lg bg-gray-200 text-gray-800
                                   hover:bg-gray-300 active:scale-95 transition'
                      >
                        Unfollow
                      </button>
                    )}

                    {/* Accept pending request */}
                    {currentTab === 'Pending' && (
                      <button
                        className='w-full p-2 text-sm rounded-lg bg-green-500 hover:bg-green-600
                                   active:scale-95 transition text-white'
                      >
                        Accept
                      </button>
                    )}

                    {/* Send message to connection */}
                    {currentTab === 'Connections' && (
                      <button
                        onClick={() => navigate(`/message/${user._id}`)}
                        className='w-full p-2 text-sm flex items-center justify-center gap-2 rounded-lg
                                   bg-purple-600 hover:bg-purple-700 active:scale-95 transition text-white'
                      >
                        <MessageSquare size={16} /> Message
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Connection
