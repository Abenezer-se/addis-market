"use client";
import {useEffect,useRef} from "react";import Link from "next/link";import type {Listing} from "@/types";import {img} from "@/data/listings";import {etb,ago} from "@/lib/utils";import Gallery from "./Gallery";import Share from "./Share";import MessageSeller from "./MessageSeller";
export default function SpecDrawer({l,onClose}:{l:Listing;onClose:()=>void}){
const btn=useRef<HTMLButtonElement>(null);const cl=useRef(onClose);cl.current=onClose;
useEffect(()=>{const k=(e:KeyboardEvent)=>{if(e.key==="Escape")cl.current()};document.addEventListener("keydown",k);const o=document.body.style.overflow;document.body.style.overflow="hidden";btn.current?.focus();return()=>{document.removeEventListener("keydown",k);document.body.style.overflow=o}},[l.id]);
const srcs=Array.from({length:l.imageCount},(_,i)=>img(l,i));
const specs:Record<string,string>={Condition:l.condition,...l.specs,Location:l.location,Address:l.address,Posted:new Date(l.createdAt).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})};
return <div className="ovl" onClick={onClose}><aside className="drw" role="dialog" aria-modal="true" aria-label={`${l.title} details`} onClick={e=>e.stopPropagation()}>
<div className="drh"><b>Product details</b><button ref={btn} className="drx" onClick={onClose} aria-label="Close details">✕</button></div>
<div className="drb"><Gallery key={l.id} srcs={srcs} alt={l.title}/>
<h2 style={{fontSize:24,marginTop:14}}>{l.title}</h2>
<p style={{margin:"8px 0 0"}}><span className="pr" style={{fontSize:24}}>{etb(l.price)}</span>{l.negotiable?<span className="neg" style={{fontSize:13}}>Negotiable</span>:<span className="muted" style={{marginLeft:8}}>Fixed price</span>}</p>
<p className="muted">{l.condition} · 📍 {l.address}, Addis Ababa · Posted {ago(l.createdAt)}</p>
<div className="box" style={{marginTop:14}}><h3 style={{marginBottom:6}}>Specifications</h3><table><tbody>{Object.entries(specs).map(([k,v])=><tr key={k}><td>{k}</td><td>{v}</td></tr>)}</tbody></table></div>
<div className="box"><h3 style={{marginBottom:6}}>Description</h3><p style={{margin:0}}>{l.description}</p></div>
<div className="box" style={{display:"flex",gap:12,alignItems:"center"}}><div className="av">{l.seller.name[0]}</div><div><b>{l.seller.name}</b>{l.seller.verified&&<span style={{color:"var(--green)",fontSize:13,marginLeft:6}}>✓ Verified seller</span>}<div className="muted">Member since {l.seller.since}</div></div></div>
<Share title={l.title} price={etb(l.price)} id={l.id}/></div>
<div className="drf"><MessageSeller id={l.id} seller={l.seller.telegram} style={{flex:1}}/><Link className="btn" href={`/listings/${l.id}`}>Full page</Link></div>
</aside></div>}