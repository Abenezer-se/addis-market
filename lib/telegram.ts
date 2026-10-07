export type TgWebApp={ready():void;expand():void;initData?:string;platform?:string;initDataUnsafe?:{start_param?:string;user?:{first_name?:string}};colorScheme?:string;setHeaderColor?(c:string):void;setBackgroundColor?(c:string):void;MainButton:{setText(t:string):void;show():void;hide():void;onClick(f:()=>void):void;offClick(f:()=>void):void};BackButton:{show():void;hide():void;onClick(f:()=>void):void;offClick(f:()=>void):void};openTelegramLink(u:string):void;openLink(u:string):void};
declare global{interface Window{Telegram?:{WebApp?:TgWebApp}}}

// Returns the WebApp ONLY when really running inside Telegram (the script object also exists in normal browsers).
// initDataUnsafe/initData are UNTRUSTED. Validate initData server-side before using it for anything sensitive.
export const getTg=():TgWebApp|null=>{if(typeof window==="undefined")return null;const w=window.Telegram?.WebApp;return w&&(w.initData||(w.platform&&w.platform!=="unknown"))?w:null};

// ---- single source of truth for every Telegram / site URL ----
const BOT=process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME||"AddisMarket27_Bot";
const APP=process.env.NEXT_PUBLIC_TELEGRAM_APP_SHORT_NAME||process.env.NEXT_PUBLIC_TELEGRAM_APP_NAME||"market";
export const TELEGRAM_CHANNEL_URL=process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL||"";

export const getTelegramBotUrl=(start?:string)=>`https://t.me/${BOT}`+(start?`?start=${encodeURIComponent(start)}`:"");      // bot CHAT
export const getTelegramMiniAppUrl=()=>`https://t.me/${BOT}/${APP}`;                                                           // Mini App
export const getTelegramListingUrl=(id:string)=>`${getTelegramMiniAppUrl()}?startapp=${encodeURIComponent(id)}`;               // Mini App + listing
export const getTelegramSellerUrl=(username:string)=>`https://t.me/${username.replace(/^@/,"")}`;                              // seller chat
export const getTelegramShareUrl=(url:string,text:string)=>`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;

export const getSiteUrl=()=>(process.env.NEXT_PUBLIC_SITE_URL||(typeof window!=="undefined"?window.location.origin:"")).replace(/\/$/,"");
export const getListingWebUrl=(id:string)=>`${getSiteUrl()}/listings/${encodeURIComponent(id)}`;

// startapp value -> listing id. Accepts the raw id (and the older "listing_<id>" form). Telegram allows only A-Z a-z 0-9 _ -
export const parseStartParam=(p?:string|null)=>{if(!p)return null;const id=p.startsWith("listing_")?p.slice(8):p;return /^[A-Za-z0-9_-]{1,128}$/.test(id)?id:null};