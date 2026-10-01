// 1. Oprava názvu (zkontroluj, že v HTML máš id="hamburger")
const hamburgerBtn = document.getElementById("hamburger");
const mobileMenuContainer = document.querySelector(".mobilni-menu");
const navBars = document.querySelectorAll(".horni-lista");
const firstTitle = document.querySelector(".velky-nadpis");

function updateNavBlur() {
  if (!firstTitle || navBars.length === 0) return;

  const titleBottom = firstTitle.getBoundingClientRect().bottom;
  const shouldBlur = titleBottom <= 220;

  navBars.forEach((nav) => {
    nav.classList.toggle("nav-scrolled", shouldBlur);
  });
}

updateNavBlur();
window.addEventListener("scroll", updateNavBlur, { passive: true });

// 2. Jeden čistý event pro kliknutí na tlačítko
if (hamburgerBtn && mobileMenuContainer) {
  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Zabrání, aby klik "propadl" do dokumentu
    hamburgerBtn.classList.toggle("active");
    mobileMenuContainer.classList.toggle("open");
    console.log("Menu přepnuto"); // Pro kontrolu v konzoli (F12)
  });
}

// 3. Zavření menu, když klikneš kamkoliv jinam na stránku
document.addEventListener("click", (e) => {
  // Pokud menu je otevřené a klikneš mimo něj, zavři ho
  if (mobileMenuContainer.classList.contains("open")) {
    mobileMenuContainer.classList.remove("open");
    hamburgerBtn.classList.remove("active");
  }
});

// 4. Zamezení zavření, když klikneš přímo DOVNITŘ otevřeného menu
mobileMenuContainer.addEventListener("click", (e) => {
  e.stopPropagation();
});

// 5. Animace progress baru když je viditelný
const progressBars = document.querySelectorAll(
  ".progress, .progress2, .progress3, .progress4",
);

const observerOptions = {
  threshold: 0.5, // Spustí se, když je 50% prvku viditelné
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("progress")) {
        entry.target.classList.add("animate");
      } else if (entry.target.classList.contains("progress2")) {
        entry.target.classList.add("animate2");
      } else if (entry.target.classList.contains("progress3")) {
        entry.target.classList.add("animate3");
      } else if (entry.target.classList.contains("progress4")) {
        entry.target.classList.add("animate4");
      }

      observer.unobserve(entry.target); // Přestane observovat po prvním spuštění
    }
  });
}, observerOptions);

progressBars.forEach((bar) => {
  observer.observe(bar);
});

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function updateFavicon() {
  // Hledá konkrétně SVG ikonu, aby omylem neaktualizoval PNG zálohu
  const favicon = document.querySelector('link[type="image/svg+xml"]');
  
  if (!favicon) return; 
  
  const baseUrl = favicon.href.split('?')[0];
  favicon.href = `${baseUrl}?t=${Date.now()}`;
}

darkModeQuery.addEventListener('change', updateFavicon);