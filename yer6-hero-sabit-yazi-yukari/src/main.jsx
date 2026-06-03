
import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {Home, Menu, X, UserPlus, Search, Users, ShieldCheck, Ticket, Bell, Ban, Car, House, Zap, Crown, Star, ShoppingCart, Gamepad2, Instagram, Youtube, AlertTriangle, ClipboardList, Send, Clock, CheckCircle, XCircle, Bot, MessageCircle} from 'lucide-react';
import './style.css';

const rules = [["Ailevi Değerlere Küfür (ADK)", "3 Gün WL", "Ağır", "Saygı"], ["Aktif Rolde Desteğe Çıkmak", "4x Uyarı", "Orta", "Destek"], ["Aile Kıyafet Kurallarına Uymamak / Claimsiz Gezmek", "3x Uyarı", "Orta", "Aile"], ["Başka Ailenin Claimini Kullanmak", "1 Gün WL", "Ağır", "Aile"], ["Badcop (BC)", "2 Gün WL + İhraç + CK", "Ağır", "Devlet"], ["Bug Abuse", "3 Gün WL", "Ağır", "Abuse"], ["Pit Demirsiz Araçla Pit Atmak", "4x Uyarı", "Orta", "Araç"], ["Polisin 5 Dakika Dolmadan Pit Atması", "3x Uyarı", "Orta", "Polis"], ["Polis Bayıltma / Öldürme Durumlarında Pit Kuralı Geçersizdir", "Bilgilendirme", "Not", "Polis"], ["Polis Kıyafeti Giymek (Sivil)", "3 Gün WL", "Ağır", "Devlet"], ["Power Gaming", "1 Gün WL", "Ağır", "RP"], ["Polis Soymak / Teçhizatlarını Almak / Legal Itemleri Almak veya Kullanmak", "4x Uyarı", "Orta", "Devlet"], ["RDM", "1 Gün WL", "Ağır", "Combat"], ["Refuse RP", "1 Gün WL", "Ağır", "RP"], ["Retarded RP", "3x Uyarı", "Orta", "RP"], ["Revenge Kill", "1 Gün WL", "Ağır", "Combat"], ["Rol Baltalama", "1 Gün WL", "Ağır", "RP"], ["Rol Block Uymamak", "1 Gün WL", "Ağır", "RP"], ["Rol Check", "1 Gün WL", "Ağır", "RP"], ["Rol Clear'ı Hatırlamak", "1 Gün WL", "Ağır", "RP"], ["Rolde OOC Konuşmak", "4x Uyarı", "Orta", "OOC"], ["Sincap, 3 Bacaklı, Travesti vb. saçma hitaplarla rol baltalamak", "5 Gün WL", "Ağır", "Saygı"], ["Sarı Sayfalarda 30 Dakika Geçmeden İlan Atmak", "1x Uyarı", "Hafif", "Sarı Sayfa"], ["Sağlık Çalışanına Fiziksel Şiddet / Rehin Almak", "4x Uyarı", "Orta", "EMS"], ["SS Dışında Adam Soymak", "4x Uyarı", "Orta", "Soygun"], ["Soygunda Polis Gelmeden Gitmek (ATM/Ev Hariç)", "4x Uyarı", "Orta", "Soygun"], ["Sunucuya Küfür", "PERMA", "Perma", "Saygı"], ["Tehdit / Şantaj / Data Sorgusu / Sanal Mafyacılık / Panel Muhabbetleri", "PERMA", "Perma", "Saygı"], ["Triggerlamak", "1 Gün WL", "Ağır", "RP"], ["Üniformalı Polisi 30+ Dakika Esir Tutmak", "3x Uyarı", "Orta", "Devlet"], ["VDM", "1 Gün WL", "Ağır", "Combat"], ["Araçtaki silahsız ve zor durumdaki kişi 1 kez araçla çarpıp kaçabilir", "VDM Sayılmaz", "Not", "Combat"], ["Yanlış /ME ve /DO Kullanımı", "3x Uyarı", "Orta", "Komut"], ["Yayıncıları Ghostlamak", "1 Gün WL", "Ağır", "Yayıncı"], ["Yayıncının Yayınını Baltalamak", "1 Gün WL", "Ağır", "Yayıncı"], ["Yetkiliyi Kandırmak", "2 Gün WL", "Ağır", "Yetkili"], ["Yetkiliye Ağır Hakaret", "4 Gün WL", "Ağır", "Yetkili"], ["Yetkiliye Hakaret", "1 Gün WL", "Ağır", "Yetkili"], ["Yetkiliye “Melek” vb. Demek", "4x Uyarı", "Orta", "Yetkili"], ["WL Cezası Varken Oyuna Girmek / Quit Atıp Geri Sunucuya Girmek", "1 Gün WL", "Ağır", "WL"], ["Uyarılar 2 Haftada 1 Silinmektedir", "Not", "Not", "Notlar"], ["5x Uyarı 1 Gün WL'ye Dönüşür", "Not", "Not", "Notlar"], ["Kaliteli rol deneyimi için kurallar sıkı hale getirilmiştir", "İyi Roller", "Not", "Notlar"], ["Combatlog", "2 Gün WL + Envanter SİLİNECEK", "Ağır", "Combat"], ["Combatlog Timeout / Crash Durumu", "Kayıtlı kanıtlı şekilde destekte sunulmalıdır", "Not", "Combat"], ["Crash-bildirip geri role giremeyecek durumlar kanıtlı sunulmalıdır", "Not", "Not", "Combat"], ["Copbait (Normal)", "3x Uyarı", "Orta", "Polis"], ["Copbait (Rol Baltalama)", "2 Gün WL", "Ağır", "Polis"], ["Destekte Yetkiliye Saygısızlık/Küfür", "1 Gün WL", "Ağır", "Destek"], ["Destekte Karşı Tarafa Saygısızlık", "3x Uyarı", "Orta", "Destek"], ["Dini Değerlere Küfür (DDK)", "PERMA", "Perma", "Saygı"], ["Donate Araç/Motor ile Soygun Yapmak", "2x Uyarı", "Orta", "Donate"], ["Dolandırıcılık Rolü", "4x Uyarı", "Orta", "Rol"], ["Dupe (Eşya / Silah Çoğaltma)", "PERMA", "Perma", "Abuse"], ["Etkinlik Baltalamak", "4x Uyarı + Kick + Devamında 1 Gün WL", "Ağır", "Etkinlik"], ["Fail RP", "4x Uyarı", "Orta", "RP"], ["Fear RP", "4x Uyarı", "Orta", "RP"], ["Force RP", "4x Uyarı", "Orta", "RP"], ["Gang Up", "1 Gün WL", "Ağır", "İllegal"], ["Gang Up Açıklaması", "Ailelerde illegal kurallara bakılır. Sivilde en fazla 5 kişi birlikte rol yapabilir.", "Not", "İllegal"], ["6. kişi girdiğinde kişisel Gang Up işlemi uygulanır", "Not", "Not", "İllegal"], ["Gereksiz Agresif Başlatmak / Devam Ettirmek", "4x Uyarı", "Orta", "Agresif"], ["Güvenli Bölgede Adam Kaçırmak", "4x Uyarı", "Orta", "Güvenli Bölge"], ["Güvenli Bölge dışındaki rolü güvenli bölgede devam ettirmek", "4x Uyarı", "Orta", "Güvenli Bölge"], ["Güvenli bölgede küfürleşmek, sövüşmek, agresifi devam ettirmek", "4x Uyarı", "Orta", "Güvenli Bölge"], ["Güvenli Bölgeye Dışarıdan Ateş Etmek", "1 Gün WL", "Ağır", "Güvenli Bölge"], ["Güvenli Bölgede Agresif Rol Başlatmak", "4x Uyarı", "Orta", "Güvenli Bölge"], ["Hile / 3. Parti Yazılım Kullanımı", "PERMA", "Perma", "Hile"], ["IC/OOC Mixing", "1 Gün WL", "Ağır", "OOC"], ["IC/OOC Mixing Açıklaması", "Discord kanalları veya IC olarak sunucu içinde yapılan OOC konuşmalar işlem sebebidir", "Not", "OOC"], ["ILLEGAL RPF 1. Tespit", "Sözlü Uyarı", "İllegal RPF", "İllegal RPF"], ["ILLEGAL RPF 2. Tespit", "1x İllegal Uyarı + 3x Uyarı", "İllegal RPF", "İllegal RPF"], ["ILLEGAL RPF 3. Tespit", "2x İllegal Uyarı + 4x Uyarı", "İllegal RPF", "İllegal RPF"], ["ILLEGAL RPF 4. Tespit", "PERMA BAN", "İllegal RPF", "İllegal RPF"], ["İllegal/Legal Yasağı Kuralını Çiğnemek", "1 Gün WL", "Ağır", "İllegal"], ["İzinsiz “E” Çekmek", "3x Uyarı", "Orta", "İllegal"], ["İzinsiz ERP", "1 Gün WL", "Ağır", "Rol"], ["İzinsiz Soygun (Banka / Kuyumcu)", "1 Gün WL", "Ağır", "Soygun"], ["Kadın Oyuncuya Cinsel Hakaret", "2 Gün WL", "Ağır", "Saygı"], ["Kadın Oyuncuya Taciz", "PERMA", "Perma", "Saygı"], ["Kamu Alanında Triggerlamak", "3x Uyarı", "Orta", "RP"], ["Kaza Rolüne Girmemek", "3x Uyarı", "Orta", "Araç"], ["Kenevir/Meth Bölgesine Siren Açıp Girmek", "4x Uyarı", "Orta", "İllegal"], ["Low RP", "2 Gün WL", "Ağır", "RP"], ["Maskesiz Soygun", "2x Uyarı", "Orta", "Soygun"], ["Meta Gaming", "2 Gün WL", "Ağır", "RP"], ["Milli Değerlere Küfür (MDK)", "PERMA", "Perma", "Saygı"], ["NLR (New Life Rule)", "1 Gün WL", "Ağır", "RP"], ["NLR Açıklaması", "CK yedikten sonra önceki hayatını hatırlamak yasaktır", "Not", "RP"], ["Non-RP Driving", "4x Uyarı", "Orta", "Araç"], ["OOC Kin", "4x Uyarı", "Orta", "OOC"], ["Devlet Araçlarını Çalmak", "3x Uyarı", "Orta", "Devlet"], ["Devlet Araçları Açıklaması", "Polis, Ambulans ve Adalet Bakanlığı araçlarını çalmak yasaktır", "Not", "Devlet"]].map(([name, penalty, level, category], id) => ({ id: id + 1, name, penalty, level, category }));
const staffRanksDefault = [
 { level: 1, rank: "Staff 1" },
 { level: 2, rank: "Staff 2" },
 { level: 3, rank: "Staff 3" },
 { level: 4, rank: "Staff 4" },
 { level: 5, rank: "Staff 5" },
 { level: 6, rank: "Head Staff" },
 { level: 7, rank: "Guide Staff" },
 { level: 8, rank: "General Staff" },
 { level: 9, rank: "Moderatör" },
 { level: 10, rank: "Head Moderatör" },
 { level: 11, rank: "Trial Admin" },
 { level: 12, rank: "Lead Admin" },
 { level: 13, rank: "Senior Admin" },
 { level: 14, rank: "General Admin" },
 { level: 15, rank: "Head Admin" },
 { level: 16, rank: "Senior Manager" },
 { level: 17, rank: "Head Manager" },
 { level: 18, rank: "Head Master" },
 { level: 19, rank: "Web Developer" },
 { level: 20, rank: "Head Of Management" },
 { level: 21, rank: "Co-Founder" },
 { level: 22, rank: "Founder" }
];

