// ============================================
// DATA SISWA
// ============================================
const students = [
    { name: "Ahmad Fariski", photo: "./images/Fariski.jpg" },
    { name: "Alya Putri Sartika", photo: "./images/Alya.jpg" },
    { name: "Anisa Hafizah Misbah", photo: "./images/Anisa.jpg" },
    { name: "Asrori Ibnu Muzaki", photo: "./images/Asrori.jpg" },
    { name: "Aura Kamila", photo: "./images/Aura.jpg" },
    { name: "Carissa Alzena Yuniar", photo: "./images/Carrisa.jpg" },
    { name: "Effeline Avriliandoko", photo: "./images/Effeline.jpg" },
    { name: "Firyal Ariqah", photo: "./images/Firyal.jpg" },
    { name: "Halilah Azka Rauf", photo: "./images/default.jpg" },
    { name: "Ibrahim Kholil Alkatsiri", photo: "./images/Kholil.jpg" },
    { name: "Jahrotu Syita", photo: "./images/SYita.jpg" },
    { name: "Livia Nur Hafizah", photo: "./images/Livia.jpg" },
    { name: "Luqman Ahsan Yasir", photo: "./images/Lukman.jpg" },
    { name: "M Bagus Surya Darma", photo: "./images/Bagus.jpg" },
    { name: "Muhamad Zidane", photo: "./images/Jidan.jpg" },
    { name: "M Azhari Anhar", photo: "./images/default.jpg" },
    { name: "M Fadel Arif Abdul Malik", photo: "./images/Fadel.jpg" },
    { name: "M Irfandi Yusuf", photo: "./images/Irfandi.jpg" },
    { name: "M Rizki Taqiyudin Kamil", photo: "./images/Taqi.jpg" },
    { name: "Nadhira Salma Apriyani", photo: "./images/NAdhira.jpg" },
    { name: "Nuril Shabrina", photo: "./images/Nuril.jpg" },
    { name: "Putra Ahmad Fauzi", photo: "./images/default.jpg" },
    { name: "Radhitya Raffa Janafi", photo: "./images/Raffa.jpg" },
    { name: "Raisha Putri Rahmadani", photo: "./images/Eca.jpg" },
    { name: "Rizky Putra Anugrah", photo: "./images/Putra.jpg" },
    { name: "Safwah Rinjani", photo: "./images/F.jpg" },
    { name: "Shava Azzahra U.T", photo: "./images/Shava.jpg" },
    { name: "Syeima Ibrahim Lubis", photo: "./images/Syeima.jpg" },
    { name: "Wisnu Ardhi Winata", photo: "./images/Wisnu.jpg" },
    { name: "Zahratus Dzihni Sayidah", photo: "./images/Dzihni.jpg" }
];

// ============================================
// FULL FIX SCRIPT.JS
// Grid 2x5 + slider bawah bisa digeser +
// modal galeri premium
// ============================================
// ================= DATA MOMEN =================
const moments = [];
for (let i = 1; i <= 49; i++) {
  moments.push(`./images/Momen${i}.jpeg`);
}

let currentGalleryIndex = 0;

// ============================================
// LOAD SISWA
// ============================================
function loadStudents() {
  const grid = document.getElementById("siswaGrid");
  if (!grid) return;

  grid.innerHTML = "";

  students.forEach((student, index) => {
    const card = document.createElement("div");
    card.className = "siswa-card";
    card.setAttribute("data-no", index + 1);

    card.innerHTML = `
      <img src="${student.photo}" class="siswa-photo">
      <h3 class="siswa-name">${student.name}</h3>
    `;

    card.onclick = () => openStudentModal(student);

    grid.appendChild(card);
  });
}

// ============================================
// MODAL SISWA
// ============================================
function openStudentModal(student) {
  const modal = document.createElement("div");
  modal.className = "gallery-modal";

  modal.innerHTML = `
    <div class="gallery-modal-content">
      <button class="gallery-modal-close" onclick="closeGalleryModal()">✕</button>
      <img src="${student.photo}">
    </div>
  `;

  document.body.appendChild(modal);
}

// ============================================
// LOAD GALERI GRID 2x5
// ============================================
function loadMomenGrid() {
  const grid = document.getElementById("momenGrid");
  if (!grid) return;

  grid.innerHTML = "";

  moments.slice(0, 10).forEach((img, index) => {
    const item = document.createElement("div");
    item.className = "momen-photo";

    item.innerHTML = `
      <img src="${img}" onclick="openGalleryModal(${index})">
    `;

    grid.appendChild(item);
  });
}

