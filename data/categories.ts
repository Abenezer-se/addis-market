import {listings} from "./listings";
export const categories=[{slug:"phones",name:"Phones"},{slug:"habesha",name:"Habesha Dresses"},{slug:"electronics",name:"Electronics"},{slug:"fashion",name:"Fashion"},{slug:"home",name:"Home & Furniture"},{slug:"vehicles",name:"Vehicles"},{slug:"sports",name:"Sports & Hobbies"}];
export const locations=["Bole","Kazanchis","Piassa","Saris","Megenagna","CMC","Gerji","Mexico","Yeka"];
// Categories that really have listings (empty ones are hidden from browsing, never shown as "0 listings")
export const activeCategories=categories.filter(c=>listings.some(l=>l.category===c.slug));