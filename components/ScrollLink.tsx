"use client";
import Link from "next/link";import {usePathname} from "next/navigation";
type P={to:string;children:React.ReactNode;className?:string;tabIndex?:number;"aria-label"?:string;"aria-current"?:"page"};
export default function ScrollLink({to,children,className,...rest}:P){
const path=usePathname();const href=to==="home"?"/":`/#${to}`;
const onClick=(e:React.MouseEvent<HTMLAnchorElement>)=>{
if(path!=="/"||e.metaKey||e.ctrlKey||e.shiftKey)return; // other pages: normal navigation to /#section
e.preventDefault();
if(to==="home"){window.scrollTo({top:0,behavior:"smooth"});history.replaceState(null,"","/");return}
const el=document.getElementById(to);if(!el)return;
el.scrollIntoView({behavior:"smooth",block:"start"});history.replaceState(null,"","#"+to)};
return <Link href={href} className={className} onClick={onClick} {...rest}>{children}</Link>}