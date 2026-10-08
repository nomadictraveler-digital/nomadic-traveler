'use client';

import { useMemo, useState } from 'react';

const districts = ['Dhaka','Faridpur','Gazipur','Gopalganj','Kishoreganj','Madaripur','Manikganj','Munshiganj','Narayanganj','Narsingdi','Rajbari','Shariatpur','Tangail','Chattogram','Bandarban','Brahmanbaria','Chandpur','Cumilla','Cox’s Bazar','Feni','Khagrachhari','Lakshmipur','Noakhali','Rangamati','Barishal','Barguna','Bhola','Jhalokati','Patuakhali','Pirojpur','Khulna','Bagerhat','Chuadanga','Jashore','Jhenaidah','Kushtia','Magura','Meherpur','Narail','Satkhira','Mymensingh','Jamalpur','Netrokona','Sherpur','Rajshahi','Bogura','Joypurhat','Naogaon','Natore','Chapainawabganj','Pabna','Sirajganj','Rangpur','Dinajpur','Gaibandha','Kurigram','Lalmonirhat','Nilphamari','Panchagarh','Thakurgaon','Sylhet','Habiganj','Moulvibazar','Sunamganj'];

const countries = ['Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica','Côte d’Ivoire','Croatia','Cuba','Cyprus','Czechia','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Türkiye','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'];

export default function Home() {
  const [tab, setTab] = useState<'bd'|'world'>('bd');
  const [selected, setSelected] = useState<string[]>([]);
  const [q, setQ] = useState('');

  const items = tab === 'bd' ? districts : countries;
  const filtered = useMemo(() => items.filter(x => x.toLowerCase().includes(q.toLowerCase())), [items, q]);
  const selectedCount = tab === 'bd' ? selected.length : selected.length;

  function changeTab(next: 'bd'|'world') {
    setTab(next);
    setSelected([]);
    setQ('');
  }

  function toggle(place: string) {
    setSelected(current => current.includes(place) ? current.filter(x => x !== place) : [...current, place]);
  }

  function clearAll() { setSelected([]); }

  return (
    <>
      <header className="topbar">
        <div className="container nav">
          <div><div className="brand">🌍 Nomadic Traveler</div><div className="muted" style={{color:'#94a3b8'}}>Global Travel Tracker</div></div>
          <button className="btn secondary">Sign in</button>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Track your journey.<br/>Build your travel story.</h1>
          <p>Mark the Bangladesh districts and countries you have explored. Your personal travel profile will become the foundation for maps, achievements, trip planning and community features.</p>
        </section>

        <section className="card">
          <div className="section-title">
            <div><h2 style={{margin:'0 0 6px'}}>My Travel Map</h2><div className="muted">{tab === 'bd' ? 'Bangladesh — 64 districts' : 'World — 195 countries'}</div></div>
            <div className="actions"><button className="btn secondary" onClick={clearAll}>Clear</button></div>
          </div>

          <div className="tabs" style={{marginTop:18}}>
            <button className={`tab ${tab === 'bd' ? 'active' : ''}`} onClick={() => changeTab('bd')}>🇧🇩 Bangladesh · 64</button>
            <button className={`tab ${tab === 'world' ? 'active' : ''}`} onClick={() => changeTab('world')}>🌍 World · 195</button>
          </div>

          <input className="search" style={{marginTop:14}} value={q} onChange={e => setQ(e.target.value)} placeholder={tab === 'bd' ? 'Search district…' : 'Search country…'} />

          <div className="grid" style={{marginTop:14}}>
            {filtered.map(place => (
              <button key={place} className={`place ${selected.includes(place) ? 'selected' : ''}`} onClick={() => toggle(place)}>
                {selected.includes(place) ? '✓ ' : ''}{place}
              </button>
            ))}
          </div>
          {filtered.length === 0 && <p className="muted">No result found.</p>}
        </section>

        <section className="stats" style={{marginTop:18}}>
          <div className="card stat"><strong>{tab === 'bd' ? selectedCount : 0}</strong><span>Districts visited</span></div>
          <div className="card stat"><strong>{tab === 'world' ? selectedCount : 0}</strong><span>Countries visited</span></div>
          <div className="card stat"><strong>{tab === 'world' ? Math.min(7, Math.ceil(selectedCount / 28)) : 0}</strong><span>Continents explored</span></div>
          <div className="card stat"><strong>{Math.round(selectedCount / (tab === 'bd' ? 64 : 195) * 100)}%</strong><span>Current progress</span></div>
        </section>

        <section className="card" style={{marginTop:18}}>
          <div className="section-title"><div><h2 style={{margin:0}}>What comes next</h2><p className="muted">The core tracker is ready; these modules can now be connected to the Laravel API.</p></div></div>
          <div className="feature-grid" style={{marginTop:14}}>
            <div className="feature"><b>🗺️ Interactive maps</b><p className="muted">GeoJSON-powered Bangladesh and world maps with visited/unvisited states.</p></div>
            <div className="feature"><b>👤 Travel profile</b><p className="muted">Public profile, country count, district count, badges and travel timeline.</p></div>
            <div className="feature"><b>🧭 Trip Planner</b><p className="muted">Create trips, dates, destinations, notes and shareable itineraries.</p></div>
            <div className="feature"><b>💎 Hidden Gems</b><p className="muted">Community places, local food, experiences, reviews and moderation.</p></div>
            <div className="feature"><b>🏆 Achievements</b><p className="muted">Milestones, quiz points, leaderboard and continent challenges.</p></div>
            <div className="feature"><b>📄 Export</b><p className="muted">Generate shareable travel maps and profile summaries as PNG/PDF.</p></div>
          </div>
        </section>

        <footer className="footer">© 2026 Nomadic Traveler · Travel beyond limits.</footer>
      </main>
    </>
  );
}