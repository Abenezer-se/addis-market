export const etb=(n:number)=>"ETB "+n.toLocaleString("en-US");
export const ago=(iso:string)=>{const h=Math.max(1,Math.round((Date.now()-new Date(iso).getTime())/36e5));if(h<24)return h+"h ago";const d=Math.round(h/24);return d<30?d+"d ago":new Date(iso).toLocaleDateString("en-GB",{day:"numeric",month:"short"})};
export const site=()=>process.env.NEXT_PUBLIC_SITE_URL||"";
