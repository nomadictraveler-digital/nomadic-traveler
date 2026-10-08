'use client';

import { useEffect, useMemo, useState } from 'react';
import { countries } from './data/countries';

type Tab='home'|'bdmap'|'worldmap'|'guide'|'planner'|'gems'|'quiz'|'profile';

const districts=['ঢাকা','ফরিদপুর','গাজীপুর','গোপালগঞ্জ','কিশোরগঞ্জ','মাদারীপুর','মানিকগঞ্জ','মুন্সিগঞ্জ','নারায়ণগঞ্জ','নরসিংদী','রাজবাড়ী','শরীয়তপুর','টাঙ্গাইল','চট্টগ্রাম','বান্দরবান','ব্রাহ্মণবাড়িয়া','চাঁদপুর','কুমিল্লা','কক্সবাজার','ফেনী','খাগড়াছড়ি','লক্ষ্মীপুর','নোয়াখালী','রাঙ্গামাটি','বরিশাল','বরগুনা','ভোলা','ঝালকাঠি','পটুয়াখালী','পিরোজপুর','খুলনা','বাগেরহাট','চুয়াডাঙ্গা','যশোর','ঝিনাইদহ','কুষ্টিয়া','মাগুরা','মেহেরপুর','নড়াইল','সাতক্ষীরা','ময়মনসিংহ','জামালপুর','নেত্রকোণা','শেরপুর','রাজশাহী','বগুড়া','জয়পুরহাট','নওগাঁ','নাটোর','চাঁপাইনবাবগঞ্জ','পাবনা','সিরাজগঞ্জ','রংপুর','দিনাজপুর','গাইবান্ধা','কুড়িগ্রাম','লালমনিরহাট','নীলফামারী','পঞ্চগড়','ঠাকুরগাঁও','সিলেট','হবিগঞ্জ','মৌলভীবাজার','সুনামগঞ্জ'];


const places=[
 {title:'আহসান মঞ্জিল',district:'ঢাকা',tag:'ইতিহাস',time:'১–২ ঘণ্টা',cost:'কম',text:'বুড়িগঙ্গার তীরে ঐতিহাসিক গোলাপি প্রাসাদ। পুরান ঢাকার heritage trip-এর জন্য আদর্শ।'},
 {title:'সাজেক ভ্যালি',district:'খাগড়াছড়ি',tag:'পাহাড়',time:'২ দিন',cost:'মাঝারি',text:'মেঘ, পাহাড়, ভোরের আলো এবং পাহাড়ি সংস্কৃতির জনপ্রিয় গন্তব্য।'},
 {title:'জাফলং',district:'সিলেট',tag:'প্রকৃতি',time:'পূর্ণ দিন',cost:'মাঝারি',text:'পাহাড়, পাথর ও নদীর দৃশ্যের জন্য সিলেটের অন্যতম জনপ্রিয় ভ্রমণস্থান।'},
 {title:'কান্তজীর মন্দির',district:'দিনাজপুর',tag:'ঐতিহ্য',time:'২–৩ ঘণ্টা',cost:'কম',text:'টেরাকোটা অলংকরণে সমৃদ্ধ ঐতিহাসিক মন্দির ও উত্তরবঙ্গের গুরুত্বপূর্ণ heritage site।'},
 {title:'সেন্টমার্টিন',district:'কক্সবাজার',tag:'দ্বীপ',time:'২–৩ দিন',cost:'মাঝারি',text:'নীল সমুদ্র, দ্বীপজীবন ও সূর্যাস্ত—মৌসুম অনুযায়ী পরিকল্পনা করুন।'},
 {title:'লাউয়াছড়া',district:'মৌলভীবাজার',tag:'বন',time:'অর্ধ দিন',cost:'কম',text:'চা-বাগান ও বৃষ্টিবনের কাছাকাছি nature escape।'}
];

