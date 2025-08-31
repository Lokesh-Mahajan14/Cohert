import React, {useState} from 'react'
export default function Counter() {
    const[count,setCount]=useState(0);
    const increaseCount=()=>{
        setCount(count+1);
    }
  return (
    <div>
        {count}
        <button onClick={increaseCount}>Increase</button>
    </div>
  )
}
