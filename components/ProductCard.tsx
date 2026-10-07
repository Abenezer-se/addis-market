"use client";
import Link from "next/link";import type {Listing} from "@/types";import {img} from "@/data/listings";import {categories} from "@/data/categories";import {etb,ago} from "@/lib/utils";import Img from "./Img";import FavButton from "./FavButton";import {PinI} from "./Icons";
export default function ProductCard({l,onOpen}:{l:Listing;onOpen?:(l:Listing)=>void}){
const click=(e:React.MouseEvent)=>{if(!onOpen||e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();onOpen(l)};
const cat=categories.find(c=>c.slug===l.category)?.name;
return <article className="card"><Link href={`/listings/${l.id}`} onClick={click} style={{display:"contents"}} aria-label={`${l.title}, ${etb(l.price)}`}>
<div className="ph"><Img src={img(l,0)} alt={l.title}/></div>
<div className="cb">{cat&&<span className="catl">{cat}</span>}<h3>{l.title}</h3><div><span className="pr">{etb(l.price)}</span>{l.negotiable&&<span className="neg">Negotiable</span>}</div>
<span className="meta"><PinI size={14}/>{l.location}, Addis Ababa</span><span className="meta2">{l.condition} · {ago(l.createdAt)}</span></div></Link>
{l.featured&&<span className="badge">Featured</span>}<FavButton id={l.id}/></article>}