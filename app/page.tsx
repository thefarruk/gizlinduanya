"use client"
import { useState, useEffect } from "react"
type Lang = "tk" | "ru" | "tr" | "en"
type Modal = "login" | "register" | "recover" | null
const T:any = {
  tk:{tag:"Anonim platforma",title:"Seniň syrlaryn bu ýerde howpsuz",sub:"Hekaýalar. Tanyşlyk. Boýun almalar. Hemmesi anonim.",cta:"Anonim gir",explore:"Hekaýalary gör",login:"Gir",register:"Anonim gir",u:"ulanyjy",st:"şu gün",on:"onlaýn",ul:"ULANYJY ADY",pl:"PAROL",sl:"GIZLIN SÖZ",sp:"diňe sen...",nomail:"Email ýok. Telefon ýok.",na:"Hasabyň ýokmy?",ha:"Hasabyň barmy?",fp:"Paroly unuttym?",newpass:"TÄZE PAROL",rb:"Dikelt",rt:"Paroly dikeltmek",rs:"Login we gizlin sözi giriziň",es:"Gysga",et:"Bu login bar",ew:"Ýalňyş",ec:"Gizlin söz ýalňyş",sr:"Hasap döredildi!",sl2:"Hoş geldiňiz!",sp2:"Parol täzelendi!",logout:"Çyk",daily:"GÜNÜŇ SORAGY",dq:"Iň ýakyn adamlaryňdan näme gizleýärsiň?",dp:"Anonim jogap ber...",db:"Jogap ber",live:"ŞU WAGT",sections:"Bu ýerde näme bar",f1:"Üç ýyl bäri dymyp geldim. Bu gün ilkinji gezek ýazdym.",f2:"Hiç duşuşmadyk adama aşyk boldym.",f3:"Maşgalam bagtlydyryn öýdýär.",footer:"© 2025 — anonim",cards:["Anonim hekaýalar","Anonim tanyşlyk","Boýun almalar","Sorag ber","Kim günäkär?","Anonim gündelik"],descs:["Hiç kimä aýdyp bilmeýän zadyňy aýt.","Meňzeş adamlary tap.","Bir syr. Anonim.","Anonim sorag ber.","Ýagdaýy aýt.","Diňe özüň üçin ýaz."],badges:["GYZGYN","MEŞHUR","TÄZE","MEŞHUR","GYZGYN","TÄZE"]},
  ru:{tag:"Анонимная платформа",title:"Твои тайны здесь в безопасности",sub:"Истории. Знакомства. Исповеди. Всё анонимно.",cta:"Войти анонимно",explore:"Смотреть истории",login:"Войти",register:"Регистрация",u:"пользователей",st:"историй сегодня",on:"онлайн",ul:"ЛОГИН",pl:"ПАРОЛЬ",sl:"СЕКРЕТНОЕ СЛОВО",sp:"только ты знаешь...",nomail:"Без email. Без телефона.",na:"Нет аккаунта?",ha:"Уже есть аккаунт?",fp:"Забыли пароль?",newpass:"НОВЫЙ ПАРОЛЬ",rb:"Восстановить",rt:"Восстановление",rs:"Введите логин и секретное слово",es:"Слишком коротко",et:"Логин занят",ew:"Неверный логин или пароль",ec:"Секретное слово неверное",sr:"Аккаунт создан!",sl2:"Добро пожаловать!",sp2:"Пароль обновлён!",logout:"Выйти",daily:"ВОПРОС ДНЯ",dq:"Что вы скрываете от самых близких людей?",dp:"Ответь анонимно...",db:"Ответить",live:"ПРЯМО СЕЙЧАС",sections:"Что здесь есть",f1:"Три года я молчал. Сегодня написал здесь. Стало легче...",f2:"Я влюблён в человека которого никогда не встречал.",f3:"Семья думает что я счастлив. Никто не знает правды.",footer:"© 2025 — анонимно · безопасно",cards:["Анонимные истории","Анонимные знакомства","Исповеди","Задай вопрос","Кто виноват?","Анонимный дневник"],descs:["Расскажи то, что не можешь рассказать никому.","Находи людей с похожими мыслями.","Один абзац. Одна тайна.","Спроси что стесняешься.","Опиши ситуацию.","Пиши только для себя."],badges:["ГОРЯЧЕЕ","ПОПУЛЯРНО","НОВОЕ","ПОПУЛЯРНО","ГОРЯЧЕЕ","НОВОЕ"]},
  tr:{tag:"Anonim platform",title:"Sırların burada güvende",sub:"Hikayeler. Tanışmalar. İtiraflar. Hepsi anonim.",cta:"Anonim giriş",explore:"Hikayelere bak",login:"Giriş",register:"Kayıt ol",u:"kullanıcı",st:"bugün hikaye",on:"çevrimiçi",ul:"KULLANICI ADI",pl:"ŞİFRE",sl:"GİZLİ KELIME",sp:"sadece sen bilirsin...",nomail:"Email yok. Telefon yok.",na:"Hesabın yok mu?",ha:"Hesabın var mı?",fp:"Şifremi unuttum?",newpass:"YENİ ŞİFRE",rb:"Kurtar",rt:"Şifre kurtarma",rs:"Kullanıcı adı ve gizli kelime",es:"Çok kısa",et:"Bu ad alınmış",ew:"Yanlış kullanıcı adı veya şifre",ec:"Gizli kelime yanlış",sr:"Hesap oluşturuldu!",sl2:"Hoş geldiniz!",sp2:"Şifre güncellendi!",logout:"Çıkış",daily:"GÜNÜN SORUSU",dq:"En yakınlarınızdan ne saklıyorsunuz?",dp:"Anonim cevapla...",db:"Cevapla",live:"ŞU AN",sections:"Burada ne var",f1:"Üç yıldır sustum. Bugün burada yazdım.",f2:"Hiç tanışmadığım birine aşık oldum.",f3:"Ailem mutlu olduğumu sanıyor.",footer:"© 2025 — anonim · güvenli",cards:["Anonim hikayeler","Anonim tanışma","İtiraflar","Soru sor","Kim suçlu?","Anonim günlük"],descs:["Kimseye söyleyemediğini anlat.","Benzer insanları bul.","Bir sır. Anonim.","Sesli soramadığını sor.","Durumu anlat.","Kendin için yaz."],badges:["SICAK","POPÜLER","YENİ","POPÜLER","SICAK","YENİ"]},
  en:{tag:"Anonymous platform",title:"Your secrets are safe here",sub:"Stories. Connections. Confessions. All anonymous.",cta:"Enter anonymously",explore:"Browse stories",login:"Login",register:"Register",u:"users",st:"stories today",on:"online",ul:"USERNAME",pl:"PASSWORD",sl:"SECRET WORD",sp:"only you know...",nomail:"No email. No phone.",na:"No account?",ha:"Already have account?",fp:"Forgot password?",newpass:"NEW PASSWORD",rb:"Recover",rt:"Password recovery",rs:"Enter username and secret word",es:"Too short",et:"Username taken",ew:"Wrong username or password",ec:"Wrong secret word",sr:"Account created!",sl2:"Welcome!",sp2:"Password updated!",logout:"Logout",daily:"QUESTION OF THE DAY",dq:"What are you hiding from the people closest to you?",dp:"Answer anonymously...",db:"Answer",live:"RIGHT NOW",sections:"What's here",f1:"Three years I kept silent. Today I finally wrote here.",f2:"I am in love with someone I have never met.",f3:"My family thinks I am happy. Nobody knows the truth.",footer:"© 2025 — anonymous · safe",cards:["Anonymous stories","Anonymous dating","Confessions","Ask a question","Who is guilty?","Anonymous diary"],descs:["Tell what you cannot tell anyone.","Find people with similar thoughts.","One paragraph. One secret.","Ask what you are afraid to ask.","Describe a situation.","Write only for yourself."],badges:["HOT","POPULAR","NEW","POPULAR","HOT","NEW"]}
}
const HREFS=["/stories","/dating","/confessions","/questions","/vote","/diary"]
const ICONS=["🔥","💬","🤫","❓","⚡","📔"]
const BC=["#ff6b6b","#7F77DD","#1D9E75","#7F77DD","#ff6b6b","#1D9E75"]
export default function Home(){
  const [lang,setLang]=useState<Lang>("tk")
  const [modal,setModal]=useState<Modal>(null)
  const [user,setUser]=useState<any>(null)
  const [toast,setToast]=useState("")
  const [ttype,setTtype]=useState("ok")
  const [loading,setLoading]=useState(false)
  const [s1,setS1]=useState(0)
  const [s2,setS2]=useState(0)
  const [s3,setS3]=useState(0)
  const [uname,setUname]=useState("")
  const [pass,setPass]=useState("")
  const [secret,setSecret]=useState("")
  const [np,setNp]=useState("")
  const t=T[lang]
  useEffect(()=>{
    const s=localStorage.getItem("gd_user")
    if(s)setUser(JSON.parse(s))
    let c1=0,c2=0,c3=0
    const tm=setInterval(()=>{
      c1=Math.min(c1+215,12847);c2=Math.min(c2+6,342);c3=Math.min(c3+21,1203)
      setS1(c1);setS2(c2);setS3(c3)
      if(c1===12847)clearInterval(tm)
    },25)
    return()=>clearInterval(tm)
  },[])
  function showT(m:string,tp="ok"){setToast(m);setTtype(tp);setTimeout(()=>setToast(""),3000)}
  function openM(m:Modal){setModal(m);setUname("");setPass("");setSecret("");setNp("")}
  async function doReg(){
    if(uname.length<3||pass.length<4||secret.length<2)return showT(t.es,"err")
    setLoading(true)
    try{
      const r=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:uname,password:pass,secret_word:secret})})
      const d=await r.json()
      if(!r.ok)return showT(d.error||t.et,"err")
      localStorage.setItem("gd_user",JSON.stringify(d.user))
      setUser(d.user);setModal(null);showT(t.sr)
      setTimeout(()=>window.location.href="/cabinet",1000)
    }finally{setLoading(false)}
  }
  async function doLogin(){
    if(!uname||!pass)return showT(t.es,"err")
    setLoading(true)
    try{
      const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:uname,password:pass})})
      const d=await r.json()
      if(!r.ok)return showT(t.ew,"err")
      localStorage.setItem("gd_user",JSON.stringify(d.user))
      setUser(d.user);setModal(null);showT(t.sl2)
    }finally{setLoading(false)}
  }
  async function doRecover(){
    if(!uname||!secret||!np)return showT(t.es,"err")
    setLoading(true)
    try{
      const r=await fetch("/api/auth/recover",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:uname,secret_word:secret,new_password:np})})
      if(!r.ok)return showT(t.ec,"err")
      setModal(null);showT(t.sp2)
    }finally{setLoading(false)}
  }
  const inp={width:"100%",background:"#07070f",border:"1px solid rgba(127,119,221,0.25)",color:"#EEEDFE",fontFamily:"monospace",fontSize:13,padding:"11px 13px",borderRadius:8,outline:"none",display:"block",marginBottom:10,boxSizing:"border-box" as const}
  return(
    <div style={{minHeight:"100vh",background:"#07070f",color:"#EEEDFE",fontFamily:"sans-serif"}}>
      {toast&&<div style={{position:"fixed",top:65,left:"50%",transform:"translateX(-50%)",background:ttype==="ok"?"#1D9E75":"#c0392b",color:"white",padding:"9px 22px",borderRadius:8,zIndex:999,fontFamily:"monospace",fontSize:12,whiteSpace:"nowrap"}}>{toast}</div>}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(7,7,15,0.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(127,119,221,0.12)",gap:8,flexWrap:"wrap"}}>
        <div style={{fontFamily:"monospace",fontSize:14,letterSpacing:2,fontWeight:500}}>Ψ GizlinDünya</div>
        <div style={{display:"flex",gap:3}}>
          {(["tk","ru","tr","en"] as Lang[]).map(lg=>(
            <button key={lg} onClick={()=>setLang(lg)} style={{background:lang===lg?"#534AB7":"none",border:"1px solid",borderColor:lang===lg?"#7F77DD":"rgba(127,119,221,0.2)",color:lang===lg?"white":"#9F9AEC",fontFamily:"monospace",fontSize:10,padding:"3px 6px",borderRadius:3,cursor:"pointer"}}>{lg.toUpperCase()}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:6}}>
          {user?(
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontFamily:"monospace",fontSize:10,color:"#7F77DD"}}>{user.anon_code}</span>
              <button onClick={()=>{localStorage.removeItem("gd_user");setUser(null)}} style={{background:"none",border:"1px solid rgba(127,119,221,0.2)",color:"#9F9AEC",fontFamily:"monospace",fontSize:10,padding:"6px 10px",borderRadius:5,cursor:"pointer"}}>{t.logout}</button>
            </div>
          ):(
            <>
              <button onClick={()=>openM("login")} style={{background:"none",border:"1px solid rgba(127,119,221,0.2)",color:"#9F9AEC",fontFamily:"monospace",fontSize:10,padding:"6px 10px",borderRadius:5,cursor:"pointer"}}>{t.login}</button>
              <button onClick={()=>openM("register")} style={{background:"#534AB7",border:"none",color:"white",fontFamily:"monospace",fontSize:10,padding:"6px 10px",borderRadius:5,cursor:"pointer"}}>{t.register}</button>
            </>
          )}
        </div>
      </nav>
      <section style={{padding:"110px 16px 50px",textAlign:"center",maxWidth:780,margin:"0 auto"}}>
        <p style={{fontFamily:"monospace",fontSize:11,color:"#5DCAA5",letterSpacing:3,marginBottom:18}}>{t.tag}</p>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,5vw,58px)",fontWeight:700,lineHeight:1.15,marginBottom:18}}>{t.title}</h1>
        <p style={{fontSize:14,color:"#9F9AEC",lineHeight:1.7,marginBottom:32,maxWidth:580,margin:"0 auto 32px"}}>{t.sub}</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>openM("register")} style={{background:"linear-gradient(135deg,#534AB7,#7F77DD)",border:"none",color:"white",fontFamily:"monospace",fontSize:12,padding:"12px 26px",borderRadius:8,cursor:"pointer"}}>{t.cta}</button>
          <a href="/stories" style={{border:"1px solid rgba(127,119,221,0.25)",color:"#9F9AEC",fontFamily:"monospace",fontSize:12,padding:"12px 26px",borderRadius:8,textDecoration:"none"}}>{t.explore}</a>
        </div>
      </section>
      <div style={{display:"flex",justifyContent:"center",gap:"clamp(16px,5vw,44px)",padding:"0 16px 36px",flexWrap:"wrap"}}>
        {[{n:s1,l:t.u},{n:s2,l:t.st},{n:s3,l:t.on}].map((s,i)=>(
          <div key={i} style={{textAlign:"center"}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:"clamp(22px,4vw,30px)",color:"#7F77DD",display:"block"}}>{s.n.toLocaleString()}</span>
            <span style={{fontFamily:"monospace",fontSize:10,color:"#555470",letterSpacing:1}}>{s.l}</span>
          </div>
        ))}
      </div>
      <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(127,119,221,0.15),transparent)",margin:"0 16px 44px"}}/>
      <div style={{textAlign:"center",marginBottom:28,padding:"0 16px"}}>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(20px,4vw,36px)"}}>{t.sections}</h2>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,padding:"0 14px 44px",maxWidth:1080,margin:"0 auto"}}>
        {t.cards.map((title:string,i:number)=>(
          <a key={i} href={HREFS[i]} style={{background:"#0d0d1a",border:"1px solid rgba(127,119,221,0.12)",borderRadius:12,padding:"20px 18px",textDecoration:"none",color:"inherit",display:"block"}}>
            <span style={{fontSize:24,marginBottom:12,display:"block"}}>{ICONS[i]}</span>
            <h3 style={{fontFamily:"Georgia,serif",fontSize:17,marginBottom:7}}>{title}</h3>
            <p style={{fontSize:12,color:"#9F9AEC",lineHeight:1.6,marginBottom:14}}>{t.descs[i]}</p>
            <span style={{fontFamily:"monospace",fontSize:10,padding:"3px 8px",borderRadius:4,background:BC[i]+"20",color:BC[i],border:"1px solid "+BC[i]+"35"}}>{t.badges[i]}</span>
          </a>
        ))}
      </div>
      <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(127,119,221,0.15),transparent)",margin:"0 16px 44px"}}/>
      <div style={{maxWidth:680,margin:"0 auto",padding:"0 14px 44px"}}>
        <div style={{background:"linear-gradient(135deg,rgba(127,119,221,0.07),rgba(29,158,117,0.04))",border:"1px solid rgba(127,119,221,0.15)",borderRadius:14,padding:"26px 20px",textAlign:"center"}}>
          <p style={{fontFamily:"monospace",fontSize:10,letterSpacing:3,color:"#5DCAA5",marginBottom:12}}>{t.daily}</p>
          <h3 style={{fontFamily:"Georgia,serif",fontSize:"clamp(15px,3vw,22px)",marginBottom:18,lineHeight:1.4}}>{t.dq}</h3>
          <textarea placeholder={t.dp} style={{width:"100%",background:"rgba(7,7,15,0.6)",border:"1px solid rgba(127,119,221,0.2)",color:"#EEEDFE",fontSize:13,padding:"11px 13px",borderRadius:8,outline:"none",resize:"none",height:75,marginBottom:10,boxSizing:"border-box",fontFamily:"sans-serif"}}/>
          <button onClick={()=>openM("register")} style={{background:"linear-gradient(135deg,#534AB7,#7F77DD)",border:"none",color:"white",fontFamily:"monospace",fontSize:12,padding:"10px 22px",borderRadius:8,cursor:"pointer"}}>{t.db}</button>
        </div>
      </div>
      <div style={{maxWidth:680,margin:"0 auto",padding:"0 14px 60px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:18}}>
          <div style={{width:7,height:7,background:"#ff6b6b",borderRadius:"50%"}}/>
          <span style={{fontFamily:"monospace",fontSize:10,color:"#555470",letterSpacing:2}}>{t.live}</span>
        </div>
        {[t.f1,t.f2,t.f3].map((text:string,i:number)=>(
          <div key={i} style={{background:"#0d0d1a",border:"1px solid rgba(127,119,221,0.1)",borderRadius:12,padding:"16px",marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#534AB7,#1D9E75)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:9,color:"white",flexShrink:0}}>{["A7","K3","M9"][i]}</div>
              <span style={{fontFamily:"monospace",fontSize:11,color:"#7F77DD"}}>Anon#{["4821","2193","7754"][i]}</span>
              <span style={{fontFamily:"monospace",fontSize:10,color:"#555470",marginLeft:"auto"}}>{[2,5,11][i]}min</span>
            </div>
            <p style={{fontSize:13,color:"#EEEDFE",lineHeight:1.7,marginBottom:10}}>{text}</p>
            <span style={{fontFamily:"monospace",fontSize:11,color:"#555470"}}>♡ {[47,83,124][i]}</span>
          </div>
        ))}
      </div>
      <footer style={{borderTop:"1px solid rgba(127,119,221,0.1)",padding:"28px 16px",textAlign:"center"}}>
        <div style={{fontFamily:"Georgia,serif",fontSize:18,color:"#7F77DD",marginBottom:6}}>Ψ GizlinDünya</div>
        <p style={{fontFamily:"monospace",fontSize:10,color:"#555470"}}>{t.footer}</p>
      </footer>
      {modal&&(
        <div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(7,7,15,0.93)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:"14px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#0d0d1a",border:"1px solid rgba(127,119,221,0.25)",borderRadius:16,padding:"28px 22px",width:"100%",maxWidth:390,position:"relative",maxHeight:"90vh",overflowY:"auto"}}>
            <button onClick={()=>setModal(null)} style={{position:"absolute",top:12,right:12,background:"none",border:"none",color:"#555470",fontSize:18,cursor:"pointer",lineHeight:1}}>✕</button>
            <h3 style={{fontFamily:"Georgia,serif",fontSize:21,marginBottom:4}}>{modal==="login"?t.login:modal==="register"?t.register:t.rt}</h3>
            <p style={{fontFamily:"monospace",fontSize:10,color:"#555470",marginBottom:18}}>{modal==="recover"?t.rs:"GIZLINDUANYA"}</p>
            {modal!=="recover"&&<div style={{background:"rgba(29,158,117,0.08)",border:"1px solid rgba(29,158,117,0.15)",borderRadius:8,padding:"9px 13px",marginBottom:16,fontFamily:"monospace",fontSize:11,color:"#5DCAA5"}}>🔒 {t.nomail}</div>}
            <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>{t.ul}</label>
            <input type="text" value={uname} onChange={e=>setUname(e.target.value)} placeholder="anon_name" style={inp}/>
            {modal!=="recover"&&<><label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>{t.pl}</label><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" style={inp}/></>}
            {(modal==="register"||modal==="recover")&&<><label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>{t.sl}</label><input type="text" value={secret} onChange={e=>setSecret(e.target.value)} placeholder={t.sp} style={inp}/></>}
            {modal==="recover"&&<><label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>{t.newpass}</label><input type="password" value={np} onChange={e=>setNp(e.target.value)} placeholder="••••••••" style={inp}/></>}
            <button onClick={modal==="login"?doLogin:modal==="register"?doReg:doRecover} disabled={loading} style={{width:"100%",background:"linear-gradient(135deg,#534AB7,#7F77DD)",border:"none",color:"white",fontFamily:"monospace",fontSize:13,padding:13,borderRadius:8,cursor:"pointer",marginTop:4,opacity:loading?0.7:1}}>{loading?"...":(modal==="login"?t.login:modal==="register"?t.register:t.rb)}</button>
            <div style={{marginTop:14,textAlign:"center",fontFamily:"monospace",fontSize:11,color:"#555470"}}>
              {modal==="login"&&<><span>{t.na} </span><span onClick={()=>openM("register")} style={{color:"#7F77DD",cursor:"pointer"}}>{t.register}</span><br/><span onClick={()=>openM("recover")} style={{color:"#534AB7",cursor:"pointer",marginTop:6,display:"inline-block"}}>{t.fp}</span></>}
              {modal==="register"&&<><span>{t.ha} </span><span onClick={()=>openM("login")} style={{color:"#7F77DD",cursor:"pointer"}}>{t.login}</span></>}
              {modal==="recover"&&<span onClick={()=>openM("login")} style={{color:"#7F77DD",cursor:"pointer"}}>{t.login}</span>}
            </div>
          </div>
        </div>
      )}
      <style>{`*{box-sizing:border-box}textarea,input{font-family:sans-serif}`}</style>
    </div>
  )
}
