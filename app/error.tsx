"use client";
export default function E({reset}:{reset:()=>void}){return <div className="wrap empty"><h1>Something went wrong</h1><button className="btn p" onClick={reset}>Try again</button></div>}
