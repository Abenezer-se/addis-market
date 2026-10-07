import Link from "next/link";import Hero from "@/components/Hero";import ProductCard from "@/components/ProductCard";import Img from "@/components/Img";import LocationMap from "@/components/LocationMap";import Reveal from "@/components/Reveal";import CountUp from "@/components/CountUp";import CatIcon from "@/components/CatIcon";import TgIcon from "@/components/TgIcon";import TgLink from "@/components/TgLink";import {activeCategories} from "@/data/categories";import {listings} from "@/data/listings";import {getTelegramBotUrl} from "@/lib/telegram";import {formatListings} from "@/lib/utils";

const verified=new Set(listings.filter(l=>l.seller.verified).map(l=>l.seller.name)).size;
// Real counts from your data. A metric that is 0 is not shown.
const stats=[
{value:listings.length,label:"Listings"},
{value:verified,label:"Verified sellers"},
{value:new Set(listings.map(l=>l.location)).size,label:"Areas covered"},
{value:activeCategories.length,label:"Categories"}].filter(s=>s.value>0);
const trust=[{t:"Meet in a public place",d:"Choose a busy, well-lit spot such as a cafe or a mall. Bring a friend if you can."},{t:"Check before you pay",d:"Test the item, check the serial number or IMEI, and ask for receipts or a warranty card."},{t:"Keep the chat in one place",d:"Use Telegram to talk to the seller, and never send money before you have seen the item."}];
const steps=[{n:"1",t:"Send your photos",d:"Take clear photos of the item from a few angles."},{n:"2",t:"Add price and area",d:"Tell us the price in ETB, if it is negotiable, and where you are."},{n:"3",t:"We list it",d:"Your item appears on Addis Market and buyers message you on Telegram."}];
export default function Home(){
const picks=[...listings].sort((a,b)=>Number(!!b.featured)-Number(!!a.featured)||+new Date(b.createdAt)-+new Date(a.createdAt)).slice(0,8);
return <div className="wrap">
<div id="home"><Hero/></div>

<section className="s" id="about"><div className="about">
<div>
<Reveal><span className="eyebrow">About Addis Market</span><h2>Local products. Real people.</h2></Reveal>
<Reveal delay={120}><p className="muted" style={{fontSize:16,marginTop:10}}>Addis Market is a place to buy and sell around Addis Ababa. Every listing shows the price in ETB, whether it is negotiable, and the area the item is in, so you know what you are getting before you message anyone.</p></Reveal>
<Reveal delay={220}><ul className="abl"><li><b>Local.</b> Listings from Bole, Kazanchis, Piassa, Megenagna and more.</li><li><b>Clear.</b> Price, condition and address are on every listing.</li><li><b>Direct.</b> Message the seller on Telegram. No middleman.</li></ul></Reveal>
</div>
<Reveal delay={260}><div className="abimg"><Img src="/about.jpg" alt="Addis Market sellers and buyers in Addis Ababa"/></div></Reveal></div>
<Reveal delay={360}><div className="abst" role="list" aria-label="Addis Market in numbers">{stats.map(s=><div key={s.label} className="abs" role="listitem"><b><CountUp value={s.value}/></b><span>{s.label}</span></div>)}</div></Reveal>
</section>

<section className="s" id="browse"><Reveal><div style={{marginBottom:14}}><span className="eyebrow">Browse</span><h2>Featured products</h2></div>
<div className="cats" style={{marginBottom:18}}>{activeCategories.map(c=><Link key={c.slug} className="cat" href={`/products?cat=${c.slug}`}><CatIcon slug={c.slug}/><span>{c.name}</span><span className="cc">{formatListings(listings.filter(l=>l.category===c.slug).length)}</span></Link>)}</div></Reveal>
<div className="grid">{picks.map((l,i)=><Reveal key={l.id} delay={(i%4)*90}><ProductCard l={l}/></Reveal>)}</div>
<Reveal><div style={{textAlign:"center",marginTop:22}}><Link href="/products" className="btn p">See More</Link></div></Reveal></section>

<section className="s" id="location"><Reveal><div style={{marginBottom:14}}><span className="eyebrow">Location</span><h2>Find products near you</h2><p className="muted" style={{fontSize:15}}>Choose an area to see it on the map and browse what is listed there.</p></div><LocationMap initial="Bole" chips/></Reveal></section>

<section className="s" id="sell"><Reveal><div className="sellbox"><div><span className="eyebrow" style={{color:"var(--gold)"}}>Sell an item</span><h2 style={{color:"#fff"}}>Have something to sell?</h2><p style={{color:"#d8d4cb",maxWidth:460}}>Reach people in your part of Addis Ababa. It takes a few minutes and costs nothing to send us your item.</p><TgLink className="btn tg" href={getTelegramBotUrl("sell")} label="Message the Addis Market bot on Telegram to sell an item"><TgIcon/>Message us on Telegram</TgLink></div>
<ol className="steps">{steps.map(s=><li key={s.n}><span>{s.n}</span><div><b>{s.t}</b><p>{s.d}</p></div></li>)}</ol></div></Reveal></section>

<section className="s" id="safety"><Reveal><div style={{marginBottom:14}}><span className="eyebrow">Safety</span><h2>Buy and sell with confidence</h2></div></Reveal>
<div className="tcards">{trust.map((t,i)=><Reveal key={t.t} delay={i*110}><div className="tcard"><h3>{t.t}</h3><p>{t.d}</p></div></Reveal>)}</div></section>
</div>}