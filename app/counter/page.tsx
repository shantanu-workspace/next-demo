"use client";
import { useState } from "react";


export default function CounterPage() {
    const [count , setCount] = useState(0);

    return (
        <div>
            <h1>Count : {count}</h1>
            <button onClick={() => setCount(count + 1)}>
                INCREMENT
            </button>
        </div>
    );
}