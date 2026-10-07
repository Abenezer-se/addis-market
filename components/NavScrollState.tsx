"use client";
import {useEffect} from "react";
// Tells the CSS when the page is scrolled, so the navbar can turn translucent. Only runs when the state flips.
export default function NavScrollState(){useEffect(()=>{const el=document.documentElement;let on=false;const f=()=>{const s=window.scrollY>8;if(s!==on){on=s;el.dataset.scrolled=s?"1":"0"}};f();window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f)},[]);return null}