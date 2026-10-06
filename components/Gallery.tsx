"use client";
import {useState} from "react";import Img from "./Img";
export default function Gallery({srcs,alt}:{srcs:string[];alt:string}){const[i,setI]=useState(0);const go=(d:number)=>setI((i+d+srcs.length)%srcs.length);
return <div><div className="mainimg"><Img key={srcs[i]} src={srcs[i]} alt={`${alt} — photo ${i+1}`} eager/>
{srcs.length>1&&<><button className="arr" style={{left:8}} aria-label="Previous photo" onClick={()=>go(-1)}>‹</button><button className="arr" style={{right:8}} aria-label="Next photo" onClick={()=>go(1)}>›</button></>}
<span className="chip" style={{position:"absolute",bottom:10,right:10,background:"#171a1fcc",color:"#fff"}}>{i+1} / {srcs.length}</span></div>
{srcs.length>1&&<div className="th">{srcs.map((s,k)=><button key={s} className={k===i?"on":""} aria-label={`Show photo ${k+1}`} onClick={()=>setI(k)}><Img src={s} alt=""/></button>)}</div>}</div>}
