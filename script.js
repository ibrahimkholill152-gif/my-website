// Data Siswa (30 orang)
const students = [
    { name: "Ahmad Fariski", photo: "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Ahmad" },
    { name: "Alya Putri Sartika", photo: "https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Siti" },
    { name: "Anisa Hafizah Misbah", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Asrori Ibnu Muzaki", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Aura Kamila", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Carissa Alzena Yuniar", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Effeline Avriliandoko", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Firyal Ariqah", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Halilah Azka Rauf", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Ibrahim Kholil Alkatsiri", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Jahrotu Syita", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Livia Nur Hafizah", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Luqman Ahsan Yasir", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "M Bagus Surya Darma", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Muhamad Zidane", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "M Azhari Anhar", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "M Fadel Arif Abdul Malik", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "M Irfandi Yusuf", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "M Rizki Taqiyudin Kamil", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Nadhira Salma Apriyani", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Nuril Shabrina", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Putra Ahmad Fauzi", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Radhitya Raffa Janafi", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Raisha Putri Rahmadani", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Rizky Putra Anugrah", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Safwah Rinjani", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Shava Azzahra U.T", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Syeima Ibrahim Lubis", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Wisnu Ardhi Winata", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    { name: "Zahratus Dzihni Sayidah", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
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
