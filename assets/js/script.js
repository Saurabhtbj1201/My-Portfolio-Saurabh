$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

// Select the progress bar fill element
const progressBar = document.querySelector('.filled');

window.addEventListener('scroll', () => {
    // Calculate the scroll progress
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    // Update the width of the progress bar
    progressBar.style.width = scrollPercentage + '%';
});


    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });
    

// EmailJS to send contact form data
  // Initialize EmailJS with your public key
emailjs.init('DRXOHWryOTpy9TUps'); // Replace with your Public Key

  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const submitBtn = document.getElementById('submit-btn');
    const loader = document.getElementById('loader');

    submitBtn.disabled = true;
    loader.style.display = 'inline-block';

    emailjs.sendForm('service_kl8aq6v', 'template_75a60sl', form)
      .then(() => {
        form.reset();
        showModal();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('❌ Failed to send message. Please try again later.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        loader.style.display = 'none';
      });
  });

  // Show success modal and auto-close after 2 seconds
  function showModal() {
    document.getElementById('success-modal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    // Auto-close after 1.5 seconds
    setTimeout(closeModal, 1500);
  }

});
    // <!-- emailjs to mail contact form data -->


document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Saurabh Kumar";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "backend development", "web designing", "Data Analyst", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}
//<!--skills call-->
fetchData().then(data => {
    showSkills(data);
});

// <!--projects call-->
document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");
  let index = 0;
  let hoverCount = getHoverCount();

  function getHoverCount() {
      if (window.innerWidth <= 600) {
          return 1;
      } else if (window.innerWidth <= 900) {
          return 2;
      } else {
          return 3;
      }
  }

  function applyAutoHover() {
      projectCards.forEach((card) => card.classList.remove("hover")); // Remove hover effect from all

      for (let i = 0; i < hoverCount; i++) {
          let hoverIndex = (index + i) % projectCards.length;
          projectCards[hoverIndex].classList.add("hover"); // Apply hover effect to selected cards
      }

      index = (index + hoverCount) % projectCards.length; // Move index forward
  }

  setInterval(applyAutoHover, 2000); // Auto-hover effect every 2 seconds

  // Adjust hover count on window resize
  window.addEventListener("resize", function () {
      hoverCount = getHoverCount();
  });
});




// <!--Article section -->
const articleContainer = document.querySelector(".article-container");
const articleDots = document.querySelectorAll(".dot");
const articlePrevBtn = document.getElementById("prevBtn");
const articleNextBtn = document.getElementById("nextBtn");

let articleIsDragging = false;
let articleStartX, articleScrollLeft;
let articleWidth = articleContainer.children[0].offsetWidth + 20; // Article width + gap
let articleCurrentIndex = 0;

// Move to a specific slide
function moveArticleSlide(index) {
  articleCurrentIndex = index;
  articleContainer.scrollLeft = index * articleWidth;
  updateArticleDots();
}

// Update active dot
function updateArticleDots() {
  articleDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === articleCurrentIndex);
  });
}

// Arrow button navigation
articlePrevBtn.addEventListener("click", () => {
  if (articleCurrentIndex > 0) {
      moveArticleSlide(articleCurrentIndex - 1);
  }
});

articleNextBtn.addEventListener("click", () => {
  if (articleCurrentIndex < articleDots.length - 1) {
      moveArticleSlide(articleCurrentIndex + 1);
  }
});

// Mouse drag scrolling
articleContainer.addEventListener("mousedown", (e) => {
  articleIsDragging = true;
  articleStartX = e.pageX - articleContainer.offsetLeft;
  articleScrollLeft = articleContainer.scrollLeft;
});

articleContainer.addEventListener("mouseleave", () => articleIsDragging = false);
articleContainer.addEventListener("mouseup", () => articleIsDragging = false);
articleContainer.addEventListener("mousemove", (e) => {
  if (!articleIsDragging) return;
  e.preventDefault();
  const x = e.pageX - articleContainer.offsetLeft;
  const walk = (x - articleStartX) * 2; // Drag speed
  articleContainer.scrollLeft = articleScrollLeft - walk;
});

// Click event for dots
articleDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
      moveArticleSlide(index);
  });
});

// Sync dots with scroll event
articleContainer.addEventListener("scroll", () => {
  let newIndex = Math.round(articleContainer.scrollLeft / articleWidth);
  if (newIndex !== articleCurrentIndex) {
      articleCurrentIndex = newIndex;
      updateArticleDots();
  }
});

// Initialize the first dot as active
updateArticleDots();
// <!--Article section ends-->


// <!-- awards section starts -->
// Awards section 
const awardContainer = document.querySelector(".award-container");
const awardDots = document.querySelectorAll(".doti");
const awardPrevBtn = document.querySelector(".lt-arrow");
const awardNextBtn = document.querySelector(".rt-arrow");

