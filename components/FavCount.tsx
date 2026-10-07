"use client";
import {useEffect,useState} from "react";import {readFavs} from "./FavButton";
// Real count from the saved favorites. Renders nothing when there are none.
export default function FavCount(){const[n,setN]=useState(0);
useEffect(()=>{const f=()=>setN(readFavs().length);f();window.addEventListener("am-favs",f);window.addEventListener("storage",f);return()=>{window.removeEventListener("am-favs",f);window.removeEventListener("storage",f)}},[]);
return n>0?<span className="fcount" aria-label={`${n} saved`}>{n>9?"9+":n}</span>:null}