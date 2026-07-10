// ===============================
// ساخت نقشه
// ===============================

const map = L.map("map").setView([35.4305, 51.5705], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
}).addTo(map);


// ===============================
// اطلاعات موکب ها
// ===============================

const mokebs = [

{
name:"موکب امام حسن مجتبی (ع)",
lat:35.420,
lng:51.565,
address:"قرچک - ابتدای مسیر",
services:"🍲 غذا<br>☕ چای<br>🚻 سرویس بهداشتی"
},

{
name:"موکب حضرت زینب (س)",
lat:35.426,
lng:51.571,
address:"بلوار امام رضا",
services:"💧 آب معدنی<br>🍵 چای<br>🛏 استراحت"
},

{
name:"موکب شهدای قرچک",
lat:35.432,
lng:51.578,
address:"سه راه کارخانه",
services:"🍲 غذا<br>🚑 درمان"
},

{
name:"موکب حضرت رقیه (س)",
lat:35.439,
lng:51.585,
address:"جاده قدیم ری",
services:"☕ چای<br>🥤 شربت"
},

{
name:"موکب حضرت ابوالفضل (ع)",
lat:35.446,
lng:51.592,
address:"ورودی شهرری",
services:"🍲 غذا<br>🛏 استراحت<br>🚑 درمان"
}

];


// ===============================
// آیکون اختصاصی
// ===============================

const markerIcon = L.icon({

iconUrl:
"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

shadowUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

iconSize:[25,41],
iconAnchor:[12,41]

});


// ===============================
// نمایش موکب ها
// ===============================

mokebs.forEach(item=>{

L.marker([item.lat,item.lng],{icon:markerIcon})

.addTo(map)

.bindPopup(

`
<h3>${item.name}</h3>

<b>📍 آدرس:</b><br>

${item.address}

<br><br>

<b>خدمات:</b><br>

${item.services}

<br><br>

<a target="_blank"

href="https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}">

🚗 مسیریابی

</a>

`

);

});


// ===============================
// نمایش مسیر نمونه
// ===============================

const line = [

[35.420,51.565],

[35.426,51.571],

[35.432,51.578],

[35.439,51.585],

[35.446,51.592]

];

L.polyline(line,{

color:"#FFD700",

weight:6,

opacity:.8

}).addTo(map);


// ===============================
// موقعیت کاربر
// ===============================

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(function(position){

const lat = position.coords.latitude;

const lng = position.coords.longitude;

L.circleMarker([lat,lng],{

radius:8,

color:"blue",

fillColor:"blue",

fillOpacity:1

})

.addTo(map)

.bindPopup("📍 موقعیت شما");

});

}


// ===============================
// جستجو
// ===============================

const search = document.getElementById("search");

search.addEventListener("keyup",function(){

const text = this.value.trim();

mokebs.forEach(item=>{

if(item.name.includes(text)){

map.setView([item.lat,item.lng],16);

}

});

});