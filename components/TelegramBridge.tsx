"use client";
import {useEffect} from "react";import {usePathname,useRouter} from "next/navigation";import {getTg,listingFromParam} from "@/lib/telegram";
export default function TelegramBridge(){const p=usePathname(),r=useRouter();
useEffect(()=>{const t=getTg();if(!t)return;t.ready();t.expand();const id=listingFromParam(t.initDataUnsafe?.start_param);if(id&&p==="/")r.replace(`/listings/${encodeURIComponent(id)}`)},[]);// eslint-disable-line
useEffect(()=>{const t=getTg();if(!t)return;const b=()=>r.back();if(p==="/"){t.BackButton.hide()}else{t.BackButton.show();t.BackButton.onClick(b)}return()=>t.BackButton.offClick(b)},[p,r]);
return null}
export function TgMainButton({text,url}:{text:string;url:string}){useEffect(()=>{const t=getTg();if(!t)return;const f=()=>t.openTelegramLink(url);t.MainButton.setText(text);t.MainButton.show();t.MainButton.onClick(f);return()=>{t.MainButton.offClick(f);t.MainButton.hide()}},[text,url]);return null}