// ============================================
// LOAD SLIDER BAWAH
// ============================================
function loadSlider() {
  const slider = document.getElementById("momenSlider");
  if (!slider) return;

  slider.innerHTML = "";

  moments.forEach((img, index) => {
    const thumb = document.createElement("img");

    thumb.src = img;
    thumb.className = "slider-thumb";

    thumb.onclick = () => openGalleryModal(index);

    slider.appendChild(thumb);
  });

  enableDrag(slider);
}

// ============================================
// DRAG SCROLL
// ============================================
function enableDrag(slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active-drag");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;

    slider.scrollLeft = scrollLeft - walk;
  });

  // TOUCH HP
  let touchStart = 0;
  let touchScroll = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStart = e.touches[0].pageX;
    touchScroll = slider.scrollLeft;
  });

  slider.addEventListener("touchmove", (e) => {
    const move = e.touches[0].pageX;
    const walk = (move - touchStart) * 2;

    slider.scrollLeft = touchScroll - walk;
  });
}

// ============================================
// OPEN MODAL GALERI
// ============================================
function openGalleryModal(index) {
  currentGalleryIndex = index;

  const thumbs = moments.map((img, i) => `
    <img src="${img}" 
         class="gallery-thumb ${i === index ? "active" : ""}"
         onclick="jumpGallery(${i})">
  `).join("");

  const modal = document.createElement("div");
  modal.className = "gallery-modal";

  modal.innerHTML = `
    <div class="gallery-modal-content">

      <button class="gallery-modal-close"
      onclick="closeGalleryModal()">✕</button>

      <button class="gallery-modal-nav gallery-modal-prev"
      onclick="prevGallery()">❮</button>

      <button class="gallery-modal-nav gallery-modal-next"
      onclick="nextGallery()">❯</button>

      <img id="galleryMainImage"
      src="${moments[index]}">

      <div class="gallery-thumbs" id="galleryThumbs">
        ${thumbs}
      </div>

    </div>
  `;

  document.body.appendChild(modal);
    enableThumbScroll();

  enableDrag(document.getElementById("galleryThumbs"));

  document.addEventListener("keydown", keyGallery);
}

// ============================================
// CLOSE
// ============================================
function closeGalleryModal() {
  document.querySelector(".gallery-modal")?.remove();
  document.removeEventListener("keydown", keyGallery);
}

// ============================================
// NAVIGASI
// ============================================
function prevGallery() {
  currentGalleryIndex--;

  if (currentGalleryIndex < 0) {
    currentGalleryIndex = moments.length - 1;
  }

  updateGallery();
}

function nextGallery() {
  currentGalleryIndex++;

  if (currentGalleryIndex >= moments.length) {
    currentGalleryIndex = 0;
  }

  updateGallery();
}

function jumpGallery(index) {
  currentGalleryIndex = index;
  updateGallery();
}

// ============================================
// UPDATE MODAL
// ============================================
function updateGallery() {
  const img = document.getElementById("galleryMainImage");
  if (img) img.src = moments[currentGalleryIndex];

  document.querySelectorAll(".gallery-thumb").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentGalleryIndex);
  });
}

// ============================================
// KEYBOARD
// ============================================
function keyGallery(e) {
  if (e.key === "Escape") closeGalleryModal();
  if (e.key === "ArrowLeft") prevGallery();
  if (e.key === "ArrowRight") nextGallery();
}

function enableThumbScroll(){

    const slider = document.getElementById("galleryThumbs");
    if(!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown",(e)=>{
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave",()=>{
        isDown = false;
    });

    slider.addEventListener("mouseup",()=>{
        isDown = false;
    });

    slider.addEventListener("mousemove",(e)=>{
        if(!isDown) return;
        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;

        slider.scrollLeft = scrollLeft - walk;
    });

    // HP TOUCH
    slider.addEventListener("touchstart",(e)=>{
        startX = e.touches[0].pageX;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("touchmove",(e)=>{
        const x = e.touches[0].pageX;
        const walk = (x - startX) * 2;

        slider.scrollLeft = scrollLeft - walk;
    });
}

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  loadStudents();
  loadMomenGrid();
  loadSlider();
});