const quiz=[
 {q:'বাংলাদেশে মোট কতটি জেলা?',a:['৫৪','৬৪','৭৪','৮৪'],c:1},
 {q:'আহসান মঞ্জিল কোন জেলায়?',a:['ঢাকা','ফেনী','খুলনা','নাটোর'],c:0},
 {q:'সাজেক কোন অঞ্চলের পাহাড়ি গন্তব্য?',a:['চট্টগ্রাম পার্বত্য অঞ্চল','বরিশাল','রংপুর','খুলনা'],c:0},
 {q:'কান্তজীর মন্দির কোন জেলায়?',a:['দিনাজপুর','সিলেট','কুমিল্লা','রাজশাহী'],c:0},
];

export default function Home(){
 const [tab,setTab]=useState<Tab>('home');
 const [selectedBD,setSelectedBD]=useState<string[]>([]);
 const [selectedWorld,setSelectedWorld]=useState<string[]>([]);
 const [search,setSearch]=useState('');
 const [days,setDays]=useState(3);
 const [budget,setBudget]=useState(20000);
 const [notice,setNotice]=useState('');
 const [qi,setQi]=useState(0);
 const [score,setScore]=useState(0);
 const current=tab==='worldmap'?countries:districts;
 const selected=tab==='worldmap'?selectedWorld:selectedBD;
 const filtered=useMemo(()=>current.filter(x=>x.toLowerCase().includes(search.toLowerCase())),[current,search]);
 const pct=Math.round(selected.length/current.length*100);
 const go=(t:Tab)=>{setTab(t);setSearch('');window.scrollTo({top:0,behavior:'smooth'});};
 const toggle=(x:string)=>tab==='worldmap'?setSelectedWorld(s=>s.includes(x)?s.filter(v=>v!==x):[...s,x]):setSelectedBD(s=>s.includes(x)?s.filter(v=>v!==x):[...s,x]);
 const all=()=>tab==='worldmap'?setSelectedWorld([...countries]):setSelectedBD([...districts]);
 const clear=()=>tab==='worldmap'?setSelectedWorld([]):setSelectedBD([]);
 const exportMap=()=>setNotice('Export module: PNG / JPG / PDF download will be connected with the final map renderer.');
 const answer=(i:number)=>{const next=score+(i===quiz[qi].c?1:0);setScore(next);if(qi<quiz.length-1)setQi(qi+1);else setNotice('কুইজ শেষ! আপনার স্কোর '+next+'/'+quiz.length);};

 return <div className="site">
  <header className="header"><div className="wrap headerIn">
   <button className="logo" onClick={()=>go('home')}><span className="logoMark">✦</span><span><b>NOMADIC</b><em>TRAVELER</em><small>TRAVEL BEYOND LIMITS</small></span></button>
   <nav>{[['home','হোম'],['bdmap','আমার ম্যাপ'],['guide','ভ্রমণ গাইড'],['planner','ট্রিপ প্ল্যানার'],['gems','লুকানো রত্ন'],['quiz','কুইজ']].map(([k,l])=><button key={k} className={tab===k?'active':''} onClick={()=>go(k as Tab)}>{l}</button>)}</nav>
   <button className="login" onClick={()=>go('profile')}>আমার প্রোফাইল</button>
  </div></header>

  {notice&&<div className="wrap"><div className="notice">{notice}<button onClick={()=>setNotice('')}>×</button></div></div>}

  {tab==='home'&&<main>
   <section className="hero wrap"><div><span className="kicker">YOUR JOURNEY · YOUR STORY</span><h1>কতটুকু ঘুরে<br/><strong>দেখেছেন?</strong></h1><p>বাংলাদেশের ৬৪ জেলা থেকে বিশ্বের দেশগুলো—আপনার ভ্রমণকে ম্যাপে রাঙান, নতুন জায়গা খুঁজুন, ট্রিপ সাজান এবং নিজের ভ্রমণ গল্প তৈরি করুন।</p><div className="heroBtns"><button onClick={()=>go('bdmap')}>🗺️ আমার ভ্রমণ ম্যাপ</button><button className="light" onClick={()=>go('planner')}>🧭 ট্রিপ প্ল্যান করুন</button></div></div><div className="heroVisual"><div className="globe">🌏</div><div className="floatingCard"><b>{selectedBD.length}</b><span>জেলা ঘোরা</span></div></div></section>

   <section className="mapSection wrap"><div className="sectionIntro"><span className="kicker">BANGLADESH · 64 DISTRICTS</span><h2>বাংলাদেশের কতটুকু ঘুরে দেখেছেন?</h2><p>যেসব জেলায় গিয়েছেন সেগুলো বেছে নিন। আপনার নিজের ভ্রমণ ম্যাপ তৈরি করুন।</p></div><MapPicker items={districts} selected={selectedBD} onToggle={x=>setSelectedBD(s=>s.includes(x)?s.filter(v=>v!==x):[...s,x])} onAll={()=>setSelectedBD([...districts])} onClear={()=>setSelectedBD([])} onExport={exportMap}/></section>

   <section className="worldSection"><div className="wrap"><div className="sectionIntro"><span className="kicker">WORLD · 195 COUNTRIES</span><h2>পৃথিবীর কতটুকু ঘুরে দেখেছেন?</h2><p>আপনার বিশ্ব ভ্রমণের গল্পকে এক নজরে দেখুন।</p></div><div className="worldPreview"><div className="worldDots">🌍</div><div><strong>{selectedWorld.length} / {countries.length}</strong><span>দেশ ভ্রমণ</span><button onClick={()=>go('worldmap')}>বিশ্ব ম্যাপ খুলুন →</button></div></div></div></section>

   <section className="wrap guideSection"><div className="sectionIntro row"><div><span className="kicker">EXPLORE BANGLADESH</span><h2>কোথায় ঘুরতে যাবেন?</h2><p>দর্শনীয় স্থান, কীভাবে যাবেন, সময়, খরচ ও কাছাকাছি কী দেখবেন।</p></div><button className="outline" onClick={()=>go('guide')}>সব গাইড →</button></div><div className="cards">{places.slice(0,3).map(p=><PlaceCard key={p.title} p={p} onClick={()=>go('planner')}/>)}</div></section>

   <section className="plannerBand"><div className="wrap split"><div><span className="kicker">YOUR PERSONAL TRIP</span><h2>আপনার মতো করে<br/>ভ্রমণ সাজান</h2><p>শুরু করার জায়গা, গন্তব্য, দিন ও বাজেট দিন। আপনার জন্য একটি itinerary draft তৈরি হবে।</p><button onClick={()=>go('planner')}>ট্রিপ প্ল্যানার খুলুন →</button></div><div className="route"><span>ঢাকা</span><i>→</i><span>সিলেট</span><i>→</i><span>সাজেক</span></div></div></section>

   <section className="wrap featureSection"><div className="cards four"><Mini icon="💎" title="লুকানো রত্ন" text="আপনার এলাকার কম পরিচিত জায়গা, খাবার ও পণ্য শেয়ার করুন।" click={()=>go('gems')}/><Mini icon="🧠" title="বাংলাদেশ কুইজ" text="ভ্রমণ করতে করতে দেশটাকে আরও ভালোভাবে চিনুন।" click={()=>go('quiz')}/><Mini icon="🏆" title="লিডারবোর্ড" text="পয়েন্ট, ব্যাজ ও community achievements সংগ্রহ করুন।" click={()=>go('quiz')}/><Mini icon="👤" title="Travel Profile" text="আপনার ভ্রমণ ইতিহাস ও অর্জন এক জায়গায় রাখুন।" click={()=>go('profile')}/></div></section>
  </main>}

  {(tab==='bdmap'||tab==='worldmap')&&<Page><div className="pageTitle"><span className="kicker">{tab==='bdmap'?'MY BANGLADESH MAP':'MY WORLD MAP'}</span><h1>{tab==='bdmap'?'যেসব জেলায় গিয়েছি':'যেসব দেশে গিয়েছি'}</h1><p>তালিকা থেকে বেছে নিন অথবা ভবিষ্যতে interactive map-এ সরাসরি ক্লিক করুন।</p></div><MapPicker items={current} selected={selected} onToggle={toggle} onAll={all} onClear={clear} onExport={exportMap}/></Page>}

  {tab==='guide'&&<Page><div className="pageTitle"><span className="kicker">64 DISTRICTS · TRAVEL GUIDE</span><h1>বাংলাদেশ ভ্রমণ গাইড</h1><p>প্রতিটি জেলার দর্শনীয় স্থান, খাবার, যাতায়াত, আনুমানিক খরচ ও ভ্রমণ টিপস।</p></div><div className="guideFilter"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="জেলা বা জায়গার নাম খুঁজুন…"/></div><div className="cards three">{places.filter(p=>(p.title+p.district).toLowerCase().includes(search.toLowerCase())).map(p=><PlaceCard key={p.title} p={p} onClick={()=>go('planner')}/>)}</div></Page>}

  {tab==='planner'&&<Page><div className="pageTitle"><span className="kicker">TRIP PLANNER</span><h1>আপনার পরের ট্রিপ</h1><p>কোথা থেকে শুরু করবেন, কোথায় যাবেন, কতদিন থাকবেন এবং কত বাজেট—সব ঠিক করুন।</p></div><div className="planner"><div className="panel"><label>শুরু করবেন কোথা থেকে?</label><select><option>ঢাকা</option><option>চট্টগ্রাম</option><option>সিলেট</option><option>রাজশাহী</option></select><label>গন্তব্য</label><div className="choiceGrid">{places.map(p=><button key={p.title} className={selectedBD.includes(p.district)?'chosen':''} onClick={()=>setSelectedBD(s=>s.includes(p.district)?s.filter(x=>x!==p.district):[...s,p.district])}>{p.district}<small>{p.title}</small></button>)}</div><label>কত দিন? <b>{days}</b></label><input type="range" min="1" max="14" value={days} onChange={e=>setDays(+e.target.value)}/><label>মোট বাজেট (৳)</label><input type="number" value={budget} onChange={e=>setBudget(+e.target.value)}/><button className="primary" onClick={()=>setNotice('আপনার '+days+' দিনের ৳'+budget.toLocaleString()+' trip draft তৈরি হয়েছে।')}>✨ Generate Trip</button></div><div className="panel itinerary"><span className="kicker">ITINERARY PREVIEW</span><h2>{days}-Day Bangladesh Explorer</h2><p>আনুমানিক বাজেট: ৳{budget.toLocaleString()}</p>{Array.from({length:Math.min(days,5)},(_,i)=><div className="day" key={i}><b>Day {i+1}</b><strong>{places[i%places.length].district}</strong><span>{places[i%places.length].title} · local food · exploration</span></div>)}<button className="outline" onClick={exportMap}>🖨️ Print / PDF</button></div></div></Page>}

  {tab==='gems'&&<Page><div className="pageTitle"><span className="kicker">COMMUNITY CONTRIBUTION</span><h1>লুকানো রত্নের খোঁজ দিন</h1><p>আপনার এলাকায় এমন কোনো জায়গা, খাবার বা পণ্য আছে যা অন্য ভ্রমণকারীদের জানা দরকার?</p></div><div className="planner"><div className="panel form"><label>জায়গার নাম *</label><input placeholder="যেমন: গোপন ঝরনা"/><label>জেলা *</label><select>{districts.map(d=><option key={d}>{d}</option>)}</select><label>বর্ণনা *</label><textarea placeholder="জায়গাটি সম্পর্কে বিস্তারিত লিখুন…"/><label>Google Maps link</label><input placeholder="https://maps.app.goo.gl/…"/><label>আপনার নাম *</label><input placeholder="নাম"/><label>ছবি</label><input type="file" accept="image/*" multiple/><button className="primary" onClick={()=>setNotice('ধন্যবাদ! তথ্যটি verification queue-তে পাঠানোর জন্য প্রস্তুত।')}>📍 যাচাইয়ের জন্য পাঠান</button></div><div className="panel"><h2>Community guidelines</h2><ul><li>সত্য ও যাচাইযোগ্য তথ্য দিন</li><li>নিজের তোলা ছবি ব্যবহার করুন</li><li>খরচ/সময় পরিবর্তনশীল হলে উল্লেখ করুন</li><li>Admin review-এর পর প্রকাশ হবে</li></ul><div className="scoreCard">🏆 Approved contribution = points + achievement</div></div></div></Page>}

  {tab==='quiz'&&<Page><div className="pageTitle"><span className="kicker">LEARN · PLAY · EARN</span><h1>বাংলাদেশকে কতটা চেনেন?</h1><p>১০ প্রশ্নের full quiz, map puzzle, personality এবং leaderboard—পরের ধাপে যুক্ত হবে।</p></div><div className="quiz"><div className="quizHead"><span>Question {qi+1}/{quiz.length}</span><b>Score {score}</b></div><h2>{quiz[qi].q}</h2><div className="answers">{quiz[qi].a.map((a,i)=><button key={a} onClick={()=>answer(i)}>{a}</button>)}</div></div><div className="leader"><h2>🏆 সেরা খেলোয়াড়</h2>{['Travel Master','Nomad Explorer','Bangladesh Lover'].map((x,i)=><div key={x}><b>{i+1}. {x}</b><span>{9850-i*700} pts</span></div>)}</div></Page>}

  {tab==='profile'&&<Page><div className="pageTitle"><span className="kicker">MY TRAVEL PROFILE</span><h1>আপনার ভ্রমণ গল্প</h1><p>Visited places, travel timeline, achievements এবং community contribution এক profile-এ।</p></div><div className="profile"><div className="avatar">NT</div><div><h2>Nomadic Traveler</h2><p>Travel beyond limits</p></div><button className="outline" onClick={exportMap}>Share / Export</button></div><div className="stats"><Stat n={selectedBD.length} t="Districts"/><Stat n={selectedWorld.length} t="Countries"/><Stat n="0" t="Trips"/><Stat n="0" t="Badges"/></div></Page>}

  <footer><div className="wrap"><b>NOMADIC TRAVELER</b><p>Travel beyond limits · A volunteer travel community.</p><div>© 2026 Nomadic Traveler · Privacy · Community Guidelines</div></div></footer>
 </div>
}

