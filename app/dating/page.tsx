"use client"
import { useState, useEffect } from "react"
type Lang = "tk" | "ru" | "tr" | "en"
const T:any = {
  tk:{title:"Anonim Tanyşlyk",search:"Gözle",filter:"Süzgüç",age_from:"Ýaşdan",age_to:"Ýaşa",city:"Şäher",country:"Ýurt",all:"Hemmesi",sort_new:"Täze",sort_online:"Onlaýn",empty:"Anketa ýok",send:"Ýaz",back:"Yza",msg:"Habar...",send_btn:"Iber",create:"Anketa dör",my_profile:"Meniň anketam",save:"Sakla",saved:"Saklandi!",about_label:"Özüň hakda",interests_label:"Gyzyklanmalar",city_ph:"Şäheriň...",about_ph:"Özüň hakda gysgaça...",interests_ph:"sport, sungat, kitap...",reset:"Arassala",online_now:"Onlaýn"},
  ru:{title:"Анонимные знакомства",search:"Поиск",filter:"Фильтр",age_from:"От",age_to:"До",city:"Город",country:"Страна",all:"Все",sort_new:"Новые",sort_online:"Онлайн",empty:"Анкет пока нет",send:"Написать",back:"Назад",msg:"Сообщение...",send_btn:"Отправить",create:"Создать анкету",my_profile:"Моя анкета",save:"Сохранить",saved:"Сохранено!",about_label:"О себе",interests_label:"Интересы",city_ph:"Твой город...",about_ph:"Расскажи о себе...",interests_ph:"спорт, музыка, кино...",reset:"Сбросить",online_now:"Онлайн"},
  tr:{title:"Anonim Tanışma",search:"Ara",filter:"Filtre",age_from:"Dan",age_to:"a",city:"Şehir",country:"Ülke",all:"Hepsi",sort_new:"Yeni",sort_online:"Çevrimiçi",empty:"Profil yok",send:"Yaz",back:"Geri",msg:"Mesaj...",send_btn:"Gönder",create:"Profil oluştur",my_profile:"Profilim",save:"Kaydet",saved:"Kaydedildi!",about_label:"Hakkında",interests_label:"İlgi alanları",city_ph:"Şehrin...",about_ph:"Kendinden bahset...",interests_ph:"spor, müzik, sinema...",reset:"Sıfırla",online_now:"Çevrimiçi"},
  en:{title:"Anonymous Dating",search:"Search",filter:"Filter",age_from:"From",age_to:"To",city:"City",country:"Country",all:"All",sort_new:"New",sort_online:"Online",empty:"No profiles yet",send:"Message",back:"Back",msg:"Message...",send_btn:"Send",create:"Create profile",my_profile:"My profile",save:"Save",saved:"Saved!",about_label:"About",interests_label:"Interests",city_ph:"Your city...",about_ph:"Tell about yourself...",interests_ph:"sport, music, movies...",reset:"Reset",online_now:"Online"}
}
const COUNTRIES = ["🌍 All","🇹🇲 Turkmenistan","🇷🇺 Russia","🇺🇿 Uzbekistan","🇰🇿 Kazakhstan","🇹🇷 Turkey","🇦🇿 Azerbaijan","🇩🇪 Germany","🇦🇪 UAE","🇺🇸 USA","🇬🇧 UK","🇺🇦 Ukraine","🇰🇬 Kyrgyzstan","🇹🇯 Tajikistan","🇦🇲 Armenia","🇬🇪 Georgia","🇵🇱 Poland","🇧🇾 Belarus","🇲🇩 Moldova","🇱🇻 Latvia","🇱🇹 Lithuania","🇪🇪 Estonia"]
const SAMPLE = [
  {id:"1",anon_code:"ANON#A7K2P1",age:23,city:"Aşgabat",country:"🇹🇲 Turkmenistan",about:"Kitap okamak we syýahat etmek halaýan.",interests:["kitap","syýahat","sungat"],online:true},
  {id:"2",anon_code:"ANON#B3M8X4",age:27,city:"Moscow",country:"🇷🇺 Russia",about:"Музыку слушаю, читаю философию.",interests:["музыка","философия","кино"],online:false},
  {id:"3",anon_code:"ANON#C9L5Q7",age:21,city:"Mary",country:"🇹🇲 Turkmenistan",about:"Sport we fitnes bilen meşgullanýaryn.",interests:["sport","fitnes","tebigat"],online:true},
  {id:"4",anon_code:"ANON#D2N6R3",age:25,city:"Istanbul",country:"🇹🇷 Turkey",about:"Люблю готовить и путешествовать.",interests:["кулинария","путешествия","йога"],online:false},
  {id:"5",anon_code:"ANON#E8P4S6",age:29,city:"Tashkent",country:"🇺🇿 Uzbekistan",about:"Tehnologiýa we programmirleme bilen gyzyklanýaryn.",interests:["tech","coding","games"],online:true},
  {id:"6",anon_code:"ANON#F1T7U9",age:24,city:"Almaty",country:"🇰🇿 Kazakhstan",about:"Рисую, пишу стихи. Ищу единомышленников.",interests:["рисование","поэзия","театр"],online:false},
  {id:"7",anon_code:"ANON#G5R3W2",age:22,city:"Berlin",country:"🇩🇪 Germany",about:"Student. Love music and traveling.",interests:["music","travel","photography"],online:true},
  {id:"8",anon_code:"ANON#H8S6Y4",age:30,city:"Dubai",country:"🇦🇪 UAE",about:"Бизнес и саморазвитие. Ищу интересных людей.",interests:["бизнес","спорт","путешествия"],online:false},
]
const COLORS=["#7F77DD","#1D9E75","#ff6b6b","#534AB7","#5DCAA5","#AFA9EC","#F0997B","#EF9F27"]
export default function DatingPage(){
  const [lang,setLang]=useState<Lang>("tk")
  const [view,setView]=useState<"list"|"create"|"chat">("list")
  const [profiles]=useState(SAMPLE)
  const [filtered,setFiltered]=useState(SAMPLE)
  const [selected,setSelected]=useState<any>(null)
  const [user,setUser]=useState<any>(null)
  const [search,setSearch]=useState("")
  const [ageFrom,setAgeFrom]=useState("")
  const [ageTo,setAgeTo]=useState("")
  const [cityFilter,setCityFilter]=useState("")
  const [country,setCountry]=useState("🌍 All")
  const [sortBy,setSortBy]=useState("new")
  const [showFilter,setShowFilter]=useState(false)
  const [msgText,setMsgText]=useState("")
  const [messages,setMessages]=useState<any[]>([])
  const [myAbout,setMyAbout]=useState("")
  const [myAge,setMyAge]=useState("")
  const [myCity,setMyCity]=useState("")
  const [myCountry,setMyCountry]=useState("🇹🇲 Turkmenistan")
  const [myInterests,setMyInterests]=useState("")
  const [saved,setSaved]=useState(false)
  const t=T[lang]
  useEffect(()=>{const s=localStorage.getItem("gd_user");if(s)setUser(JSON.parse(s))},[])
  useEffect(()=>{
    let r=[...profiles]
    if(search)r=r.filter(p=>p.about?.toLowerCase().includes(search.toLowerCase())||p.city?.toLowerCase().includes(search.toLowerCase())||p.interests?.join(" ").toLowerCase().includes(search.toLowerCase()))
    if(ageFrom)r=r.filter(p=>p.age>=parseInt(ageFrom))
    if(ageTo)r=r.filter(p=>p.age<=parseInt(ageTo))
    if(cityFilter)r=r.filter(p=>p.city?.toLowerCase().includes(cityFilter.toLowerCase()))
    if(country!=="🌍 All")r=r.filter(p=>p.country===country)
    if(sortBy==="online")r=[...r.filter(p=>p.online),...r.filter(p=>!p.online)]
    else r.sort((a,b)=>parseInt(b.id)-parseInt(a.id))
    setFiltered(r)
  },[search,ageFrom,ageTo,cityFilter,country,sortBy,profiles])
  function reset(){setSearch("");setAgeFrom("");setAgeTo("");setCityFilter("");setCountry("🌍 All");setSortBy("new")}
  function openChat(p:any){setSelected(p);setView("chat");setMessages([{from:"them",text:p.about}])}
  const inp={width:"100%",background:"#07070f",border:"1px solid rgba(127,119,221,0.2)",color:"#EEEDFE",fontFamily:"monospace",fontSize:12,padding:"9px 12px",borderRadius:7,outline:"none",boxSizing:"border-box" as const}
  if(view==="chat"&&selected)return(
    <div style={{minHeight:"100vh",background:"#07070f",color:"#EEEDFE",fontFamily:"sans-serif",display:"flex",flexDirection:"column"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"11px 14px",display:"flex",alignItems:"center",gap:10,background:"rgba(7,7,15,0.95)",borderBottom:"1px solid rgba(127,119,221,0.12)"}}>
        <button onClick={()=>setView("list")} style={{background:"none",border:"1px solid rgba(127,119,221,0.2)",color:"#9F9AEC",fontFamily:"monospace",fontSize:11,padding:"5px 11px",borderRadius:5,cursor:"pointer"}}>← {t.back}</button>
        <div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#534AB7,#1D9E75)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:10,color:"white",flexShrink:0}}>{selected.anon_code?.slice(-2)}</div>
        <div>
          <div style={{fontFamily:"monospace",fontSize:12,color:"#7F77DD"}}>{selected.anon_code}</div>
          {selected.online&&<div style={{fontFamily:"monospace",fontSize:10,color:"#1D9E75"}}>● {t.online_now}</div>}
        </div>
      </nav>
      <div style={{flex:1,padding:"75px 14px 90px",maxWidth:660,margin:"0 auto",width:"100%"}}>
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.from==="me"?"flex-end":"flex-start",marginBottom:10}}>
            <div style={{background:m.from==="me"?"#534AB7":"#0d0d1a",border:"1px solid",borderColor:m.from==="me"?"#7F77DD":"rgba(127,119,221,0.15)",borderRadius:12,padding:"9px 13px",maxWidth:"78%",fontSize:13,lineHeight:1.6,color:"#EEEDFE"}}>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:660,padding:"10px 14px",background:"rgba(7,7,15,0.97)",borderTop:"1px solid rgba(127,119,221,0.12)",display:"flex",gap:8}}>
        <input value={msgText} onChange={e=>setMsgText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&msgText.trim()){setMessages(p=>[...p,{from:"me",text:msgText}]);setMsgText("")}}} placeholder={t.msg} style={{...inp,flex:1,marginBottom:0}}/>
        <button onClick={()=>{if(msgText.trim()){setMessages(p=>[...p,{from:"me",text:msgText}]);setMsgText("")}}} style={{background:"#534AB7",border:"none",color:"white",fontFamily:"monospace",fontSize:11,padding:"9px 16px",borderRadius:7,cursor:"pointer",flexShrink:0}}>{t.send_btn}</button>
      </div>
    </div>
  )
  if(view==="create")return(
    <div style={{minHeight:"100vh",background:"#07070f",color:"#EEEDFE",fontFamily:"sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(7,7,15,0.95)",borderBottom:"1px solid rgba(127,119,221,0.12)"}}>
        <button onClick={()=>setView("list")} style={{background:"none",border:"1px solid rgba(127,119,221,0.2)",color:"#9F9AEC",fontFamily:"monospace",fontSize:11,padding:"5px 11px",borderRadius:5,cursor:"pointer"}}>← {t.back}</button>
        <div style={{fontFamily:"monospace",fontSize:13,letterSpacing:2}}>Ψ GizlinDünya</div>
        <div style={{width:60}}/>
      </nav>
      <div style={{maxWidth:480,margin:"0 auto",padding:"85px 16px 60px"}}>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:26,marginBottom:24,textAlign:"center"}}>{t.my_profile}</h2>
        <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>{t.age}</label>
        <input type="number" value={myAge} onChange={e=>setMyAge(e.target.value)} placeholder="25" style={{...inp,marginBottom:12}}/>
        <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>{t.country}</label>
        <select value={myCountry} onChange={e=>setMyCountry(e.target.value)} style={{...inp,marginBottom:12}}>{COUNTRIES.filter(c=>c!=="🌍 All").map(c=><option key={c} value={c}>{c}</option>)}</select>
        <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>{t.city}</label>
        <input type="text" value={myCity} onChange={e=>setMyCity(e.target.value)} placeholder={t.city_ph} style={{...inp,marginBottom:12}}/>
        <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>{t.about_label}</label>
        <textarea value={myAbout} onChange={e=>setMyAbout(e.target.value)} placeholder={t.about_ph} style={{...inp,height:90,resize:"none",fontFamily:"sans-serif",marginBottom:12}}/>
        <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>{t.interests_label}</label>
        <input type="text" value={myInterests} onChange={e=>setMyInterests(e.target.value)} placeholder={t.interests_ph} style={{...inp,marginBottom:20}}/>
        <button onClick={()=>{setSaved(true);setTimeout(()=>{setSaved(false);setView("list")},1500)}} style={{width:"100%",background:"linear-gradient(135deg,#534AB7,#7F77DD)",border:"none",color:"white",fontFamily:"monospace",fontSize:13,padding:12,borderRadius:8,cursor:"pointer"}}>{saved?t.saved:t.save}</button>
      </div>
    </div>
  )
  return(
    <div style={{minHeight:"100vh",background:"#07070f",color:"#EEEDFE",fontFamily:"sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(7,7,15,0.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(127,119,221,0.12)",gap:8,flexWrap:"wrap"}}>
        <a href="/" style={{fontFamily:"monospace",fontSize:13,letterSpacing:2,color:"#EEEDFE",textDecoration:"none"}}>Ψ GizlinDünya</a>
        <div style={{display:"flex",gap:3}}>
          {(["tk","ru","tr","en"] as Lang[]).map(lg=>(
            <button key={lg} onClick={()=>setLang(lg)} style={{background:lang===lg?"#534AB7":"none",border:"1px solid",borderColor:lang===lg?"#7F77DD":"rgba(127,119,221,0.2)",color:lang===lg?"white":"#9F9AEC",fontFamily:"monospace",fontSize:10,padding:"3px 6px",borderRadius:3,cursor:"pointer"}}>{lg.toUpperCase()}</button>
          ))}
        </div>
        {user&&<button onClick={()=>setView("create")} style={{background:"#534AB7",border:"none",color:"white",fontFamily:"monospace",fontSize:10,padding:"6px 12px",borderRadius:6,cursor:"pointer"}}>+ {t.create}</button>}
      </nav>
      <div style={{padding:"78px 14px 40px",maxWidth:1080,margin:"0 auto"}}>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(22px,4vw,36px)",marginBottom:6,textAlign:"center"}}>{t.title}</h1>
        <p style={{color:"#555470",fontFamily:"monospace",fontSize:11,textAlign:"center",marginBottom:24,letterSpacing:1}}>{filtered.length} profiles</p>
        <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`🔍 ${t.search}...`} style={{flex:1,minWidth:180,...inp,marginBottom:0}}/>
          <button onClick={()=>setShowFilter(!showFilter)} style={{background:showFilter?"rgba(127,119,221,0.12)":"#0d0d1a",border:"1px solid",borderColor:showFilter?"#7F77DD":"rgba(127,119,221,0.2)",color:showFilter?"#7F77DD":"#9F9AEC",fontFamily:"monospace",fontSize:11,padding:"9px 14px",borderRadius:7,cursor:"pointer",flexShrink:0}}>⚙ {t.filter}</button>
        </div>
        {showFilter&&(
          <div style={{background:"#0d0d1a",border:"1px solid rgba(127,119,221,0.15)",borderRadius:12,padding:"16px 14px",marginBottom:14}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:12}}>
              <div>
                <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:4}}>{t.age_from}</label>
                <input type="number" value={ageFrom} onChange={e=>setAgeFrom(e.target.value)} placeholder="18" style={{...inp,marginBottom:0}}/>
              </div>
              <div>
                <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:4}}>{t.age_to}</label>
                <input type="number" value={ageTo} onChange={e=>setAgeTo(e.target.value)} placeholder="40" style={{...inp,marginBottom:0}}/>
              </div>
              <div>
                <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:4}}>{t.city}</label>
                <input type="text" value={cityFilter} onChange={e=>setCityFilter(e.target.value)} placeholder="Aşgabat..." style={{...inp,marginBottom:0}}/>
              </div>
              <div>
                <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:4}}>Sort</label>
                <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{...inp,marginBottom:0}}>
                  <option value="new">{t.sort_new}</option>
                  <option value="online">{t.sort_online}</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:6}}>{t.country}</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {COUNTRIES.map(c=>(
                  <button key={c} onClick={()=>setCountry(c)} style={{background:country===c?"rgba(127,119,221,0.15)":"none",border:"1px solid",borderColor:country===c?"#7F77DD":"rgba(127,119,221,0.15)",color:country===c?"#7F77DD":"#555470",fontFamily:"monospace",fontSize:10,padding:"4px 10px",borderRadius:14,cursor:"pointer"}}>{c}</button>
                ))}
              </div>
            </div>
            <button onClick={reset} style={{background:"none",border:"1px solid rgba(127,119,221,0.15)",color:"#555470",fontFamily:"monospace",fontSize:10,padding:"5px 12px",borderRadius:6,cursor:"pointer",marginTop:12}}>✕ {t.reset}</button>
          </div>
        )}
        {filtered.length===0?(
          <p style={{textAlign:"center",color:"#555470",fontFamily:"monospace",padding:"60px 0"}}>{t.empty}</p>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:12}}>
            {filtered.map((p,i)=>(
              <div key={p.id} style={{background:"#0d0d1a",border:"1px solid rgba(127,119,221,0.12)",borderRadius:13,padding:"18px 16px"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                  <div style={{width:40,height:40,borderRadius:"50%",background:`linear-gradient(135deg,${COLORS[i%COLORS.length]},#0d0d1a)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:11,color:"white",border:`2px solid ${COLORS[i%COLORS.length]}50`,flexShrink:0}}>{p.anon_code?.slice(-2)}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"monospace",fontSize:11,color:"#7F77DD",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.anon_code}</div>
                    <div style={{fontFamily:"monospace",fontSize:10,color:"#555470",marginTop:2}}>{p.age&&`${p.age} · `}{p.country}</div>
                  </div>
                  <div style={{width:8,height:8,borderRadius:"50%",background:p.online?"#1D9E75":"#333",flexShrink:0}}/>
                </div>
                <p style={{fontSize:12,color:"#9F9AEC",lineHeight:1.6,marginBottom:12,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.about}</p>
                {p.interests&&p.interests.length>0&&(
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>
                    {p.interests.slice(0,3).map((int:string,j:number)=>(
                      <span key={j} style={{fontFamily:"monospace",fontSize:9,padding:"2px 7px",borderRadius:9,background:`${COLORS[j%COLORS.length]}15`,color:COLORS[j%COLORS.length],border:`1px solid ${COLORS[j%COLORS.length]}30`}}>{int}</span>
                    ))}
                  </div>
                )}
                <button onClick={()=>openChat(p)} style={{width:"100%",background:"none",border:"1px solid rgba(127,119,221,0.22)",color:"#7F77DD",fontFamily:"monospace",fontSize:11,padding:"7px",borderRadius:7,cursor:"pointer"}}>💬 {t.send}</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`*{box-sizing:border-box}`}</style>
    </div>
  )
}
