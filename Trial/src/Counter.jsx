import React, { useState } from 'react';




const Counter = () => {
    const [count, setCount] = useState(0);


    const increaseCount = () => {
        setCount(count + 1);
    };


    const decreaseCount = () => {
        setCount(count - 1);
    };


    return (
        <div className="text-center mt-5">
            <h1 className="text-2xl font-bold">Counter: {count} </h1>
            <button onClick={increaseCount} className="mx-2 px-4 py-2 bg-blue-500 text-white rounded">Increase</button>
            <button onClick={decreaseCount} className="mx-2 px-4 py-2 bg-red-500 text-white rounded">Decrease</button>


        </div>
    );
};


export default Counter;