"use client";
import {useState} from "react";import {shareLink,deepLink} from "@/lib/telegram";import TgIcon from "./TgIcon";import {ShareI} from "./Icons";
export default function Share({title,price,id}:{title:string;price:string;id:string}){const[m,setM]=useState("");const text=`${title} — ${price}`;
const url=()=>location.origin+"/listings/"+id;
const share=async()=>{try{if(navigator.share){await navigator.share({title:text,url:url()});return}await navigator.clipboard.writeText(url());setM("Link copied")}catch{setM("Could not share")}setTimeout(()=>setM(""),2000)};
const dl=deepLink(id);
return <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
<button className="btn" onClick={share}><ShareI size={18}/>Share listing</button>
<a className="btn tg" target="_blank" rel="noreferrer" href={shareLink("",text)} onClick={e=>{e.currentTarget.href=shareLink(url(),text)}}><TgIcon/>Share on Telegram</a>
{dl&&<a className="btn tg" href={dl}><TgIcon/>Open in Telegram</a>}<span className="muted" role="status">{m}</span></div>}