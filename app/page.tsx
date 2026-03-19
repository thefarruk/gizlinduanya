"use client"
import { useState } from "react"
type Lang = "tk" | "ru" | "tr" | "en"
export default function Home() {
  const [lang, setLang] = useState<Lang>("tk")
  const [modal, setModal] = useState<"login" | "register" | null>(null)
  return (
    <div style={{minHeight:"100vh",background:"#07070f",color:"#EEEDFE",fontFamily:"sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(7,7,15,0.92)",borderBottom:"1px solid rgba(127,119,221,0.12)"}}>
        <div style={{fontFamily:"monospace",fontSize:16,letterSpacing:2}}>Ψ GizlinDünya</div>
        <div style={{display:"flex",gap:4}}>
          {(["tk","ru","tr","en"] as Lang[]).map(lg=>(
            <button key={lg} onClick={()=>setLang(lg)} style={{background:lang===lg?"#534AB7":"none",border:"1px solid",borderColor:lang===lg?"#7F77DD":"rgba(127,119,221,0.2)",color:lang===lg?"white":"#9F9AEC",fontFamily:"monospace",fontSize:11,padding:"4px 10px",borderRadius:4,cursor:"pointer"}}>{lg.toUpperCase()}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setModal("login")} style={{background:"none",border:"1px solid rgba(127,119,221,0.2)",color:"#9F9AEC",fontFamily:"monospace",fontSize:12,padding:"8px 16px",borderRadius:6,cursor:"pointer"}}>Login</button>
          <button onClick={()=>setModal("register")} style={{background:"#534AB7",border:"1px solid #7F77DD",color:"white",fontFamily:"monospace",fontSize:12,padding:"8px 16px",borderRadius:6,cursor:"pointer"}}>Enter anonymously</button>
        </div>
      </nav>
      <section style={{padding:"140px 24px 80px",textAlign:"center",maxWidth:800,margin:"0 auto"}}>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(32px,6vw,64px)",fontWeight:700,lineHeight:1.1,marginBottom:24}}>
          {lang==="tk"?"Seniň syrlaryn bu ýerde howpsuz":lang==="ru"?"Твои тайны здесь в безопасности":lang==="tr"?"Sırların burada güvende":"Your secrets are safe here"}
        </h1>
        <p style={{fontSize:16,color:"#9F9AEC",lineHeight:1.7,marginBottom:40}}>
          {lang==="tk"?"Hekaýalar. Tanyşlyk. Boýun almalar.":lang==="ru"?"Истории. Знакомства. Исповеди. Всё анонимно.":lang==="tr"?"Hikayeler. Tanışmalar. İtiraflar.":"Stories. Connections. Confessions. All anonymous."}
        </p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>setModal("register")} style={{background:"linear-gradient(135deg,#534AB7,#7F77DD)",border:"none",color:"white",fontFamily:"monospace",fontSize:13,padding:"14px 32px",borderRadius:8,cursor:"pointer"}}>
            {lang==="tk"?"Anonim gir":lang==="ru"?"Войти анонимно":lang==="tr"?"Anonim giriş":"Enter anonymously"}
          </button>
          <a href="/stories" style={{border:"1px solid rgba(127,119,221,0.25)",color:"#9F9AEC",fontFamily:"monospace",fontSize:13,padding:"14px 32px",borderRadius:8,textDecoration:"none"}}>
            {lang==="tk"?"Hekaýalary gör":lang==="ru"?"Смотреть истории":lang==="tr"?"Hikayelere bak":"Browse stories"}
          </a>
        </div>
      </section>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,padding:"0 24px 60px",maxWidth:1200,margin:"0 auto"}}>
        {[
          {icon:"🔥",href:"/stories",title:{tk:"Anonim hekaýalar",ru:"Анонимные истории",tr:"Anonim hikayeler",en:"Anonymous stories"}[lang]},
          {icon:"💬",href:"/dating",title:{tk:"Anonim tanyşlyk",ru:"Анонимные знакомства",tr:"Anonim tanışma",en:"Anonymous dating"}[lang]},
          {icon:"🤫",href:"/confessions",title:{tk:"Boýun almalar",ru:"Исповеди",tr:"İtiraflar",en:"Confessions"}[lang]},
          {icon:"❓",href:"/questions",title:{tk:"Sorag ber",ru:"Задай вопрос",tr:"Soru sor",en:"Ask a question"}[lang]},
        ].map((c,i)=>(
          <a key={i} href={c.href} style={{background:"#0d0d1a",border:"1px solid rgba(127,119,221,0.12)",borderRadius:12,padding:28,textDecoration:"none",color:"inherit",display:"block"}}>
            <span style={{fontSize:28,marginBottom:16,display:"block"}}>{c.icon}</span>
            <h3 style={{fontFamily:"Georgia,serif",fontSize:20}}>{c.title}</h3>
          </a>
        ))}
      </div>
      <footer style={{borderTop:"1px solid rgba(127,119,221,0.1)",padding:"40px 24px",textAlign:"center"}}>
        <div style={{fontFamily:"Georgia,serif",fontSize:22,color:"#7F77DD",marginBottom:10}}>Ψ GizlinDünya</div>
        <p style={{fontFamily:"monospace",fontSize:11,color:"#555470"}}>© 2025 anonim</p>
      </footer>
      {modal&&(
        <div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(7,7,15,0.92)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#0d0d1a",border:"1px solid rgba(127,119,221,0.25)",borderRadius:16,padding:40,width:"90%",maxWidth:400,position:"relative"}}>
            <button onClick={()=>setModal(null)} style={{position:"absolute",top:16,right:16,background:"none",border:"none",color:"#555470",fontSize:20,cursor:"pointer"}}>✕</button>
            <h3 style={{fontFamily:"Georgia,serif",fontSize:24,marginBottom:20}}>{modal==="login"?"Login":"Register"}</h3>
            <input type="text" placeholder="username" style={{width:"100%",background:"#07070f",border:"1px solid rgba(127,119,221,0.2)",color:"#EEEDFE",fontFamily:"monospace",fontSize:13,padding:"12px 14px",borderRadius:8,outline:"none",marginBottom:12,display:"block"}}/>
            <input type="password" placeholder="password" style={{width:"100%",background:"#07070f",border:"1px solid rgba(127,119,221,0.2)",color:"#EEEDFE",fontFamily:"monospace",fontSize:13,padding:"12px 14px",borderRadius:8,outline:"none",marginBottom:16,display:"block"}}/>
            <button style={{width:"100%",background:"linear-gradient(135deg,#534AB7,#7F77DD)",border:"none",color:"white",fontFamily:"monospace",fontSize:13,padding:14,borderRadius:8,cursor:"pointer"}}>{modal==="login"?"Login":"Register"}</button>
          </div>
        </div>
      )}
    </div>
  )
}