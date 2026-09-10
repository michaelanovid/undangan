// ========================================
// PISOMBO DIGITAL INVITATION
// FIX REALME C2 / ANDROID
// LOADER + COVER + SCROLL LOCK
// ========================================


// ========================================
// AMBIL ELEMENT
// ========================================

const loader = document.getElementById("loader");
const btnOpen = document.getElementById("openInvitation");
const cover = document.querySelector(".cover");
const music = document.getElementById("music");


// ========================================
// LOCK SCROLL
// ========================================

function lockInvitation() {

    // Tambahkan class lock
    document.documentElement.classList.add("invitation-locked");
    document.body.classList.add("invitation-locked");

    // Kunci scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Kunci tinggi
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";

    // Paksa halaman ke paling atas
    window.scrollTo(0, 0);
}


// ========================================
// UNLOCK SCROLL
// ========================================

function unlockInvitation() {

    document.documentElement.classList.remove("invitation-locked");
    document.body.classList.remove("invitation-locked");

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    document.documentElement.style.height = "";
    document.body.style.height = "";

    // Tandai undangan sudah dibuka
    document.body.classList.add("invitation-open");

    // Tetap mulai dari paling atas
    window.scrollTo(0, 0);
}


// ========================================
// LOCK SEJAK AWAL
// ========================================

lockInvitation();


// ========================================
// LOADER
// ========================================

window.addEventListener("load", function () {

    // Pastikan cover TETAP terlihat
    if (cover) {

        cover.style.display = "flex";
        cover.style.opacity = "1";

    }

    // Loader tampil 1,2 detik
    setTimeout(function () {

        if (loader) {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            loader.style.pointerEvents = "none";

        }

        // Scroll tetap dikunci
        lockInvitation();

    }, 1200);

});


// ========================================
// BUKA UNDANGAN
// ========================================

if (btnOpen) {

    btnOpen.addEventListener("click", function () {

        // =================================
        // PUTAR MUSIK
        // =================================

        if (music) {

            music.play().catch(function () {

                console.log(
                    "Musik tidak dapat diputar otomatis oleh browser."
                );

            });

        }


        // =================================
        // ANIMASI COVER
        // =================================

        if (cover) {

            cover.style.opacity = "0";

        }


        // =================================
        // SETELAH ANIMASI SELESAI
        // =================================

        setTimeout(function () {

            // Hilangkan cover
            if (cover) {

                cover.style.display = "none";

            }

            // Buka scroll
            unlockInvitation();

        }, 900);

    });

}


// ========================================
// AOS ANIMATION
// ========================================

// ========================================
// AOS - FADE UP SEMUA SECTION
// ========================================

if (typeof AOS !== "undefined") {

    AOS.init({

        duration: 2000,

        delay: 0,

        offset: 290,

        easing: "ease-out-cubic",

        once: true,

        mirror: false,

        anchorPlacement: "top-bottom"

    });

}


// ========================================
// NAMA TAMU DARI URL
// ========================================
//
// Contoh:
// index.html?to=Michaela%20Novid
//
// ========================================

const params = new URLSearchParams(
    window.location.search
);

const guest = params.get("to");

if (guest) {

    const guestElement =
        document.getElementById("guestName");

    if (guestElement) {

        guestElement.textContent =
            decodeURIComponent(guest);

    }

}


// ========================================
// EFEK GERAK COVER
// HANYA UNTUK DESKTOP
// ========================================

if (
    window.matchMedia("(hover: hover)").matches
) {

    window.addEventListener("mousemove", function (e) {

        if (!cover) return;

        const x =
            (window.innerWidth / 2 - e.pageX) / 40;

        const y =
            (window.innerHeight / 2 - e.pageY) / 40;

        cover.style.backgroundPosition =
            `${50 + x}% ${50 + y}%`;

    });

}


// ========================================
// SCROLL PROGRESS BAR
// ========================================

const progressBar =
    document.getElementById("scrollProgress");

window.addEventListener("scroll", function () {

    // Kalau masih terkunci
    if (
        document.body.classList.contains(
            "invitation-locked"
        )
    ) {

        if (progressBar) {

            progressBar.style.width = "0%";

        }

        return;

    }


    const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;


    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;


    // Hindari pembagian dengan 0
    if (scrollHeight <= 0) {

        if (progressBar) {

            progressBar.style.width = "0%";

        }

        return;

    }


    const progress =
        (scrollTop / scrollHeight) * 100;


    if (progressBar) {

        progressBar.style.width =
            Math.min(progress, 100) + "%";

    }

});


// ========================================
// CEGAH TOUCH SCROLL
// SEBELUM UNDANGAN DIBUKA
// ========================================

document.addEventListener(
    "touchmove",
    function (e) {

        if (
            document.body.classList.contains(
                "invitation-locked"
            )
        ) {

            e.preventDefault();

        }

    },
    {
        passive: false
    }
);


// ========================================
// CEGAH WHEEL SCROLL
// SEBELUM UNDANGAN DIBUKA
// ========================================

document.addEventListener(
    "wheel",
    function (e) {

        if (
            document.body.classList.contains(
                "invitation-locked"
            )
        ) {

            e.preventDefault();

        }

    },
    {
        passive: false
    }
);


// ========================================
// JAGA AGAR TETAP DI POSISI ATAS
// SEBELUM DIBUKA
// ========================================

window.addEventListener("scroll", function () {

    if (
        document.body.classList.contains(
            "invitation-locked"
        )
    ) {

        window.scrollTo(0, 0);

    }

});


// ========================================
// CEGAH PERUBAHAN VIEWPORT ANDROID
// ========================================

window.addEventListener(
    "resize",
    function () {

        if (
            document.body.classList.contains(
                "invitation-locked"
            )
        ) {

            window.scrollTo(0, 0);

        }

    }
);