const staffMembersDefault = [
  { name:'Founder 1', discordId:'founder1', rank:'Founder', duty:'Kurucu', status:'Aktif', image:'' },
  { name:'Founder 2', discordId:'founder2', rank:'Founder', duty:'Kurucu', status:'Aktif', image:'' },
  { name:'Co-Founder', discordId:'cofounder', rank:'Co-Founder', duty:'Kurucu Yardımcısı', status:'Aktif', image:'' },
  { name:'Head Of Management', discordId:'headofmanagement', rank:'Head Of Management', duty:'Üst Yönetim Sorumlusu', status:'Aktif', image:'' },
  { name:'Head Master', discordId:'headmaster', rank:'Head Master', duty:'Üst Yönetim Lideri', status:'Aktif', image:'' },
  { name:'Head Manager', discordId:'headmanager', rank:'Head Manager', duty:'Yönetim Sorumlusu', status:'Aktif', image:'' },
  { name:'Senior Manager', discordId:'seniormanager', rank:'Senior Manager', duty:'Kıdemli Yönetici', status:'Aktif', image:'' },
  { name:'Head Admin', discordId:'headadmin', rank:'Head Admin', duty:'Admin Ekibi Sorumlusu', status:'Aktif', image:'' },
  { name:'General Admin', discordId:'generaladmin', rank:'General Admin', duty:'Genel Admin', status:'Aktif', image:'' },
  { name:'Senior Admin', discordId:'senioradmin', rank:'Senior Admin', duty:'Kıdemli Admin', status:'Aktif', image:'' },
  { name:'Lead Admin', discordId:'leadadmin', rank:'Lead Admin', duty:'Admin Lideri', status:'Aktif', image:'' },
  { name:'Arda', discordId:'1144954440667910155', rank:'Web Developer', duty:'Website Developer', status:'Aktif', image:'' }
];

const photos = ["yer6-main-hero.png","hero.jpg","yer6-photo-1.jpg","yer6-photo-2.jpg","yer6-photo-3.jpg","yer6-photo-4.jpg","yer6-photo-5.jpg","yer6-photo-6.jpg","yer6-photo-7.jpg","yer6-photo-8.jpg"];

const starterAdmins = [
  { username:'Founder 1', password:'123456', discordId:'founder1', role:'Founder', level:22 },
  { username:'Founder 2', password:'123456', discordId:'founder2', role:'Founder', level:22 },
  { username:'Co-Founder', password:'123456', discordId:'cofounder', role:'Co-Founder', level:21 },
  { username:'Head Master', password:'123456', discordId:'headmaster', role:'Head Master', level:18 },
  { username:'Arda', password:'Arda1234', discordId:'1144954440667910155', role:'Web Developer', level:19 }
];

const donateDefault = [
  { type:'Donate Ped', items:['Özel Ped Paketi','Karakter Ped','VIP Ped','Limitli Ped'], images:['','','',''] },
  { type:'Donate Boy', items:['Boy Paketi','Karakter Boy Ayarı','Özel Vücut Ayarı','VIP Görünüm'], images:['','','',''] },
  { type:'Donate Mekanlar', items:['İşletme Mekanı','Özel Mekan','VIP Mekan','Aile Mekanı'], images:['','','',''] },
  { type:'Donate Meslekler', items:['Özel Meslek','VIP Meslek','Meslek Paketi','İşletme Yetkisi'], images:['','','',''] },
  { type:'Donate Malikaneler', items:['Boğaz Malikane','Lüks Villa','Garajlı Malikane','Özel Ev'], images:['','','',''] },
  { type:'Donate Araçlar', items:['Standart Donate Araç','Spor Araç','SUV Araç','Özel Araç'], images:['','','',''] },
  { type:'Donate VIP Araçlar', items:['VIP Araç 1','VIP Araç 2','VIP Araç 3','VIP Araç 4'], images:['','','',''] },
  { type:'Donate İmzalı Boşta', items:['İmzalı Boş Araç','Özel Plaka Hazır','Limitli Araç','Özel Seri'], images:['','','',''] },
  { type:'Donate İmzalanan Araçlar', items:['İmzalanmış Araç','Sahipli Araç','Özel Seri Araç','Limitli İmzalı'], images:['','','',''] },
  { type:'Donate Araç Eklenti', items:['Araç Eklenti Paketi','Body Kit','Özel Jant','Araç Modifiye'], images:['','','',''] },
  { type:'Donate Plaka', items:['Özel Plaka','İsimli Plaka','VIP Plaka','Limitli Plaka'], images:['','','',''] },
  { type:'Donate Motor', items:['Yamaha R1','Ducati Panigale','BMW S1000RR','Harley Custom'], images:['','','',''] },
  { type:'Donate Tekne Yatlar', items:['Tekne','Yat','Lüks Yat','Özel Deniz Aracı'], images:['','','',''] },
  { type:'Donate Helikopter', items:['Helikopter','VIP Helikopter','Özel Hava Aracı','Limitli Helikopter'], images:['','','',''] },
  { type:'Donate Silah', items:['Silah Paketi','Özel Silah','VIP Silah','Limitli Silah'], images:['','','',''] },
  { type:'Donate Zırh', items:['Zırh Paketi','VIP Zırh','Özel Zırh','Koruma Paketi'], images:['','','',''] },
  { type:'Donate Numara', items:['Özel Numara','VIP Numara','Kısa Numara','Limitli Numara'], images:['','','',''] },
  { type:'Donate Özel Paket', items:['Diamond VIP','Founder Destek','Aile Paketi','Full Paket'], images:['','','',''] }
];

