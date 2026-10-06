"use client";
import {useEffect,useState} from "react";
const K="am_favs";
export const readFavs=():string[]=>{try{const v=JSON.parse(localStorage.getItem(K)||"[]");return Array.isArray(v)?v.filter(x=>typeof x==="string"):[]}catch{return[]}};
export const writeFavs=(f:string[])=>{try{localStorage.setItem(K,JSON.stringify(f))}catch{}window.dispatchEvent(new Event("am-favs"))};
export default function FavButton({id}:{id:string}){const[on,setOn]=useState(false);useEffect(()=>setOn(readFavs().includes(id)),[id]);
const t=()=>{const f=readFavs();const n=f.includes(id)?f.filter(x=>x!==id):[...f,id];writeFavs(n);setOn(n.includes(id))};
return <button className={"fav"+(on?" on":"")} aria-pressed={on} aria-label={on?"Remove from favorites":"Save to favorites"} onClick={e=>{e.preventDefault();e.stopPropagation();t()}}>{on?"♥":"♡"}</button>}