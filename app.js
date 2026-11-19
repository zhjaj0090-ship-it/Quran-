const scenes = [
  {name:"وادي الجبال",url:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2000&q=85"},
  {name:"بحيرة بين الجبال",url:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=85"},
  {name:"غابة هادئة",url:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85"},
  {name:"سماء ونجوم",url:"https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&w=2000&q=85"},
  {name:"شلال وسط الطبيعة",url:"https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=2000&q=85"},
  {name:"شاطئ هادئ",url:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=85"},
  {name:"صحراء وقت الغروب",url:"https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2000&q=85"},
  {name:"جبال خضراء",url:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85"}
];
const background = document.getElementById("background");
const sceneName = document.getElementById("sceneName");
const autoButton = document.getElementById("autoScene");
let sceneIndex = 0, autoTimer = null, playing = false, progress = 0;

function setScene(index) {
  sceneIndex = (index + scenes.length) % scenes.length;
  background.style.opacity = ".25";
  const next = new Image();
  next.onload = () => {
    background.style.backgroundImage = `url("${scenes[sceneIndex].url}")`;
    background.style.opacity = "1";
    sceneName.textContent = scenes[sceneIndex].name;
  };
  next.onerror = () => {
    background.style.opacity = "1";
    sceneName.textContent = scenes[sceneIndex].name;
  };
  next.src = scenes[sceneIndex].url;
}
function randomScene() {
  let next = sceneIndex;
  while (scenes.length > 1 && next === sceneIndex) next = Math.floor(Math.random() * scenes.length);
  setScene(next);
}
function toggleAuto() {
  if (autoTimer) {
    clearInterval(autoTimer); autoTimer = null;
    autoButton.classList.remove("active");
    autoButton.style.color = "";
  } else {
    autoTimer = setInterval(randomScene, 30000);
    autoButton.classList.add("active");
    autoButton.style.color = "var(--gold)";
  }
}
document.getElementById("changeScene").addEventListener("click", randomScene);
document.getElementById("nextScene").addEventListener("click", randomScene);
document.getElementById("shuffle").addEventListener("click", randomScene);
autoButton.addEventListener("click", toggleAuto);

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", () => {
  playing = !playing;
  playButton.textContent = playing ? "Ⅱ" : "▶";
  playButton.setAttribute("aria-label", playing ? "إيقاف مؤقت" : "تشغيل");
  document.getElementById("statusNote").textContent = playing
    ? "زر التشغيل تجريبي حاليًا — هنربطه بالتلاوات الحقيقية في المرحلة التالية."
    : "واجهة تجريبية — هنضيف روابط التلاوات الحقيقية في المرحلة التالية.";
});
document.getElementById("favorite").addEventListener("click", e => {
  e.currentTarget.classList.toggle("active");
  e.currentTarget.textContent = e.currentTarget.classList.contains("active") ? "♥" : "♡";
});
function updateTrack() {
  const reciter = document.getElementById("reciterSelect");
  const surah = document.getElementById("surahSelect");
  document.getElementById("surahTitle").textContent = "سورة " + surah.value;
  document.getElementById("reciterTitle").textContent = "القارئ: " + reciter.options[reciter.selectedIndex].text;
}
document.getElementById("reciterSelect").addEventListener("change", updateTrack);
document.getElementById("surahSelect").addEventListener("change", updateTrack);
document.getElementById("volume").addEventListener("input", e => {
  e.target.style.opacity = e.target.value / 100;
});

const library = document.getElementById("library"), overlay = document.getElementById("overlay");
function openLibrary(){library.classList.add("open");overlay.classList.add("show");library.setAttribute("aria-hidden","false")}
function closeLibrary(){library.classList.remove("open");overlay.classList.remove("show");library.setAttribute("aria-hidden","true")}
document.getElementById("openLibrary").addEventListener("click",openLibrary);
document.getElementById("closeLibrary").addEventListener("click",closeLibrary);
overlay.addEventListener("click",closeLibrary);
document.getElementById("libraryChangeScene").addEventListener("click",()=>{randomScene();closeLibrary()});
document.getElementById("previous").addEventListener("click",()=>{const s=document.getElementById("surahSelect");s.selectedIndex=(s.selectedIndex-1+s.options.length)%s.options.length;updateTrack()});
document.getElementById("next").addEventListener("click",()=>{const s=document.getElementById("surahSelect");s.selectedIndex=(s.selectedIndex+1)%s.options.length;updateTrack()});

setScene(0);
