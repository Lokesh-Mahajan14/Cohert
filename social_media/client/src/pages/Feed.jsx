import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'
import PostCard from '../components/PostCard'
import RecentMessages from '../components/RecentMessages'

function Feed() {
  const [feeds ,setFeeds]=useState([])
  const[loading,setLoading]=useState(true)
  const fetchfeeds=async()=>{
    setFeeds(dummyPostsData)
    setLoading(false)
  }
  useEffect(()=>{
    fetchfeeds()

  },[])
  return !loading ?(
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      <div>
        <StoriesBar/>
        <div className='p-4 space-y-6'>
          List of Post
          {
            feeds.map((post)=>(
              <PostCard key={post._id} post={post}/>
            ))
          }
          
        </div>
      </div>
      <div className='max-xl:hidden sticky top-0'>
        <div className='max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>
          <h3 className='text-slate-800 font-semibold'>
            Sponsered
          </h3>
          <img src={assets.sponsored_img} className='w-75 h-55 rounded-mg '/>
          <p className='text-slate-600'>Email Marketing</p>
          <p className='text-slate-400'>Supercharge your market</p>
        </div>
        <RecentMessages/>
      </div>
    </div>
  ):<Loading/>
}

export default Feed