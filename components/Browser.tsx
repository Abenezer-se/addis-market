"use client";
import {useEffect,useMemo,useState} from "react";import {useRouter,usePathname,useSearchParams} from "next/navigation";
import {listings} from "@/data/listings";import {categories,activeCategories,locations} from "@/data/categories";import {matchesQuery} from "@/lib/search";import ProductCard from "./ProductCard";import SpecDrawer from "./SpecDrawer";import {readFavs} from "./FavButton";
export default function Browser({title,showAll=false}:{title?:string;showAll?:boolean}){const sp=useSearchParams(),r=useRouter(),path=usePathname();
const PAGE=showAll?100000:8;
const q=sp.get("q")||"",cat=sp.get("cat")||"",loc=sp.get("loc")||"",cond=sp.get("cond")||"",sort=sp.get("sort")||"new",max=Number(sp.get("max"))||0,fav=sp.get("fav")==="1",item=sp.get("item")||"";
const[n,setN]=useState(PAGE);const[favs,setFavs]=useState<string[]>([]);useEffect(()=>setFavs(readFavs()),[]);
const fkey=[q,cat,loc,cond,max,sort,fav].join("|");useEffect(()=>setN(PAGE),[fkey,PAGE]); // opening a product does NOT reset "See more"
const set=(k:string,v:string)=>{const p=new URLSearchParams(sp.toString());v?p.set(k,v):p.delete(k);r.replace(`${path}?${p.toString()}`,{scroll:false})};
// live search: results update ~0.25s after you stop typing; Enter searches immediately
const[text,setText]=useState(q);
useEffect(()=>setText(q),[q]);
useEffect(()=>{if(text.trim()===q)return;const t=setTimeout(()=>set("q",text.trim()),250);return()=>clearTimeout(t)},[text]);// eslint-disable-line react-hooks/exhaustive-deps
const res=useMemo(()=>{let a=listings.filter(l=>matchesQuery(l,q)&&(!cat||l.category===cat)&&(!loc||l.location===loc)&&(!cond||l.condition.startsWith(cond))&&(!max||l.price<=max)&&(!fav||favs.includes(l.id)));
a=[...a].sort((x,y)=>sort==="low"?x.price-y.price:sort==="high"?y.price-x.price:sort==="old"?+new Date(x.createdAt)-+new Date(y.createdAt):+new Date(y.createdAt)-+new Date(x.createdAt));return a},[q,cat,loc,cond,max,sort,fav,favs]);
const sel=listings.find(l=>l.id===item);
const chips=[q&&`“${q}”`,cat&&categories.find(c=>c.slug===cat)?.name,loc,cond,max&&`≤ ETB ${max.toLocaleString()}`,fav&&"Favorites"].filter(Boolean);
return <><h1 style={{fontSize:28}}>{fav?"Your favorites":(title||"Browse listings")}</h1><p className="muted">{res.length} result{res.length===1?"":"s"}{q?` for “${q}”`:""}</p>
<div className="fb" role="search"><input type="search" value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")set("q",text.trim())}} placeholder="Search name, category, area…" aria-label="Search listings"/>
<select aria-label="Category" value={cat} onChange={e=>set("cat",e.target.value)}><option value="">All categories</option>{activeCategories.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select>
<select aria-label="Location" value={loc} onChange={e=>set("loc",e.target.value)}><option value="">All areas</option>{locations.map(l=><option key={l}>{l}</option>)}</select>
<select aria-label="Condition" value={cond} onChange={e=>set("cond",e.target.value)}><option value="">Any condition</option><option>New</option><option>Used</option></select>
<select aria-label="Max price" value={max||""} onChange={e=>set("max",e.target.value)}><option value="">Any price</option>{[5000,10000,25000,50000].map(m=><option key={m} value={m}>Up to ETB {m.toLocaleString()}</option>)}</select>
<select aria-label="Sort" value={sort} onChange={e=>set("sort",e.target.value)}><option value="new">Newest</option><option value="old">Oldest</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></div>
{chips.length>0&&<div className="fb">{chips.map((c,i)=><span key={i} className="chip">{c}</span>)}<button className="btn" style={{padding:"4px 12px"}} onClick={()=>{setText("");r.replace(path)}}>Clear all filters</button></div>}
{res.length===0?<div className="empty"><h2>{q?`No results for “${q}”`:"No listings found"}</h2><p className="muted">Check the spelling, try a shorter word, or remove some filters.</p><button className="btn p" onClick={()=>{setText("");r.replace(path)}}>Clear filters</button></div>
:<><div className="grid">{res.slice(0,n).map(l=><ProductCard key={l.id} l={l} onOpen={x=>set("item",x.id)}/>)}</div>{n<res.length&&<div style={{textAlign:"center",margin:"24px 0"}}><button className="btn" onClick={()=>setN(n+PAGE)}>See more</button></div>}</>}
{sel&&<SpecDrawer l={sel} onClose={()=>set("item","")}/>}</>}