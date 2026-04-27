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

// Data Momen
const moments = [];
for(let i=1;i<=49;i++){
    moments.push(`./images/Momen${i}.jpeg`);
}

let currentGalleryIndex = 0;

// ============================================
// SISWA
// ============================================
function loadStudents(){
    const grid = document.getElementById("siswaGrid");
    if(!grid) return;

    grid.innerHTML = "";

    students.forEach((student,index)=>{

        const card = document.createElement("div");
        card.className = "siswa-card";
        card.setAttribute("data-no", index+1);

        card.innerHTML = `
            <img src="${student.photo}" class="siswa-photo">
            <h3 class="siswa-name">${student.name}</h3>
        `;

        card.onclick = ()=> openSiswaModal(student);

        grid.appendChild(card);
    });
}

function openSiswaModal(student){
    const modal = document.createElement("div");
    modal.className = "gallery-modal";

    modal.innerHTML = `
        <div class="gallery-modal-content">
            <button class="gallery-modal-close"
            onclick="this.closest('.gallery-modal').remove()">&times;</button>

            <img src="${student.photo}">
        </div>
    `;

    document.body.appendChild(modal);
}

// ============================================
// GALERI FOTO 2x5
// ============================================
function loadMomenGrid(){
    const grid = document.getElementById("momenGrid");
    if(!grid) return;

    grid.innerHTML = "";

    moments.slice(0,10).forEach((img,index)=>{

        const item = document.createElement("div");
        item.className = "momen-photo";

        item.innerHTML = `
            <img src="${img}" onclick="openGalleryModal(${index})">
        `;

        grid.appendChild(item);
    });
}

// ============================================
// SLIDER BAWAH (GESER JARI / CURSOR)
// ============================================
function loadSlider(){
    const track = document.getElementById("momenSlider");
    if(!track) return;

    track.innerHTML = "";

    moments.forEach((img,index)=>{

        const thumb = document.createElement("img");
        thumb.src = img;
        thumb.className = "slider-thumb";

        thumb.onclick = ()=> openGalleryModal(index);

        track.appendChild(thumb);
    });

    enableDragSlider(track);
}

// ============================================
// DRAG SLIDER
// ============================================
function enableDragSlider(track){

    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener("mousedown",(e)=>{
        isDown = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        track.style.cursor = "grabbing";
    });

    track.addEventListener("mouseleave",()=>{
        isDown = false;
        track.style.cursor = "grab";
    });

    track.addEventListener("mouseup",()=>{
        isDown = false;
        track.style.cursor = "grab";
    });

    track.addEventListener("mousemove",(e)=>{
        if(!isDown) return;

        e.preventDefault();

        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;

        track.scrollLeft = scrollLeft - walk;
    });

    // HP TOUCH
    let touchStart = 0;
    let touchScroll = 0;

    track.addEventListener("touchstart",(e)=>{
        touchStart = e.touches[0].pageX;
        touchScroll = track.scrollLeft;
    });

    track.addEventListener("touchmove",(e)=>{
        const move = e.touches[0].pageX;
        const walk = (move - touchStart) * 1.5;

        track.scrollLeft = touchScroll - walk;
    });
}

// ============================================
// MODAL GALERI
// ============================================
function openGalleryModal(index){

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

    document.addEventListener("keydown", galleryKeyNav);
}

function closeGalleryModal(){
    document.querySelector(".gallery-modal")?.remove();
    document.removeEventListener("keydown", galleryKeyNav);
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
