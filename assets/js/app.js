const LESSONS = [{"id": "microlezione_01", "number": 1, "title": "Micro-lezione 1", "file": "content/microlezione_01.json"}, {"id": "microlezione_02", "number": 2, "title": "Micro-lezione 2", "file": "content/microlezione_02.json"}, {"id": "microlezione_03", "number": 3, "title": "Micro-lezione 3", "file": "content/microlezione_03.json"}, {"id": "microlezione_04", "number": 4, "title": "Micro-lezione 4", "file": "content/microlezione_04.json"}, {"id": "microlezione_05", "number": 5, "title": "Micro-lezione 5", "file": "content/microlezione_05.json"}, {"id": "microlezione_06", "number": 6, "title": "Micro-lezione 6", "file": "content/microlezione_06.json"}, {"id": "microlezione_07", "number": 7, "title": "Micro-lezione 7", "file": "content/microlezione_07.json"}, {"id": "microlezione_08", "number": 8, "title": "Micro-lezione 8", "file": "content/microlezione_08.json"}, {"id": "microlezione_09", "number": 9, "title": "Micro-lezione 9", "file": "content/microlezione_09.json"}, {"id": "microlezione_10", "number": 10, "title": "Micro-lezione 10", "file": "content/microlezione_10.json"}, {"id": "microlezione_11", "number": 11, "title": "Micro-lezione 11", "file": "content/microlezione_11.json"}, {"id": "microlezione_12", "number": 12, "title": "Micro-lezione 12", "file": "content/microlezione_12.json"}, {"id": "microlezione_13", "number": 13, "title": "Micro-lezione 13", "file": "content/microlezione_13.json"}, {"id": "microlezione_14", "number": 14, "title": "Micro-lezione 14", "file": "content/microlezione_14.json"}, {"id": "microlezione_15", "number": 15, "title": "Micro-lezione 15", "file": "content/microlezione_15.json"}, {"id": "microlezione_16", "number": 16, "title": "Micro-lezione 16", "file": "content/microlezione_16.json"}, {"id": "microlezione_17", "number": 17, "title": "Micro-lezione 17", "file": "content/microlezione_17.json"}, {"id": "microlezione_18", "number": 18, "title": "Micro-lezione 18", "file": "content/microlezione_18.json"}, {"id": "microlezione_19", "number": 19, "title": "Micro-lezione 19", "file": "content/microlezione_19.json"}, {"id": "microlezione_20", "number": 20, "title": "Micro-lezione 20", "file": "content/microlezione_20.json"}, {"id": "microlezione_21", "number": 21, "title": "Micro-lezione 21", "file": "content/microlezione_21.json"}, {"id": "microlezione_22", "number": 22, "title": "Micro-lezione 22", "file": "content/microlezione_22.json"}, {"id": "microlezione_23", "number": 23, "title": "Micro-lezione 23", "file": "content/microlezione_23.json"}, {"id": "microlezione_24", "number": 24, "title": "Micro-lezione 24", "file": "content/microlezione_24.json"}, {"id": "microlezione_25", "number": 25, "title": "Micro-lezione 25", "file": "content/microlezione_25.json"}, {"id": "microlezione_26", "number": 26, "title": "Micro-lezione 26", "file": "content/microlezione_26.json"}, {"id": "microlezione_27", "number": 27, "title": "Micro-lezione 27", "file": "content/microlezione_27.json"}, {"id": "microlezione_28", "number": 28, "title": "Micro-lezione 28", "file": "content/microlezione_28.json"}, {"id": "microlezione_29", "number": 29, "title": "Micro-lezione 29", "file": "content/microlezione_29.json"}, {"id": "microlezione_30", "number": 30, "title": "Micro-lezione 30", "file": "content/microlezione_30.json"}, {"id": "microlezione_31", "number": 31, "title": "Micro-lezione 31", "file": "content/microlezione_31.json"}];
let deferredPrompt = null;
const nav = document.getElementById('lessonNav');
const cards = document.getElementById('cards');
const searchInput = document.getElementById('searchInput');
const pageTitle = document.getElementById('pageTitle');
const homeView = document.getElementById('homeView');
const lessonView = document.getElementById('lessonView');
const lessonMeta = document.getElementById('lessonMeta');
const lessonContent = document.getElementById('lessonContent');
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const installBtn = document.getElementById('installBtn');

function renderList(items) {
  nav.innerHTML = items.map(l => `<a class="lesson-link" href="#${l.id}"><strong>${String(l.number).padStart(2,'0')}</strong> — ${l.title}</a>`).join('');
  cards.innerHTML = items.map(l => `<button class="lesson-card" data-id="${l.id}"><div class="badge">Lezione ${l.number}</div><h3>${l.title}</h3><p>Testo integrale + pagina originale</p></button>`).join('');
  document.querySelectorAll('.lesson-card').forEach(btn => btn.addEventListener('click', () => location.hash = btn.dataset.id));
}

async function loadLesson(id) {
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson) return showHome();
  const res = await fetch(lesson.file);
  const data = await res.json();
  pageTitle.textContent = data.title;
  lessonMeta.innerHTML = `<span class="badge">Micro-lezione ${data.number}</span><span>Testo originale integrale</span><span>PWA offline</span>`;
  // Adjust image paths from ../images to images
  lessonContent.innerHTML = data.html.replace(/\.\.\/images\//g, 'images/');
  homeView.hidden = true;
  lessonView.hidden = false;
  document.querySelectorAll('.lesson-link').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  sidebar.classList.remove('open');
}

function showHome() {
  pageTitle.textContent = 'Introduzione';
  homeView.hidden = false;
  lessonView.hidden = true;
  document.querySelectorAll('.lesson-link').forEach(a => a.classList.remove('active'));
}

function handleRoute() {
  const id = location.hash.replace('#','').trim();
  if (!id) showHome();
  else loadLesson(id);
}

searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  if (!q) return renderList(LESSONS);
  const filtered = LESSONS.filter(l => l.title.toLowerCase().includes(q) || String(l.number).includes(q));
  renderList(filtered);
});

menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
window.addEventListener('hashchange', handleRoute);
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});
installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.hidden = true;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}

renderList(LESSONS);
handleRoute();
