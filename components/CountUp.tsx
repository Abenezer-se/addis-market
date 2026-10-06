"use client";
import {useEffect,useRef,useState} from "react";
export default function CountUp({value,suffix="+",duration=1600}:{value:number;suffix?:string;duration?:number}){
const ref=useRef<HTMLSpanElement>(null);const[n,setN]=useState(0);
useEffect(()=>{const el=ref.current;if(!el)return;
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(reduce||typeof IntersectionObserver==="undefined"){setN(value);return}
let raf=0,t=0;
const run=()=>{const s=performance.now();const step=(now:number)=>{const p=Math.min((now-s)/duration,1);setN(Math.round(value*(1-Math.pow(1-p,3))));if(p<1)raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step)};
const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();t=window.setTimeout(run,250)}},{threshold:0.6}); // runs once
io.observe(el);return()=>{io.disconnect();clearTimeout(t);cancelAnimationFrame(raf)}},[value,duration]);
return <span ref={ref}><span aria-hidden="true">{n.toLocaleString("en-US")}<em>{suffix}</em></span><span className="sr">{value.toLocaleString("en-US")}{suffix}</span></span>}