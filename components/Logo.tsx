import ScrollLink from "./ScrollLink";
export default function Logo({dark}:{dark?:boolean}){return <ScrollLink to="home" className={"logo"+(dark?" dk":"")} aria-label="Addis Market home"><img src="/brand/logo.svg
" alt="" width={36} height={36}/><span className="nm"><span className="a">Addis</span><span className="m">Market</span></span></ScrollLink>}