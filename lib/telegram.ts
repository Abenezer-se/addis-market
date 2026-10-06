export type TgWebApp={ready():void;expand():void;initDataUnsafe?:{start_param?:string;user?:{first_name?:string}};colorScheme?:string;MainButton:{setText(t:string):void;show():void;hide():void;onClick(f:()=>void):void;offClick(f:()=>void):void};BackButton:{show():void;hide():void;onClick(f:()=>void):void;offClick(f:()=>void):void};openTelegramLink(u:string):void};
declare global{interface Window{Telegram?:{WebApp?:TgWebApp}}}
// Safe: returns null in normal browsers. initDataUnsafe is UNTRUSTED; validate initData server-side for anything sensitive.
export const getTg=():TgWebApp|null=>typeof window==="undefined"?null:window.Telegram?.WebApp?.initDataUnsafe?window.Telegram.WebApp:null;
const bot=process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME,app=process.env.NEXT_PUBLIC_TELEGRAM_APP_SHORT_NAME;
export const botUrl=bot?`https://t.me/${bot}`:"https://telegram.org";
export const deepLink=(id:string)=>bot?(app?`https://t.me/${bot}/${app}?startapp=listing_${id}`:`https://t.me/${bot}?startapp=listing_${id}`):"";
export const shareLink=(url:string,text:string)=>`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
export const listingFromParam=(p?:string)=>p&&p.startsWith("listing_")?p.slice(8):null;