const staffRankOrder = {
  "Founder": 22,
  "Co-Founder": 21,
  "Head Of Management": 20,
  "Web Developer": 19,
  "Head Master": 18,
  "Head Manager": 17,
  "Senior Manager": 16,
  "Head Admin": 15,
  "General Admin": 14,
  "Senior Admin": 13,
  "Lead Admin": 12,
  "Trial Admin": 11,
  "Head Moderatör": 10,
  "Moderatör": 9,
  "General Staff": 8,
  "Guide Staff": 7,
  "Head Staff": 6,
  "Staff 5": 5,
  "Staff 4": 4,
  "Staff 3": 3,
  "Staff 2": 2,
  "Staff 1": 1
};

function getStaffLevel(rank) {
  return staffRankOrder[rank] || 0;
}

function sortStaffByRank(list) {
  return [...list].sort((a,b)=>getStaffLevel(b.rank)-getStaffLevel(a.rank));
}



function canFounderManage(admin) {
  return String(admin?.role || '').trim().toLowerCase() === 'founder';
}

function findRankByName(rank) {
  return staffRanksDefault.find(r=>r.rank===rank) || {level:getStaffLevel(rank), rank};
}

function nextLowerRank(role) {
  const current = getStaffLevel(role);
  return staffRanksDefault.filter(r=>Number(r.level) < Number(current)).sort((a,b)=>Number(b.level)-Number(a.level))[0] || null;
}

function nextHigherRank(role) {
  const current = getStaffLevel(role);
  return staffRanksDefault.filter(r=>Number(r.level) > Number(current)).sort((a,b)=>Number(a.level)-Number(b.level))[0] || null;
}

function now() { return new Date().toLocaleString('tr-TR'); }
function dayMs(n) { return n * 24 * 60 * 60 * 1000; }
function daysLeft(date) {
  if(!date) return '';
  const diff = new Date(date).getTime() - Date.now();
  if(diff <= 0) return 'Süresi doldu';
  return Math.ceil(diff / dayMs(1)) + ' gün kaldı';
}
function penaltyDays(text) {
  const t = String(text || '').toLowerCase();
  if(t.includes('perma')) return null;
  const m = t.match(/(\d+)\s*gün/);
  return m ? Number(m[1]) : 0;
}
function copyText(text) {
  navigator.clipboard.writeText(text);
  alert('Discord komutu kopyalandı!');
}
function durationForCommand(penalty) {
  const t = String(penalty || '').toLowerCase();
  if (t.includes('perma')) return 'perma';
  const m = t.match(/(\d+)\s*gün/);
  if (m) return m[1] + 'g';
  const u = t.match(/(\d+)x\s*uyarı/);
  if (u) return u[1] + 'x-uyarı';
  return 'süre-yok';
}
function wlGiveCommand(p) {
  return `/wl-ceza ver kullanıcı:${p.targetId} süre:${durationForCommand(p.penalty)} sebep:${p.rule}`;
}
function wlRemoveCommand(p) {
  return `/wl-ceza kaldır kullanıcı:${p.targetId} sebep:Ceza kaldırıldı`;
}
function roleGiveCommand(p) {
  return `/wl-ceza rol kullanıcı:${p.targetId}`;
}
function makeEndDate(penalty) {
  const d = penaltyDays(penalty);
  if(d === null) return 'PERMA';
  if(!d) return '';
  return new Date(Date.now() + dayMs(d)).toISOString();
}
async function sendDiscordLog(title, description) {
  try {
    await fetch('/api/discord-webhook', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({embeds:[{title,description,color:15733799,timestamp:new Date().toISOString()}]})
    });
  } catch(e) { console.log('Discord webhook gönderilemedi', e); }
}

function Button({children,onClick,variant='red',className='',disabled=false}) {
 return <button type="button" disabled={disabled} onClick={(e)=>{e.preventDefault();e.stopPropagation();onClick&&onClick(e)}} className={`btn ${variant} ${className}`}>{children}</button>
}
function Card({children,className=''}) { return <div className={`card ${className}`}>{children}</div> }
function Field({value,onChange,placeholder,type='text'}) { return <input className="field" type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/> }
function TextArea({value,onChange,placeholder}) { return <textarea className="textarea" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/> }
function Badge({children,tone='warn'}) { return <span className={`badge ${tone}`}>{children}</span> }
function Logo() {
 return <button className="logo logoImageBtn">
  <img src="/images/yer6-header-logo.png" alt="YER6 Roleplay"/>
  <span className="logoFallback">YER<span>6</span><small>ROLEPLAY</small></span>
 </button>
}
function Title({k,t,p}) { return <div className="title"><span>{k}</span><h1>{t}</h1><p>{p}</p></div> }

function Header({setPage,openLogin}) {
 const [open,setOpen]=useState(false);
 const nav=[['home','Ana Sayfa'],['rules','Kurallar'],['staff','Yönetim Kadrosu'],['characters','Karakterler'],['game','Karakter Oyunu'],['market','Donate Market']];
 return <header className="header"><Logo/><nav className={open?'show':''}>{nav.map(([p,n])=><button key={p} onClick={()=>{setPage(p);setOpen(false)}}>{n}</button>)}</nav><div className="headButtons"><Button variant="ghost" onClick={()=>openLogin('admin')}>Giriş Yap</Button><Button onClick={()=>openLogin('register')}>Kayıt Ol</Button><button className="hamb" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>
}


function AiAssistant(){
 const [open,setOpen]=useState(false);
 const [q,setQ]=useState('');
 const [msgs,setMsgs]=useState([{from:'ai',text:'Selam, ben YER6 Asistan. Kurallar, ceza listesi, başvuru, destek ve sunucu hakkında soru sorabilirsin.'}]);

 function answer(text){
  const t=String(text||'').toLowerCase();
  if(!t.trim()) return 'Bir soru yaz kanka.';
  if(t.includes('ceza')||t.includes('wl')||t.includes('ban')){
    return 'Ceza/WL için Kurallar sayfasından kuralı arayabilirsin. Oyuncu panelinde cezaların görünür, admin panelde Ceza Ver ve WL Takip bölümleri kullanılır.';
  }
  if(t.includes('başvuru')||t.includes('yetkili')){
    return 'Yetkili başvurusu için Oyuncu Paneli > Yetkili Başvuru bölümünden form gönderilir. Adminler Başvurular bölümünden kabul veya red verir.';
  }
  if(t.includes('destek')||t.includes('ticket')){
    return 'Destek açmak için Oyuncu Paneli > Destek Aç bölümüne gir. Kanıt linki ve açıklamayı detaylı yazman işlemi hızlandırır.';
  }
  if(t.includes('discord')){
    return 'Discord bağlantısı için ana sayfadaki Discord’da Katıl butonunu kullanabilirsin.';
  }
  if(t.includes('sunucu')||t.includes('ip')){
    return 'Sunucu IP: connect.yer6rp.com. Ana sayfadaki Sunucuya Katıl butonu FiveM bağlantısını açar.';
  }
  if(t.includes('kural')){
    return 'Kurallar sayfasında arama kutusuna kural adını, ceza türünü veya kategori adını yazarak hızlıca bulabilirsin.';
  }
  return 'Bunu şöyle yapabilirsin: Kurallar için Kurallar sayfasını, destek için Oyuncu Paneli > Destek Aç bölümünü, cezalar için Admin Panel > Ceza Ver/WL Takip bölümünü kullan.';
 }
 function send(){
  if(!q.trim()) return;
  const userMsg={from:'user',text:q};
  const aiMsg={from:'ai',text:answer(q)};
  setMsgs(p=>[...p,userMsg,aiMsg]);
  setQ('');
 }
 return <div className="aiBox">
  <button className="aiToggle" onClick={()=>setOpen(!open)}><Bot size={20}/> YER6 Asistan</button>
  {open&&<Card className="aiPanel">
   <div className="aiHead"><b>YER6 Yapay Zeka Destek</b><button onClick={()=>setOpen(false)}>×</button></div>
   <div className="aiMsgs">{msgs.map((m,i)=><p key={i} className={m.from}>{m.text}</p>)}</div>
   <div className="aiInput"><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')send()}} placeholder="Kuralları sor, ceza ara, destek sor..."/><button onClick={send}>Gönder</button></div>
  </Card>}
 </div>
}

