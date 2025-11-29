import React, { useEffect, useState } from 'react'
import {  dummyRecentMessagesData } from '../assets/assets'
import {Link} from 'react-router-dom'
import moment from 'moment'

function RecentMessages() {
    const [messages,setMessages]=useState([])
    const fetchRecentMessages=()=>{
        setMessages(dummyRecentMessagesData)
    }

    useEffect(()=>{
        fetchRecentMessages()
    },[])

  return (
    <div className='bg-white max-w-xs mt-4 p-4 mn-h-20 rounded-md shadow test-xs text-shadow-slate-800'>
        <h3 className='font-semibold test-slate-8 mb-4'>Recent Messages</h3>
        <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
          {
            messages.map((messages,index)=>(
              <Link to={`/messages/${messages.from_user_id}`} key={index} className='flex items-start gap-2 py-2 hover:bg-slate-100'>
                <img src={messages.from_user_id.profile_picture} className='w-8 h-8 rounded-full'/>
                <div className='w-full'>
                  <div className='flex justify-between'>
                    <p className='font-medium'>{messages.from_user_id.full_name}</p>
                    <p className='text-[10px] text-slate-400'>{moment(messages.createdAt).fromNow()}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-gray-500'>{messages.text?messages.text:'Media'}</p>
                    {
                      !messages.seen && <p className='bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]'>1</p>
                    }

                  </div>
                </div>
              </Link>
            ))
          }
        </div>

    </div>
  )
}

export default RecentMessages