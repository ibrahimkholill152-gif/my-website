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
    "https://via.placeholder.com/1200x500/4A90E2/FFFFFF?text=Momen+1",
    "https://via.placeholder.com/1200x500/50C878/FFFFFF?text=Momen+2", 
    "https://via.placeholder.com/1200x500/FECA57/000000?text=Momen+3",
    "https://via.placeholder.com/1200x500/FF6B6B/FFFFFF?text=Momen+4",
    "https://via.placeholder.com/1200x500/4ECDC4/FFFFFF?text=Momen+5"
];

let currentSlide = 0;

// Load Siswa
function loadStudents() {
    const grid = document.getElementById('siswaGrid');
    grid.innerHTML = '';
    
    students.forEach((student, index) => {
        const card = document.createElement('div');
        card.className = 'siswa-card';
        card.onclick = () => openModal(student);
        
        card.innerHTML = `
            <img src="${student.photo}" alt="${student.name}" class="siswa-photo">
            <div class="siswa-info">
                <h3 class="siswa-name">${student.name}</h3>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Load Slider Momen
function loadSlider() {
    const slider = document.getElementById('momenSlider');
    const dotsContainer = document.getElementById('sliderDots');
    
    // Clear existing
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    moments.forEach((moment, index) => {
        // Add slide
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${moment}" alt="Momen ${index + 1}">`;
        slider.appendChild(slide);
        
        // Add dot
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
}

// Slider Functions
function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= moments.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = moments.length - 1;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    document.querySelectorAll('.slide').forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
    
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Modal Siswa
function openModal(student) {
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

// Auto slide
setInterval(() => changeSlide(1), 5000);

// Init
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
    loadSlider();
});