function HomePage({setPage,openLogin}) {
 const [slide,setSlide]=useState(0);
 
 const gallery=[
  {img:'yer6-police-team.png', title:'YER6 Emniyet Ekibi'},
  {img:'yer6-gang-life.png', title:'Çete Hayatı'},
  {img:'yer6-street-life.png', title:'Sokak Hayatı'},
  {img:'yer6-lux-life.png', title:'Lüks Yaşam'}
 ];
 return <div className="site"><Header setPage={setPage} openLogin={openLogin}/>
  <section className="hero">
   <img className="heroImg active" src="/images/yer6-main-hero.png" alt="YER6 Ana Hero"/><div className="heroDark"></div>
   <div className="heroText"><span>YER6 ROLEPLAY</span><h1>Bir Şehrin<br/><em>Yeni Hikayesi Başlıyor!</em></h1><p>Gerçekçi rol ortamı, aktif sistemler ve profesyonel yönetim kadrosuyla benzersiz bir deneyime katıl.</p><div className="heroButtons"><Button onClick={()=>openLogin('register')}><UserPlus size={18}/> Hemen Katıl</Button><Button variant="ghost" onClick={()=>window.open('https://discord.gg/ysewESgQm','_blank')}>Discord'da Katıl</Button></div></div>
   <Card className="status"><div><b>Sunucu Durumu</b><span>Çevrimiçi</span></div><p>IP Adresi <b>connect.yer6rp.com</b></p><p>Oyuncular <b>182 / 500</b></p><p>Ping <b>21ms</b></p><Button className="full" onClick={()=>window.location.href='fivem://connect/185.34.101.48:30120'}>Sunucuya Katıl</Button></Card>
  </section>
  <section className="galleryRow">{gallery.map((g,i)=><Card className="photoCard" key={i}><img src={`/images/${g.img}`} alt={g.title}/><h2>{g.title}</h2></Card>)}</section>
  <AiAssistant/>
  <Footer setPage={setPage} openLogin={openLogin}/>
 </div>
}

