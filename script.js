const map = L.map('map').setView([35.52198, 51.49887], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const mokebs = [
{
name:'هیئت امیرالمومنین ع',
type:'پذیرایی',
address:'مسیر پیاده روی جاماندگان اربعین',
services:'ظرفیت ۲۰۰۰ نفر'
},
{
name:'گروه جهادی شهید بقرایی',
type:'پذیرایی',
address:'مسیر پیاده روی جاماندگان اربعین',
services:'پذیرایی'
},
{
name:'حوزه امام حسین ع',
type:'خدماتی',
address:'مسیر پیاده روی جاماندگان اربعین',
services:'خدماتی'
},
{
name:'گروه جهادی شهید کیوان تاجیک',
type:'پذیرایی',
address:'مسیر پیاده روی جاماندگان اربعین',
services:'پذیرایی'
},
{
name:'محبین الائمه',
type:'پذیرایی',
address:'مسیر پیاده روی جاماندگان اربعین',
services:'ظرفیت ۵۰۰۰ نفر'
},
{
name:'خیریه حضرت زینب س',
type:'پذیرایی',
address:'مسیر پیاده روی جاماندگان اربعین',
services:'پذیرایی'
},
{
name:'هیئت اباعبدالله الحسین',
type:'پذیرایی',
address:'نزدیک حرم',
services:'ظرفیت ۲۰۰۰۰ نفر'
}
];

let markers = [];

function color(t){
if(t==='فرهنگی') return '#2196f3';
if(t==='پذیرایی') return '#22c55e';
if(t==='خدماتی') return '#ff9800';
return '#ef4444';
}

function show(data){

markers.forEach(m=>map.removeLayer(m));
markers=[];

data.forEach(x=>{

let icon=L.divIcon({
html:`
<div style="
position:relative;
width:28px;
height:28px;
background:${color(x.type)};
border-radius:50% 50% 50% 0;
transform:rotate(-45deg);
border:2px solid white;
box-shadow:0 3px 8px rgba(0,0,0,.35);
">
<div style="
position:absolute;
top:50%;
left:50%;
width:10px;
height:10px;
background:white;
border-radius:50%;
transform:translate(-50%,-50%) rotate(45deg);
"></div>
</div>
`,
className:'',
iconSize:[28,28],
iconAnchor:[14,28],
popupAnchor:[0,-28]
});

let m=L.marker([x.lat,x.lng],{icon}).addTo(map);

m.bindPopup(`
<h3>${x.name}</h3>
<p>📍 ${x.address}</p>
<p>🏷️ ${x.type}</p>
<p>🍵 ${x.services}</p>
`);

markers.push(m);

});

document.getElementById('mokebCount').innerText=data.length;
}

function filterMokeb(t){
show(t==='all'?mokebs:mokebs.filter(x=>x.type===t));
}

document.getElementById('search').oninput=function(){
show(mokebs.filter(x=>x.name.includes(this.value)));
}

const start = [35.44054, 51.57129];
const destination = [35.60342, 51.42645];

L.marker(start).addTo(map).bindPopup("📍 مبدا");
L.marker(destination).addTo(map).bindPopup("🏁 مقصد");

fetch(`https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`)
.then(res => res.json())
.then(data => {

const route = data.routes[0].geometry.coordinates.map(c => [
c[1],
c[0]
]);

L.polyline(route,{
color:"#1976d2",
weight:6
}).addTo(map);

const positions = [0.08,0.20,0.34,0.48,0.62,0.78,0.92];

mokebs.forEach((m,index)=>{

const point = route[Math.floor(route.length * positions[index])];

// جابجایی خیلی کم کنار مسیر
const offsetLat = (index % 2 === 0 ? 1 : -1) * 0.0007;
const offsetLng = (index % 2 === 0 ? -1 : 1) * 0.0007;

m.lat = point[0] + offsetLat;
m.lng = point[1] + offsetLng;

});

show(mokebs);

map.fitBounds(route);

});

map.fitBounds([start,destination],{
padding:[40,40]
});
function showMyLocation(){

if(!navigator.geolocation){
alert("موقعیت مکانی پشتیبانی نمی‌شود");
return;
}

navigator.geolocation.getCurrentPosition(function(position){

const lat = position.coords.latitude;
const lng = position.coords.longitude;

L.marker([lat,lng])
.addTo(map)
.bindPopup("📍 شما اینجا هستید")
.openPopup();

map.setView([lat,lng],15);

const distance = map.distance(
[lat,lng],
destination
);

const km = (distance / 1000).toFixed(1);

document.getElementById("distanceInfo").innerHTML =
`🏁 فاصله تا حرم: <b>${km} کیلومتر</b>`;

},function(){
alert("دسترسی به موقعیت مکانی داده نشد");
});

}
