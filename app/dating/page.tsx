"use client"
import { useState, useEffect } from "react"
type Lang = "tk" | "ru" | "tr" | "en"
const T:any = {
  tk:{title:"Anonim Tanyşlyk",search:"Gözle...",empty:"Anketa ýok",send:"Ýaz",back:"Yza",msg:"Habar...",send_btn:"Iber",create:"+ Anketa dör",my_profile:"Meniň anketam",save:"Sakla",saved:"Saklandi!",about_ph:"Özüň hakda...",city_ph:"Şäheriň...",interests_ph:"sport, sungat...",reset:"Arassala",online_now:"Onlaýn",apply:"Ullan",filter_title:"Süzgüç"},
  ru:{title:"Анонимные знакомства",search:"Поиск...",empty:"Анкет пока нет",send:"Написать",back:"Назад",msg:"Сообщение...",send_btn:"Отправить",create:"+ Создать анкету",my_profile:"Моя анкета",save:"Сохранить",saved:"Сохранено!",about_ph:"О себе...",city_ph:"Город...",interests_ph:"спорт, музыка...",reset:"Сбросить",online_now:"Онлайн",apply:"Применить",filter_title:"Фильтры"},
  tr:{title:"Anonim Tanışma",search:"Ara...",empty:"Profil yok",send:"Yaz",back:"Geri",msg:"Mesaj...",send_btn:"Gönder",create:"+ Profil oluştur",my_profile:"Profilim",save:"Kaydet",saved:"Kaydedildi!",about_ph:"Hakkında...",city_ph:"Şehir...",interests_ph:"spor, müzik...",reset:"Sıfırla",online_now:"Çevrimiçi",apply:"Uygula",filter_title:"Filtreler"},
  en:{title:"Anonymous Dating",search:"Search...",empty:"No profiles yet",send:"Message",back:"Back",msg:"Message...",send_btn:"Send",create:"+ Create profile",my_profile:"My profile",save:"Save",saved:"Saved!",about_ph:"About you...",city_ph:"City...",interests_ph:"sport, music...",reset:"Reset",online_now:"Online",apply:"Apply",filter_title:"Filters"}
}
const COUNTRIES=["🌍 All","🇹🇲 Turkmenistan","🇷🇺 Russia","🇺🇿 Uzbekistan","🇰🇿 Kazakhstan","🇹🇷 Turkey","🇦🇿 Azerbaijan","🇩🇪 Germany","🇦🇪 UAE","🇺🇸 USA","🇬🇧 UK","🇺🇦 Ukraine","🇰🇬 Kyrgyzstan","🇹🇯 Tajikistan","🇦🇲 Armenia","🇬🇪 Georgia","🇵🇱 Poland","🇧🇾 Belarus","🇲🇩 Moldova"]
const ZODIAC=["⭐ All","♈ Aries","♉ Taurus","♊ Gemini","♋ Cancer","♌ Leo","♍ Virgo","♎ Libra","♏ Scorpio","♐ Sagittarius","♑ Capricorn","♒ Aquarius","♓ Pisces"]
const GENDERS=["👤 All","👨 Male","👩 Female","🌈 Other"]
const CITIES=["All","Aşgabat","Mary","Türkmenabat","Balkan","Daşoguz","Moscow","Istanbul","Tashkent","Almaty","Dubai","Berlin","London","New York"]
const COLORS=["#7F77DD","#1D9E75","#ff6b6b","#534AB7","#5DCAA5","#AFA9EC","#F0997B","#EF9F27"]
const SAMPLE=[
  {id:"1",anon_code:"ANON#A7K2P1",age:23,city:"Aşgabat",country:"🇹🇲 Turkmenistan",about:"Kitap okamak we syýahat etmek halaýan. Täze adamlar bilen tanyşmak isleýärin.",interests:["kitap","syýahat","sungat"],online:true,gender:"👩 Female",zodiac:"♌ Leo"},
  {id:"2",anon_code:"ANON#B3M8X4",age:27,city:"Moscow",country:"🇷🇺 Russia",about:"Музыку слушаю, читаю философию. Ищу интересного собеседника.",interests:["музыка","философия","кино"],online:false,gender:"👨 Male",zodiac:"♏ Scorpio"},
  {id:"3",anon_code:"ANON#C9L5Q7",age:21,city:"Mary",country:"🇹🇲 Turkmenistan",about:"Sport we fitnes bilen meşgullanýaryn. Aktiv adamlar bilen tanyşmak.",interests:["sport","fitnes","tebigat"],online:true,gender:"👨 Male",zodiac:"♈ Aries"},
  {id:"4",anon_code:"ANON#D2N6R3",age:25,city:"Istanbul",country:"🇹🇷 Turkey",about:"Люблю готовить и путешествовать. Ищу душевного общения.",interests:["кулинария","путешествия","йога"],online:false,gender:"👩 Female",zodiac:"♎ Libra"},
  {id:"5",anon_code:"ANON#E8P4S6",age:29,city:"Tashkent",country:"🇺🇿 Uzbekistan",about:"Tehnologiýa we programmirleme bilen gyzyklanýaryn.",interests:["tech","coding","games"],online:true,gender:"👨 Male",zodiac:"♊ Gemini"},
  {id:"6",anon_code:"ANON#F1T7U9",age:24,city:"Almaty",country:"🇰🇿 Kazakhstan",about:"Рисую, пишу стихи. Творческий человек ищет единомышленников.",interests:["рисование","поэзия","театр"],online:false,gender:"👩 Female",zodiac:"♓ Pisces"},
  {id:"7",anon_code:"ANON#G5R3W2",age:22,city:"Berlin",country:"🇩🇪 Germany",about:"Student. Love music and traveling. Looking for interesting people.",interests:["music","travel","photography"],online:true,gender:"🌈 Other",zodiac:"♒ Aquarius"},
  {id:"8",anon_code:"ANON#H8S6Y4",age:30,city:"Dubai",country:"🇦🇪 UAE",about:"Бизнес и саморазвитие. Ищу интересных людей для общения.",interests:["бизнес","спорт","путешествия"],online:false,gender:"👨 Male",zodiac:"♑ Capricorn"},
]
export default function DatingPage(){
  const [lang,setLang]=useState<"tk"|"ru"|"tr"|"en">("tk")
  const [view,setView]=useState<"list"|"create"|"chat">("list")
  const [filtered,setFiltered]=useState(SAMPLE)
  const [selected,setSelected]=useState<any>(null)
  const [user,setUser]=useState<any>(null)
  const [showFilter,setShowFilter]=useState(false)
  const [search,setSearch]=useState("")
  const [ageFrom,setAgeFrom]=useState(16)
  const [ageTo,setAgeTo]=useState(60)
  const [country,setCountry]=useState("🌍 All")
  const [city,setCity]=useState("All")
  const [zodiac,setZodiac]=useState("⭐ All")
  const [gender,setGender]=useState("👤 All")
  const [msgText,setMsgText]=useState("")
  const [messages,setMessages]=useState<any[]>([])
  const [myAbout,setMyAbout]=useState("")
  const [myAge,setMyAge]=useState("")
  const [myCity,setMyCity]=useState("")
  const [myCountry,setMyCountry]=useState("🇹🇲 Turkmenistan")
  const [myGender,setMyGender]=useState("👨 Male")
  const [myZodiac,setMyZodiac]=useState("♈ Aries")
  const [myInterests,setMyInterests]=useState("")
  const [saved,setSaved]=useState(false)
  const t=T[lang]
  useEffect(()=>{const s=localStorage.getItem("gd_user");if(s)setUser(JSON.parse(s))},[])
  useEffect(()=>{
    let r=[...SAMPLE]
    if(search)r=r.filter(p=>p.about.toLowerCase().includes(search.toLowerCase())||p.city.toLowerCase().includes(search.toLowerCase())||p.interests.join(" ").toLowerCase().includes(search.toLowerCase()))
    r=r.filter(p=>p.age>=ageFrom&&p.age<=ageTo)
    if(country!=="🌍 All")r=r.filter(p=>p.country===country)
    if(city!=="All")r=r.filter(p=>p.city===city)
    if(zodiac!=="⭐ All")r=r.filter(p=>p.zodiac===zodiac)
    if(gender!=="👤 All")r=r.filter(p=>p.gender===gender)
    setFiltered(r)
  },[search,ageFrom,ageTo,country,city,zodiac,gender])
  function reset(){setSearch("");setAgeFrom(16);setAgeTo(60);setCountry("🌍 All");setCity("All");setZodiac("⭐ All");setGender("👤 All")}
  function openChat(p:any){setSelected(p);setView("chat");setMessages([{from:"them",text:p.about}])}
  const chip=(label:string,active:boolean,onClick:()=>void,color="#7F77DD")=>(
    <button onClick={onClick} style={{background:active?`${color}20`:"none",border:`1px solid`,borderColor:active?color:"rgba(127,119,221,0.15)",color:active?color:"#555470",fontFamily:"monospace",fontSize:11,padding:"5px 12px",borderRadius:20,cursor:"pointer",whiteSpace:"nowrap" as const,transition:"all 0.15s"}}>{label}</button>
  )
  const inp={width:"100%",background:"#07070f",border:"1px solid rgba(127,119,221,0.2)",color:"#EEEDFE",fontFamily:"monospace",fontSize:12,padding:"9px 12px",borderRadius:7,outline:"none",boxSizing:"border-box" as const}
  if(view==="chat"&&selected)return(
    <div style={{minHeight:"100vh",background:"#07070f",color:"#EEEDFE",fontFamily:"sans-serif",display:"flex",flexDirection:"column"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"11px 14px",display:"flex",alignItems:"center",gap:10,background:"rgba(7,7,15,0.95)",borderBottom:"1px solid rgba(127,119,221,0.12)"}}>
        <button onClick={()=>setView("list")} style={{background:"none",border:"1px solid rgba(127,119,221,0.2)",color:"#9F9AEC",fontFamily:"monospace",fontSize:11,padding:"5px 11px",borderRadius:5,cursor:"pointer"}}>← {t.back}</button>
        <div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#534AB7,#1D9E75)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:10,color:"white",flexShrink:0}}>{selected.anon_code?.slice(-2)}</div>
        <div>
          <div style={{fontFamily:"monospace",fontSize:12,color:"#7F77DD"}}>{selected.anon_code}</div>
          <div style={{fontFamily:"monospace",fontSize:10,color:selected.online?"#1D9E75":"#555470"}}>{selected.online?"● "+t.online_now:"○ offline"}</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:6}}>
          <span style={{fontFamily:"monospace",fontSize:11,color:"#534AB7"}}>{selected.zodiac}</span>
          <span style={{fontFamily:"monospace",fontSize:11,color:"#555470"}}>{selected.gender}</span>
        </div>
      </nav>
      <div style={{flex:1,padding:"75px 14px 90px",maxWidth:660,margin:"0 auto",width:"100%"}}>
        <div style={{background:"#0d0d1a",border:"1px solid rgba(127,119,221,0.1)",borderRadius:12,padding:"14px 16px",marginBottom:16}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:"#555470",marginBottom:6}}>{selected.country} · {selected.city} · {selected.age}y</div>
          <p style={{fontSize:13,color:"#9F9AEC",lineHeight:1.6,margin:0}}>{selected.about}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:10}}>
            {selected.interests.map((i:string,j:number)=><span key={j} style={{fontFamily:"monospace",fontSize:10,padding:"2px 8px",borderRadius:9,background:`${COLORS[j%COLORS.length]}15`,color:COLORS[j%COLORS.length],border:`1px solid ${COLORS[j%COLORS.length]}30`}}>{i}</span>)}
          </div>
        </div>
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.from==="me"?"flex-end":"flex-start",marginBottom:10}}>
            <div style={{background:m.from==="me"?"#534AB7":"#0d0d1a",border:"1px solid",borderColor:m.from==="me"?"#7F77DD":"rgba(127,119,221,0.15)",borderRadius:12,padding:"9px 13px",maxWidth:"78%",fontSize:13,lineHeight:1.6,color:"#EEEDFE"}}>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:660,padding:"10px 14px",background:"rgba(7,7,15,0.97)",borderTop:"1px solid rgba(127,119,221,0.12)",display:"flex",gap:8}}>
        <input value={msgText} onChange={e=>setMsgText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&msgText.trim()){setMessages(p=>[...p,{from:"me",text:msgText}]);setMsgText("")}}} placeholder={t.msg} style={{...inp,flex:1}}/>
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
        <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>AGE</label>
        <input type="number" value={myAge} onChange={e=>setMyAge(e.target.value)} placeholder="25" style={{...inp,marginBottom:12}}/>
        <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:8}}>GENDER</label>
        <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
          {["👨 Male","👩 Female","🌈 Other"].map(g=>chip(g,myGender===g,()=>setMyGender(g)))}
        </div>
        <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:8}}>ZODIAC</label>
        <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap"}}>
          {ZODIAC.filter(z=>z!=="⭐ All").map(z=>chip(z,myZodiac===z,()=>setMyZodiac(z),"#534AB7"))}
        </div>
        <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>COUNTRY</label>
        <select value={myCountry} onChange={e=>setMyCountry(e.target.value)} style={{...inp,marginBottom:12}}>{COUNTRIES.filter(c=>c!=="🌍 All").map(c=><option key={c} value={c}>{c}</option>)}</select>
        <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>CITY</label>
        <input type="text" value={myCity} onChange={e=>setMyCity(e.target.value)} placeholder={t.city_ph} style={{...inp,marginBottom:12}}/>
        <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>ABOUT</label>
        <textarea value={myAbout} onChange={e=>setMyAbout(e.target.value)} placeholder={t.about_ph} style={{...inp,height:90,resize:"none",fontFamily:"sans-serif",marginBottom:12}}/>
        <label style={{fontFamily:"monospace",fontSize:10,color:"#9F9AEC",display:"block",marginBottom:5}}>INTERESTS</label>
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
          {(["tk","ru","tr","en"] as ("tk"|"ru"|"tr"|"en")[]).map(lg=>(
            <button key={lg} onClick={()=>setLang(lg)} style={{background:lang===lg?"#534AB7":"none",border:"1px solid",borderColor:lang===lg?"#7F77DD":"rgba(127,119,221,0.2)",color:lang===lg?"white":"#9F9AEC",fontFamily:"monospace",fontSize:10,padding:"3px 6px",borderRadius:3,cursor:"pointer"}}>{lg.toUpperCase()}</button>
          ))}
        </div>
        {user&&<button onClick={()=>setView("create")} style={{background:"#534AB7",border:"none",color:"white",fontFamily:"monospace",fontSize:10,padding:"6px 12px",borderRadius:6,cursor:"pointer"}}>{t.create}</button>}
      </nav>
      <div style={{padding:"78px 14px 40px",maxWidth:1080,margin:"0 auto"}}>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(22px,4vw,36px)",marginBottom:6,textAlign:"center"}}>{t.title}</h1>
        <p style={{color:"#555470",fontFamily:"monospace",fontSize:11,textAlign:"center",marginBottom:20,letterSpacing:1}}>{filtered.length} profiles</p>
        <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search} style={{flex:1,minWidth:180,...inp}}/>
          <button onClick={()=>setShowFilter(!showFilter)} style={{background:showFilter?"rgba(127,119,221,0.12)":"#0d0d1a",border:"1px solid",borderColor:showFilter?"#7F77DD":"rgba(127,119,221,0.2)",color:showFilter?"#7F77DD":"#9F9AEC",fontFamily:"monospace",fontSize:11,padding:"9px 16px",borderRadius:7,cursor:"pointer",flexShrink:0}}>⚙ {t.filter}</button>
        </div>
        {showFilter&&(
          <div style={{background:"#0d0d1a",border:"1px solid rgba(127,119,221,0.2)",borderRadius:14,padding:"20px 16px",marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <span style={{fontFamily:"monospace",fontSize:12,color:"#7F77DD",letterSpacing:1}}>⚙ {t.filter_title}</span>
              <button onClick={reset} style={{background:"none",border:"1px solid rgba(127,119,221,0.2)",color:"#555470",fontFamily:"monospace",fontSize:10,padding:"4px 12px",borderRadius:6,cursor:"pointer"}}>✕ {t.reset}</button>
            </div>
            {/* AGE SLIDER */}
            <div style={{marginBottom:18}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontFamily:"monospace",fontSize:11,color:"#9F9AEC"}}>👤 Age</span>
                <span style={{fontFamily:"monospace",fontSize:11,color:"#7F77DD"}}>{ageFrom} — {ageTo}</span>
              </div>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <span style={{fontFamily:"monospace",fontSize:10,color:"#555470",width:20}}>{ageFrom}</span>
                <input type="range" min={16} max={60} value={ageFrom} onChange={e=>setAgeFrom(Math.min(parseInt(e.target.value),ageTo-1))} style={{flex:1,accentColor:"#7F77DD"}}/>
                <input type="range" min={16} max={60} value={ageTo} onChange={e=>setAgeTo(Math.max(parseInt(e.target.value),ageFrom+1))} style={{flex:1,accentColor:"#534AB7"}}/>
                <span style={{fontFamily:"monospace",fontSize:10,color:"#555470",width:20}}>{ageTo}</span>
              </div>
            </div>
            {/* GENDER */}
            <div style={{marginBottom:16}}>
              <div style={{fontFamily:"monospace",fontSize:11,color:"#9F9AEC",marginBottom:8}}>⚧ Gender</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {GENDERS.map(g=>chip(g,gender===g,()=>setGender(g),"#ff6b6b"))}
              </div>
            </div>
            {/* ZODIAC */}
            <div style={{marginBottom:16}}>
              <div style={{fontFamily:"monospace",fontSize:11,color:"#9F9AEC",marginBottom:8}}>✨ Zodiac</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {ZODIAC.map(z=>chip(z,zodiac===z,()=>setZodiac(z),"#534AB7"))}
              </div>
            </div>
            {/* COUNTRY */}
            <div style={{marginBottom:16}}>
              <div style={{fontFamily:"monospace",fontSize:11,color:"#9F9AEC",marginBottom:8}}>🌍 Country</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",maxHeight:120,overflowY:"auto"}}>
                {COUNTRIES.map(c=>chip(c,country===c,()=>setCountry(c),"#1D9E75"))}
              </div>
            </div>
            {/* CITY */}
            <div>
              <div style={{fontFamily:"monospace",fontSize:11,color:"#9F9AEC",marginBottom:8}}>🏙 City</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {CITIES.map(c=>chip(c,city===c,()=>setCity(c),"#5DCAA5"))}
              </div>
            </div>
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
                    <div style={{fontFamily:"monospace",fontSize:10,color:"#555470",marginTop:2}}>{p.age}y · {p.country.split(" ")[0]}</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:p.online?"#1D9E75":"#333"}}/>
                    <span style={{fontSize:12}}>{p.zodiac.split(" ")[0]}</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:5,marginBottom:10}}>
                  <span style={{fontFamily:"monospace",fontSize:10,padding:"2px 7px",borderRadius:9,background:"rgba(255,107,107,0.1)",color:"#ff6b6b",border:"1px solid rgba(255,107,107,0.2)"}}>{p.gender.split(" ")[0]} {p.gender.split(" ")[1]}</span>
                  <span style={{fontFamily:"monospace",fontSize:10,padding:"2px 7px",borderRadius:9,background:"rgba(83,74,183,0.1)",color:"#AFA9EC",border:"1px solid rgba(83,74,183,0.2)"}}>{p.city}</span>
                </div>
                <p style={{fontSize:12,color:"#9F9AEC",lineHeight:1.6,marginBottom:12,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical" as const,overflow:"hidden"}}>{p.about}</p>
                {p.interests.length>0&&(
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
      <style>{`*{box-sizing:border-box}input[type=range]{height:4px;cursor:pointer}`}</style>
    </div>
  )
}
