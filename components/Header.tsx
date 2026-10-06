import {Suspense} from "react";import Link from "next/link";import Logo from "./Logo";import {DesktopNav,BottomNav} from "./NavLinks";import TgIcon from "./TgIcon";import {SearchI,HeartI} from "./Icons";import {botUrl} from "@/lib/telegram";
export default function Header(){return <><header className="hdr"><div className="wrap in"><Logo/>
<Link href="/favorites" className="hrtm" aria-label="Favorites"></Link>
<a className="tgicon" href={botUrl} target="_blank" rel="noreferrer" aria-label="Open Addis Market on Telegram"><TgIcon size={22}/></a>
<form className="search" action="/listings" role="search"><input name="q" placeholder="Search phones, furniture, fashion..." aria-label="Search listings"/><button aria-label="Search"><SearchI size={18}/><span className="txt">Search</span></button></form>
<Suspense fallback={null}><DesktopNav/></Suspense></div></header>
<Suspense fallback={null}><BottomNav/></Suspense></>}