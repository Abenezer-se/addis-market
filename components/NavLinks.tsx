"use client";
import Link from "next/link";import {usePathname} from "next/navigation";import {useEffect,useLayoutEffect,useRef,useState} from "react";
import {getTelegramMiniAppUrl} from "@/lib/telegram";import {sections} from "@/lib/sections";import TgIcon from "./TgIcon";import TgLink from "./TgLink";import ScrollLink from "./ScrollLink";import FavCount from "./FavCount";import {HomeI,InfoI,GridI,PinI,PlusI,HeartI} from "./Icons";
const icons={home:HomeI,about:InfoI,browse:GridI,location:PinI,sell:PlusI};
function useActive(){const p=usePathname();const[s,setS]=useState("home");
useEffect(()=>{if(p!=="/")return;const els=[...sections.map(x=>x.id),"safety"].map(i=>document.getElementById(i)).filter(Boolean) as HTMLElement[];
const io=new IntersectionObserver(es=>{for(const e of es)if(e.isIntersecting)setS(e.target.id==="safety"?"sell":e.target.id)},{rootMargin:"-40% 0px -55% 0px"});
els.forEach(e=>io.observe(e));return()=>io.disconnect()},[p]);
if(p==="/")return s;if(p.startsWith("/favorites"))return "fav";return p.startsWith("/listings")||p.startsWith("/products")?"browse":""}
export function DesktopNav(){const a=useActive();const nav=sections.filter(x=>x.id!=="sell");
const[h,setH]=useState<string|null>(null);const grp=useRef<HTMLDivElement>(null);const[box,setBox]=useState<{l:number;w:number}|null>(null);
const cur=h??(nav.some(i=>i.id===a)?a:null);
useLayoutEffect(()=>{const measure=()=>{if(!cur||!grp.current)return;const el=grp.current.querySelector<HTMLElement>(`[data-nid="${cur}"]`);if(el)setBox({l:el.offsetLeft,w:el.offsetWidth})};
measure();window.addEventListener("resize",measure);document.fonts?.ready.then(measure);return()=>window.removeEventListener("resize",measure)},[cur]);
return <nav className="dnav" aria-label="Main">
<div className="navgrp" ref={grp} onMouseLeave={()=>setH(null)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setH(null)}}>
{box&&<span className={"ind"+(cur?" show":"")} style={{left:box.l,width:box.w}} aria-hidden="true"/>}
{nav.map(i=><span key={i.id} data-nid={i.id} className={"ni"+(cur===i.id?" cur":"")} onMouseEnter={()=>setH(i.id)} onFocus={()=>setH(i.id)}><ScrollLink to={i.id} className={a===i.id?"on":""} aria-current={a===i.id?"page":undefined}>{i.label}</ScrollLink></span>)}
</div>
<Link href="/favorites" className={"hrt"+(a==="fav"?" on":"")} aria-label="Favorites"><HeartI size={20}/><FavCount/></Link>
<TgLink href={getTelegramMiniAppUrl()} className="btn tg" label="Open Addis Market in Telegram"><TgIcon/>Telegram</TgLink>
<ScrollLink to="sell" className={"btn d"+(a==="sell"?" act":"")} aria-current={a==="sell"?"page":undefined}><PlusI size={18}/>Sell an item</ScrollLink></nav>}
export function BottomNav(){const a=useActive();return <nav className="bnav" aria-label="Mobile">
{sections.map(i=>{const I=icons[i.id];return <ScrollLink key={i.id} to={i.id} className={a===i.id?"on":""} aria-current={a===i.id?"page":undefined}><I size={22}/>{i.label}</ScrollLink>})}</nav>}