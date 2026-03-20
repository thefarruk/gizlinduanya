"use client"
import { useState, useEffect, useRef } from "react"
type Lang = "tk"|"ru"|"tr"|"en"
const T:any={
  tk:{title:"Anonim Tanyşlyk",search:"Gözle...",empty:"Heniz anketa ýok. Ilkinji bol!",send:"Ýaz",back:"Yza",msg:"Habar...",send_btn:"Iber",create:"+ Anketa dör",save:"Sakla",saved:"Saklandi!",reset:"Arassala",online:"Onlaýn",age:"Ýaş",height:"Boy",weight:"Agram",goal:"Maksady",serious:"Çynlakaý",friends:"Dostluk",chat:"Gepleşik",fun:"Güýmenje",smoking:"Çilim",alcohol:"Alkogol",zodiac:"Zodiak",country:"Ýurt",city:"Şäher",any:"Islendik",male:"Oglan",female:"Gyz",no:"Ýok",sometimes:"Käwagt",yes:"Hawa",filters:"Süzgüçler",about_ph:"Özüň hakda...",city_ph:"Şäheriň...",interests_ph:"sport, sungat...",my_profile:"Meniň anketam",loading:"Ýüklenýär..."},
  ru:{title:"Анонимные знакомства",search:"Поиск...",empty:"Анкет пока нет. Будь первым!",send:"Написать",back:"Назад",msg:"Сообщение...",send_btn:"Отправить",create:"+ Создать анкету",save:"Сохранить",saved:"Сохранено!",reset:"Сбросить",online:"Онлайн",age:"Возраст",height:"Рост",weight:"Вес",goal:"Цель",serious:"Серьёзные",friends:"Дружба",chat:"Общение",fun:"Флирт",smoking:"Курение",alcohol:"Алкоголь",zodiac:"Зодиак",country:"Страна",city:"Город",any:"Любой",male:"Парня",female:"Девушку",no:"Нет",sometimes:"Иногда",yes:"Да",filters:"Фильтры",about_ph:"О себе...",city_ph:"Город...",interests_ph:"спорт, музыка...",my_profile:"Моя анкета",loading:"Загрузка..."},
  tr:{title:"Anonim Tanışma",search:"Ara...",empty:"Henüz profil yok. İlk sen ol!",send:"Yaz",back:"Geri",msg:"Mesaj...",send_btn:"Gönder",create:"+ Profil oluştur",save:"Kaydet",saved:"Kaydedildi!",reset:"Sıfırla",online:"Çevrimiçi",age:"Yaş",height:"Boy",weight:"Kilo",goal:"Amaç",serious:"Ciddi",friends:"Arkadaşlık",chat:"Sohbet",fun:"Flört",smoking:"Sigara",alcohol:"Alkol",zodiac:"Burç",country:"Ülke",city:"Şehir",any:"Herhangi",male:"Erkek",female:"Kadın",no:"Hayır",sometimes:"Bazen",yes:"Evet",filters:"Filtreler",about_ph:"Hakkında...",city_ph:"Şehir...",interests_ph:"spor, müzik...",my_profile:"Profilim",loading:"Yükleniyor..."},
  en:{title:"Anonymous Dating",search:"Search...",empty:"No profiles yet. Be the first!",send:"Message",back:"Back",msg:"Message...",send_btn:"Send",create:"+ Create profile",save:"Save",saved:"Saved!",reset:"Reset",online:"Online",age:"Age",height:"Height",weight:"Weight",goal:"Goal",serious:"Serious",friends:"Friendship",chat:"Chatting",fun:"Flirt",smoking:"Smoking",alcohol:"Alcohol",zodiac:"Zodiac",country:"Country",city:"City",any:"Any",male:"Male",female:"Female",no:"No",sometimes:"Sometimes",yes:"Yes",filters:"Filters",about_ph:"About you...",city_ph:"City...",interests_ph:"sport, music...",my_profile:"My profile",loading:"Loading..."}
}
const COUNTRIES=["🌍 All","🇹🇲 Turkmenistan","🇷🇺 Russia","🇺🇿 Uzbekistan","🇰🇿 Kazakhstan","🇹🇷 Turkey","🇦🇿 Azerbaijan","🇩🇪 Germany","🇦🇪 UAE","🇺🇸 USA","🇬🇧 UK","🇺🇦 Ukraine","🇰🇬 Kyrgyzstan","🇹🇯 Tajikistan","🇦🇲 Armenia","🇬🇪 Georgia","🇵🇱 Poland","🇧🇾 Belarus","🇲🇩 Moldova"]
const ZODIAC_LIST=["All","♈ Aries","♉ Taurus","♊ Gemini","♋ Cancer","♌ Leo","♍ Virgo","♎ Libra","♏ Scorpio","♐ Sagittarius","♑ Capricorn","♒ Aquarius","♓ Pisces"]
const COLORS=["#7F77DD","#1D9E75","#ff6b6b","#534AB7","#5DCAA5","#F0997B","#EF9F27","#AFA9EC"]
export default function DatingPage(){
  const [lang,setLang]=useState<Lang>("tk")
  const [view,setView]=useState<"list"|"create"|"chat"|"filter">("list")
  const [profiles,setProfiles]=useState<any[]>([])
  const [filtered,setFiltered]=useState<any[]>([])
  const [selected,setSelected]=useState<any>(null)
  const [user,setUser]=useState<any>(null)
  const [loading,setLoading]=useState(true)
  const [search,setSearch]=useState("")
  const [messages,setMessages]=useState<any[]>([])
  const [msgText,setMsgText]=useState("")
  const [showFilter,setShowFilter]=useState(false)
  const [fGender,setFGender]=useState("any")
  const [fAgeFrom,setFAgeFrom]=useState(16)
  const [fAgeTo,setFAgeTo]=useState(60)
  const [fHeightFrom,setFHeightFrom]=useState(150)
  const [fHeightTo,setFHeightTo]=useState(220)
  const [fWeightFrom,setFWeightFrom]=useState(40)
  const [fWeightTo,setFWeightTo]=useState(160)
  const [fGoals,setFGoals]=useState<string[]>([])
  const [fSmoking,setFSmoking]=useState("any")
  const [fAlcohol,setFAlcohol]=useState("any")
  const [fZodiac,setFZodiac]=useState("All")
  const [fCountry,setFCountry]=useState("🌍 All")
  const [myPhoto,setMyPhoto]=useState<string|null>(null)
  const [myGender,setMyGender]=useState("male")
  const [myAge,setMyAge]=useState("")
  const [myHeight,setMyHeight]=useState("")
  const [myWeight,setMyWeight]=useState("")
  const [myZodiac,setMyZodiac]=useState("♈ Aries")
  const [myCountry,setMyCountry]=useState("🇹🇲 Turkmenistan")
  const [myCity,setMyCity]=useState("")
  const [myAbout,setMyAbout]=useState("")
  const [myGoals,setMyGoals]=useState<string[]>([])
  const [mySmoking,setMySmoking]=useState("no")
  const [myAlcohol,setMyAlcohol]=useState("no")
  const [myInterests,setMyInterests]=useState<string[]>([])
  const [saved,setSaved]=useState(false)
  const fileRef=useRef<HTMLInputElement>(null)
  const t=T[lang]
  useEffect(()=>{
    const s=localStorage.getItem("gd_user")
    if(s)setUser(JSON.parse(s))
    loadProfiles()
  },[])
  useEffect(()=>{applyFilters()},[search,fGender,fAgeFrom,fAgeTo,fHeightFrom,fHeightTo,fWeightFrom,fWeightTo,fGoals,fSmoking,fAlcohol,fZodiac,fCountry,profiles])
  async function loadProfiles(){
    setLoading(true)
    try{
      const r=await fetch("/api/profiles")
      const d=await r.json()
      setProfiles(d.profiles||[])
    }catch(e){setProfiles([])}
    finally{setLoading(false)}
  }
  function applyFilters(){
    let r=[...profiles]
    if(search)r=r.filter((p:any)=>p.about?.toLowerCase().includes(search.toLowerCase())||p.city?.toLowerCase().includes(search.toLowerCase()))
    if(fGender!=="any")r=r.filter((p:any)=>p.gender===fGender)
    r=r.filter((p:any)=>{const a=p.age||0;return a>=fAgeFrom&&a<=fAgeTo})
    if(fGoals.length>0)r=r.filter((p:any)=>fGoals.some((g:string)=>p.goal?.includes(g)))
    if(fSmoking!=="any")r=r.filter((p:any)=>p.smoking===fSmoking)
    if(fAlcohol!=="any")r=r.filter((p:any)=>p.alcohol===fAlcohol)
    if(fZodiac!=="All")r=r.filter((p:any)=>p.zodiac===fZodiac)
    if(fCountry!=="🌍 All")r=r.filter((p:any)=>p.country===fCountry)
    setFiltered(r)
  }
  function resetFilters(){setFGender("any");setFAgeFrom(16);setFAgeTo(60);setFHeightFrom(150);setFHeightTo(220);setFWeightFrom(40);setFWeightTo(160);setFGoals([]);setFSmoking("any");setFAlcohol("any");setFZodiac("All");setFCountry("🌍 All")}
  function toggleArr(arr:string[],setArr:(a:string[])=>void,val:string){setArr(arr.includes(val)?arr.filter((x:string)=>x!==val):[...arr,val])}
  function handlePhoto(e:React.ChangeEvent<HTMLInputElement>){const f=e.target.files?.[0];if(f){const r=new FileReader();r.onload=ev=>setMyPhoto(ev.target?.result as string);r.readAsDataURL(f)}}
  async function saveProfile(){
    if(!user)return
    try{
      const r=await fetch("/api/profiles",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({anon_code:user?.anon_code,about:myAbout,age:parseInt(myAge)||null,city:myCity,country:myCountry,gender:myGender,zodiac:myZodiac,height:parseInt(myHeight)||null,weight:parseInt(myWeight)||null,smoking:mySmoking,alcohol:myAlcohol,goal:myGoals,interests:myInterests,lang})})
      const d=await r.json()
      if(d.success){setSaved(true);await loadProfiles();setTimeout(()=>{setSaved(false);setView("list")},1000)}
    }catch(e){console.log(e)}
  }
  function openChat(p:any){setSelected(p);setView("chat");setMessages([{from:"them",text:p.about||"..."}])}
  const chip=(label:string,active:boolean,onClick:()=>void,color="#7F77DD")=>(
    <button onClick={onClick} style={{padding:"6px 14px",borderRadius:50,border:"1px solid",borderColor:active?color:"#ddd",background:active?color:"#fff",color:active?"#fff":"#555",fontSize:13,cursor:"pointer",margin:"3px"}}>{label}</button>
  )
  const slider=(label:string,from:number,to:number,min:number,max:number,unit:string,setFrom:(n:number)=>void,setTo:(n:number)=>void)=>(
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <span style={{fontSize:14,color:"#333"}}>{label}</span>
        <span style={{fontSize:14,fontWeight:500}}>{from}–{to} {unit}</span>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <input type="range" min={min} max={max} value={from} onChange={e=>setFrom(Math.min(parseInt(e.target.value),to-1))} style={{flex:1,accentColor:"#111"}}/>
        <input type="range" min={min} max={max} value={to} onChange={e=>setTo(Math.max(parseInt(e.target.value),from+1))} style={{flex:1,accentColor:"#534AB7"}}/>
      </div>
    </div>
  )
  const inp={width:"100%",background:"#f8f8f8",border:"1px solid #eee",color:"#111",fontFamily:"sans-serif",fontSize:14,padding:"11px 14px",borderRadius:10,outline:"none",boxSizing:"border-box" as const,marginBottom:10}
  if(view==="filter")return(
    <div style={{minHeight:"100vh",background:"#fff",color:"#111",fontFamily:"sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fff",borderBottom:"1px solid #f0f0f0"}}>
        <button onClick={()=>setView("list")} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>←</button>
        <span style={{fontSize:16,fontWeight:600}}>{t.filters}</span>
        <button onClick={resetFilters} style={{background:"none",border:"none",color:"#888",fontSize:13,cursor:"pointer"}}>{t.reset}</button>
      </nav>
      <div style={{padding:"70px 16px 100px",maxWidth:500,margin:"0 auto"}}>
        <div style={{marginBottom:24}}>
          <div style={{fontSize:14,color:"#888",marginBottom:12}}>Пол</div>
          <div style={{display:"flex",gap:10}}>
            {[{v:"any",l:t.any},{v:"male",l:t.male},{v:"female",l:t.female}].map(g=>(
              <button key={g.v} onClick={()=>setFGender(g.v)} style={{flex:1,padding:"12px 0",borderRadius:50,border:"1px solid",borderColor:fGender===g.v?"#111":"#ddd",background:fGender===g.v?"#111":"#fff",color:fGender===g.v?"#fff":"#333",fontSize:14,fontWeight:500,cursor:"pointer"}}>{g.l}</button>
            ))}
          </div>
        </div>
        {slider(t.age,fAgeFrom,fAgeTo,16,60,"",setFAgeFrom,setFAgeTo)}
        {slider(t.height,fHeightFrom,fHeightTo,140,220,"cm",setFHeightFrom,setFHeightTo)}
        {slider(t.weight,fWeightFrom,fWeightTo,40,160,"kg",setFWeightFrom,setFWeightTo)}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:14,color:"#888",marginBottom:10}}>❤️ {t.goal}</div>
          {[{v:"serious",l:t.serious},{v:"friends",l:t.friends},{v:"chat",l:t.chat},{v:"fun",l:t.fun}].map(g=>(
            <div key={g.v} onClick={()=>toggleArr(fGoals,setFGoals,g.v)} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #fafafa",cursor:"pointer"}}>
              <span style={{fontSize:14}}>{g.l}</span>
              <div style={{width:20,height:20,borderRadius:4,border:`2px solid ${fGoals.includes(g.v)?"#111":"#ddd"}`,background:fGoals.includes(g.v)?"#111":"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>{fGoals.includes(g.v)&&<span style={{color:"#fff",fontSize:11}}>✓</span>}</div>
            </div>
          ))}
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:14,color:"#888",marginBottom:8}}>✨ {t.zodiac}</div>
          <select value={fZodiac} onChange={e=>setFZodiac(e.target.value)} style={inp}>{ZODIAC_LIST.map(z=><option key={z} value={z}>{z}</option>)}</select>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:14,color:"#888",marginBottom:8}}>🌍 {t.country}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,maxHeight:150,overflowY:"auto"}}>
            {COUNTRIES.map(c=>chip(c,fCountry===c,()=>setFCountry(c),"#1D9E75"))}
          </div>
        </div>
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,padding:"12px 16px",background:"#fff",borderTop:"1px solid #f0f0f0"}}>
        <button onClick={()=>setView("list")} style={{width:"100%",background:"#111",border:"none",color:"#fff",fontSize:15,fontWeight:600,padding:"14px",borderRadius:50,cursor:"pointer"}}>{t.filters} · {filtered.length}</button>
      </div>
    </div>
  )
  if(view==="chat"&&selected)return(
    <div style={{minHeight:"100vh",background:"#07070f",color:"#EEEDFE",fontFamily:"sans-serif",display:"flex",flexDirection:"column"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"11px 14px",display:"flex",alignItems:"center",gap:10,background:"rgba(7,7,15,0.95)",borderBottom:"1px solid rgba(127,119,221,0.12)"}}>
        <button onClick={()=>setView("list")} style={{background:"none",border:"1px solid rgba(127,119,221,0.2)",color:"#9F9AEC",fontFamily:"monospace",fontSize:11,padding:"5px 11px",borderRadius:5,cursor:"pointer"}}>← {t.back}</button>
        <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#534AB7,#1D9E75)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:11,color:"white",flexShrink:0}}>{selected.anon_code?.slice(-2)}</div>
        <span style={{fontFamily:"monospace",fontSize:12,color:"#7F77DD"}}>{selected.anon_code}</span>
      </nav>
      <div style={{flex:1,padding:"75px 14px 90px",maxWidth:660,margin:"0 auto",width:"100%"}}>
        {messages.map((m:any,i:number)=>(
          <div key={i} style={{display:"flex",justifyContent:m.from==="me"?"flex-end":"flex-start",marginBottom:10}}>
            <div style={{background:m.from==="me"?"#534AB7":"#0d0d1a",border:"1px solid",borderColor:m.from==="me"?"#7F77DD":"rgba(127,119,221,0.15)",borderRadius:12,padding:"9px 13px",maxWidth:"78%",fontSize:13,lineHeight:1.6}}>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:660,padding:"10px 14px",background:"rgba(7,7,15,0.97)",borderTop:"1px solid rgba(127,119,221,0.12)",display:"flex",gap:8}}>
        <input value={msgText} onChange={e=>setMsgText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&msgText.trim()){setMessages((p:any)=>[...p,{from:"me",text:msgText}]);setMsgText("")}}} placeholder={t.msg} style={{flex:1,background:"#0d0d1a",border:"1px solid rgba(127,119,221,0.2)",color:"#EEEDFE",fontFamily:"monospace",fontSize:13,padding:"10px 13px",borderRadius:8,outline:"none"}}/>
        <button onClick={()=>{if(msgText.trim()){setMessages((p:any)=>[...p,{from:"me",text:msgText}]);setMsgText("")}}} style={{background:"#534AB7",border:"none",color:"white",fontFamily:"monospace",fontSize:11,padding:"9px 16px",borderRadius:7,cursor:"pointer"}}>{t.send_btn}</button>
      </div>
    </div>
  )
  if(view==="create")return(
    <div style={{minHeight:"100vh",background:"#fff",color:"#111",fontFamily:"sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fff",borderBottom:"1px solid #f0f0f0"}}>
        <button onClick={()=>setView("list")} style={{background:"none",border:"none",fontSize:22,cursor:"pointer"}}>←</button>
        <span style={{fontSize:16,fontWeight:600}}>{t.my_profile}</span>
        <div style={{width:30}}/>
      </nav>
      <div style={{maxWidth:480,margin:"0 auto",padding:"70px 16px 100px"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div onClick={()=>fileRef.current?.click()} style={{width:100,height:100,borderRadius:"50%",margin:"0 auto 10px",background:myPhoto?`url(${myPhoto}) center/cover`:"#f0f0f0",backgroundSize:"cover",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",border:"2px dashed #ddd",fontSize:28}}>{!myPhoto&&"📷"}</div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}}/>
          <button onClick={()=>fileRef.current?.click()} style={{background:"none",border:"1px solid #ddd",color:"#555",fontSize:12,padding:"6px 16px",borderRadius:20,cursor:"pointer"}}>{t.save}</button>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[{v:"male",l:"👨 "+t.male},{v:"female",l:"👩 "+t.female}].map(g=>(
            <button key={g.v} onClick={()=>setMyGender(g.v)} style={{flex:1,padding:"10px",borderRadius:50,border:"1px solid",borderColor:myGender===g.v?"#111":"#ddd",background:myGender===g.v?"#111":"#fff",color:myGender===g.v?"#fff":"#333",fontSize:13,cursor:"pointer"}}>{g.l}</button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
          <div><label style={{fontSize:11,color:"#888",display:"block",marginBottom:3}}>{t.age}</label><input type="number" value={myAge} onChange={e=>setMyAge(e.target.value)} placeholder="25" style={inp}/></div>
          <div><label style={{fontSize:11,color:"#888",display:"block",marginBottom:3}}>{t.height}</label><input type="number" value={myHeight} onChange={e=>setMyHeight(e.target.value)} placeholder="170" style={inp}/></div>
          <div><label style={{fontSize:11,color:"#888",display:"block",marginBottom:3}}>{t.weight}</label><input type="number" value={myWeight} onChange={e=>setMyWeight(e.target.value)} placeholder="65" style={inp}/></div>
        </div>
        <label style={{fontSize:11,color:"#888",display:"block",marginBottom:3}}>{t.zodiac}</label>
        <select value={myZodiac} onChange={e=>setMyZodiac(e.target.value)} style={inp}>{ZODIAC_LIST.filter(z=>z!=="All").map(z=><option key={z} value={z}>{z}</option>)}</select>
        <label style={{fontSize:11,color:"#888",display:"block",marginBottom:3}}>{t.country}</label>
        <select value={myCountry} onChange={e=>setMyCountry(e.target.value)} style={inp}>{COUNTRIES.filter(c=>c!=="🌍 All").map(c=><option key={c} value={c}>{c}</option>)}</select>
        <label style={{fontSize:11,color:"#888",display:"block",marginBottom:3}}>{t.city}</label>
        <input type="text" value={myCity} onChange={e=>setMyCity(e.target.value)} placeholder={t.city_ph} style={inp}/>
        <label style={{fontSize:11,color:"#888",display:"block",marginBottom:3}}>О себе</label>
        <textarea value={myAbout} onChange={e=>setMyAbout(e.target.value)} placeholder={t.about_ph} style={{...inp,height:80,resize:"none"}}/>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,color:"#888",marginBottom:8}}>❤️ {t.goal}</div>
          {[{v:"serious",l:t.serious},{v:"friends",l:t.friends},{v:"chat",l:t.chat},{v:"fun",l:t.fun}].map(g=>(
            <div key={g.v} onClick={()=>toggleArr(myGoals,setMyGoals,g.v)} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #f5f5f5",cursor:"pointer"}}>
              <span style={{fontSize:13}}>{g.l}</span>
              <div style={{width:18,height:18,borderRadius:3,border:`2px solid ${myGoals.includes(g.v)?"#111":"#ddd"}`,background:myGoals.includes(g.v)?"#111":"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>{myGoals.includes(g.v)&&<span style={{color:"#fff",fontSize:10}}>✓</span>}</div>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
          <div><label style={{fontSize:11,color:"#888",display:"block",marginBottom:3}}>🚬 {t.smoking}</label><select value={mySmoking} onChange={e=>setMySmoking(e.target.value)} style={inp}><option value="no">{t.no}</option><option value="sometimes">{t.sometimes}</option><option value="yes">{t.yes}</option></select></div>
          <div><label style={{fontSize:11,color:"#888",display:"block",marginBottom:3}}>🍷 {t.alcohol}</label><select value={myAlcohol} onChange={e=>setMyAlcohol(e.target.value)} style={inp}><option value="no">{t.no}</option><option value="sometimes">{t.sometimes}</option><option value="yes">{t.yes}</option></select></div>
        </div>
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,padding:"12px 16px",background:"#fff",borderTop:"1px solid #f0f0f0"}}>
        <button onClick={saveProfile} style={{width:"100%",background:"#111",border:"none",color:"#fff",fontSize:15,fontWeight:600,padding:"14px",borderRadius:50,cursor:"pointer"}}>{saved?t.saved:t.save}</button>
      </div>
    </div>
  )
  return(
    <div style={{minHeight:"100vh",background:"#f5f5f5",color:"#111",fontFamily:"sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fff",borderBottom:"1px solid #f0f0f0",gap:8,flexWrap:"wrap"}}>
        <a href="/" style={{fontSize:14,fontWeight:700,color:"#111",textDecoration:"none"}}>Ψ GizlinDünya</a>
        <div style={{display:"flex",gap:3}}>
          {(["tk","ru","tr","en"] as Lang[]).map(lg=>(
            <button key={lg} onClick={()=>setLang(lg)} style={{background:lang===lg?"#111":"none",border:"1px solid",borderColor:lang===lg?"#111":"#ddd",color:lang===lg?"#fff":"#888",fontFamily:"monospace",fontSize:10,padding:"3px 7px",borderRadius:3,cursor:"pointer"}}>{lg.toUpperCase()}</button>
          ))}
        </div>
        {user&&<button onClick={()=>setView("create")} style={{background:"#111",border:"none",color:"#fff",fontSize:11,padding:"7px 14px",borderRadius:20,cursor:"pointer"}}>{t.create}</button>}
      </nav>
      <div style={{padding:"65px 12px 20px",maxWidth:1080,margin:"0 auto"}}>
        <div style={{display:"flex",gap:8,marginBottom:14,paddingTop:8}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search} style={{flex:1,background:"#fff",border:"1px solid #e8e8e8",color:"#111",fontSize:13,padding:"10px 14px",borderRadius:50,outline:"none",fontFamily:"sans-serif"}}/>
          <button onClick={()=>setView("filter")} style={{background:"#fff",border:"1px solid #e8e8e8",color:"#333",fontSize:13,padding:"10px 18px",borderRadius:50,cursor:"pointer",flexShrink:0}}>⚙ {t.filters}</button>
        </div>
        <div style={{fontFamily:"monospace",fontSize:11,color:"#888",marginBottom:14}}>{loading?t.loading:`${filtered.length} profiles`}</div>
        {loading?(
          <div style={{textAlign:"center",padding:"60px 0",color:"#aaa",fontSize:14}}>{t.loading}</div>
        ):filtered.length===0?(
          <div style={{textAlign:"center",padding:"60px 0"}}>
            <p style={{color:"#aaa",fontSize:14,marginBottom:16}}>{t.empty}</p>
            {user&&<button onClick={()=>setView("create")} style={{background:"#111",border:"none",color:"#fff",fontSize:13,padding:"12px 28px",borderRadius:50,cursor:"pointer"}}>{t.create}</button>}
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>
            {filtered.map((p:any,i:number)=>(
              <div key={p.id||i} onClick={()=>openChat(p)} style={{background:"#fff",borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:"0 1px 8px rgba(0,0,0,0.06)"}}>
                <div style={{height:160,background:`linear-gradient(135deg,${COLORS[i%COLORS.length]}66,${COLORS[(i+1)%COLORS.length]}44)`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <div style={{width:60,height:60,borderRadius:"50%",background:COLORS[i%COLORS.length],display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:14,color:"white",fontWeight:700}}>{p.anon_code?.slice(-2)||"?"}</div>
                  {p.zodiac&&<div style={{position:"absolute",top:8,left:8,background:"rgba(0,0,0,0.4)",borderRadius:6,padding:"2px 6px",fontFamily:"monospace",fontSize:10,color:"#fff"}}>{p.zodiac.split(" ")[0]}</div>}
                </div>
                <div style={{padding:"10px 12px"}}>
                  <div style={{fontFamily:"monospace",fontSize:10,color:"#7F77DD",marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.anon_code}</div>
                  <div style={{fontSize:11,color:"#888",marginBottom:6}}>{p.age&&`${p.age}y`}{p.city&&` · ${p.city}`}</div>
                  {p.goal&&<div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{(Array.isArray(p.goal)?p.goal:[p.goal]).slice(0,2).map((g:string,j:number)=><span key={j} style={{fontSize:9,padding:"2px 5px",borderRadius:6,background:"#f0f0f0",color:"#666"}}>{g}</span>)}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`*{box-sizing:border-box}`}</style>
    </div>
  )
}