function Page({children}:{children:React.ReactNode}){return <main className="wrap inner">{children}</main>}
function MapPicker({items,selected,onToggle,onAll,onClear,onExport}:{items:string[],selected:string[],onToggle:(x:string)=>void,onAll:()=>void,onClear:()=>void,onExport:()=>void}){const [q,setQ]=useState('');const filtered=items.filter(x=>x.toLowerCase().includes(q.toLowerCase()));return <div className="mapCard"><div className="mapStats"><div><b>{selected.length}</b><span>ঘোরা</span></div><div><b>{Math.round(selected.length/items.length*100)}%</b><span>সম্পন্ন</span></div><div><b>{items.length}</b><span>মোট</span></div></div>{items===districts ? <RealDistrictMap selected={selected} onToggle={onToggle}/> : <div className="fakeMap">{items.slice(0,Math.min(items.length,80)).map((x,i)=><button key={x} style={{left:(i*37)%92+'%',top:(i*53)%82+'%'}} className={selected.includes(x)?'dot on':'dot'} title={x} onClick={()=>onToggle(x)}>•</button>)}</div>}<div className="mapToolbar"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="খুঁজুন…"/><button className="outline" onClick={onAll}>সব বাছাই</button><button className="outline" onClick={onClear}>সব মুছুন</button></div><div className="places">{filtered.map(x=><button key={x} className={selected.includes(x)?'place on':'place'} onClick={()=>onToggle(x)}>{selected.includes(x)?'✓ ':''}{x}</button>)}</div><div className="exports"><button className="primary" onClick={onExport}>↓ PNG</button><button className="outline" onClick={onExport}>↓ JPG</button><button className="outline" onClick={onExport}>↓ PDF</button></div></div>}

