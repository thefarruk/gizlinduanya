"use client"
import { useState, useEffect, useRef } from "react"
type Lang = "tk"|"ru"|"tr"|"en"
const T:any={
  tk:{title:"Meniň profilim",edit:"Redaktirle",filled:"dolduryldy",add_photo:"Surat goş",name:"At",age:"Ýaş",city:"Şäher",about:"Özüň hakda",goal:"Tanyşlyk maksady",education:"Bilim",languages:"Diller",interests:"Gyzyklanmalar",appearance:"Daşky görnüş",body:"Beden görnüşi",height:"Boy",weight:"Agram",smoking:"Çilim",alcohol:"Alkogol",zodiac:"Zodiak",country:"Ýurt",save:"Sakla",saved:"Saklandi!",logout:"Çyk",not_set:"Görkezilmedi",vip:"GizlinDünya VIP",share:"Paýlaş",online:"Onlaýn",settings:"Sazlamalar"},
  ru:{title:"Мой профиль",edit:"Редактировать",filled:"заполнен",add_photo:"Добавить фото",name:"Имя",age:"Возраст",city:"Город",about:"О себе",goal:"Цель знакомства",education:"Образование",languages:"Языки",interests:"Интересы",appearance:"Внешность",body:"Телосложение",height:"Рост",weight:"Вес",smoking:"Курение",alcohol:"Алкоголь",zodiac:"Знак зодиака",country:"Страна",save:"Сохранить",saved:"Сохранено!",logout:"Выйти",not_set:"Не указано",vip:"GizlinDünya VIP",share:"Поделиться",online:"Онлайн",settings:"Настройки"},
  tr:{title:"Profilim",edit:"Düzenle",filled:"dolu",add_photo:"Fotoğraf ekle",name:"İsim",age:"Yaş",city:"Şehir",about:"Hakkında",goal:"Tanışma amacı",education:"Eğitim",languages:"Diller",interests:"İlgi alanları",appearance:"Görünüş",body:"Vücut tipi",height:"Boy",weight:"Kilo",smoking:"Sigara",alcohol:"Alkol",zodiac:"Burç",country:"Ülke",save:"Kaydet",saved:"Kaydedildi!",logout:"Çıkış",not_set:"Belirtilmedi",vip:"GizlinDünya VIP",share:"Paylaş",online:"Çevrimiçi",settings:"Ayarlar"},
  en:{title:"My profile",edit:"Edit",filled:"filled",add_photo:"Add photo",name:"Name",age:"Age",city:"City",about:"About",goal:"Dating goal",education:"Education",languages:"Languages",interests:"Interests",appearance:"Appearance",body:"Body type",height:"Height",weight:"Weight",smoking:"Smoking",alcohol:"Alcohol",zodiac:"Zodiac",country:"Country",save:"Save",saved:"Saved!",logout:"Logout",not_set:"Not set",vip:"GizlinDünya VIP",share:"Share",online:"Online",settings:"Settings"}
}
const GOALS_MAP:any={serious:{tk:"Çynlakaý gatnaşyk",ru:"Серьёзные отношения",tr:"Ciddi ilişki",en:"Serious relationship"},friends:{tk:"Dostluk",ru:"Дружба",tr:"Arkadaşlık",en:"Friendship"},chat:{tk:"Gepleşik",ru:"Общение",tr:"Sohbet",en:"Chatting"},fun:{tk:"Güýmenje",ru:"Флирт",tr:"Flört",en:"Flirt"}}
const BODY_TYPES:any={slim:{tk:"Inçe",ru:"Стройное",tr:"İnce",en:"Slim"},average:{tk:"Ortaça",ru:"Среднее",tr:"Orta",en:"Average"},athletic:{tk:"Atletiki",ru:"Атлетическое",tr:"Atletik",en:"Athletic"},full:{tk:"Doly",ru:"Полное",tr:"Dolgun",en:"Full"}}
const EDUCATION_OPTS:any={school:{tk:"Mekdep",ru:"Среднее",tr:"Lise",en:"School"},college:{tk:"Kolleç",ru:"Колледж",tr:"Kolej",en:"College"},university:{tk:"Uniwersitet",ru:"Высшее",tr:"Üniversite",en:"University"},phd:{tk:"Ylmy dereje",ru:"Учёная степень",tr:"Doktora",en:"PhD"}}
const LANGS_LIST=["Türkmen","Русский","English","Türkçe","Deutsch","Français","Arabic","Chinese"]
const INTERESTS_LIST=["sport","music","travel","books","movies","cooking","art","gaming","yoga","dancing","photography","nature","tech","fashion","fitness"]
const ZODIAC_LIST=["♈ Aries","♉ Taurus","♊ Gemini","♋ Cancer","♌ Leo","♍ Virgo","♎ Libra","♏ Scorpio","♐ Sagittarius","♑ Capricorn","♒ Aquarius","♓ Pisces"]
const COUNTRIES=["🇹🇲 Turkmenistan","🇷🇺 Russia","🇺🇿 Uzbekistan","🇰🇿 Kazakhstan","🇹🇷 Turkey","🇦🇿 Azerbaijan","🇩🇪 Germany","🇦🇪 UAE","🇺🇸 USA","🇬🇧 UK","🇺🇦 Ukraine","🇰🇬 Kyrgyzstan","🇹🇯 Tajikistan","🇦🇲 Armenia","🇬🇪 Georgia","🇵🇱 Poland","🇧🇾 Belarus","🇲🇩 Moldova"]
export default function CabinetPage(){
  const [lang,setLang]=useState<Lang>("ru")
  const [user,setUser]=useState<any>(null)
  const [editing,setEditing]=useState(false)
  const [saved,setSaved]=useState(false)
  const [photos,setPhotos]=useState<(string|null)[]>([null,null,null,null,null])
  const [name,setName]=useState("")
  const [age,setAge]=useState("")
  const [city,setCity]=useState("")
  const [country,setCountry]=useState("🇹🇲 Turkmenistan")
  const [about,setAbout]=useState("")
  const [goal,setGoal]=useState("")
  const [education,setEducation]=useState("")
  const [selLangs,setSelLangs]=useState<string[]>([])
  const [interests,setInterests]=useState<string[]>([])
  const [appearance,setAppearance]=useState("")
  const [bodyType,setBodyType]=useState("")
  const [height,setHeight]=useState("")
  const [weight,setWeight]=useState("")
  const [smoking,setSmoking]=useState("")
  const [alcohol,setAlcohol]=useState("")
  const [zodiac,setZodiac]=useState("")
  const [expandSection,setExpandSection]=useState<string|null>(null)
  const fileRefs=useRef<(HTMLInputElement|null)[]>([])
  const t=T[lang]
  useEffect(()=>{
    const s=localStorage.getItem("gd_user")
    if(s){setUser(JSON.parse(s))}
    else{window.location.href="/"}
    const p=localStorage.getItem("gd_profile")
    if(p){const d=JSON.parse(p);setName(d.name||"");setAge(d.age||"");setCity(d.city||"");setCountry(d.country||"🇹🇲 Turkmenistan");setAbout(d.about||"");setGoal(d.goal||"");setEducation(d.education||"");setSelLangs(d.langs||[]);setInterests(d.interests||[]);setAppearance(d.appearance||"");setBodyType(d.bodyType||"");setHeight(d.height||"");setWeight(d.weight||"");setSmoking(d.smoking||"");setAlcohol(d.alcohol||"");setZodiac(d.zodiac||"");setPhotos(d.photos||[null,null,null,null,null])}
  },[])
  function calcFilled(){
    const fields=[name,age,city,about,goal,education,height,weight,zodiac]
    const filled=fields.filter(Boolean).length+selLangs.length+interests.length+(photos[0]?2:0)
    return Math.min(Math.round((filled/20)*100),100)
  }
  async function saveProfile(){
    const data={name,age,city,country,about,goal,education,langs:selLangs,interests,appearance,bodyType,height,weight,smoking,alcohol,zodiac,photos}
    localStorage.setItem("gd_profile",JSON.stringify(data))
    try{
      await fetch("/api/profiles",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({about,age:parseInt(age)||null,city,lang,about,interests,goal})})
    }catch(e){console.log("profile save error",e)}
    setSaved(true);setTimeout(()=>{setSaved(false);setEditing(false)},1500)
  }
  function handlePhoto(idx:number,e:React.ChangeEvent<HTMLInputElement>){
    const f=e.target.files?.[0];if(!f)return
    const r=new FileReader();r.onload=ev=>{const np=[...photos];np[idx]=ev.target?.result as string;setPhotos(np)};r.readAsDataURL(f)
  }
  function toggleArr(arr:string[],setArr:(a:string[])=>void,val:string){setArr(arr.includes(val)?arr.filter(x=>x!==val):[...arr,val])}
  function toggleSection(s:string){setExpandSection(expandSection===s?null:s)}
  const pct=calcFilled()
  const row=(icon:string,label:string,value:string,section:string,content:React.ReactNode)=>(
    <div>
      <div onClick={()=>toggleSection(section)} style={{display:"flex",alignItems:"center",padding:"14px 0",borderBottom:"1px solid #f5f5f5",cursor:"pointer"}}>
        <span style={{fontSize:20,marginRight:14,width:28,textAlign:"center"}}>{icon}</span>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:500,color:"#111"}}>{label}</div>
          {value&&<div style={{fontSize:12,color:"#999",marginTop:2}}>{value||t.not_set}</div>}
        </div>
        <span style={{color:"#ccc",fontSize:18,transform:expandSection===section?"rotate(90deg)":"none",transition:"transform 0.2s"}}>›</span>
      </div>
      {expandSection===section&&<div style={{padding:"12px 0 16px 42px"}}>{content}</div>}
    </div>
  )
  const chip=(label:string,active:boolean,onClick:()=>void)=>(
    <button onClick={onClick} style={{padding:"7px 16px",borderRadius:50,border:"1px solid",borderColor:active?"#111":"#e0e0e0",background:active?"#111":"#fff",color:active?"#fff":"#555",fontSize:13,cursor:"pointer",margin:"4px"}}>{label}</button>
  )
  const inp={width:"100%",background:"#f8f8f8",border:"1px solid #eee",color:"#111",fontFamily:"sans-serif",fontSize:14,padding:"11px 14px",borderRadius:10,outline:"none",boxSizing:"border-box" as const,marginTop:6}
  if(!user)return<div style={{minHeight:"100vh",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",color:"#999",fontFamily:"sans-serif"}}>Loading...</div>
  return(
    <div style={{minHeight:"100vh",background:"#fff",color:"#111",fontFamily:"sans-serif"}}>
      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fff",borderBottom:"1px solid #f0f0f0"}}>
        <a href="/" style={{fontSize:20,color:"#111",textDecoration:"none"}}>←</a>
        <div style={{display:"flex",gap:3}}>
          {(["tk","ru","tr","en"] as Lang[]).map(lg=>(
            <button key={lg} onClick={()=>setLang(lg)} style={{background:lang===lg?"#111":"none",border:"1px solid",borderColor:lang===lg?"#111":"#ddd",color:lang===lg?"#fff":"#888",fontFamily:"monospace",fontSize:10,padding:"3px 7px",borderRadius:3,cursor:"pointer"}}>{lg.toUpperCase()}</button>
          ))}
        </div>
        <button onClick={()=>setEditing(!editing)} style={{background:"none",border:"none",color:"#7F77DD",fontSize:14,fontWeight:500,cursor:"pointer"}}>{editing?t.save:t.edit}</button>
      </nav>
      <div style={{maxWidth:500,margin:"0 auto",padding:"60px 0 80px"}}>
        {/* HEADER */}
        <div style={{textAlign:"center",padding:"20px 16px 16px"}}>
          <div style={{fontSize:17,fontWeight:600,marginBottom:4}}>{t.title}</div>
          <div style={{fontSize:13,color:"#999",marginBottom:12}}>{pct}% {t.filled}</div>
          {/* PROGRESS */}
          <div style={{height:4,background:"#f0f0f0",borderRadius:4,margin:"0 20px 16px",overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#7F77DD,#534AB7)",borderRadius:4,transition:"width 0.5s"}}/>
          </div>
          {/* VIP BANNER */}
          <div style={{background:"linear-gradient(135deg,#ffe0f0,#ffd6f0)",borderRadius:16,padding:"12px 20px",margin:"0 16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:14,fontWeight:600,color:"#111"}}>✨ {t.vip}</span>
            <button style={{background:"#111",border:"none",color:"#fff",fontSize:12,padding:"6px 16px",borderRadius:20,cursor:"pointer"}}>→</button>
          </div>
          {/* PHOTOS GRID */}
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gridTemplateRows:"auto auto",gap:6,padding:"0 16px",marginBottom:8}}>
            {photos.map((photo,i)=>(
              <div key={i} onClick={()=>editing&&fileRefs.current[i]?.click()} style={{gridColumn:i===0?"1":"auto",gridRow:i===0?"1 / 3":"auto",background:photo?`url(${photo}) center/cover`:"#f5f5f5",borderRadius:12,aspectRatio:i===0?"1/1.4":"1/1",display:"flex",alignItems:"center",justifyContent:"center",cursor:editing?"pointer":"default",overflow:"hidden",border:"1px solid #eee",backgroundSize:"cover",position:"relative"}}>
                {!photo&&<span style={{fontSize:24,color:"#ccc"}}>+</span>}
                {editing&&photo&&<div style={{position:"absolute",top:6,right:6,width:22,height:22,borderRadius:"50%",background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={e=>{e.stopPropagation();const np=[...photos];np[i]=null;setPhotos(np)}}><span style={{color:"#fff",fontSize:12}}>✕</span></div>}
                <input ref={el=>fileRefs.current[i]=el} type="file" accept="image/*" onChange={e=>handlePhoto(i,e)} style={{display:"none"}}/>
              </div>
            ))}
          </div>
          {editing&&<button onClick={()=>fileRefs.current[0]?.click()} style={{background:"#111",border:"none",color:"#fff",fontSize:14,fontWeight:500,padding:"13px 40px",borderRadius:50,cursor:"pointer",margin:"8px 16px",width:"calc(100% - 32px)"}}>{t.add_photo}</button>}
        </div>
        {/* ANON CODE */}
        <div style={{margin:"0 16px 16px",background:"#f8f8f8",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontFamily:"monospace",fontSize:13,color:"#7F77DD",fontWeight:600}}>{user?.anon_code}</div>
            <div style={{fontSize:12,color:"#1D9E75",marginTop:2}}>● {t.online}</div>
          </div>
          <button style={{background:"none",border:"1px solid #eee",color:"#888",fontSize:12,padding:"6px 14px",borderRadius:20,cursor:"pointer"}}>📤 {t.share}</button>
        </div>
        {/* FORM */}
        <div style={{padding:"0 16px"}}>
          {/* ABOUT */}
          <textarea value={about} onChange={e=>setAbout(e.target.value)} readOnly={!editing} placeholder={t.about+"..."} style={{...inp,height:90,resize:"none",marginBottom:8,background:editing?"#f8f8f8":"#fff",border:editing?"1px solid #eee":"none",color:"#333"}}/>
          {/* ROWS */}
          {row("🎯",t.goal,goal?GOALS_MAP[goal]?.[lang]||goal:"","goal",
            <div style={{display:"flex",flexWrap:"wrap"}}>
              {Object.entries(GOALS_MAP).map(([v,labels]:any)=>chip(labels[lang],goal===v,()=>setGoal(v)))}
            </div>
          )}
          {row("📍",t.city,city||t.not_set,"city",
            <><input type="text" value={city} onChange={e=>setCity(e.target.value)} placeholder={t.city+"..."} style={inp}/><select value={country} onChange={e=>setCountry(e.target.value)} style={{...inp,marginTop:8}}>{COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}</select></>
          )}
          {row("🎓",t.education,education?EDUCATION_OPTS[education]?.[lang]||education:t.not_set,"edu",
            <div style={{display:"flex",flexWrap:"wrap"}}>
              {Object.entries(EDUCATION_OPTS).map(([v,labels]:any)=>chip(labels[lang],education===v,()=>setEducation(v)))}
            </div>
          )}
          {row("🗣",t.languages,selLangs.join(", ")||t.not_set,"langs",
            <div style={{display:"flex",flexWrap:"wrap"}}>
              {LANGS_LIST.map(l=>chip(l,selLangs.includes(l),()=>toggleArr(selLangs,setSelLangs,l)))}
            </div>
          )}
          {row("#",t.interests,interests.slice(0,3).join(", ")||t.not_set,"interests",
            <div style={{display:"flex",flexWrap:"wrap"}}>
              {INTERESTS_LIST.map(i=>chip(i,interests.includes(i),()=>toggleArr(interests,setInterests,i)))}
            </div>
          )}
          {row("🧍",t.appearance,appearance||t.not_set,"appearance",
            <><input type="text" value={appearance} onChange={e=>setAppearance(e.target.value)} placeholder="..." style={inp}/></>
          )}
          {row("💪",t.body,bodyType?BODY_TYPES[bodyType]?.[lang]||bodyType:t.not_set,"body",
            <div style={{display:"flex",flexWrap:"wrap"}}>
              {Object.entries(BODY_TYPES).map(([v,labels]:any)=>chip(labels[lang],bodyType===v,()=>setBodyType(v)))}
            </div>
          )}
          {row("📏",t.height,height?height+" cm":t.not_set,"height",
            <input type="number" value={height} onChange={e=>setHeight(e.target.value)} placeholder="170" style={inp}/>
          )}
          {row("⚖️",t.weight,weight?weight+" kg":t.not_set,"weight",
            <input type="number" value={weight} onChange={e=>setWeight(e.target.value)} placeholder="65" style={inp}/>
          )}
          {row("🚬",t.smoking,smoking||t.not_set,"smoking",
            <div style={{display:"flex",flexWrap:"wrap"}}>
              {[{v:"no",l:{tk:"Ýok",ru:"Не курю",tr:"Sigara içmiyorum",en:"No"}},{v:"sometimes",l:{tk:"Käwagt",ru:"Иногда",tr:"Bazen",en:"Sometimes"}},{v:"yes",l:{tk:"Hawa",ru:"Курю",tr:"İçiyorum",en:"Yes"}}].map(o=>chip(o.l[lang],smoking===o.v,()=>setSmoking(o.v)))}
            </div>
          )}
          {row("🍷",t.alcohol,alcohol||t.not_set,"alcohol",
            <div style={{display:"flex",flexWrap:"wrap"}}>
              {[{v:"no",l:{tk:"Ýok",ru:"Не пью",tr:"İçmiyorum",en:"No"}},{v:"sometimes",l:{tk:"Käwagt",ru:"Иногда",tr:"Bazen",en:"Sometimes"}},{v:"yes",l:{tk:"Hawa",ru:"Пью",tr:"İçiyorum",en:"Yes"}}].map(o=>chip(o.l[lang],alcohol===o.v,()=>setAlcohol(o.v)))}
            </div>
          )}
          {row("✨",t.zodiac,zodiac||t.not_set,"zodiac",
            <div style={{display:"flex",flexWrap:"wrap"}}>
              {ZODIAC_LIST.map(z=>chip(z,zodiac===z,()=>setZodiac(z)))}
            </div>
          )}
        </div>
      </div>
      {/* SAVE / LOGOUT BUTTONS */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,padding:"12px 16px",background:"#fff",borderTop:"1px solid #f0f0f0",display:"flex",gap:10}}>
        {editing?(
          <button onClick={saveProfile} style={{flex:1,background:"#111",border:"none",color:"#fff",fontSize:15,fontWeight:600,padding:"13px",borderRadius:50,cursor:"pointer"}}>{saved?t.saved:t.save}</button>
        ):(
          <>
            <a href="/dating" style={{flex:1,background:"#7F77DD",border:"none",color:"#fff",fontSize:14,fontWeight:500,padding:"13px",borderRadius:50,cursor:"pointer",textAlign:"center",textDecoration:"none",display:"block"}}>💬 {T[lang].title}</a>
            <button onClick={()=>{localStorage.removeItem("gd_user");localStorage.removeItem("gd_profile");window.location.href="/"}} style={{background:"none",border:"1px solid #eee",color:"#999",fontSize:13,padding:"13px 20px",borderRadius:50,cursor:"pointer"}}>{t.logout}</button>
          </>
        )}
      </div>
      <style>{`*{box-sizing:border-box}`}</style>
    </div>
  )
}
