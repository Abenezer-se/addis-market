"use client";
import {useEffect,useState} from "react";
import {getTg,getTelegramListingUrl,getTelegramSellerUrl} from "@/lib/telegram";
import TgIcon from "./TgIcon";import TgLink from "./TgLink";
// Website: opens the Mini App on THIS listing (startapp=<id>). Inside Telegram: opens the seller's chat.
export default function MessageSeller({id,seller,label="Message seller",className="btn tg",style}:{id:string;seller:string;label?:string;className?:string;style?:React.CSSProperties}){
const[inTg,setIn]=useState(false);useEffect(()=>setIn(!!getTg()),[]);
const href=inTg?getTelegramSellerUrl(seller):getTelegramListingUrl(id);
return <TgLink href={href} className={className} style={style} label={inTg?"Message the seller on Telegram":"Open this listing in Telegram to message the seller"}><TgIcon size={20}/>{label}</TgLink>}