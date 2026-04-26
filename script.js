// Data Siswa (30 orang)
const students = [
    { name: "Ahmad Fariski", photo: "./images/Fariski.JPG" },
    { name: "Alya Putri Sartika", photo: "./images/Alya.JPG" },
    { name: "Anisa Hafizah Misbah", photo: "./images/Anisa.JPG" },
    { name: "Asrori Ibnu Muzaki", photo: "./images/Asrori.JPG" },
    { name: "Aura Kamila", photo: "./images/Aura.JPG" },
    { name: "Carissa Alzena Yuniar", photo: "./images/Carrisa.JPG" },
    { name: "Effeline Avriliandoko", photo: "./images/Effeline.JPG" },
    { name: "Firyal Ariqah", photo: "./images/Firyal.JPG" },
    { name: "Halilah Azka Rauf", photo: "./images/.JPG" },
    { name: "Ibrahim Kholil Alkatsiri", photo: "./images/Kholil.JPG" },
    { name: "Jahrotu Syita", photo: "./images/SYita.JPG" },
    { name: "Livia Nur Hafizah", photo: "./images/Livia.JPG" },
    { name: "Luqman Ahsan Yasir", photo: "./images/Lukman.JPG" },
    { name: "M Bagus Surya Darma", photo: "./images/Bagus.JPG" },
    { name: "Muhamad Zidane", photo: "./images/Jidan.JPG" },
    { name: "M Azhari Anhar", photo: "./images/.JPG" },
    { name: "M Fadel Arif Abdul Malik", photo: "./images/Fadel.JPG" },
    { name: "M Irfandi Yusuf", photo: "./images/Irfandi.JPG" },
    { name: "M Rizki Taqiyudin Kamil", photo: "./images/Taqi.JPG" },
    { name: "Nadhira Salma Apriyani", photo: "./images/NAdhira.JPG" },
    { name: "Nuril Shabrina", photo: "./images/Nuril.JPG" },
    { name: "Putra Ahmad Fauzi", photo: "./images/.JPG" },
    { name: "Radhitya Raffa Janafi", photo: "./images/Raffa.JPG" },
    { name: "Raisha Putri Rahmadani", photo: "./images/Eca.JPG" },
    { name: "Rizky Putra Anugrah", photo: "./images/Putra.JPG" },
    { name: "Safwah Rinjani", photo: "./images/F.JPG" },
    { name: "Shava Azzahra U.T", photo: "./images/Shava.JPG" },
    { name: "Syeima Ibrahim Lubis", photo: "./images/Syeima.JPG" },
    { name: "Wisnu Ardhi Winata", photo: "./images/Wisnu.JPG" },
    { name: "Zahratus Dzihni Sayidah", photo: "./images/Dzihni.JPG" },
    // Tambah 27 lagi atau generate random
];

// Data Momen (foto kelompok)
const moments = [
    "./images/Momen1.jpeg",
    "./images/Momen2.jpeg",
    "./images/Momen3.jpeg",
    "./images/Momen4.jpeg",
    "./images/Momen5.jpeg",
    "./images/Momen6.jpeg",
    "./images/Momen7.jpeg",
    "./images/Momen8.jpeg",
    "./images/Momen9.jpeg",
    "./images/Momen10.jpeg",
    "./images/Momen11.jpeg",
    "./images/Momen12.jpeg",
    "./images/Momen13.jpeg",
    "./images/Momen14.jpeg",
    "./images/Momen15.jpeg",
    "./images/Momen16.jpeg",
    "./images/Momen17.jpeg",
    "./images/Momen18.jpeg",
    "./images/Momen19.jpeg",
    "./images/Momen20.jpeg",
    "./images/Momen21.jpeg",
    "./images/Momen22.jpeg",
    "./images/Momen23.jpeg",
    "./images/Momen24.jpeg",
    "./images/Momen25.jpeg",
    "./images/Momen26.jpeg",
    "./images/Momen27.jpeg",
    "./images/Momen28.jpeg",
    "./images/Momen29.jpeg",
    "./images/Momen30.jpeg",
    "./images/Momen31jpeg",
    "./images/Momen32.jpeg",
    "./images/Momen33.jpeg",
    "./images/Momen34.jpeg",
    "./images/Momen35.jpeg",
    "./images/Momen36.jpeg",
    "./images/Momen37.jpeg",
    "./images/Momen38.jpeg",
    "./images/Momen39.jpeg",
    "./images/Momen40.jpeg",
    "./images/Momen41.jpeg",
    "./images/Momen42.jpeg",
    "./images/Momen43.jpeg",
    "./images/Momen44.jpeg",
    "./images/Momen45.jpeg",
    "./images/Momen46.jpeg",
    "./images/Momen47.jpeg",
    "./images/Momen48.jpeg",
    "./images/Momen49.jpg",
    
];

