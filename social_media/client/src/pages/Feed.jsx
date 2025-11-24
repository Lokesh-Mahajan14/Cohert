import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'
import PostCard from '../components/PostCard'

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
      <div>
        <div>
          <h1>
            Sponsered
          </h1>
        </div>
        <h1>
          Recent Message
        </h1>
      </div>
    </div>
  ):<Loading/>
}

export default Feed