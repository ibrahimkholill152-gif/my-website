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
for(let i = 1; i <= 89; i++){
    moments.push(`./images/Momen${i}.jpeg`);
}

let currentGalleryIndex = 0;

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

            <div class="siswa-overlay">
                <h3 class="siswa-name">${student.name}</h3>
            </div>
        `;

        // Hover Effect Ringan
        card.addEventListener("mousemove",(e)=>{

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = (x - rect.width / 2) / 18;
            const rotateX = -(y - rect.height / 2) / 18;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
            `;

            card.style.setProperty("--x",`${x}px`);
            card.style.setProperty("--y",`${y}px`);
        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform = `
                perspective(1000px)
                rotateX(0)
                rotateY(0)
                translateY(0)
            `;
        });

        card.onclick = ()=> openStudentModal(student);

        grid.appendChild(card);
    });
}

// ============================================
// MODAL SISWA
// ============================================
function openStudentModal(student){

    const modal = document.createElement("div");
    modal.className = "gallery-modal";

    modal.innerHTML = `
        <div class="gallery-modal-content">

            <button class="gallery-modal-close"
            onclick="closeGalleryModal()">✕</button>

            <img src="${student.photo}">
        </div>
    `;

    document.body.appendChild(modal);
}

// ============================================
// LOAD GALERI 2x5
// ============================================
function loadMomenGrid(){

    const grid = document.getElementById("momenGrid");
    if(!grid) return;

    grid.innerHTML = "";

    moments.slice(0,10).forEach((img,index)=>{

        const item = document.createElement("div");
        item.className = "momen-photo";

        item.innerHTML = `
            <img src="${img}" 
            onclick="openGalleryModal(${index})">
        `;

        grid.appendChild(item);
    });
}

// ============================================
// LOAD SLIDER BAWAH
// ============================================
function loadSlider(){

    const slider = document.getElementById("momenSlider");
    if(!slider) return;

    slider.innerHTML = "";

    moments.forEach((img,index)=>{

        const thumb = document.createElement("img");

        thumb.src = img;
        thumb.className = "slider-thumb";

        thumb.onclick = ()=> openGalleryModal(index);

        slider.appendChild(thumb);
    });

    enableDragScroll(slider);
}

// ============================================
// DRAG SCROLL UNIVERSAL
// ============================================
function enableDragScroll(element){

    let isDown = false;
    let startX;
    let scrollLeft;

    element.addEventListener("mousedown",(e)=>{

        isDown = true;

        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;

        element.style.cursor = "grabbing";
    });

    element.addEventListener("mouseleave",()=>{

        isDown = false;
        element.style.cursor = "grab";
    });

    element.addEventListener("mouseup",()=>{

        isDown = false;
        element.style.cursor = "grab";
    });

    element.addEventListener("mousemove",(e)=>{

        if(!isDown) return;

        e.preventDefault();

        const x = e.pageX - element.offsetLeft;

        const walk = (x - startX) * 2;

        element.scrollLeft = scrollLeft - walk;
    });

    // TOUCH HP
    let touchStart = 0;
    let touchScroll = 0;

    element.addEventListener("touchstart",(e)=>{

        touchStart = e.touches[0].pageX;
        touchScroll = element.scrollLeft;
    });

    element.addEventListener("touchmove",(e)=>{

        const move = e.touches[0].pageX;

        const walk = (move - touchStart) * 2;

        element.scrollLeft = touchScroll - walk;
    });
}

// ============================================
// OPEN GALERI
// ============================================
function openGalleryModal(index){

    currentGalleryIndex = index;

    const thumbs = moments.map((img,i)=>`

        <img src="${img}"
        class="gallery-thumb ${i===index ? 'active' : ''}"
        onclick="jumpGallery(${i})">

    `).join('');

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

            <div class="gallery-thumbs"
            id="galleryThumbs">

                ${thumbs}

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    const thumbsContainer =
    document.getElementById("galleryThumbs");

    enableDragScroll(thumbsContainer);

    document.addEventListener("keydown", keyGallery);
}

// ============================================
// CLOSE
// ============================================
function closeGalleryModal(){

    document.querySelector(".gallery-modal")?.remove();

    document.removeEventListener("keydown", keyGallery);
}

// ============================================
// NAVIGATION
// ============================================
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

function jumpGallery(index){

    currentGalleryIndex = index;

    updateGallery();
}

// ============================================
// UPDATE GALERI
// ============================================
function updateGallery(){

    const img =
    document.getElementById("galleryMainImage");

    if(img){
        img.src = moments[currentGalleryIndex];
    }

    document.querySelectorAll(".gallery-thumb")
    .forEach((thumb,i)=>{

        thumb.classList.toggle(
            "active",
            i === currentGalleryIndex
        );
    });
}

// ============================================
// KEYBOARD
// ============================================
function keyGallery(e){

    if(e.key === "Escape"){
        closeGalleryModal();
    }

    if(e.key === "ArrowLeft"){
        prevGallery();
    }

    if(e.key === "ArrowRight"){
        nextGallery();
    }
}

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded",()=>{

    loadStudents();
    loadMomenGrid();
    loadSlider();

    enableMainSliderDrag();

    initStudentHoverEffect();
    initStrukturEffect();

});
/* =========================================
   STRUKTUR HOVER EFFECT
========================================= */

function initStrukturEffect(){

    const cards = document.querySelectorAll(".struktur-card");

    cards.forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / 18);
            const rotateY = ((centerX - x) / 18);

            card.style.transform = `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.04)
            `;

            card.style.boxShadow =
                "0 20px 40px rgba(0,0,0,.35)";

            card.style.setProperty("--x",`${x}px`);
            card.style.setProperty("--y",`${y}px`);
        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform = `
                rotateX(0deg)
                rotateY(0deg)
                scale(1)
            `;

            card.style.boxShadow =
                "0 10px 25px rgba(0,0,0,.18)";
        });

        /* buka foto */
        card.addEventListener("click",()=>{

            const img = card.querySelector("img").src;

            const modal = document.createElement("div");
            modal.className = "gallery-modal";

            modal.innerHTML = `
                <div class="gallery-modal-content">

                    <button class="gallery-modal-close"
                    onclick="this.closest('.gallery-modal').remove()">
                    ✕
                    </button>

                    <img src="${img}">
                </div>
            `;

            document.body.appendChild(modal);
        });

    });
}
