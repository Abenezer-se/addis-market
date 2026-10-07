import type {Listing} from "@/types";
import {categories} from "@/data/categories";

const norm=(s:string)=>s.toLowerCase().replace(/&/g," ").replace(/[^a-z0-9\u1200-\u137F\s]/g," ").replace(/\s+/g," ").trim();
// "dresses" also matches "dress", "phones" also matches "phone"
const variants=(t:string)=>{const v=[t];if(t.length>=5&&t.endsWith("es"))v.push(t.slice(0,-2));if(t.length>=4&&t.endsWith("s"))v.push(t.slice(0,-1));return v};
const haystack=(l:Listing)=>{const cat=categories.find(c=>c.slug===l.category);
return norm([l.title,l.description,cat?.name??"",l.category,l.location,l.address,l.condition,l.seller.name,...Object.keys(l.specs??{}),...Object.values(l.specs??{})].join(" "))};

// Every word you type must be found somewhere in the listing (name, category, area, brand, seller...), in any order.
export const matchesQuery=(l:Listing,q:string)=>{const tokens=norm(q).split(" ").filter(Boolean);if(!tokens.length)return true;const h=haystack(l);return tokens.every(t=>variants(t).some(v=>h.includes(v)))};