"use client";
import {useEffect} from "react";import {usePathname,useRouter} from "next/navigation";import {getTg,parseStartParam,getTelegramSellerUrl} from "@/lib/telegram";import {byId} from "@/data/listings";
export default function TelegramBridge(){const p=usePathname(),r=useRouter();
// Init once. Deep link: ?startapp=<listing-id> opens that listing; an unknown/invalid id just stays on the home page.
useEffect(()=>{const t=getTg();if(!t)return;t.ready();t.expand();
try{t.setHeaderColor?.("#FAF8F3");t.setBackgroundColor?.("#FAF8F3")}catch{}
const id=parseStartParam(t.initDataUnsafe?.start_param);
if(id&&byId(id)&&window.location.pathname==="/")r.replace(`/listings/${encodeURIComponent(id)}`)},[]);// eslint-disable-line react-hooks/exhaustive-deps
// Telegram's native Back Button on inner pages
useEffect(()=>{const t=getTg();if(!t)return;const b=()=>{if(window.history.length>1)r.back();else r.push("/")};
if(p==="/"){t.BackButton.hide()}else{t.BackButton.show();t.BackButton.onClick(b)}return()=>t.BackButton.offClick(b)},[p,r]);
return null}
// Telegram's blue Main Button (only exists inside Telegram): opens the seller's chat
export function TgMainButton({text,seller}:{text:string;seller:string}){useEffect(()=>{const t=getTg();if(!t)return;const url=getTelegramSellerUrl(seller);const f=()=>t.openTelegramLink(url);t.MainButton.setText(text);t.MainButton.show();t.MainButton.onClick(f);return()=>{t.MainButton.offClick(f);t.MainButton.hide()}},[text,seller]);return null}