import React from 'react'

export default function Button(props) {
  return (
    <div>
        <button className='bg-red-400 border-2 p-4 rounded-xl'>{props.name}</button>

    </div>
  )
}