let awardIsDragging = false;
let awardStartX, awardScrollLeft;
let awardWidth = awardContainer.children[0].offsetWidth + 20; // Award width + gap
let awardCurrentIndex = 0;

// Move to a specific slide
function moveAwardSlide(index) {
  awardCurrentIndex = index;
  awardContainer.scrollLeft = index * awardWidth;
  updateAwardDots();
}

// Update active dot
function updateAwardDots() {
  awardDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === awardCurrentIndex);
  });
}

// Arrow button navigation
awardPrevBtn.addEventListener("click", () => {
  if (awardCurrentIndex > 0) {
    moveAwardSlide(awardCurrentIndex - 1);
  }
});

awardNextBtn.addEventListener("click", () => {
  if (awardCurrentIndex < awardDots.length - 1) {
    moveAwardSlide(awardCurrentIndex + 1);
  }
});

// Mouse drag scrolling
awardContainer.addEventListener("mousedown", (e) => {
  awardIsDragging = true;
  awardStartX = e.pageX - awardContainer.offsetLeft;
  awardScrollLeft = awardContainer.scrollLeft;
});

awardContainer.addEventListener("mouseleave", () => (awardIsDragging = false));
awardContainer.addEventListener("mouseup", () => (awardIsDragging = false));
awardContainer.addEventListener("mousemove", (e) => {
  if (!awardIsDragging) return;
  e.preventDefault();
  const x = e.pageX - awardContainer.offsetLeft;
  const walk = (x - awardStartX) * 2; // Drag speed
  awardContainer.scrollLeft = awardScrollLeft - walk;
});

// Click event for dots
awardDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    moveAwardSlide(index);
  });
});

// Sync dots with scroll event
awardContainer.addEventListener("scroll", () => {
  let newIndex = Math.round(awardContainer.scrollLeft / awardWidth);
  if (newIndex !== awardCurrentIndex) {
    awardCurrentIndex = newIndex;
    updateAwardDots();
  }
});

// Initialize the first dot as active
updateAwardDots();

// <!-- Awards section ends -->

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
});
// <!-- tilt js effect ends -->
  
// <!-- particles.js starts -->
// Function to set Particle.js color based on theme
function setParticleColor() {
  const isDarkMode = document.body.classList.contains("dark-mode");
  const particleColor = isDarkMode ? "#FFD700" : "#000000"; // Gold for dark mode, black for light mode

  particlesJS("particles-js", {
      "particles": {
          "number": {
              "value": 80,
              "density": { "enable": true, "value_area": 800 }
          },
          "color": { "value": particleColor },
          "shape": {
              "type": "star",
              "stroke": { "width": 0, "color": particleColor }
          },
          "opacity": { "value": 0.75 },
          "size": { "value": 5, "random": true },
          "line_linked": {
              "enable": true,
              "distance": 150,
              "color": particleColor,
              "opacity": 0.4,
              "width": 1
          },
          "move": { "enable": true, "speed": 6 }
      },
      "interactivity": {
          "detect_on": "canvas",
          "events": {
              "onhover": { "enable": true, "mode": "repulse" },
              "onclick": { "enable": true, "mode": "push" }
          }
      },
      "retina_detect": true
  });
}

// Theme Toggle Logic
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check saved theme preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
} else {
  body.classList.remove("dark-mode");
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
}

// Theme Toggle Click Event
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Change icon and save preference
  if (body.classList.contains("dark-mode")) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "dark");
  } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "light");
  }

  // Delay to apply particle color change smoothly
  setTimeout(setParticleColor, 300);
});

// Detect System Dark Mode Change
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  if (event.matches) {
      body.classList.add("dark-mode");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "dark");
  } else {
      body.classList.remove("dark-mode");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "light");
  }
  setParticleColor();
});

// Initialize Particles.js on Load
document.addEventListener("DOMContentLoaded", setParticleColor);


// Run on load
setParticleColor();

// Detect theme change
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setParticleColor);

// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}



/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .facebook', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 100 });
srtop.reveal('.skills .container .bar', { delay: 100 });

/* SCROLL PROJECTS */
srtop.reveal('.projects .container', { delay: 100 });
srtop.reveal('.projects .container .box', { delay: 100 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 200 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL AWARDS *

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });


// Prevent copying without credit
/* document.addEventListener("copy", (event) => {
    const selectedData = window.getSelection().toString();
    const customMessage = `Sorry! 🫵You can't copy any content from my personal Portfolio 😎😀😎\n[CopyRight © Saurabh Kumar] Thank you!🤣\nFollow me on Linkedin👇 \nhttps://www.linkedin.com/in/saurabhtbj1201/`;
    event.clipboardData.setData("text/plain", customMessage);
    event.preventDefault();
}); */
