'use client';

import { useMemo, useState } from 'react';

type Tab = 'home'|'map'|'guide'|'planner'|'gems'|'quiz'|'profile';
type Mode = 'bd'|'world';

const districts = ['Dhaka','Faridpur','Gazipur','Gopalganj','Kishoreganj','Madaripur','Manikganj','Munshiganj','Narayanganj','Narsingdi','Rajbari','Shariatpur','Tangail','Chattogram','Bandarban','Brahmanbaria','Chandpur','Cumilla','Cox’s Bazar','Feni','Khagrachhari','Lakshmipur','Noakhali','Rangamati','Barishal','Barguna','Bhola','Jhalokati','Patuakhali','Pirojpur','Khulna','Bagerhat','Chuadanga','Jashore','Jhenaidah','Kushtia','Magura','Meherpur','Narail','Satkhira','Mymensingh','Jamalpur','Netrokona','Sherpur','Rajshahi','Bogura','Joypurhat','Naogaon','Natore','Chapainawabganj','Pabna','Sirajganj','Rangpur','Dinajpur','Gaibandha','Kurigram','Lalmonirhat','Nilphamari','Panchagarh','Thakurgaon','Sylhet','Habiganj','Moulvibazar','Sunamganj'];

const countries = ['Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica','Côte d’Ivoire','Croatia','Cuba','Cyprus','Czechia','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Türkiye','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'];

const guides = [
  {title:'Ahsan Manzil', district:'Dhaka', tag:'History', time:'1.5–2 hours', cost:'Low', text:'Pink Palace beside the Buriganga, ideal for a heritage-focused day in Old Dhaka.'},
  {title:'Nuhash Palli', district:'Gazipur', tag:'Nature', time:'Half day', cost:'Medium', text:'A green escape near Dhaka with gardens, lakes and a relaxed day-trip atmosphere.'},
  {title:'Rajban Vihara', district:'Rangamati', tag:'Culture', time:'1–1.5 hours', cost:'Low', text:'A lakeside Buddhist monastery and a good starting point for exploring Rangamati.'},
  {title:'Hakaluki Haor', district:'Moulvibazar', tag:'Nature', time:'Full day', cost:'Medium', text:'Wetland scenery and birdlife; local boat guidance is recommended.'},
  {title:'Uttara Gonobhaban', district:'Natore', tag:'Heritage', time:'2–3 hours', cost:'Low', text:'Historic palace complex with gardens and a strong Rajshahi-region heritage story.'},
  {title:'Maheshkhali Island', district:'Cox’s Bazar', tag:'Island', time:'Full day', cost:'Medium', text:'Island landscapes, local food and coastal experiences beyond Cox’s Bazar beach.'}
];

const quiz = [
  {q:'বাংলাদেশে মোট কতটি জেলা?', a:['54','64','74','84'], correct:1},
  {q:'রাঙ্গামাটি কোন বিভাগের অন্তর্ভুক্ত?', a:['ঢাকা','সিলেট','চট্টগ্রাম','রাজশাহী'], correct:2},
  {q:'আহসান মঞ্জিল কোথায়?', a:['ঢাকা','নাটোর','কুমিল্লা','খুলনা'], correct:0},
  {q:'বাংলাদেশের দক্ষিণ-পূর্বের পার্বত্য জেলার একটি কোনটি?', a:['রাজবাড়ী','বান্দরবান','নাটোর','মেহেরপুর'], correct:1}
];

const nav: [Tab,string][] = [['home','Home'],['map','My Map'],['guide','Explore'],['planner','Trip Planner'],['gems','Hidden Gems'],['quiz','Quiz'],['profile','Profile']];

