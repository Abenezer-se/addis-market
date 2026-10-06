"use client";
import {useEffect,useRef,useState} from "react";
export default function Reveal({children,delay=0,className=""}:{children:React.ReactNode;delay?:number;className?:string}){
const r=useRef<HTMLDivElement>(null);const[on,setOn]=useState(false);
useEffect(()=>{const el=r.current;if(!el)return;if(typeof IntersectionObserver==="undefined"){setOn(true);return}
const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){setOn(true);io.disconnect()}},{threshold:0.12,rootMargin:"0px 0px -6% 0px"});io.observe(el);return()=>io.disconnect()},[]);
return <div ref={r} className={`rv${on?" in":""} ${className}`} style={{transitionDelay:on?`${delay}ms`:"0ms"}}>{children}</div>}