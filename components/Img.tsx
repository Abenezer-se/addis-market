"use client";
import {useState} from "react";
export default function Img({src,alt,eager}:{src:string;alt:string;eager?:boolean}){const[s,setS]=useState(src);return <img src={s} alt={alt} loading={eager?"eager":"lazy"} onError={()=>setS("/placeholder.svg")}/>}
