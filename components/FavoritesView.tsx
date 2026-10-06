"use client";
import {useEffect,useState} from "react";import Link from "next/link";import {listings} from "@/data/listings";import ProductCard from "./ProductCard";import {readFavs,writeFavs} from "./FavButton";
export default function FavoritesView(){const[ids,setIds]=useState<string[]|null>(null);
useEffect(()=>{const f=()=>setIds(readFavs());f();window.addEventListener("am-favs",f);window.addEventListener("storage",f);return()=>{window.removeEventListener("am-favs",f);window.removeEventListener("storage",f)}},[]);
if(ids===null)return <p className="muted">Loading your favorites…</p>;
const items=ids.map(i=>listings.find(l=>l.id===i)).filter((l):l is NonNullable<typeof l>=>Boolean(l));
return <><div style={{display:"flex",justifyContent:"space-between",alignItems:"end",gap:12,flexWrap:"wrap"}}><div><h1 style={{fontSize:28}}>Your favorites</h1><p className="muted">{items.length} saved product{items.length===1?"":"s"}. Saved on this device only.</p></div>
{items.length>0&&<button className="btn" onClick={()=>writeFavs([])}>Clear all</button>}</div>
{items.length===0?<div className="empty"><h2>No favorites yet</h2><p className="muted">Tap the heart on any product to save it here.</p><Link href="/products" className="btn p">Browse products</Link></div>
:<div className="grid" style={{marginTop:16}}>{items.map(l=><ProductCard key={l.id} l={l}/>)}</div>}</>}