export default function Home() {
  const [tab,setTab] = useState<Tab>('home');
  const [mode,setMode] = useState<Mode>('bd');
  const [selected,setSelected] = useState<string[]>([]);
  const [query,setQuery] = useState('');
  const [guideQuery,setGuideQuery] = useState('');
  const [tripDays,setTripDays] = useState(3);
  const [budget,setBudget] = useState(20000);
  const [quizIndex,setQuizIndex] = useState(0);
  const [score,setScore] = useState(0);
  const [notice,setNotice] = useState('');

  const places = mode === 'bd' ? districts : countries;
  const filtered = useMemo(()=>places.filter(x=>x.toLowerCase().includes(query.toLowerCase())),[places,query]);
  const guideResults = useMemo(()=>guides.filter(x=>(x.title+' '+x.district+' '+x.tag).toLowerCase().includes(guideQuery.toLowerCase())),[guideQuery]);
  const progress = Math.round(selected.length/(mode==='bd'?64:195)*100);

  function toggle(place:string){setSelected(s=>s.includes(place)?s.filter(x=>x!==place):[...s,place]);setNotice('');}
  function switchMode(m:Mode){setMode(m);setSelected([]);setQuery('');}
  function go(t:Tab){setTab(t);setNotice('');}
  function selectAll(){setSelected([...places]);}
  function clear(){setSelected([]);}
  function exportProfile(){setNotice('Profile export is prepared for the next PDF/PNG module. Your selected places are preserved in this session.');}
  function answer(i:number){if(i===quiz[quizIndex].correct)setScore(score+1);if(quizIndex<quiz.length-1)setQuizIndex(quizIndex+1);else setNotice('Quiz complete! Score: '+(score+(i===quiz[quizIndex].correct?1:0))+'/'+quiz.length);}

  return <div>
    <header className="topbar"><div className="container nav">
      <button className="brand brandButton" onClick={()=>go('home')}>🌍 Nomadic Traveler <small>Travel beyond limits</small></button>
      <nav className="desktopNav">{nav.map(([key,label])=><button key={key} className={tab===key?'navItem active':'navItem'} onClick={()=>go(key)}>{label}</button>)}</nav>
      <button className="btn secondary" onClick={()=>setNotice('Sign-in/API authentication will be connected in the Laravel phase.')}>Sign in</button>
    </div></header>

    <main className="container">
      {notice && <div className="notice" role="status">{notice}<button onClick={()=>setNotice('')}>×</button></div>}

      {tab==='home' && <section>
        <div className="hero"><span className="eyebrow">YOUR JOURNEY · YOUR STORY</span><h1>কতটুকু ঘুরে দেখেছেন?</h1><p>বাংলাদেশের ৬৪ জেলা থেকে বিশ্বের ১৯৫ দেশ—আপনার ভ্রমণকে ম্যাপে রাঙান, নতুন জায়গা খুঁজুন, ট্রিপ সাজান এবং নিজের travel profile তৈরি করুন।</p><div className="actions"><button className="btn" onClick={()=>go('map')}>🗺️ My Travel Map</button><button className="btn secondary" onClick={()=>go('planner')}>🧭 Plan a Trip</button></div></div>
        <div className="stats"><Stat n={selected.length} label={mode==='bd'?'Selected districts':'Selected countries'}/><Stat n={progress+'%'} label="Current progress"/><Stat n="0" label="Trips planned"/><Stat n="0" label="Achievements"/></div>
        <section className="card sectionGap"><div className="section-title"><div><span className="eyebrow">DISCOVER</span><h2>বাংলাদেশের কিছু গল্প</h2></div><button className="btn secondary" onClick={()=>go('guide')}>সব দেখুন →</button></div><div className="feature-grid">{guides.slice(0,3).map(g=><GuideCard key={g.title} g={g}/>)}</div></section>
        <section className="feature-grid sectionGap"><Feature icon="🗺️" title="Travel Map" text="Visited districts and countries in one personal travel map." onClick={()=>go('map')}/><Feature icon="🧭" title="Trip Planner" text="Destinations, days, budget and route planning." onClick={()=>go('planner')}/><Feature icon="💎" title="Hidden Gems" text="Community-submitted places, food and local products." onClick={()=>go('gems')}/><Feature icon="🏆" title="Quiz & Leaderboard" text="Learn Bangladesh, collect points and earn badges." onClick={()=>go('quiz')}/></section>
      </section>}

      {tab==='map' && <section>
        <div className="pageHead"><span className="eyebrow">MY TRAVEL MAP</span><h1>আপনার ভ্রমণের মানচিত্র</h1><p>জেলা বা দেশ বেছে নিন। নির্বাচিত জায়গাগুলো আপনার travel profile-এর ভিত্তি হবে।</p></div>
        <div className="card"><div className="tabs"><button className={mode==='bd'?'tab active':'tab'} onClick={()=>switchMode('bd')}>🇧🇩 Bangladesh · 64 districts</button><button className={mode==='world'?'tab active':'tab'} onClick={()=>switchMode('world')}>🌍 World · 195 countries</button></div><div className="mapMock"><div className="mapOrb">🌍</div><div><b>{selected.length} selected</b><p className="muted">{progress}% of {mode==='bd'?64:195} tracked</p><div className="progress"><span style={{width:progress+'%'}}/></div></div></div><div className="toolbar"><input className="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={mode==='bd'?'জেলা খুঁজুন…':'দেশ খুঁজুন…'}/><button className="btn secondary" onClick={selectAll}>সব বাছাই</button><button className="btn secondary" onClick={clear}>সব মুছুন</button></div><div className="grid">{filtered.map(x=><button key={x} className={selected.includes(x)?'place selected':'place'} onClick={()=>toggle(x)}>{selected.includes(x)?'✓ ':''}{x}</button>)}</div></div>
        <div className="actions sectionGap"><button className="btn" onClick={exportProfile}>↓ Export PNG</button><button className="btn secondary" onClick={exportProfile}>↓ Export JPG</button><button className="btn secondary" onClick={exportProfile}>↓ Export PDF</button></div>
      </section>}

      {tab==='guide' && <section><div className="pageHead"><span className="eyebrow">EXPLORE BANGLADESH</span><h1>কোথায় ঘুরতে যাবেন?</h1><p>জেলা, দর্শনীয় স্থান, hidden gems, কীভাবে যাবেন, সময় ও আনুমানিক খরচ—এক জায়গায়।</p></div><div className="card"><input className="search" value={guideQuery} onChange={e=>setGuideQuery(e.target.value)} placeholder="জেলা বা জায়গার নাম খুঁজুন…"/><div className="feature-grid sectionGap">{guideResults.map(g=><GuideCard key={g.title} g={g} detailed onPlan={()=>{setTab('planner');setNotice(g.title+' আপনার trip planner-এ যোগ করার জন্য নির্বাচিত হয়েছে।')}}/> )}</div></div></section>}

      {tab==='planner' && <section><div className="pageHead"><span className="eyebrow">TRIP PLANNER</span><h1>আপনার মতো করে ট্রিপ সাজান</h1><p>কোথা থেকে শুরু করবেন, কোথায় যাবেন, কতদিন থাকবেন ও বাজেট—সব একসাথে।</p></div><div className="plannerGrid"><div className="card"><label>শুরু করবেন কোথা থেকে?</label><select className="field"><option>Dhaka</option><option>Chattogram</option><option>Sylhet</option><option>Rajshahi</option></select><label>গন্তব্য নির্বাচন</label><div className="miniGrid">{guides.map(g=><button key={g.title} className={selected.includes(g.district)?'mini selected':'mini'} onClick={()=>toggle(g.district)}>{g.district}<small>{g.title}</small></button>)}</div><label>কত দিন? <b>{tripDays}</b></label><input type="range" min="1" max="14" value={tripDays} onChange={e=>setTripDays(+e.target.value)}/><label>মোট বাজেট (৳)</label><input className="field" type="number" value={budget} onChange={e=>setBudget(Math.max(0,+e.target.value))}/><button className="btn" onClick={()=>setNotice('Trip draft তৈরি হয়েছে: '+tripDays+' দিন · ৳'+budget.toLocaleString())}>✨ Generate trip</button></div><div className="card itinerary"><span className="eyebrow">PREVIEW</span><h2>{tripDays}-Day Bangladesh Explorer</h2><p className="muted">Estimated group budget: ৳{budget.toLocaleString()}</p>{Array.from({length:Math.min(tripDays,5)},(_,i)=><div className="day" key={i}><b>Day {i+1}</b><span>{guides[i%guides.length].district}</span><small>{guides[i%guides.length].title} · local food · flexible exploration</small></div>)}<button className="btn secondary" onClick={()=>setNotice('Print/PDF itinerary module will be connected after API persistence.')}>🖨️ Print / PDF</button></div></div></section>}

      {tab==='gems' && <section><div className="pageHead"><span className="eyebrow">COMMUNITY</span><h1>লুকানো রত্ন</h1><p>আপনার এলাকার এমন জায়গা, খাবার বা পণ্যের তথ্য দিন—যা অন্য ভ্রমণকারীদের কাজে আসবে।</p></div><div className="plannerGrid"><div className="card"><h2>+ একটি জায়গা যোগ করুন</h2><label>জায়গার নাম *</label><input className="field" placeholder="যেমন: কোনো hidden waterfall"/><label>জেলা *</label><select className="field">{districts.slice(0,20).map(d=><option key={d}>{d}</option>)}</select><label>বর্ণনা *</label><textarea className="field textarea" placeholder="কমপক্ষে ১০০ অক্ষরে জায়গাটির বর্ণনা লিখুন…"/><label>Google Maps link</label><input className="field" placeholder="https://maps.app.goo.gl/…"/><label>আপনার নাম *</label><input className="field" placeholder="নাম"/><button className="btn" onClick={()=>setNotice('ধন্যবাদ! আপনার submission review queue-তে যাবে।')}>📍 যাচাইয়ের জন্য পাঠান</button></div><div className="card"><h2>Community guidelines</h2><ul className="cleanList"><li>নিজের তোলা ছবি ও সত্য তথ্য দিন</li><li>ভুল/বিভ্রান্তিকর তথ্য প্রকাশ করা হবে না</li><li>খরচ ও সময়সূচি পরিবর্তনশীল হলে তা উল্লেখ করুন</li><li>Admin review-এর পর content প্রকাশ হবে</li></ul><div className="feature"><b>🏆 Contributor points</b><p className="muted">Approved hidden gem-এর জন্য points ও future badges যোগ হবে।</p></div></div></div></section>}

      {tab==='quiz' && <section><div className="pageHead"><span className="eyebrow">LEARN & PLAY</span><h1>বাংলাদেশকে কতটা চেনেন?</h1><p>ছোট কুইজ খেলুন, points সংগ্রহ করুন এবং leaderboard-এ জায়গা করে নিন।</p></div><div className="quizBox"><div className="quizTop"><span>Question {quizIndex+1}/{quiz.length}</span><b>Score: {score}</b></div><h2>{quiz[quizIndex].q}</h2><div className="answers">{quiz[quizIndex].a.map((a,i)=><button key={a} onClick={()=>answer(i)}>{a}</button>)}</div></div><div className="card sectionGap"><h2>🏆 Leaderboard</h2><div className="leader"><b>1. Travel Master</b><span>9,850 pts</span></div><div className="leader"><b>2. Nomad Explorer</b><span>8,420 pts</span></div><div className="leader"><b>3. Bangladesh Lover</b><span>7,930 pts</span></div></div></section>}

      {tab==='profile' && <section><div className="pageHead"><span className="eyebrow">MY TRAVEL PROFILE</span><h1>আপনার travel story</h1><p>একটি public profile-এ আপনার visited places, achievements এবং travel timeline দেখানো হবে।</p></div><div className="profileHero card"><div className="avatar">NT</div><div><h2>Nomadic Traveler</h2><p className="muted">Travel beyond limits · Bangladesh</p></div><button className="btn secondary" onClick={exportProfile}>Share / Export</button></div><div className="stats sectionGap"><Stat n={selected.length} label={mode==='bd'?'Districts':'Countries'}/><Stat n="0" label="Trips"/><Stat n="0" label="Badges"/><Stat n="0" label="Points"/></div><div className="card sectionGap"><h2>Next achievements</h2><div className="feature-grid"><Feature icon="🥉" title="First Explorer" text="Track your first destination."/><Feature icon="🗺️" title="10 Places" text="Visit ten destinations."/><Feature icon="🌏" title="World Starter" text="Track your first five countries."/><Feature icon="🏆" title="Community Hero" text="Submit an approved hidden gem."/></div></div></section>}
    </main>
    <footer className="footer">© 2026 Nomadic Traveler · A volunteer travel community · Travel beyond limits.</footer>
  </div>;
}

function Stat({n,label}:{n:string|number,label:string}){return <div className="card stat"><strong>{n}</strong><span>{label}</span></div>}
function Feature({icon,title,text,onClick}:{icon:string,title:string,text:string,onClick?:()=>void}){return <button className="feature featureButton" onClick={onClick}><span className="featureIcon">{icon}</span><b>{title}</b><p className="muted">{text}</p></button>}
function GuideCard({g,detailed,onPlan}:{g:(typeof guides)[number],detailed?:boolean,onPlan?:()=>void}){return <article className="feature guide"><span className="tag">{g.tag}</span><h3>{g.title}</h3><p className="muted">{g.district} · {g.time} · {g.cost} cost</p><p>{g.text}</p>{detailed&&<button className="btn secondary" onClick={onPlan}>Add to trip →</button>}</article>}
