"use client";
import {useEffect,useState} from "react";
import {getTg,getListingWebUrl,getTelegramListingUrl,getTelegramShareUrl} from "@/lib/telegram";
import TgIcon from "./TgIcon";import TgLink from "./TgLink";import {ShareI} from "./Icons";
export default function Share({title,price,id}:{title:string;price:string;id:string}){
const[m,setM]=useState("");const[inTg,setIn]=useState(false);useEffect(()=>setIn(!!getTg()),[]);
const text=`${title} — ${price}`;const web=()=>getListingWebUrl(id);
const flash=(s:string)=>{setM(s);setTimeout(()=>setM(""),2000)};
const share=async()=>{try{if(navigator.share){await navigator.share({title:text,url:web()});return}await navigator.clipboard.writeText(web());flash("Link copied")}catch(e){if((e as Error).name!=="AbortError")flash("Could not share")}};
const tgShare=()=>{const u=getTelegramShareUrl(web(),text);const t=getTg();if(t)t.openTelegramLink(u);else window.open(u,"_blank","noopener,noreferrer")};
return <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
<button className="btn" onClick={share}><ShareI size={18}/>Share listing</button>
<button className="btn tg" onClick={tgShare}><TgIcon/>Share on Telegram</button>
{inTg
?<button className="btn" onClick={()=>getTg()?.openLink(web())}>Open on website</button>
:<TgLink href={getTelegramListingUrl(id)} className="btn tg" label="Open this listing in the Addis Market Telegram app"><TgIcon/>Open in Telegram</TgLink>}
<span className="muted" role="status">{m}</span></div>}