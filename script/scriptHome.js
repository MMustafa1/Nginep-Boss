const slider = document.querySelector(".Section3MainInnerDiv");
const nextBtn = document.getElementById("Section3Button2");
const prevBtn = document.getElementById("Section3Button1");

const cardWidth = 480 + 63; // card width + gap
let isAnimating = false;

function moveNext() {
    if (isAnimating) return;
    isAnimating = true;

    slider.style.transition = "none";
    slider.prepend(slider.lastElementChild);
    slider.style.transform = `translateX(-${cardWidth}px)`;

    // Slide right into place
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            slider.style.transition = "transform 0.5s ease";
            slider.style.transform = "translateX(0)";
        });
    });

    slider.addEventListener("transitionend", function handler() {
        slider.removeEventListener("transitionend", handler);
        isAnimating = false;
    });
}

function movePrev() {
    if (isAnimating) return;
    isAnimating = true;

    // Instantly move last card to front (off-screen)
    slider.style.transition = "none";
    slider.prepend(slider.lastElementChild);
    slider.style.transform = `translateX(${cardWidth}px)`;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            slider.style.transition = "transform 0.5s ease";
            slider.style.transform = "translateX(0)";
        });
    });

    slider.addEventListener("transitionend", function handler() {
        slider.style.transition = "none";
        slider.appendChild(slider.firstElementChild); // move first card to end
        slider.style.transform = "translateX(0)";
        slider.removeEventListener("transitionend", handler);
        isAnimating = false;
    });
}

nextBtn.addEventListener("click", moveNext);
prevBtn.addEventListener("click", movePrev);


const testimonialSlider = document.querySelector(".Section5Main3Divs");
const testimonialCards = testimonialSlider.children;

const nextTestimonialBtn = document.getElementById("Section5Button2");
const prevTestimonialBtn = document.getElementById("Section5Button1");

const testimonialWidth = 300 + 20; // card width + gap
let testimonialAnimating = false;

function updateCenterCard() {
    Array.from(testimonialCards).forEach(card => card.classList.remove("centered"));
    if (testimonialCards.length >= 3) {
        testimonialCards[1].classList.add("centered");
    }
}

function moveNextTestimonial() {
    if (testimonialAnimating) return;
    testimonialAnimating = true;

    testimonialSlider.style.transition = "none";
    testimonialSlider.prepend(testimonialSlider.lastElementChild);
    testimonialSlider.style.transform = `translateX(-${testimonialWidth}px)`;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            testimonialSlider.style.transition = "transform 0.5s ease";
            testimonialSlider.style.transform = "translateX(0)";
        });
    });

    testimonialSlider.addEventListener("transitionend", function handler() {
        testimonialSlider.removeEventListener("transitionend", handler);
        testimonialAnimating = false;
        updateCenterCard();
    });
}

function movePrevTestimonial() {
    if (testimonialAnimating) return;
    testimonialAnimating = true;

    testimonialSlider.style.transition = "none";
    testimonialSlider.prepend(testimonialSlider.lastElementChild);
    testimonialSlider.style.transform = `translateX(${testimonialWidth}px)`;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            testimonialSlider.style.transition = "transform 0.5s ease";
            testimonialSlider.style.transform = "translateX(0)";
        });
    });

    testimonialSlider.addEventListener("transitionend", function handler() {
        testimonialSlider.style.transition = "none";
        testimonialSlider.appendChild(testimonialSlider.firstElementChild);
        testimonialSlider.style.transform = "translateX(0)";
        testimonialSlider.removeEventListener("transitionend", handler);
        testimonialAnimating = false;
        updateCenterCard();
    });
}

nextTestimonialBtn.addEventListener("click", moveNextTestimonial);
prevTestimonialBtn.addEventListener("click", movePrevTestimonial);

// Initial center highlight
updateCenterCard();

let isLogin=false;

function PageChange() {
    if(isLogin)
    {
        window.location.href="./Pages/DashBoard.html";
    }
    else
    {
        window.location.href="./Pages/SignIn.html";
    }
}