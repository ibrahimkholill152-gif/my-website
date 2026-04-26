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
let autoSlideInterval;
let progressInterval;

function loadSlider() {
    const slider = document.getElementById('momenSlider');
    const dotsContainer = document.getElementById('sliderDots');
    
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    moments.forEach((moment, index) => {
        // Slide + Caption
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${moment}" alt="Momen ${index + 1}">
            <div class="slide-caption">
                Momen ${index + 1} / ${moments.length}
            </div>
        `;
        slider.appendChild(slide);
        
        // Dot
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    startAutoSlide();
}

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
    // Update slides
    document.querySelectorAll('.slide').forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    
    // Reset progress
    document.getElementById('progressFill').style.width = '0%';
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    // Progress bar
    progressInterval = setInterval(() => {
        const progress = document.getElementById('progressFill');
        const width = parseFloat(progress.style.width) || 0;
        progress.style.width = Math.min(width + 2, 100) + '%';
    }, 100);
}

// Pause on hover
document.querySelector('.slider-container').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
    clearInterval(progressInterval);
});

document.querySelector('.slider-container').addEventListener('mouseleave', startAutoSlide);

// Init
document.addEventListener('DOMContentLoaded', loadSlider);
});
