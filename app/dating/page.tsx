"use client"
import { useState, useEffect, useRef } from "react"
type Lang = "tk"|"ru"|"tr"|"en"
const T:any={
  tk:{title:"Tanyşlyk",search:"Gözle...",empty:"Anketa ýok",send:"Ýaz",back:"Yza",msg:"Habar...",send_btn:"Iber",create:"Anketa dör",save:"Sakla",saved:"Saklandi!",reset:"Arassala",apply:"Ullan",online:"Onlaýn",age:"Ýaş",height:"Boy",weight:"Agram",goal:"Tanyşlyk maksady",serious:"Çynlakaý gatnaşyk",friends:"Dostluk",chat:"Gepleşik",fun:"Güýmenje",smoking:"Çilim",alcohol:"Alkogol",zodiac:"Zodiak",interests_lbl:"Gyzyklanmalar",country:"Ýurt",city:"Şäher",photo:"Surat",any:"Islendik",male:"Oglan",female:"Gyz",no:"Ýok",sometimes:"Käwagt",yes:"Hawa",orientation:"Orientasiýa",straight:"Göni",gay:"Geý",bi:"Bi",upload_photo:"Surat ýükle",remove_photo:"Aýyr",about_ph:"Özüň hakda...",city_ph:"Şäheriň...",interests_ph:"sport, sungat...",my_profile:"Meniň anketam",new:"Täze",filters:"Süzgüçler"},
  ru:{title:"Знакомства",search:"Поиск...",empty:"Анкет пока нет",send:"Написать",back:"Назад",msg:"Сообщение...",send_btn:"Отправить",create:"Создать анкету",save:"Сохранить",saved:"Сохранено!",reset:"Сбросить",apply:"Сохранить",online:"Онлайн",age:"Возраст",height:"Рост",weight:"Вес",goal:"Цель знакомства",serious:"Серьёзные отношения",friends:"Дружеское общение",chat:"Просто общение",fun:"Флирт",smoking:"Курение",alcohol:"Алкоголь",zodiac:"Знак зодиака",interests_lbl:"Интересы",country:"Страна",city:"Город",photo:"Фото",any:"Любой",male:"Парня",female:"Девушку",no:"Не употребляю",sometimes:"Иногда",yes:"Употребляю",orientation:"Ориентация",straight:"Гетеро",gay:"Гей/Лесби",bi:"Би",upload_photo:"Загрузить фото",remove_photo:"Удалить",about_ph:"О себе...",city_ph:"Город...",interests_ph:"спорт, музыка...",my_profile:"Моя анкета",new:"Новые",filters:"Фильтры"},
  tr:{title:"Tanışma",search:"Ara...",empty:"Profil yok",send:"Yaz",back:"Geri",msg:"Mesaj...",send_btn:"Gönder",create:"Profil oluştur",save:"Kaydet",saved:"Kaydedildi!",reset:"Sıfırla",apply:"Kaydet",online:"Çevrimiçi",age:"Yaş",height:"Boy",weight:"Kilo",goal:"Tanışma amacı",serious:"Ciddi ilişki",friends:"Arkadaşlık",chat:"Sohbet",fun:"Flört",smoking:"Sigara",alcohol:"Alkol",zodiac:"Burç",interests_lbl:"İlgi alanları",country:"Ülke",city:"Şehir",photo:"Fotoğraf",any:"Herhangi",male:"Erkek",female:"Kadın",no:"Kullanmıyorum",sometimes:"Bazen",yes:"Kullanıyorum",orientation:"Yönelim",straight:"Hetero",gay:"Eşcinsel",bi:"Biseksüel",upload_photo:"Fotoğraf yükle",remove_photo:"Kaldır",about_ph:"Hakkında...",city_ph:"Şehir...",interests_ph:"spor, müzik...",my_profile:"Profilim",new:"Yeni",filters:"Filtreler"},
  en:{title:"Dating",search:"Search...",empty:"No profiles yet",send:"Message",back:"Back",msg:"Message...",send_btn:"Send",create:"Create profile",save:"Save",saved:"Saved!",reset:"Reset",apply:"Save",online:"Online",age:"Age",height:"Height",weight:"Weight",goal:"Dating goal",serious:"Serious relationship",friends:"Friendship",chat:"Just chatting",fun:"Flirt",smoking:"Smoking",alcohol:"Alcohol",zodiac:"Zodiac",interests_lbl:"Interests",country:"Country",city:"City",photo:"Photo",any:"Any",male:"Male",female:"Female",no:"No",sometimes:"Sometimes",yes:"Yes",orientation:"Orientation",straight:"Straight",gay:"Gay/Lesbian",bi:"Bisexual",upload_photo:"Upload photo",remove_photo:"Remove",about_ph:"About you...",city_ph:"City...",interests_ph:"sport, music...",my_profile:"My profile",new:"New",filters:"Filters"}
}
const COUNTRIES=["🌍 All","🇹🇲 Turkmenistan","🇷🇺 Russia","🇺🇿 Uzbekistan","🇰🇿 Kazakhstan","🇹🇷 Turkey","🇦🇿 Azerbaijan","🇩🇪 Germany","🇦🇪 UAE","🇺🇸 USA","🇬🇧 UK","🇺🇦 Ukraine","🇰🇬 Kyrgyzstan","🇹🇯 Tajikistan","🇦🇲 Armenia","🇬🇪 Georgia","🇵🇱 Poland","🇧🇾 Belarus","🇲🇩 Moldova"]
const ZODIAC_LIST=["All","♈ Aries","♉ Taurus","♊ Gemini","♋ Cancer","♌ Leo","♍ Virgo","♎ Libra","♏ Scorpio","♐ Sagittarius","♑ Capricorn","♒ Aquarius","♓ Pisces"]
const INTERESTS_LIST=["sport","music","travel","books","movies","cooking","art","gaming","yoga","dancing","photography","nature","tech","fashion","fitness"]
const COLORS=["#7F77DD","#1D9E75","#ff6b6b","#534AB7","#5DCAA5","#F0997B","#EF9F27","#AFA9EC"]
const SAMPLE=[
  {id:"1",anon_code:"ANON#A7K2",age:23,city:"Aşgabat",country:"🇹🇲 Turkmenistan",about:"Kitap okamak we syýahat etmek halaýan.",interests:["kitap","syýahat","sungat"],online:true,gender:"female",zodiac:"♌ Leo",height:165,weight:55,smoking:"no",alcohol:"sometimes",goal:["serious","friends"],photo:null},
  {id:"2",anon_code:"ANON#B3M8",age:27,city:"Moscow",country:"🇷🇺 Russia",about:"Музыку слушаю, читаю философию.",interests:["музыка","философия","кино"],online:false,gender:"male",zodiac:"♏ Scorpio",height:182,weight:78,smoking:"no",alcohol:"sometimes",goal:["chat"],photo:null},
  {id:"3",anon_code:"ANON#C9L5",age:21,city:"Mary",country:"🇹🇲 Turkmenistan",about:"Sport we fitnes bilen meşgullanýaryn.",interests:["sport","fitnes"],online:true,gender:"male",zodiac:"♈ Aries",height:178,weight:75,smoking:"sometimes",alcohol:"no",goal:["friends","fun"],photo:null},
  {id:"4",anon_code:"ANON#D2N6",age:25,city:"Istanbul",country:"🇹🇷 Turkey",about:"Люблю готовить и путешествовать.",interests:["кулинария","путешествия"],online:false,gender:"female",zodiac:"♎ Libra",height:162,weight:52,smoking:"no",alcohol:"no",goal:["serious"],photo:null},
  {id:"5",anon_code:"ANON#E8P4",age:29,city:"Tashkent",country:"🇺🇿 Uzbekistan",about:"Programmirleme we tehnologiýa.",interests:["tech","coding"],online:true,gender:"male",zodiac:"♊ Gemini",height:175,weight:70,smoking:"no",alcohol:"sometimes",goal:["chat","friends"],photo:null},
  {id:"6",anon_code:"ANON#F1T7",age:24,city:"Almaty",country:"🇰🇿 Kazakhstan",about:"Рисую, пишу стихи.",interests:["рисование","поэзия"],online:false,gender:"female",zodiac:"♓ Pisces",height:158,weight:50,smoking:"no",alcohol:"no",goal:["serious","friends"],photo:null},
]
export default function DatingPage(){
  const [lang,setLang]=useState<Lang>("tk")
  const [view,setView]=useState<"list"|"profile"|"chat"|"filter">("list")
  const [profiles]=useState(SAMPLE)
  const [filtered,setFiltered]=useState(SAMPLE)
  const [selected,setSelected]=useState<any>(null)
  const [user,setUser]=useState<any>(null)
  const [search,setSearch]=useState("")
  const [messages,setMessages]=useState<any[]>([])
  const [msgText,setMsgText]=useState("")
  const fileRef=useRef<HTMLInputElement>(null)
  // FILTER STATE
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
  const [fInterests,setFInterests]=useState<string[]>([])
  // CREATE STATE
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
  const t=T[lang]
  useEffect(()=>{const s=localStorage.getItem("gd_user");if(s)setUser(JSON.parse(s))},[])
  useEffect(()=>{
    let r=[...profiles]
    if(search)r=r.filter(p=>p.about.toLowerCase().includes(search.toLowerCase())||p.city.toLowerCase().includes(search.toLowerCase()))
    if(fGender!=="any")r=r.filter(p=>p.gender===fGender)
    r=r.filter(p=>p.age>=fAgeFrom&&p.age<=fAgeTo)
    r=r.filter(p=>p.height>=fHeightFrom&&p.height<=fHeightTo)
    r=r.filter(p=>p.weight>=fWeightFrom&&p.weight<=fWeightTo)
    if(fGoals.length>0)r=r.filter(p=>fGoals.some(g=>p.goal.includes(g)))
    if(fSmoking!=="any")r=r.filter(p=>p.smoking===fSmoking)
    if(fAlcohol!=="any")r=r.filter(p=>p.alcohol===fAlcohol)
    if(fZodiac!=="All")r=r.filter(p=>p.zodiac===fZodiac)
    if(fCountry!=="🌍 All")r=r.filter(p=>p.country===fCountry)
    if(fInterests.length>0)r=r.filter(p=>fInterests.some(i=>p.interests.includes(i)))
    setFiltered(r)
  },[search,fGender,fAgeFrom,fAgeTo,fHeightFrom,fHeightTo,fWeightFrom,fWeightTo,fGoals,fSmoking,fAlcohol,fZodiac,fCountry,fInterests,profiles])
  function resetFilters(){setFGender("any");setFAgeFrom(16);setFAgeTo(60);setFHeightFrom(150);setFHeightTo(220);setFWeightFrom(40);setFWeightTo(160);setFGoals([]);setFSmoking("any");setFAlcohol("any");setFZodiac("All");setFCountry("🌍 All");setFInterests([])}
  function toggleArr(arr:string[],setArr:(a:string[])=>void,val:string){setArr(arr.includes(val)?arr.filter(x=>x!==val):[...arr,val])}
  function handlePhoto(e:React.ChangeEvent<HTMLInputElement>){const f=e.target.files?.[0];if(f){const r=new FileReader();r.onload=ev=>setMyPhoto(ev.target?.result as string);r.readAsDataURL(f)}}
  const inp={width:"100%",background:"#f8f8f8",border:"1px solid #e8e8e8",color:"#111",fontFamily:"sans-serif",fontSize:13,padding:"11px 14px",borderRadius:10,outline:"none",boxSizing:"border-box" as const}
  const slider=(label:string,from:number,to:number,min:number,max:number,unit:string,setFrom:(n:number)=>void,setTo:(n:number)=>void)=>(
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <span style={{fontSize:14,color:"#333"}}>{label}</span>
        <span style={{fontSize:14,color:"#333",fontWeight:500}}>{from}–{to} {unit}</span>
      </div>
      <div style={{position:"relative",height:20,display:"flex",alignItems:"center",gap:8}}>
        <input type="range" min={min} max={max} value={from} onChange={e=>setFrom(Math.min(parseInt(e.target.value),to-1))} style={{flex:1,accentColor:"#111",height:4,cursor:"pointer"}}/>
        <input type="range" min={min} max={max} value={to} onChange={e=>setTo(Math.max(parseInt(e.target.value),from+1))} style={{flex:1,accentColor:"#111",height:4,cursor:"pointer"}}/>
      </div>
    </div>
  )
  const dropdown=(label:string,icon:string,value:string,options:{val:string,label:string}[],setValue:(v:string)=>void)=>(
    <div style={{borderBottom:"1px solid #f0f0f0",padding:"14px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:18}}>{icon}</span>
          <div>
            <div style={{fontSize:14,color:"#111",fontWeight:500}}>{label}</div>
            <div style={{fontSize:12,color:"#888"}}>{options.find(o=>o.val===value)?.label||value}</div>
          </div>
        </div>
        <select value={value} onChange={e=>setValue(e.target.value)} style={{background:"none",border:"none",color:"#888",fontSize:13,cursor:"pointer",outline:"none"}}>
          {options.map(o=><option key={o.val} value={o.val}>{o.label}</option>)}
        </select>
      </div>
    </div>
  )
  // FILTER VIEW
  if(view==="filter")return(
    <div style={{minHeight:"100vh",background:"#fff",color:"#111",fontFamily:"sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fff",borderBottom:"1px solid #f0f0f0"}}>
        <button onClick={()=>setView("list")} style={{background:"none",border:"none",color:"#111",fontSize:22,cursor:"pointer",lineHeight:1}}>←</button>
        <span style={{fontSize:16,fontWeight:600}}>{t.filters}</span>
        <button onClick={resetFilters} style={{background:"none",border:"none",color:"#888",fontSize:13,cursor:"pointer"}}>{t.reset}</button>
      </nav>
      <div style={{padding:"70px 16px 100px",maxWidth:500,margin:"0 auto"}}>
        {/* GENDER */}
        <div style={{marginBottom:24}}>
          <div style={{fontSize:14,color:"#888",marginBottom:12}}>Пол</div>
          <div style={{display:"flex",gap:10}}>
            {[{v:"any",l:t.any},{v:"male",l:t.male},{v:"female",l:t.female}].map(g=>(
              <button key={g.v} onClick={()=>setFGender(g.v)} style={{flex:1,padding:"12px 0",borderRadius:50,border:"1px solid",borderColor:fGender===g.v?"#111":"#ddd",background:fGender===g.v?"#111":"#fff",color:fGender===g.v?"#fff":"#333",fontSize:14,fontWeight:500,cursor:"pointer"}}>{g.l}</button>
            ))}
          </div>
        </div>
        {/* AGE SLIDER */}
        {slider(t.age,fAgeFrom,fAgeTo,16,60,"",setFAgeFrom,setFAgeTo)}
        {/* GOAL */}
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:"1px solid #f0f0f0",cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:18}}>❤️</span>
              <span style={{fontSize:14,fontWeight:500}}>{t.goal}</span>
            </div>
            <span style={{color:"#888"}}>∧</span>
          </div>
          <div style={{paddingTop:8}}>
            {[{v:"serious",l:t.serious},{v:"friends",l:t.friends},{v:"chat",l:t.chat},{v:"fun",l:t.fun}].map(g=>(
              <div key={g.v} onClick={()=>toggleArr(fGoals,setFGoals,g.v)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",cursor:"pointer",borderBottom:"1px solid #fafafa"}}>
                <span style={{fontSize:14,color:"#333"}}>{g.l}</span>
                <div style={{width:20,height:20,borderRadius:4,border:`2px solid`,borderColor:fGoals.includes(g.v)?"#111":"#ddd",background:fGoals.includes(g.v)?"#111":"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {fGoals.includes(g.v)&&<span style={{color:"#fff",fontSize:12}}>✓</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* SMOKING */}
        {dropdown(t.smoking,"🚬",fSmoking,[{val:"any",label:t.any},{val:"no",label:t.no},{val:"sometimes",label:t.sometimes},{val:"yes",label:t.yes}],setFSmoking)}
        {/* ALCOHOL */}
        {dropdown(t.alcohol,"🍷",fAlcohol,[{val:"any",label:t.any},{val:"no",label:t.no},{val:"sometimes",label:t.sometimes},{val:"yes",label:t.yes}],setFAlcohol)}
        {/* ZODIAC */}
        {dropdown(t.zodiac,"✨",fZodiac,ZODIAC_LIST.map(z=>({val:z,label:z})),setFZodiac)}
        {/* HEIGHT */}
        {slider(t.height,fHeightFrom,fHeightTo,140,220,"см",setFHeightFrom,setFHeightTo)}
        {/* WEIGHT */}
        {slider(t.weight,fWeightFrom,fWeightTo,40,160,"кг",setFWeightFrom,setFWeightTo)}
        {/* COUNTRY */}
        <div style={{marginBottom:16}}>
          <div style={{fontSize:14,color:"#888",marginBottom:8}}>🌍 {t.country}</div>
          <select value={fCountry} onChange={e=>setFCountry(e.target.value)} style={{...inp,background:"#f8f8f8"}}>
            {COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {/* INTERESTS */}
        <div style={{marginBottom:16}}>
          <div style={{fontSize:14,color:"#888",marginBottom:10}}># {t.interests_lbl}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {INTERESTS_LIST.map(i=>(
              <button key={i} onClick={()=>toggleArr(fInterests,setFInterests,i)} style={{padding:"6px 14px",borderRadius:20,border:"1px solid",borderColor:fInterests.includes(i)?"#111":"#ddd",background:fInterests.includes(i)?"#111":"#fff",color:fInterests.includes(i)?"#fff":"#555",fontSize:13,cursor:"pointer"}}>{i}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,padding:"12px 16px",background:"#fff",borderTop:"1px solid #f0f0f0"}}>
        <button onClick={()=>setView("list")} style={{width:"100%",background:"#111",border:"none",color:"#fff",fontSize:15,fontWeight:600,padding:"14px",borderRadius:50,cursor:"pointer"}}>{t.apply} · {filtered.length}</button>
      </div>
    </div>
  )
  // CHAT VIEW
  if(view==="chat"&&selected)return(
    <div style={{minHeight:"100vh",background:"#07070f",color:"#EEEDFE",fontFamily:"sans-serif",display:"flex",flexDirection:"column"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"11px 14px",display:"flex",alignItems:"center",gap:10,background:"rgba(7,7,15,0.95)",borderBottom:"1px solid rgba(127,119,221,0.12)"}}>
        <button onClick={()=>setView("list")} style={{background:"none",border:"1px solid rgba(127,119,221,0.2)",color:"#9F9AEC",fontFamily:"monospace",fontSize:11,padding:"5px 11px",borderRadius:5,cursor:"pointer"}}>← {t.back}</button>
        <div style={{width:32,height:32,borderRadius:"50%",background:selected.photo?`url(${selected.photo}) center/cover`:"linear-gradient(135deg,#534AB7,#1D9E75)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:11,color:"white",flexShrink:0,backgroundSize:"cover"}}>{!selected.photo&&selected.anon_code?.slice(-2)}</div>
        <div>
          <div style={{fontFamily:"monospace",fontSize:12,color:"#7F77DD"}}>{selected.anon_code}</div>
          <div style={{fontFamily:"monospace",fontSize:10,color:selected.online?"#1D9E75":"#555470"}}>{selected.online?"● online":"○ offline"}</div>
        </div>
      </nav>
      <div style={{flex:1,padding:"75px 14px 90px",maxWidth:660,margin:"0 auto",width:"100%"}}>
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.from==="me"?"flex-end":"flex-start",marginBottom:10}}>
            <div style={{background:m.from==="me"?"#534AB7":"#0d0d1a",border:"1px solid",borderColor:m.from==="me"?"#7F77DD":"rgba(127,119,221,0.15)",borderRadius:12,padding:"9px 13px",maxWidth:"78%",fontSize:13,lineHeight:1.6}}>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:660,padding:"10px 14px",background:"rgba(7,7,15,0.97)",borderTop:"1px solid rgba(127,119,221,0.12)",display:"flex",gap:8}}>
        <input value={msgText} onChange={e=>setMsgText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&msgText.trim()){setMessages(p=>[...p,{from:"me",text:msgText}]);setMsgText("")}}} placeholder={t.msg} style={{flex:1,background:"#0d0d1a",border:"1px solid rgba(127,119,221,0.2)",color:"#EEEDFE",fontFamily:"monospace",fontSize:13,padding:"10px 13px",borderRadius:8,outline:"none"}}/>
        <button onClick={()=>{if(msgText.trim()){setMessages(p=>[...p,{from:"me",text:msgText}]);setMsgText("")}}} style={{background:"#534AB7",border:"none",color:"white",fontFamily:"monospace",fontSize:11,padding:"9px 16px",borderRadius:7,cursor:"pointer",flexShrink:0}}>{t.send_btn}</button>
      </div>
    </div>
  )
  // CREATE VIEW
  if(view==="profile")return(
    <div style={{minHeight:"100vh",background:"#fff",color:"#111",fontFamily:"sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fff",borderBottom:"1px solid #f0f0f0"}}>
        <button onClick={()=>setView("list")} style={{background:"none",border:"none",color:"#111",fontSize:22,cursor:"pointer"}}>←</button>
        <span style={{fontSize:16,fontWeight:600}}>{t.my_profile}</span>
        <div style={{width:30}}/>
      </nav>
      <div style={{maxWidth:500,margin:"0 auto",padding:"70px 16px 100px"}}>
        {/* PHOTO */}
        <div style={{textAlign:"center",marginBottom:24}}>
          <div onClick={()=>fileRef.current?.click()} style={{width:120,height:120,borderRadius:"50%",margin:"0 auto 12px",background:myPhoto?`url(${myPhoto}) center/cover`:"#f0f0f0",backgroundSize:"cover",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",border:"2px dashed #ddd",fontSize:32}}>{!myPhoto&&"📷"}</div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}}/>
          <button onClick={()=>fileRef.current?.click()} style={{background:"none",border:"1px solid #ddd",color:"#555",fontSize:13,padding:"7px 18px",borderRadius:20,cursor:"pointer",marginRight:8}}>{t.upload_photo}</button>
          {myPhoto&&<button onClick={()=>setMyPhoto(null)} style={{background:"none",border:"1px solid #ffcccc",color:"#ff6b6b",fontSize:13,padding:"7px 18px",borderRadius:20,cursor:"pointer"}}>{t.remove_photo}</button>}
        </div>
        {/* GENDER */}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:13,color:"#888",marginBottom:10}}>Пол</div>
          <div style={{display:"flex",gap:8}}>
            {[{v:"male",l:"👨 "+t.male},{v:"female",l:"👩 "+t.female}].map(g=>(
              <button key={g.v} onClick={()=>setMyGender(g.v)} style={{flex:1,padding:"11px 0",borderRadius:50,border:"1px solid",borderColor:myGender===g.v?"#111":"#ddd",background:myGender===g.v?"#111":"#fff",color:myGender===g.v?"#fff":"#333",fontSize:13,fontWeight:500,cursor:"pointer"}}>{g.l}</button>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
          <div><label style={{fontSize:12,color:"#888",display:"block",marginBottom:4}}>{t.age}</label><input type="number" value={myAge} onChange={e=>setMyAge(e.target.value)} placeholder="25" style={inp}/></div>
          <div><label style={{fontSize:12,color:"#888",display:"block",marginBottom:4}}>{t.height} см</label><input type="number" value={myHeight} onChange={e=>setMyHeight(e.target.value)} placeholder="170" style={inp}/></div>
          <div><label style={{fontSize:12,color:"#888",display:"block",marginBottom:4}}>{t.weight} кг</label><input type="number" value={myWeight} onChange={e=>setMyWeight(e.target.value)} placeholder="65" style={inp}/></div>
        </div>
        <div style={{marginBottom:12}}><label style={{fontSize:12,color:"#888",display:"block",marginBottom:4}}>{t.zodiac}</label><select value={myZodiac} onChange={e=>setMyZodiac(e.target.value)} style={inp}>{ZODIAC_LIST.filter(z=>z!=="All").map(z=><option key={z} value={z}>{z}</option>)}</select></div>
        <div style={{marginBottom:12}}><label style={{fontSize:12,color:"#888",display:"block",marginBottom:4}}>{t.country}</label><select value={myCountry} onChange={e=>setMyCountry(e.target.value)} style={inp}>{COUNTRIES.filter(c=>c!=="🌍 All").map(c=><option key={c} value={c}>{c}</option>)}</select></div>
        <div style={{marginBottom:12}}><label style={{fontSize:12,color:"#888",display:"block",marginBottom:4}}>{t.city}</label><input type="text" value={myCity} onChange={e=>setMyCity(e.target.value)} placeholder={t.city_ph} style={inp}/></div>
        <div style={{marginBottom:16}}><label style={{fontSize:12,color:"#888",display:"block",marginBottom:4}}>О себе</label><textarea value={myAbout} onChange={e=>setMyAbout(e.target.value)} placeholder={t.about_ph} style={{...inp,height:90,resize:"none"}}/></div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:13,color:"#888",marginBottom:10}}>❤️ {t.goal}</div>
          {[{v:"serious",l:t.serious},{v:"friends",l:t.friends},{v:"chat",l:t.chat},{v:"fun",l:t.fun}].map(g=>(
            <div key={g.v} onClick={()=>toggleArr(myGoals,setMyGoals,g.v)} style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:"1px solid #f5f5f5",cursor:"pointer"}}>
              <span style={{fontSize:14}}>{g.l}</span>
              <div style={{width:20,height:20,borderRadius:4,border:`2px solid`,borderColor:myGoals.includes(g.v)?"#111":"#ddd",background:myGoals.includes(g.v)?"#111":"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>{myGoals.includes(g.v)&&<span style={{color:"#fff",fontSize:11}}>✓</span>}</div>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          <div><label style={{fontSize:12,color:"#888",display:"block",marginBottom:4}}>🚬 {t.smoking}</label><select value={mySmoking} onChange={e=>setMySmoking(e.target.value)} style={inp}><option value="no">{t.no}</option><option value="sometimes">{t.sometimes}</option><option value="yes">{t.yes}</option></select></div>
          <div><label style={{fontSize:12,color:"#888",display:"block",marginBottom:4}}>🍷 {t.alcohol}</label><select value={myAlcohol} onChange={e=>setMyAlcohol(e.target.value)} style={inp}><option value="no">{t.no}</option><option value="sometimes">{t.sometimes}</option><option value="yes">{t.yes}</option></select></div>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:13,color:"#888",marginBottom:10}}># {t.interests_lbl}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {INTERESTS_LIST.map(i=>(
              <button key={i} onClick={()=>toggleArr(myInterests,setMyInterests,i)} style={{padding:"6px 14px",borderRadius:20,border:"1px solid",borderColor:myInterests.includes(i)?"#111":"#ddd",background:myInterests.includes(i)?"#111":"#fff",color:myInterests.includes(i)?"#fff":"#555",fontSize:13,cursor:"pointer"}}>{i}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,padding:"12px 16px",background:"#fff",borderTop:"1px solid #f0f0f0"}}>
        <button onClick={()=>{setSaved(true);setTimeout(()=>{setSaved(false);setView("list")},1500)}} style={{width:"100%",background:"#111",border:"none",color:"#fff",fontSize:15,fontWeight:600,padding:"14px",borderRadius:50,cursor:"pointer"}}>{saved?t.saved:t.save}</button>
      </div>
    </div>
  )
  // LIST VIEW
  return(
    <div style={{minHeight:"100vh",background:"#f5f5f5",color:"#111",fontFamily:"sans-serif"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fff",borderBottom:"1px solid #f0f0f0",gap:8}}>
        <a href="/" style={{fontSize:14,fontWeight:700,color:"#111",textDecoration:"none"}}>Ψ GizlinDünya</a>
        <div style={{display:"flex",gap:3}}>
          {(["tk","ru","tr","en"] as Lang[]).map(lg=>(
            <button key={lg} onClick={()=>setLang(lg)} style={{background:lang===lg?"#111":"none",border:"1px solid",borderColor:lang===lg?"#111":"#ddd",color:lang===lg?"#fff":"#888",fontFamily:"monospace",fontSize:10,padding:"3px 7px",borderRadius:3,cursor:"pointer"}}>{lg.toUpperCase()}</button>
          ))}
        </div>
        {user&&<button onClick={()=>setView("profile")} style={{background:"#111",border:"none",color:"#fff",fontSize:11,padding:"7px 14px",borderRadius:20,cursor:"pointer"}}>{t.create}</button>}
      </nav>
      <div style={{padding:"65px 12px 20px",maxWidth:1080,margin:"0 auto"}}>
        <div style={{display:"flex",gap:8,marginBottom:14,paddingTop:8}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search} style={{flex:1,background:"#fff",border:"1px solid #e8e8e8",color:"#111",fontFamily:"sans-serif",fontSize:13,padding:"10px 14px",borderRadius:50,outline:"none"}}/>
          <button onClick={()=>setView("filter")} style={{background:"#fff",border:"1px solid #e8e8e8",color:"#333",fontSize:13,padding:"10px 18px",borderRadius:50,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",gap:6}}>⚙ {t.filters}</button>
        </div>
        <div style={{fontFamily:"monospace",fontSize:11,color:"#888",marginBottom:14,paddingLeft:4}}>{filtered.length} profiles</div>
        {filtered.length===0?(
          <p style={{textAlign:"center",color:"#aaa",padding:"60px 0",fontSize:14}}>{t.empty}</p>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>
            {filtered.map((p,i)=>(
              <div key={p.id} onClick={()=>{setSelected(p);setMessages([{from:"them",text:p.about}]);setView("chat")}} style={{background:"#fff",borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:"0 1px 8px rgba(0,0,0,0.06)"}}>
                <div style={{height:180,background:p.photo?`url(${p.photo}) center/cover`:`linear-gradient(135deg,${COLORS[i%COLORS.length]}66,${COLORS[(i+1)%COLORS.length]}44)`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {!p.photo&&<div style={{width:70,height:70,borderRadius:"50%",background:COLORS[i%COLORS.length],display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:16,color:"white",fontWeight:700}}>{p.anon_code.slice(-2)}</div>}
                  {p.online&&<div style={{position:"absolute",top:10,right:10,width:10,height:10,borderRadius:"50%",background:"#1D9E75",border:"2px solid #fff"}}/>}
                  <div style={{position:"absolute",top:10,left:10,background:"rgba(0,0,0,0.4)",borderRadius:8,padding:"2px 7px",fontFamily:"monospace",fontSize:10,color:"#fff"}}>{p.zodiac.split(" ")[0]}</div>
                </div>
                <div style={{padding:"10px 12px"}}>
                  <div style={{fontFamily:"monospace",fontSize:11,color:"#7F77DD",marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.anon_code}</div>
                  <div style={{fontSize:12,color:"#888",marginBottom:6}}>{p.age}y · {p.city}</div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                    {p.goal.slice(0,2).map((g:string,j:number)=><span key={j} style={{fontSize:9,padding:"2px 6px",borderRadius:8,background:"#f0f0f0",color:"#666"}}>{g}</span>)}
                  </div>
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
