import {Suspense} from "react";import Browser from "@/components/Browser";
export const metadata={title:"All products — Addis Market"};
export default function P(){return <div className="wrap" style={{paddingTop:20}}><Suspense fallback={<p className="muted">Loading products…</p>}><Browser title="All products" showAll/></Suspense></div>}