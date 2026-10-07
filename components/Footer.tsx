import Link from "next/link";import Logo from "./Logo";import ScrollLink from "./ScrollLink";import TgIcon from "./TgIcon";import TgLink from "./TgLink";import {PinI} from "./Icons";import {getTelegramBotUrl,getTelegramMiniAppUrl,TELEGRAM_CHANNEL_URL} from "@/lib/telegram";import {categories} from "@/data/categories";
export default function Footer(){return <footer className="foot"><div className="wrap">
<div className="fg">
<div className="fbrand"><Logo dark/><p>Local products. Real people. Simple buying. Addis Market connects buyers and sellers across Addis Ababa.</p>
{TELEGRAM_CHANNEL_URL
?<TgLink href={TELEGRAM_CHANNEL_URL} className="btn tg" label="Join the Addis Market community on Telegram"><TgIcon/>Join us on Telegram</TgLink>
:<TgLink href={getTelegramMiniAppUrl()} className="btn tg" label="Open Addis Market in Telegram"><TgIcon/>Open in Telegram</TgLink>}</div>
<div><h4>Explore</h4><ScrollLink to="home">Home</ScrollLink><ScrollLink to="about">About</ScrollLink><ScrollLink to="browse">Browse</ScrollLink><ScrollLink to="browse">Browse nearby</ScrollLink><ScrollLink to="location">Location</ScrollLink></div>
<div><h4>Categories</h4>{categories.map(c=><Link key={c.slug} href={`/products?cat=${c.slug}`}>{c.name}</Link>)}</div>
<div><h4>Sell &amp; Support</h4><ScrollLink to="sell">Sell an item</ScrollLink><ScrollLink to="safety">Safety tips</ScrollLink><TgLink href={getTelegramBotUrl("help")} label="Get help from the Addis Market bot on Telegram">Help on Telegram</TgLink></div>
<div><h4>Visit</h4><p className="fl"><PinI size={16}/>Addis Ababa, Ethiopia</p><ScrollLink to="location">Find us on the map</ScrollLink></div>
</div>
<div className="fbar"><span>© 2026 Addis Market. All rights reserved.</span><span>Made in Addis Ababa</span></div></div></footer>}