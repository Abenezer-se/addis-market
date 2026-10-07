"use client";
import {getTg} from "@/lib/telegram";
// Inside Telegram, t.me links open natively (no browser hop). In a normal browser it is a plain link.
export default function TgLink({href,children,className,label,style}:{href:string;children:React.ReactNode;className?:string;label:string;style?:React.CSSProperties}){
return <a href={href} className={className} style={style} aria-label={label} target="_blank" rel="noreferrer"
onClick={e=>{const t=getTg();if(t&&/^https:\/\/t\.me\//.test(href)){e.preventDefault();t.openTelegramLink(href)}}}>{children}</a>}