let currentSlide = 0;
let currentGalleryIndex = 0;

// ============================================
// SISWA FUNCTIONS (Tetep sama)
// ============================================
function loadStudents() {
    const grid = document.getElementById('siswaGrid');
    grid.innerHTML = '';
    
    students.forEach(student => {
        const card = document.createElement('div');
        card.className = 'siswa-card';
        card.onclick = () => openSiswaModal(student);
        card.innerHTML = `
            <img src="${student.photo}" alt="${student.name}" class="siswa-photo">
            <h3 class="siswa-name">${student.name}</h3>
        `;
        grid.appendChild(card);
    });
}

function openSiswaModal(student) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            <img src="${student.photo}" alt="${student.name}">
            <h2>${student.name}</h2>
        </div>
    `;
    document.body.appendChild(modal);
}

// ============================================
// MOMEN 2x5 GRID + SLIDER + MODAL
// ============================================

// 1. Load 2x5 Grid (10 foto pertama)
function loadMomenGrid() {
    const grid = document.getElementById('momenGrid');
    grid.innerHTML = '';
    
    moments.slice(0, 10).forEach((moment, index) => {
        const photo = document.createElement('div');
        photo.className = 'momen-photo-container';
        photo.innerHTML = `
            <img src="${moment}" alt="Momen ${index + 1}" 
                 class="momen-photo" 
                 onclick="openGalleryModal(${index})">
        `;
        grid.appendChild(photo);
    });
}

// 2. Load Thumbnail Slider (70 foto)
function loadSlider() {
    const track = document.getElementById('momenSlider');
    track.innerHTML = '';
    
    moments.forEach((moment, index) => {
        const thumb = document.createElement('img');
        thumb.className = `slider-thumb ${index === 0 ? 'active' : ''}`;
        thumb.src = moment;
        thumb.alt = `Momen ${index + 1}`;
        thumb.onclick = () => {
            currentSlide = index;
            updateSliderTrack();
            openGalleryModal(index);
        };
        track.appendChild(thumb);
    });
    
    updateSliderTrack();
}

// 3. Update slider position
function updateSliderTrack() {
    const track = document.getElementById('momenSlider');
    const thumbWidth = 166; // 150px + 16px gap
    track.style.transform = `translateX(-${currentSlide * thumbWidth}px)`;
    
    // Update active thumb
    document.querySelectorAll('.slider-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === currentSlide);
    });
}

// 4. Gallery Modal Fullscreen
function openGalleryModal(index) {
    currentGalleryIndex = index;
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-modal-content">
            <button class="gallery-modal-close" onclick="closeGalleryModal()">
                <i class="fas fa-times"></i>
            </button>
            <button class="gallery-modal-prev" onclick="prevGallery()">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="gallery-modal-next" onclick="nextGallery()">
                <i class="fas fa-chevron-right"></i>
            </button>
            <img src="${moments[currentGalleryIndex]}" alt="Momen ${currentGalleryIndex + 1}">
            <div class="gallery-modal-counter">
                ${currentGalleryIndex + 1} / ${moments.length}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Keyboard navigation
    document.addEventListener('keydown', galleryKeyNav, { once: true });
}

function closeGalleryModal() {
    document.querySelector('.gallery-modal')?.remove();
}

function prevGallery() {
    currentGalleryIndex--;
    if (currentGalleryIndex < 0) currentGalleryIndex = moments.length - 1;
    updateGalleryModal();
}

function nextGallery() {
    currentGalleryIndex++;
    if (currentGalleryIndex >= moments.length) currentGalleryIndex = 0;
    updateGalleryModal();
}

function updateGalleryModal() {
    const modalImg = document.querySelector('.gallery-modal img');
    const counter = document.querySelector('.gallery-modal-counter');
    modalImg.src = moments[currentGalleryIndex];
    counter.textContent = `${currentGalleryIndex + 1} / ${moments.length}`;
}

function galleryKeyNav(e) {
    const modal = document.querySelector('.gallery-modal');
    if (!modal) return;
    
    if (e.key === 'Escape') closeGalleryModal();
    if (e.key === 'ArrowLeft') prevGallery();
    if (e.key === 'ArrowRight') nextGallery();
}

// ============================================
// INIT - Load Semua
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();    // Siswa grid
    loadMomenGrid();   // 2x5 momen grid
    loadSlider();      // Thumbnail slider
});
