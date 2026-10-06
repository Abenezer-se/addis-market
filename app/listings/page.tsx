import Link from "next/link";import Hero from "@/components/Hero";import ProductCard from "@/components/ProductCard";import Img from "@/components/Img";import LocationMap from "@/components/LocationMap";import TgIcon from "@/components/TgIcon";import {categories} from "@/data/categories";import {listings} from "@/data/listings";import {botUrl} from "@/lib/telegram";
export default function Home(){
const picks=[...listings].sort((a,b)=>Number(!!b.featured)-Number(!!a.featured)||+new Date(b.createdAt)-+new Date(a.createdAt)).slice(0,8);
return <div className="wrap">
<div id="home"><Hero/></div>

<section className="s" id="about"><div className="about">
<div><span className="eyebrow">About Addis Market</span><h2>Local products. Real people.</h2>
<p className="muted" style={{margin:"14px 0 0",display:"flex",gap:16,flexWrap:"wrap"}}><Link href="/#browse">← Back to Browse</Link><Link href="/listings">All listings</Link></p>
<ul className="abl"><li><b>Local.</b> Listings from Bole, Kazanchis, Piassa, Megenagna and more.</li><li><b>Clear.</b> Price, condition and address are on every listing.</li><li><b>Direct.</b> Message the seller on Telegram. No middleman.</li></ul></div>
<div className="abimg"><Img src="/about.jpg" alt="Addis Market sellers and buyers in Addis Ababa"/></div></div></section>

<section className="s" id="browse"><div style={{marginBottom:14}}><span className="eyebrow">Browse</span><h2>Featured products</h2></div>
<div className="cats" style={{marginBottom:18}}>{categories.map(c=><Link key={c.slug} className="cat" href={`/listings?cat=${c.slug}`}><i>{c.a}</i><span>{c.name}<br/><span className="muted">{listings.filter(l=>l.category===c.slug).length} listings</span></span></Link>)}</div>
<div className="grid">{picks.map(l=><ProductCard key={l.id} l={l}/>)}</div>
<div style={{textAlign:"center",marginTop:22}}><Link href="/listings" className="btn p">See More</Link></div></section>

<section className="s" id="location"><div style={{marginBottom:14}}><span className="eyebrow">Location</span><h2>Find products near you</h2><p className="muted" style={{fontSize:15}}>Choose an area to see it on the map and browse what is listed there.</p></div><LocationMap initial="Bole" chips/></section>

<section className="s" style={{display:"grid",gap:14,gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))"}}>
<div className="cta" id="sell"><h2>Sell an item</h2><p>Have something to sell? Send the photos, price and your area on Telegram and we will list it.</p><a className="btn tg" href={botUrl} target="_blank" rel="noreferrer"><TgIcon/>Message us on Telegram</a></div>
<div className="cta" id="safety" style={{background:"var(--sand)",color:"var(--ink)"}}><h2>Stay safe</h2><p style={{color:"var(--slate)"}}>Meet in public places and check the product before you pay.</p></div></section>
</div>}