export type Seller={name:string;verified:boolean;since:number;telegram:string;listings?:number};
export type Listing={id:string;title:string;price:number;negotiable:boolean;currency:"ETB";description:string;category:string;location:string;address:string;imageCount:number;condition:string;seller:Seller;specs?:Record<string,string>;featured?:boolean;createdAt:string};