function RealDistrictMap({selected,onToggle}:{selected:string[],onToggle:(x:string)=>void}){
 const [features,setFeatures]=useState<any[]>([]); const [names,setNames]=useState<Record<string,string>>({}); const [error,setError]=useState(''); const [hover,setHover]=useState('');
 useEffect(()=>{Promise.all([
  fetch('https://www.bamis.gov.bd/res/public/map/bangladesh_district_bounds.json').then(r=>r.ok?r.json():Promise.reject(new Error('Map data unavailable'))),
  fetch('https://raw.githubusercontent.com/ifahimreza/bangladesh-geojson/master/src/data/bd-districts.json').then(r=>r.ok?r.json():Promise.reject(new Error('District names unavailable')))
 ]).then(([geo,meta])=>{setFeatures(geo.features||[]);const map:Record<string,string>={};for(const d of meta.districts||[])map[d.name]=d.bn_name;setNames(map)}).catch(()=>setError('মানচিত্রের geographic data এখন লোড করা যাচ্ছে না।'))},[]);
 const allPoints=(g:any):number[][]=>{if(g.type==='Polygon')return g.coordinates.flat();if(g.type==='MultiPolygon')return g.coordinates.flat(1).flat();return []};
 const pts=features.flatMap(f=>allPoints(f.geometry)); const xs=pts.map(p=>p[0]), ys=pts.map(p=>p[1]); const minX=Math.min(...xs,88),maxX=Math.max(...xs,93),minY=Math.min(...ys,20),maxY=Math.max(...ys,27); const pad=1.5;
 const project=(p:number[])=>{const x=((p[0]-minX)/(maxX-minX))*100;const y=(1-(p[1]-minY)/(maxY-minY))*100;return [x,y]};
 const ringPath=(ring:number[][])=>ring.map((p,i)=>{const [x,y]=project(p);return (i?'L':'M')+x.toFixed(3)+' '+y.toFixed(3)}).join(' ')+' Z';
 const geometryPath=(g:any)=>g.type==='Polygon'?g.coordinates.map(ringPath).join(' '):g.coordinates.map((poly:any)=>poly.map(ringPath).join(' ')).join(' ');
 if(error)return <div className="realMapState">{error}</div>; if(!features.length)return <div className="realMapState">বাংলাদেশের ৬৪ জেলার আসল boundary map লোড হচ্ছে…</div>;
 return <div className="realMapWrap"><svg className="districtSvg" viewBox={`0 0 100 100`} role="img" aria-label="Bangladesh 64 district map">{features.map(f=>{const en=f.properties?.NAME_2||f.properties?.ADM2_EN||'';const bn=names[en]||en;const on=selected.includes(bn);return <path key={en} d={geometryPath(f.geometry)} className={on?'districtShape visited':'districtShape'} onMouseEnter={()=>setHover(bn)} onMouseLeave={()=>setHover('')} onClick={()=>onToggle(bn)}><title>{bn}</title></path>})}</svg><div className="mapLegend"><span><i className="legendDot visitedDot"/> ঘোরা</span><span><i className="legendDot"/> বাকি</span>{hover&&<b>{hover}</b>}<small>Source: Bangladesh Agricultural Meteorological Information Service (BAMIS)</small></div></div>}
\nfunction PlaceCard({p,onClick}:{p:typeof places[number],onClick:()=>void}){return <article className="placeCard"><div className="photo">{p.tag==='পাহাড়'?'🏔️':p.tag==='দ্বীপ'?'🏝️':p.tag==='বন'?'🌳':p.tag==='ঐতিহ্য'?'🏛️':'🌿'}</div><span>{p.tag}</span><h3>{p.title}</h3><small>{p.district} · {p.time} · আনুমানিক খরচ {p.cost}</small><p>{p.text}</p><button onClick={onClick}>ভ্রমণ প্ল্যান করুন →</button></article>}
function Mini({icon,title,text,click}:{icon:string,title:string,text:string,click:()=>void}){return <button className="miniCard" onClick={click}><i>{icon}</i><b>{title}</b><p>{text}</p><span>আরও দেখুন →</span></button>}
function Stat({n,t}:{n:string|number,t:string}){return <div className="stat"><b>{n}</b><span>{t}</span></div>}
