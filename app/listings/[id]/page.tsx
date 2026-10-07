import {notFound} from "next/navigation";import Link from "next/link";import type {Metadata} from "next";
import {listings,byId,img} from "@/data/listings";import {etb,ago} from "@/lib/utils";import Gallery from "@/components/Gallery";import Share from "@/components/Share";import ProductCard from "@/components/ProductCard";import FavButton from "@/components/FavButton";import {TgMainButton} from "@/components/TelegramBridge";import MessageSeller from "@/components/MessageSeller";import LocationMap from "@/components/LocationMap";
type P={params:Promise<{id:string}>};
export const generateStaticParams=()=>listings.map(l=>({id:l.id}));
export async function generateMetadata({params}:P):Promise<Metadata>{const {id}=await params;const l=byId(decodeURIComponent(id));if(!l)return{title:"Listing not found — Addis Market"};const d=`View this ${l.title} listing in ${l.location}, Addis Ababa on Addis Market.`;return{title:`${l.title} — Addis Market`,description:d,openGraph:{title:`${l.title} — ${etb(l.price)}`,description:d,images:[img(l,0)],url:`/listings/${l.id}`}}}
export default async function Detail({params}:P){const {id}=await params;const l=byId(decodeURIComponent(id));if(!l)notFound();
const srcs=Array.from({length:l.imageCount},(_,i)=>img(l,i));const rel=listings.filter(x=>x.category===l.category&&x.id!==l.id).slice(0,4);
const specs={Condition:l.condition,...l.specs,Location:l.location,Posted:new Date(l.createdAt).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})};
return <div className="wrap"><p className="muted" style={{margin:"14px 0 0",display:"flex",gap:16,flexWrap:"wrap"}}><Link href="/#browse">← Back to Browse</Link><Link href="/products">All products</Link></p>
<div className="det"><div><Gallery srcs={srcs} alt={l.title}/></div>
<div><h1 style={{fontSize:28}}>{l.title}</h1><p style={{margin:"10px 0 0"}}><span className="pr" style={{fontSize:28}}>{etb(l.price)}</span>{l.negotiable?<span className="neg" style={{fontSize:14}}>Negotiable</span>:<span className="muted" style={{marginLeft:8}}>Fixed price</span>}</p>
<p className="muted">{l.condition} · 📍 {l.address}, Addis Ababa · Posted {ago(l.createdAt)}</p>
<div className="box" style={{display:"flex",gap:12,alignItems:"center",marginTop:14}}><div className="av">{l.seller.name[0]}</div><div style={{flex:1}}><b>{l.seller.name}</b>{l.seller.verified&&<span style={{color:"var(--green)",fontSize:13,marginLeft:6}}>✓ Verified seller</span>}<div className="muted">Member since {l.seller.since} · Addis Ababa</div></div><FavButtonInline id={l.id}/></div>
<MessageSeller id={l.id} seller={l.seller.telegram} label="Message seller on Telegram" style={{width:"100%"}}/>
<p className="muted" style={{margin:"6px 0 0",fontSize:12}}>On the website this opens the listing in the Addis Market Telegram app, where you can message the seller.</p>
<div style={{marginTop:12}}><Share title={l.title} price={etb(l.price)} id={l.id}/></div></div></div>
<div className="det"><div><div className="box"><h2>Description</h2><p>{l.description}</p></div></div><div><div className="box"><h2 style={{marginBottom:8}}>Specifications</h2><table><tbody>{Object.entries(specs).map(([k,v])=><tr key={k}><td>{k}</td><td>{v}</td></tr>)}</tbody></table></div><div className="safe"><b>Stay safe.</b> Meet in public places and check the product before you pay.</div></div></div>
<section className="s"><h2 style={{marginBottom:6}}>Location</h2><p className="muted" style={{margin:"0 0 12px"}}>{l.address}, Addis Ababa</p><LocationMap initial={l.location}/></section>
{rel.length>0&&<section className="s"><h2 style={{marginBottom:14}}>You may also like</h2><div className="grid">{rel.map(x=><ProductCard key={x.id} l={x}/>)}</div></section>}
<div className="sticky"><MessageSeller id={l.id} seller={l.seller.telegram} label="Message seller" style={{flex:1}}/></div>
<TgMainButton text="Message Seller" seller={l.seller.telegram}/></div>}
function FavButtonInline({id}:{id:string}){return <span style={{position:"relative",width:36,height:36}}><FavButton id={id}/></span>}