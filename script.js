// Data Siswa (30 orang)
const students = [
    { name: "Ahmad Rizky", photo: "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Ahmad" },
    { name: "Siti Nurhaliza", photo: "https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Siti" },
    { name: "Budi Santoso", photo: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Budi" },
    // Tambah 27 lagi atau generate random
];

// Generate 30 siswa
for(let i = students.length; i < 30; i++) {
    students.push({
        name: `Siswa ${i+1}`,
        photo: `https://via.placeholder.com/400x300/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=Siswa+${i+1}`
    });
}

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