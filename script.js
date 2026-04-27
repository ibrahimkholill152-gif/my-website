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
// DATA MOMEN
// ============================================
const moments = [];

for(let i = 1; i <= 49; i++){
    moments.push(`./images/Momen${i}.jpeg`);
}

// ============================================
// GLOBAL
// ============================================
let currentGalleryIndex = 0;
let currentSlide = 0;

// ============================================
// LOAD SISWA
// ============================================
function loadStudents(){
    const grid = document.getElementById("siswaGrid");
    if(!grid) return;

    grid.innerHTML = "";

    students.forEach((student,index)=>{
        const card = document.createElement("div");
        card.className = "siswa-card";
        card.setAttribute("data-no", index + 1);

        card.innerHTML = `
            <img src="${student.photo}" class="siswa-photo">
            <h3 class="siswa-name">${student.name}</h3>
        `;

        card.onclick = ()=> openSiswaModal(student);

        grid.appendChild(card);
    });
}

// ============================================
// MODAL SISWA
// ============================================
function openSiswaModal(student){
    const modal = document.createElement("div");
    modal.className = "gallery-modal";

    modal.innerHTML = `
        <div class="gallery-modal-content">
            <button class="gallery-modal-close" onclick="this.closest('.gallery-modal').remove()">&times;</button>
            <img src="${student.photo}">
        </div>
    `;

    document.body.appendChild(modal);
}

// ============================================
// GALERI PINTEREST
// ============================================
function loadMomenGrid(){
    const grid = document.getElementById("momenGrid");
    if(!grid) return;

    grid.innerHTML = "";

    const styles = ["square","tall","wide"];

    moments.forEach((img,index)=>{
        const item = document.createElement("div");
        item.className = `momen-photo ${styles[index % 3]}`;

        item.innerHTML = `
            <img src="${img}" onclick="openGalleryModal(${index})">
        `;

        grid.appendChild(item);
    });
}

// ============================================
// THUMBNAIL SLIDER
// ============================================
function loadSlider(){
    const track = document.getElementById("momenSlider");
    if(!track) return;

    track.innerHTML = "";

    moments.forEach((img,index)=>{
        const thumb = document.createElement("img");
        thumb.src = img;
        thumb.className = "slider-thumb";

        if(index === 0){
            thumb.classList.add("active");
        }

        thumb.onclick = ()=>{
            currentSlide = index;
            updateSlider();
            openGalleryModal(index);
        };

        track.appendChild(thumb);
    });

    updateSlider();
}

function changeSlide(step){
    currentSlide += step;

    if(currentSlide < 0) currentSlide = 0;
    if(currentSlide > moments.length - 1){
        currentSlide = moments.length - 1;
    }

    updateSlider();
}

function updateSlider(){
    const track = document.getElementById("momenSlider");
    if(!track) return;

    const width =
        window.innerWidth <= 480 ? 126 :
        window.innerWidth <= 768 ? 146 : 186;

    track.style.transform =
        `translateX(-${currentSlide * width}px)`;

    document.querySelectorAll(".slider-thumb").forEach((thumb,i)=>{
        thumb.classList.toggle("active", i === currentSlide);
    });
}

// ============================================
// MODAL GALERI PREMIUM
// ============================================
unction openGalleryModal(index){
    currentGalleryIndex = index;

    const modal = document.createElement("div");
    modal.className = "gallery-modal";

    modal.innerHTML = `
        <div class="gallery-modal-content">

            <button class="gallery-modal-close"
            onclick="closeGalleryModal()">&times;</button>

            <button class="gallery-modal-nav gallery-modal-prev"
            onclick="prevGallery()">&#10094;</button>

            <button class="gallery-modal-nav gallery-modal-next"
            onclick="nextGallery()">&#10095;</button>

            <img id="galleryMainImage"
            src="${moments[index]}">

        </div>
    `;

    document.body.appendChild(modal);

    document.addEventListener("keydown",galleryKeyNav);
}

function closeGalleryModal(){
    document.querySelector(".gallery-modal")?.remove();
    document.removeEventListener("keydown",galleryKeyNav);
}

function prevGallery(){
    currentGalleryIndex--;
    if(currentGalleryIndex < 0){
        currentGalleryIndex = moments.length - 1;
    }
    updateGallery();
}

function nextGallery(){
    currentGalleryIndex++;
    if(currentGalleryIndex >= moments.length){
        currentGalleryIndex = 0;
    }
    updateGallery();
}

function updateGallery(){
    const img = document.getElementById("galleryMainImage");
    if(img){
        img.src = moments[currentGalleryIndex];
    }
}

function galleryKeyNav(e){
    if(e.key === "Escape") closeGalleryModal();
    if(e.key === "ArrowLeft") prevGallery();
    if(e.key === "ArrowRight") nextGallery();
}

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded",()=>{
    loadStudents();
    loadMomenGrid();
    loadSlider();
});