function Footer({setPage,openLogin}) { return <footer><div><Logo/><p>YER6 Roleplay, gerçekçi rol deneyimi sunan profesyonel yönetimli topluluk.</p><div className="social"><Instagram/><Youtube/></div></div><div><h3>Navigasyon</h3>{['Ana Sayfa','Kurallar','Karakterler','Karakter Oyunu','Donate Market'].map((x,i)=><p key={x} onClick={()=>setPage(['home','rules','characters','game','market'][i])}>› {x}</p>)}</div><div><h3>Destek</h3><p>› SSS</p><p>› Destek Talebi</p><p>› Rehberler</p></div><Card className="footPanel"><h3>Admin Paneli</h3><p>Yönetim paneline giriş yapın.</p><Button className="full" onClick={()=>openLogin('admin')}>Panel'e Giriş Yap</Button></Card></footer> }

function RulesPage({setPage,openLogin}) {
 const [search,setSearch]=useState(''); const [cat,setCat]=useState('Tümü');
 const cats=['Tümü',...Array.from(new Set(rules.map(r=>r.category)))];
 const filtered=rules.filter(r=>(cat==='Tümü'||r.category===cat)&&(r.name+r.penalty+r.category).toLowerCase().includes(search.toLowerCase()));
 return <div className="inner"><Header setPage={setPage} openLogin={openLogin}/><main><Title k="YÖNETMELİK" t="Kurallar" p="Yeralti Roleplay full ceza listesi."/><div className="filters"><div className="search"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Ceza ara..."/></div><select className="field" value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select></div><Card className="ruleList">{filtered.map(r=><div className="rule" key={r.id}><span>{r.id}</span><b>{r.name}</b><em>{r.category}</em><Badge tone={r.level==='Perma'?'bad':r.level==='Not'?'note':'warn'}>{r.penalty}</Badge></div>)}</Card></main></div>
}

function StaffPage({setPage,openLogin,staffMembers}) {
 const sortedStaff = sortStaffByRank(staffMembers);
 return <div className="inner"><Header setPage={setPage} openLogin={openLogin}/><main>
  <Title k="YÖNETİM" t="Yönetim Kadrosu" p="Sunucudaki aktif yetkililer seviye sırasına göre listelenir."/>
  <div className="staffGrid">
   {sortedStaff.length===0&&<Card className="panel"><h2>Henüz kadro eklenmedi</h2><p>Admin panelden kadro ekleyebilirsin.</p></Card>}
   {sortedStaff.map((m,i)=><Card className="staffCard" key={m.discordId+i}>
    {m.image ? <img className="staffPhoto" src={m.image} alt={m.name}/> : <div className="avatar">{m.name?.[0]||'Y'}</div>}
    <h2>{m.name}</h2>
    <Badge tone={m.rank==='Founder'||m.rank==='Co-Founder'||m.rank==='Web Developer'?'bad':'warn'}>{m.rank}</Badge>
    <p>{m.duty}</p>
    <small>Discord ID: {m.discordId}</small>
    <span className="online">{m.status}</span>
   </Card>)}
  </div>
 </main></div>
}

function CharactersPage({setPage,openLogin}) {
 const [chars,setChars]=useState(()=>JSON.parse(localStorage.getItem('yer6_chars')||'[]')); const [f,setF]=useState({name:'',owner:'',story:''});
 useEffect(()=>localStorage.setItem('yer6_chars',JSON.stringify(chars)),[chars]);
 return <div className="inner"><Header setPage={setPage} openLogin={openLogin}/><main><Title k="KARAKTERLER" t="Karakterler" p="Oyuncular karakter ve hikaye ekleyebilir."/><Card className="form"><Field value={f.name} onChange={v=>setF({...f,name:v})} placeholder="Karakter adı"/><Field value={f.owner} onChange={v=>setF({...f,owner:v})} placeholder="Oyuncu adı"/><TextArea value={f.story} onChange={v=>setF({...f,story:v})} placeholder="Hikaye"/><Button onClick={()=>{if(!f.name||!f.owner)return alert('Alanları doldur');setChars(p=>[f,...p]);setF({name:'',owner:'',story:''})}}>Ekle</Button></Card><div className="cards">{chars.map((c,i)=><Card className="mini" key={i}><Users/><h2>{c.name}</h2><p>{c.owner}</p><small>{c.story}</small></Card>)}</div></main></div>
}

function GamePage({setPage,openLogin}) { const [s,setS]=useState(null); return <div className="inner"><Header setPage={setPage} openLogin={openLogin}/><main><Title k="MİNİ OYUN" t="Karakter Oyunu" p="Kader puanını belirle."/><Card className="game"><Gamepad2/><h2>{s??'?'}</h2><Button onClick={()=>setS(Math.ceil(Math.random()*100))}>Zar At</Button></Card></main></div> }

function MarketPage({setPage,openLogin,donate}) { const icon={Araba:Car,Ev:House,Motor:Zap,Boy:Users,Ped:Crown,'Özel Paket':Star}; return <div className="inner"><Header setPage={setPage} openLogin={openLogin}/><main><Title k="DONATE" t="Donate Market" p="Araç, ev, motor, ped ve paketler."/><div className="cards">{donate.map(d=>{const I=icon[d.type]||ShoppingCart;return <Card className="mini" key={d.type}><I/><h2>{d.type}</h2>{d.items.map(x=><p key={x}>• {x}</p>)}<Button>Satın Al</Button></Card>})}</div></main></div> }

function LoginPage({setPage,mode,setMode,auth,setAuth,loginAdmin,loginPlayer,registerPlayer}) {
 const isAdmin=mode==='admin', isRegister=mode==='register';
 return <div className="loginPage"><Button variant="ghost" className="back" onClick={()=>setPage('home')}><Home size={16}/> Ana Sayfa</Button><Card className="loginCard"><h1>YER6 Giriş</h1><p>Admin, oyuncu girişi ve kayıt sistemi.</p><div className="tabs"><Button variant={isAdmin?'red':'ghost'} onClick={()=>setMode('admin')}>Admin</Button><Button variant={mode==='player'?'red':'ghost'} onClick={()=>setMode('player')}>Oyuncu</Button><Button variant={isRegister?'red':'ghost'} onClick={()=>setMode('register')}>Kayıt</Button></div>{isRegister&&<Field value={auth.username} onChange={v=>setAuth({...auth,username:v})} placeholder="Kullanıcı adı"/>}<Field value={auth.discordId} onChange={v=>setAuth({...auth,discordId:v})} placeholder="Discord ID"/><Field type="password" value={auth.password} onChange={v=>setAuth({...auth,password:v})} placeholder="Şifre"/>{isRegister&&<Field value={auth.steam} onChange={v=>setAuth({...auth,steam:v})} placeholder="Steam profil linki"/>}<Button className="full" onClick={isAdmin?loginAdmin:isRegister?registerPlayer:loginPlayer}>{isAdmin?'Admin Girişi Yap':isRegister?'Kayıt Ol ve Panele Gir':'Oyuncu Girişi Yap'}</Button></Card></div>
}

function PlayerPanel({player,setPlayer,setPage,tickets,setTickets,apps,setApps,punishments,setPunishments,setLogs}) {
 const [active,setActive]=useState('Dashboard');
 const [ticket,setTicket]=useState({type:'Oyuncu Şikayet',title:'',description:'',proof:''});
 const [app,setApp]=useState({name:player.username||'',age:'',experience:'',reason:''});
 const myTickets=tickets.filter(t=>String(t.discordId)===String(player.discordId));
 const myApp=apps.find(a=>String(a.discordId)===String(player.discordId));
 const myPunishments=punishments.filter(p=>String(p.targetId)===String(player.discordId));
 const activePunishment=myPunishments.find(p=>p.status==='Aktif');

 function addTicket() {
  if(!ticket.title||!ticket.description) return alert('Başlık ve açıklama gerekli.');
  const item={...ticket,id:'TICKET-'+Math.floor(Math.random()*90000+10000),discordId:player.discordId,username:player.username,state:'Açık',assigned:'Boşta',createdAt:now()};
  setTickets(p=>[item,...p]); setLogs(p=>[now()+' - destek açıldı: '+item.id,...p]); sendDiscordLog('Yeni Destek Talebi',`${item.username} destek açtı: ${item.title}`);
  setTicket({type:'Oyuncu Şikayet',title:'',description:'',proof:''});
 }
 function sendApp() {
  if(myApp) return alert('Bu hesap daha önce başvuru göndermiş.');
  if(!app.name||!app.reason) return alert('Ad ve başvuru nedeni gerekli.');
  const item={...app,discordId:player.discordId,username:player.username,status:'Bekliyor',createdAt:now()};
  setApps(p=>[item,...p]); setLogs(p=>[now()+' - yetkili başvurusu: '+player.username,...p]); sendDiscordLog('Yeni Yetkili Başvurusu',`${player.username} başvuru gönderdi.`);
 }
 const menu=['Dashboard','Oyuncular','Yetkililer','Yönetim Kadrosu','Founder Panel','Destekler','Başvurular','Ceza Ver','WL Takip','Ceza Kayıtları','Kurallar','Donate Market','Loglar'];
 return <div className="adminLayout playerLayout"><aside><Logo/><p>{player.username}</p>{menu.map(m=><button key={m} className={active===m?'active':''} onClick={()=>setActive(m)}>{m}</button>)}<Button variant="ghost" onClick={()=>{setPlayer(null);setPage('home')}}>Çıkış</Button></aside><main><Title k="OYUNCU PANELİ" t={'Hoş geldin, '+player.username} p="Destek, başvuru ve ceza durumunu buradan takip edebilirsin."/>
  {active==='Dashboard'&&<div className="grid4"><Card className="stat"><Ticket/><div><span>Destek</span><b>{myTickets.length}</b></div></Card><Card className="stat"><ClipboardList/><div><span>Başvuru</span><b>{myApp?myApp.status:'Yok'}</b></div></Card><Card className="stat"><Ban/><div><span>Aktif Ceza</span><b>{activePunishment?'Var':'Yok'}</b></div></Card><Card className="stat"><Clock/><div><span>WL Durum</span><b>{activePunishment?daysLeft(activePunishment.endDate):'Aktif'}</b></div></Card></div>}
  {active==='Destek Aç'&&<Card className="panel"><h2>Destek Talebi Aç</h2><select className="field" value={ticket.type} onChange={e=>setTicket({...ticket,type:e.target.value})}><option>Oyuncu Şikayet</option><option>Yetkili Şikayet</option><option>Ban İtiraz</option><option>WL İtiraz</option><option>Teknik Destek</option><option>Donate Destek</option></select><Field value={ticket.title} onChange={v=>setTicket({...ticket,title:v})} placeholder="Başlık"/><TextArea value={ticket.description} onChange={v=>setTicket({...ticket,description:v})} placeholder="Açıklama"/><Field value={ticket.proof} onChange={v=>setTicket({...ticket,proof:v})} placeholder="Kanıt linki"/><Button onClick={addTicket}><Send size={16}/> Destek Gönder</Button></Card>}
  {active==='Taleplerim'&&<Card className="panel"><h2>Destek Taleplerim</h2>{myTickets.length===0&&<p>Henüz destek talebin yok.</p>}{myTickets.map(t=><div className="row" key={t.id}><div><b>{t.id} • {t.title}</b><p>{t.type} • {t.state}</p><small>{t.description}</small></div><Badge>{t.assigned}</Badge></div>)}</Card>}
  {active==='Yetkili Başvuru'&&<Card className="panel"><h2>Yetkili Başvurusu</h2>{myApp&&<Badge tone="note">Başvuru durumun: {myApp.status}</Badge>}<Field value={app.name} onChange={v=>setApp({...app,name:v})} placeholder="Ad Soyad"/><Field value={app.age} onChange={v=>setApp({...app,age:v})} placeholder="Yaş"/><TextArea value={app.experience} onChange={v=>setApp({...app,experience:v})} placeholder="Yetkili deneyimin"/><TextArea value={app.reason} onChange={v=>setApp({...app,reason:v})} placeholder="Neden yetkili olmak istiyorsun?"/><Button disabled={!!myApp} onClick={sendApp}>Başvuru Gönder</Button></Card>}
  {active==='Cezalarım'&&<Card className="panel"><h2>Ceza Geçmişim</h2>{myPunishments.length===0&&<p>Ceza kaydın yok.</p>}{myPunishments.map(p=><div className="row" key={p.id}><div><b>{p.rule}</b><p>{p.penalty} • {p.status}</p><small>Yetkili: {p.by} • {p.createdAt} • WL Bitiş: {p.endDate==='PERMA'?'PERMA':p.endDate?new Date(p.endDate).toLocaleString('tr-TR'):'Yok'}</small></div><Badge tone={p.status==='Aktif'?'bad':'good'}>{p.status==='Aktif'?daysLeft(p.endDate):'Bitti'}</Badge></div>)}</Card>}
  {active==='Profilim'&&<Card className="panel"><h2>Profil</h2><p>Kullanıcı: {player.username}</p><p>Discord ID: {player.discordId}</p><p>Steam: {player.steam||'Eklenmedi'}</p></Card>}
 </main></div>
}

function AdminPanel({admin,setAdmin,setPage,admins,setAdmins,players,setPlayers,donate,setDonate,staffRanks,setStaffRanks,staffMembers,setStaffMembers,tickets,setTickets,apps,setApps,punishments,setPunishments,logs,setLogs}) {
 const [active,setActive]=useState('Dashboard');
 const [newAdmin,setNewAdmin]=useState({username:'',discordId:'',password:'',role:'Lead Admin'});
 const [newStaff,setNewStaff]=useState({name:'',discordId:'',rank:'Lead Admin',duty:'',status:'Aktif',image:''});
 const [editDonate,setEditDonate]=useState(null);
 const [punish,setPunish]=useState({targetType:'Oyuncu',targetId:'',targetName:'',rule:'',penalty:'',proof:'',note:'',removeWL:true});
 const rank=staffRanks.find(r=>r.rank===newAdmin.role)||staffRanks[0];
 const menu=['Dashboard','Oyuncular','Yetkililer','Yönetim Kadrosu','Founder Panel','Destekler','Başvurular','Ceza Ver','WL Takip','Ceza Kayıtları','Kurallar','Donate Market','Loglar'];

 function addAdmin(){if(!newAdmin.username||!newAdmin.discordId||!newAdmin.password)return alert('Tüm alanları doldur');setAdmins(p=>[{...newAdmin,role:rank.rank,level:getStaffLevel(rank.rank)},...p]);setNewAdmin({username:'',discordId:'',password:'',role:'Lead Admin'})}
 function addStaff(){if(!newStaff.name||!newStaff.discordId||!newStaff.rank)return alert('Yetkili adı, Discord ID ve rank gerekli.');setStaffMembers(p=>[{...newStaff, level:getStaffLevel(newStaff.rank)},...p]);setNewStaff({name:'',discordId:'',rank:'Lead Admin',duty:'',status:'Aktif',image:''});setLogs(p=>[now()+' - yönetim kadrosuna yetkili eklendi: '+newStaff.name,...p])}
 function closeTicket(id){setTickets(p=>p.map(t=>t.id===id?{...t,state:'Kapalı'}:t));setLogs(p=>[now()+' - destek kapatıldı: '+id,...p]);sendDiscordLog('Destek Kapatıldı',id+' kapatıldı.')}
 function assignTicket(id){setTickets(p=>p.map(t=>t.id===id?{...t,state:'İncelemede',assigned:admin.username}:t));setLogs(p=>[now()+' - destek üstlenildi: '+id,...p])}
 function appResult(i,result){setApps(p=>p.map((a,idx)=>idx===i?{...a,status:result}:a));setLogs(p=>[now()+' - başvuru '+result,...p]);sendDiscordLog('Yetkili Başvurusu '+result,(apps[i]?.username||'Oyuncu')+' başvurusu '+result)}
 function addPunishment(){
  if(!punish.targetId||!punish.rule||!punish.penalty)return alert('Discord ID, kural ve ceza gerekli.');
  const endDate=makeEndDate(punish.penalty);
  const item={...punish,id:'CEZA-'+Math.floor(Math.random()*90000+10000),by:admin.username,createdAt:now(),endDate,status:'Aktif'};
  setPunishments(p=>[item,...p]);
  if(punish.targetType==='Oyuncu') setPlayers(p=>p.map(x=>String(x.discordId)===String(punish.targetId)?{...x,wlStatus:endDate==='PERMA'?'PERMA':'WL Alındı',wlEndDate:endDate,banReason:punish.rule}:x));
  setLogs(p=>[now()+' - ceza verildi: '+item.targetId+' / '+item.rule,...p]);
  sendDiscordLog('Yeni Ceza / WL İşlemi',`${item.targetType}: ${item.targetId}\nKural: ${item.rule}\nCeza: ${item.penalty}\nWL Bitiş: ${item.endDate==='PERMA'?'PERMA':item.endDate?new Date(item.endDate).toLocaleString('tr-TR'):'Yok'}\nYetkili: ${admin.username}`);
  setPunish({targetType:'Oyuncu',targetId:'',targetName:'',rule:'',penalty:'',proof:'',note:'',removeWL:true});
 }
 function finishPunishment(id){const p=punishments.find(x=>x.id===id);setPunishments(all=>all.map(x=>x.id===id?{...x,status:'Bitti'}:x));if(p?.targetType==='Oyuncu')setPlayers(all=>all.map(x=>String(x.discordId)===String(p.targetId)?{...x,wlStatus:'Aktif',wlEndDate:'',banReason:''}:x));sendDiscordLog('Ceza Bitti / WL Geri Verildi',`${p?.targetId} için ceza bitirildi.`)}
 function saveDonate(){setDonate(p=>p.map(d=>d.type===editDonate.type?{...editDonate,images:(editDonate.images||[]).slice(0,4)}:d));setEditDonate(null)}

 function removeAdminOnlyFounder(discordId){
  if(!canFounderManage(admin)) return alert('Bu işlem sadece Founder yetkisine özeldir.');
  const id=String(discordId);
  const target=admins.find(a=>String(a.discordId)===id);
  if(!target) return alert('Yetkili bulunamadı.');
  if(String(admin.discordId)===id) return alert('Kendi hesabını silemezsin.');
  if(!confirm(`${target.username} adlı yetkili kaldırılacak. Emin misin?`)) return;
  setAdmins(prev=>prev.filter(a=>String(a.discordId)!==id));
  setLogs(prev=>[now()+' - Founder yetkili kaldırdı: '+target.username+' / '+target.role,...prev]);
 }

 function removeStaffOnlyFounder(discordId){
  if(!canFounderManage(admin)) return alert('Bu işlem sadece Founder yetkisine özeldir.');
  const id=String(discordId);
  const target=staffMembers.find(s=>String(s.discordId)===id);
  if(!target) return alert('Kadro bulunamadı.');
  if(!confirm(`${target.name} yönetim kadrosundan kaldırılacak. Emin misin?`)) return;
  setStaffMembers(prev=>prev.filter(s=>String(s.discordId)!==id));
  setLogs(prev=>[now()+' - Founder kadrodan kaldırdı: '+target.name+' / '+target.rank,...prev]);
 }

 function changeAdminRankOnlyFounder(discordId,direction){
  if(!canFounderManage(admin)) return alert('Bu işlem sadece Founder yetkisine özeldir.');
  const id=String(discordId);
  const target=admins.find(a=>String(a.discordId)===id);
  if(!target) return alert('Yetkili bulunamadı.');
  if(String(admin.discordId)===id && direction==='down') return alert('Kendi Founder yetkini düşüremezsin.');
  const next=direction==='up' ? nextHigherRank(target.role) : nextLowerRank(target.role);
  if(!next) return alert('Bu yönde geçilecek yetki yok.');
  setAdmins(prev=>prev.map(a=>String(a.discordId)===id ? {...a, role:next.rank, level:next.level} : a));
  setLogs(prev=>[now()+` - Founder yetki ${direction==='up'?'yükseltti':'düşürdü'}: ${target.username} / ${target.role} -> ${next.rank}`,...prev]);
 }

 function changeStaffRankOnlyFounder(discordId,direction){
  if(!canFounderManage(admin)) return alert('Bu işlem sadece Founder yetkisine özeldir.');
  const id=String(discordId);
  const target=staffMembers.find(s=>String(s.discordId)===id);
  if(!target) return alert('Kadro bulunamadı.');
  const next=direction==='up' ? nextHigherRank(target.rank) : nextLowerRank(target.rank);
  if(!next) return alert('Bu yönde geçilecek yetki yok.');
  setStaffMembers(prev=>prev.map(s=>String(s.discordId)===id ? {...s, rank:next.rank, level:next.level} : s));
  setLogs(prev=>[now()+` - Founder kadro yetkisi ${direction==='up'?'yükseltti':'düşürdü'}: ${target.name} / ${target.rank} -> ${next.rank}`,...prev]);
 }

 const activePunishments=punishments.filter(p=>p.status==='Aktif');

 return <div className="adminLayout"><aside><Logo/><p>{admin.username} • LVL {admin.level} • {admin.role}</p>{menu.map(m=><button key={m} className={active===m?'active':''} onClick={()=>setActive(m)}>{m}</button>)}<Button variant="ghost" onClick={()=>{setAdmin(null);setPage('home')}}>Çıkış</Button></aside><main><div className="adminTop"><div><h1>{active}</h1><p>Full yönetim paneli</p></div><Button onClick={()=>setLogs(p=>[now()+' - Bildirim kontrol edildi',...p])}><Bell size={16}/> Bildirim</Button></div>
  {active==='Dashboard'&&<div className="grid4"><Card className="stat"><Users/><div><span>Oyuncu</span><b>{players.length}</b></div></Card><Card className="stat"><ShieldCheck/><div><span>Yetkili</span><b>{admins.length}</b></div></Card><Card className="stat"><Ban/><div><span>Aktif Ceza</span><b>{activePunishments.length}</b></div></Card><Card className="stat"><Ticket/><div><span>Destek</span><b>{tickets.length}</b></div></Card></div>}
  {active==='Oyuncular'&&<Card className="panel"><h2>Oyuncular</h2>{players.length===0&&<p>Oyuncu yok.</p>}{players.map(p=><div className="row" key={p.discordId}><div><b>{p.username}</b><p>{p.discordId} • {p.wlStatus||'Aktif'}</p><small>{p.banReason||'Ceza yok'} {p.wlEndDate?('• Bitiş: '+(p.wlEndDate==='PERMA'?'PERMA':new Date(p.wlEndDate).toLocaleString('tr-TR'))):''}</small></div><Badge tone={p.wlStatus&&p.wlStatus!=='Aktif'?'bad':'good'}>{p.wlStatus||'Aktif'}</Badge></div>)}</Card>}
  {active==='Yetkililer'&&<Card className="panel"><h2>Yetkili Yönetimi</h2><div className="grid4"><Field value={newAdmin.username} onChange={v=>setNewAdmin({...newAdmin,username:v})} placeholder="Ad"/><Field value={newAdmin.discordId} onChange={v=>setNewAdmin({...newAdmin,discordId:v})} placeholder="Discord ID"/><Field value={newAdmin.password} onChange={v=>setNewAdmin({...newAdmin,password:v})} placeholder="Şifre"/><select className="field" value={newAdmin.role} onChange={e=>setNewAdmin({...newAdmin,role:e.target.value})}>{staffRanks.map(r=><option key={r.rank} value={r.rank}>LVL {r.level} - {r.rank}</option>)}</select></div><Button onClick={addAdmin}>Yetkili Ekle</Button>{[...admins].sort((a,b)=>getStaffLevel(b.role)-getStaffLevel(a.role)).map(a=><div className="row" key={a.discordId}><div><b>{a.username}</b><p>LVL {a.level} • {a.role} • {a.discordId}</p><small>Şifre gizli</small></div><div className="actions staffActions"><Badge>{a.role}</Badge>{canFounderManage(admin)&&<><button type="button" className="btn ghost smallBtn" onClick={()=>changeAdminRankOnlyFounder(a.discordId,'down')}>Düşür</button><button type="button" className="btn ghost smallBtn" onClick={()=>changeAdminRankOnlyFounder(a.discordId,'up')}>Yükselt</button><button type="button" className="btn ghost smallBtn dangerBtn" onClick={()=>removeAdminOnlyFounder(a.discordId)}>Kaldır</button></>}</div></div>)}</Card>}
  {active==='Yönetim Kadrosu'&&<div className="panelStack"><Card className="panel"><h2>Yönetim Kadrosu Ekle</h2><div className="grid4"><Field value={newStaff.name} onChange={v=>setNewStaff({...newStaff,name:v})} placeholder="Yetkili adı"/><Field value={newStaff.discordId} onChange={v=>setNewStaff({...newStaff,discordId:v})} placeholder="Discord ID"/><select className="field" value={newStaff.rank} onChange={e=>setNewStaff({...newStaff,rank:e.target.value})}>{staffRanks.map(r=><option key={r.rank} value={r.rank}>LVL {r.level} - {r.rank}</option>)}</select><select className="field" value={newStaff.status} onChange={e=>setNewStaff({...newStaff,status:e.target.value})}><option>Aktif</option><option>Pasif</option><option>İzinli</option></select></div><Field value={newStaff.duty} onChange={v=>setNewStaff({...newStaff,duty:v})} placeholder="Görev alanı / açıklama"/><Field value={newStaff.image||''} onChange={v=>setNewStaff({...newStaff,image:v})} placeholder="Fotoğraf linki (örn: /images/yetkili.png veya https://...)"/><Button onClick={addStaff}>Kadroyu Ekle</Button></Card><Card className="panel"><h2>Mevcut Yönetim Kadrosu</h2>{sortStaffByRank(staffMembers).map((m,i)=><div className="row" key={m.discordId+i}><div><b>{m.name}</b><p>{m.rank} • {m.duty}</p><small>{m.discordId} • {m.status} {m.image?'• Fotoğraf var':''}</small></div><div className="actions staffActions">{canFounderManage(admin)&&<><button type="button" className="btn ghost smallBtn" onClick={()=>changeStaffRankOnlyFounder(m.discordId,'down')}>Düşür</button><button type="button" className="btn ghost smallBtn" onClick={()=>changeStaffRankOnlyFounder(m.discordId,'up')}>Yükselt</button><button type="button" className="btn ghost smallBtn dangerBtn" onClick={()=>removeStaffOnlyFounder(m.discordId)}>Kaldır</button></>}</div></div>)}</Card></div>}
  {active==='Founder Panel'&&<Card className="panel"><h2>Founder Özel Panel</h2>{!canFounderManage(admin)&&<p>Bu alan sadece Founder yetkisine açıktır.</p>}{canFounderManage(admin)&&<><p>Buradan yetkili silebilir, yetki yükseltebilir veya düşürebilirsin.</p>{[...admins].sort((a,b)=>getStaffLevel(b.role)-getStaffLevel(a.role)).map(a=><div className="row" key={'fp'+a.discordId}><div><b>{a.username}</b><p>LVL {a.level} • {a.role}</p><small>{a.discordId}</small></div><div className="actions staffActions"><button type="button" className="btn ghost smallBtn" onClick={()=>changeAdminRankOnlyFounder(a.discordId,'down')}>Düşür</button><button type="button" className="btn ghost smallBtn" onClick={()=>changeAdminRankOnlyFounder(a.discordId,'up')}>Yükselt</button><button type="button" className="btn ghost smallBtn dangerBtn" onClick={()=>removeAdminOnlyFounder(a.discordId)}>Kaldır</button></div></div>)}</>}</Card>}
  {active==='Destekler'&&<Card className="panel"><h2>Destek Yönetimi</h2>{tickets.length===0&&<p>Destek yok.</p>}{tickets.map(t=><div className="row" key={t.id}><div><b>{t.id} • {t.title}</b><p>{t.type} • {t.username} • {t.state} • {t.assigned}</p><small>{t.description}</small></div><div className="actions"><Button onClick={()=>assignTicket(t.id)}>Üstlen</Button><Button variant="ghost" onClick={()=>closeTicket(t.id)}>Kapat</Button></div></div>)}</Card>}
  {active==='Başvurular'&&<Card className="panel"><h2>Yetkili Başvuruları</h2>{apps.length===0&&<p>Başvuru yok.</p>}{apps.map((a,i)=><div className="row" key={a.discordId+i}><div><b>{a.name||a.username}</b><p>{a.discordId} • {a.status}</p><small>{a.reason}</small></div><div className="actions"><Button onClick={()=>appResult(i,'Kabul Edildi')}>Kabul</Button><Button variant="ghost" onClick={()=>appResult(i,'Reddedildi')}>Reddet</Button></div></div>)}</Card>}
  {active==='Ceza Ver'&&<Card className="panel"><h2>Oyuncu / Yetkili Ceza Ver ve WL Al</h2><div className="grid3"><select className="field" value={punish.targetType} onChange={e=>setPunish({...punish,targetType:e.target.value})}><option>Oyuncu</option><option>Yetkili</option></select><Field value={punish.targetId} onChange={v=>setPunish({...punish,targetId:v})} placeholder="Discord ID"/><Field value={punish.targetName} onChange={v=>setPunish({...punish,targetName:v})} placeholder="İsim"/></div><div className="grid3"><select className="field" value={punish.rule} onChange={e=>{const r=rules.find(x=>x.name===e.target.value);setPunish({...punish,rule:e.target.value,penalty:r?.penalty||''})}}><option value="">Kural seç</option>{rules.map(r=><option key={r.id} value={r.name}>{r.name} - {r.penalty}</option>)}</select><Field value={punish.penalty} onChange={v=>setPunish({...punish,penalty:v})} placeholder="Ceza / WL süresi"/><Field value={punish.proof} onChange={v=>setPunish({...punish,proof:v})} placeholder="Kanıt linki"/></div><TextArea value={punish.note} onChange={v=>setPunish({...punish,note:v})} placeholder="Ceza notu"/><div className="commandPreview">
  <b>Hazır Discord Komutu</b>
  <code>{punish.targetId && punish.rule ? `/wl-ceza ver kullanıcı:${punish.targetId} süre:${durationForCommand(punish.penalty)} sebep:${punish.rule}` : 'Discord ID ve kural seçince komut burada oluşur.'}</code>
</div>
<div className="actions">
  <Button onClick={addPunishment}>Ceza Kaydet + Discord'a Bildir</Button>
  <Button variant="ghost" onClick={()=>copyText(`/wl-ceza ver kullanıcı:${punish.targetId} süre:${durationForCommand(punish.penalty)} sebep:${punish.rule}`)}>Komutu Kopyala</Button>
</div></Card>}
  {active==='WL Takip'&&<Card className="panel"><h2>WL / Ceza Takip</h2>{activePunishments.length===0&&<p>Aktif ceza yok.</p>}{activePunishments.map(p=><div className="row" key={p.id}><div><b>{p.id} • {p.targetType} • {p.targetId}</b><p>{p.rule} • {p.penalty}</p><small>WL Bitiş: {p.endDate==='PERMA'?'PERMA':p.endDate?new Date(p.endDate).toLocaleString('tr-TR'):'Yok'} • {daysLeft(p.endDate)}</small></div><div className="actions">
  <Button variant="ghost" onClick={()=>copyText(wlRemoveCommand(p))}>WL Kaldır Komutunu Kopyala</Button>
  <Button variant="ghost" onClick={()=>copyText(wlGiveCommand(p))}>WL Ver Komutunu Kopyala</Button>
  <Button onClick={()=>finishPunishment(p.id)}><CheckCircle size={16}/> WL Geri Ver / Bitir</Button>
</div></div>)}</Card>}
  {active==='Ceza Kayıtları'&&<Card className="panel"><h2>Ceza Kayıtları</h2>{punishments.length===0&&<p>Ceza kaydı yok.</p>}{punishments.map(p=><div className="row" key={p.id}><div><b>{p.id} • {p.targetType} • {p.targetId}</b><p>{p.rule} • {p.penalty} • {p.status}</p><small>Yetkili: {p.by} • {p.createdAt}</small><div className="miniCommand">{wlGiveCommand(p)}</div></div><div className="actions"><Button variant="ghost" onClick={()=>copyText(wlGiveCommand(p))}>Ver Komutu</Button><Button variant="ghost" onClick={()=>copyText(wlRemoveCommand(p))}>Kaldır Komutu</Button></div></div>)}</Card>}
  {active==='Kurallar'&&<Card className="panel"><h2>Kurallar</h2>{rules.map(r=><div className="rule" key={r.id}><span>{r.id}</span><b>{r.name}</b><em>{r.category}</em><Badge tone={r.level==='Perma'?'bad':r.level==='Not'?'note':'warn'}>{r.penalty}</Badge></div>)}</Card>}
  {active==='Donate Market'&&<Card className="panel"><h2>Donate Yönetimi</h2>{donate.map(d=><div className="row" key={d.type}><div><b>{d.type}</b><p>{d.items.join(' • ')}</p><small>{(d.images||[]).filter(Boolean).length} / 4 fotoğraf</small></div><Button onClick={()=>setEditDonate({...d,images:d.images||['','','','']})}>Düzenle</Button></div>)}</Card>}
  {active==='Loglar'&&<Card className="panel"><h2>Loglar</h2>{logs.map((l,i)=><div className="log" key={i}>{l}</div>)}</Card>}
  {editDonate&&<div className="modal"><Card className="modalCard"><h2>{editDonate.type} Düzenle</h2><TextArea value={editDonate.items.join(', ')} onChange={v=>setEditDonate({...editDonate,items:v.split(',').map(x=>x.trim()).filter(Boolean)})} placeholder="Ürünler"/>
  <h3>Donate Fotoğrafları</h3>
  <p className="muted">Her kategori için en fazla 4 fotoğraf linki ekleyebilirsin. Örnek: /images/araba1.png veya https://...</p>
  {[0,1,2,3].map(i=><Field key={i} value={(editDonate.images||['','','',''])[i]||''} onChange={v=>{const imgs=[...(editDonate.images||['','','',''])];imgs[i]=v;setEditDonate({...editDonate,images:imgs})}} placeholder={`Fotoğraf ${i+1} linki`}/>)}
  <div className="actions"><Button onClick={saveDonate}>Kaydet</Button><Button variant="ghost" onClick={()=>setEditDonate(null)}>Kapat</Button></div></Card></div>}
 </main></div>
}

function App(){
 const [page,setPage]=useState('home'); const [mode,setMode]=useState('admin'); const [auth,setAuth]=useState({username:'',discordId:'',password:'',steam:''});
 const [admins,setAdmins]=useState(()=>JSON.parse(localStorage.getItem('yer6_admins_v19')||'null')||starterAdmins);
 const [players,setPlayers]=useState(()=>JSON.parse(localStorage.getItem('yer6_players_v10')||'null')||[]);
 const [donate,setDonate]=useState(()=>JSON.parse(localStorage.getItem('yer6_donate_v12')||'null')||donateDefault);
 const [staffRanks,setStaffRanks]=useState(()=>JSON.parse(localStorage.getItem('yer6_ranks_v19')||'null')||staffRanksDefault);
 const [staffMembers,setStaffMembers]=useState(()=>JSON.parse(localStorage.getItem('yer6_staff_members_v19')||'null')||staffMembersDefault);
 const [tickets,setTickets]=useState(()=>JSON.parse(localStorage.getItem('yer6_tickets_v10')||'null')||[]);
 const [apps,setApps]=useState(()=>JSON.parse(localStorage.getItem('yer6_apps_v10')||'null')||[]);
 const [punishments,setPunishments]=useState(()=>JSON.parse(localStorage.getItem('yer6_punishments_v10')||'null')||[]);
 const [logs,setLogs]=useState(['Sistem hazır.']); const [admin,setAdmin]=useState(null); const [player,setPlayer]=useState(null);

 useEffect(()=>{
  localStorage.setItem('YER6_DONATE_FULL_CATEGORIES_V12','1');
  setDonate(prev=>{
    const old = Array.isArray(prev) ? prev : [];
    return donateDefault.map(def=>{
      const found = old.find(x=>x.type===def.type);
      return {
        ...def,
        items: found?.items?.length ? found.items : def.items,
        images: (found?.images || def.images || ['','','','']).slice(0,4)
      };
    });
  });
 },[]);



 useEffect(()=>{
  localStorage.setItem('YER6_STAFF_PHOTO_RANKS_V19','1');
  setStaffRanks(staffRanksDefault);
  setStaffMembers(prev=>{
    const fixed = (prev && prev.length ? prev : staffMembersDefault).map(x=>({
      ...x,
      level:getStaffLevel(x.rank),
      image:x.image||''
    }));
    return fixed;
  });
  setAdmins(prev=>{
    const base = prev && prev.length ? prev : starterAdmins;
    return base.map(a=>({...a, level:getStaffLevel(a.role)}));
  });
 },[]);

 useEffect(()=>localStorage.setItem('yer6_admins_v19',JSON.stringify(admins)),[admins]); useEffect(()=>localStorage.setItem('yer6_players_v10',JSON.stringify(players)),[players]); useEffect(()=>localStorage.setItem('yer6_donate_v12',JSON.stringify(donate)),[donate]); useEffect(()=>localStorage.setItem('yer6_ranks_v19',JSON.stringify(staffRanks)),[staffRanks]); useEffect(()=>localStorage.setItem('yer6_staff_members_v19',JSON.stringify(staffMembers)),[staffMembers]); useEffect(()=>localStorage.setItem('yer6_tickets_v10',JSON.stringify(tickets)),[tickets]); useEffect(()=>localStorage.setItem('yer6_apps_v10',JSON.stringify(apps)),[apps]); useEffect(()=>localStorage.setItem('yer6_punishments_v10',JSON.stringify(punishments)),[punishments]);

 function openLogin(m){setMode(m);setPage('login');setAuth({username:'',discordId:'',password:'',steam:''})}
 function loginAdmin(){const a=admins.find(x=>String(x.discordId).trim()===String(auth.discordId).trim()&&String(x.password).trim()===String(auth.password).trim());if(!a)return alert('Kullanıcı adı veya şifre yanlış.');setAdmin(a);setPage('admin');setLogs(p=>[now()+' - admin girişi: '+a.username,...p])}
 function registerPlayer(){if(!auth.username||!auth.discordId||!auth.password)return alert('Kullanıcı adı, Discord ID ve şifre zorunlu.');const p={...auth,status:'Onaylandı',wlStatus:'Aktif',wlEndDate:'',banReason:''};setPlayers(prev=>[p,...prev]);setPlayer(p);setPage('player')}
 function loginPlayer(){const p=players.find(x=>String(x.discordId).trim()===String(auth.discordId).trim()&&String(x.password).trim()===String(auth.password).trim());if(!p)return alert('Kullanıcı adı veya şifre yanlış.');setPlayer(p);setPage('player')}

 if(page==='home')return <HomePage setPage={setPage} openLogin={openLogin}/>;
 if(page==='rules')return <RulesPage setPage={setPage} openLogin={openLogin}/>;
 if(page==='staff')return <StaffPage setPage={setPage} openLogin={openLogin} staffMembers={staffMembers}/>;
 if(page==='characters')return <CharactersPage setPage={setPage} openLogin={openLogin}/>;
 if(page==='game')return <GamePage setPage={setPage} openLogin={openLogin}/>;
 if(page==='market')return <MarketPage setPage={setPage} openLogin={openLogin} donate={donate}/>;
 if(page==='login')return <LoginPage setPage={setPage} mode={mode} setMode={setMode} auth={auth} setAuth={setAuth} loginAdmin={loginAdmin} loginPlayer={loginPlayer} registerPlayer={registerPlayer}/>;
 if(page==='admin'&&admin)return <AdminPanel admin={admin} setAdmin={setAdmin} setPage={setPage} admins={admins} setAdmins={setAdmins} players={players} setPlayers={setPlayers} donate={donate} setDonate={setDonate} staffRanks={staffRanks} setStaffRanks={setStaffRanks} staffMembers={staffMembers} setStaffMembers={setStaffMembers} tickets={tickets} setTickets={setTickets} apps={apps} setApps={setApps} punishments={punishments} setPunishments={setPunishments} logs={logs} setLogs={setLogs}/>;
 if(page==='player'&&player)return <PlayerPanel player={player} setPlayer={setPlayer} setPage={setPage} tickets={tickets} setTickets={setTickets} apps={apps} setApps={setApps} punishments={punishments} setPunishments={setPunishments} setLogs={setLogs}/>;
 return <HomePage setPage={setPage} openLogin={openLogin}/>
}
createRoot(document.getElementById('root')).render(<App/>);
