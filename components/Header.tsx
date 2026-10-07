import {Suspense} from "react";import Link from "next/link";import Logo from "./Logo";import {DesktopNav,BottomNav} from "./NavLinks";import TgIcon from "./TgIcon";import TgLink from "./TgLink";import FavCount from "./FavCount";import {SearchI,HeartI} from "./Icons";import {getTelegramMiniAppUrl} from "@/lib/telegram";
export default function Header(){return <><header className="hdr"><div className="wrap in"><Logo/>
<Link href="/favorites" className="hrtm" aria-label="Favorites"><HeartI size={20}/><FavCount/></Link>
<TgLink className="tgicon" href={getTelegramMiniAppUrl()} label="Open Addis Market in Telegram"><TgIcon size={22}/></TgLink>
<form className="search" action="/listings" role="search"><span className="si" aria-hidden="true"><SearchI size={18}/></span><input name="q" placeholder="Search phones, furniture, fashion..." aria-label="Search listings"/><button className="sb">Search</button></form>
<Suspense fallback={null}><DesktopNav/></Suspense></div></header>
<Suspense fallback={null}><BottomNav/></Suspense></>}