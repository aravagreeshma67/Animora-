/* =====================================================
   ANIMORA
   Main JavaScript
===================================================== */


/* ---------- IMAGE SCANNER ---------- */

const imageInput = document.getElementById("imageInput");


function startScan() {

    if (!imageInput) return;

    imageInput.click();
}


imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;


    if (!file.type.startsWith("image/")) {

        alert("Please choose an image file.");

        return;
    }


    const fileName = file.name;


    alert(
        `Image selected: ${fileName}\n\n` +
        `Your image is ready for analysis.`
    );

});


/* ---------- MOBILE MENU ---------- */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("mobile-open");

});


/* ---------- NAVIGATION ---------- */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function () {

        navLinks.classList.remove("mobile-open");

    });

});


/* ---------- SIMPLE SCROLL REVEAL ---------- */

const revealElements =
    document.querySelectorAll(
        ".feature-card, .step, .stat, .pet-card"
    );


const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

                observer.unobserve(entry.target);
            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(20px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});