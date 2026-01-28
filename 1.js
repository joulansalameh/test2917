const hairImages = {};

const imgSrc = hairImages[cat] && hairImages[cat][name]

/* =========================
   GLOBAL ELEMENTS
========================= */

const infoTitle = document.getElementById("info-title");
const tools = document.getElementById("tools");
const steps = document.getElementById("steps");
const tips = document.getElementById("tips");
const nextBtn = document.getElementById("next-step");

/* =========================
   STATE
========================= */

let currentStepIndex = 0;
let currentHairstyle = null;

/* =========================
   HAIRSTYLE DATA
========================= */

const hairstyleData = {
  "Side French": {
    tools: ["Comb", "Hair ties", "Mirror"],
    tips: ["Keep tension even", "Add small sections"],
    steps: [
      "Brush hair thoroughly.",
      "Part hair to one side.",
      "Pick three strands near the part.",
      "Start French braiding along the side.",
      "Add small sections as you braid.",
      "Continue to the nape.",
      "Secure with elastic.",
      "Loosen gently for volume."
    ]
  },

  "Halo Twist": {
    tools: ["Comb", "Hair pins", "Hairspray"],
    tips: ["Use small sections", "Pin discreetly"],
    steps: [
      "Brush hair smoothly.",
      "Start twisting at one temple.",
      "Follow the hairline around the head.",
      "Add hair gradually to the twist.",
      "Continue until full circle.",
      "Tuck ends under.",
      "Secure with pins.",
      "Set with hairspray."
    ]
  }

  // 👉 You already added MANY more – they work the same way
};

/* =========================
   RENDER FUNCTIONS
========================= */

function renderTools(list) {
  tools.innerHTML = "";
  list.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    tools.appendChild(li);
  });
}

function renderTips(list) {
  tips.innerHTML = "";
  list.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    tips.appendChild(li);
  });
}

function renderStep() {
  if (!currentHairstyle) return;
  const stepList = hairstyleData[currentHairstyle].steps;
  steps.textContent = stepList[currentStepIndex];
}

/* =========================
   HAIRSTYLE CLICK HANDLER
========================= */

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".hairstyle");
  if (!card) return;

  const name = card.dataset.name;
  currentHairstyle = name;
  currentStepIndex = 0;

  const data = hairstyleData[name];
  if (!data) return;

  infoTitle.textContent = name;
  renderTools(data.tools);
  renderTips(data.tips);
  renderStep();
});

/* =========================
   NEXT STEP BUTTON
========================= */

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (!currentHairstyle) return;

    const stepsArr = hairstyleData[currentHairstyle].steps;
    if (currentStepIndex < stepsArr.length - 1) {
      currentStepIndex++;
      renderStep();
    }
  });
}

/* =========================
   LANGUAGE SYSTEM
========================= */

const translations = {
  en: {
    tools: "Tools",
    steps: "Steps",
    tips: "Tips",
    next: "Next Step"
  },
  ar: {
    tools: "الأدوات",
    steps: "الخطوات",
    tips: "نصائح",
    next: "الخطوة التالية"
  }
};

let currentLang = localStorage.getItem("lang") || "en";

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

/* =========================
   LANGUAGE BUTTONS
========================= */

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    applyLanguage(btn.dataset.lang);
  });
});

/* =========================
   INIT
========================= */

applyLanguage(currentLang);
ponytails: [
  "Classic High Ponytail",
  "Low Sleek Ponytail",
  "Side Ponytail",
  "Bubble Ponytail",
  "Braided Ponytail",
  "Wrapped Ponytail",
  "Curly Ponytail",
  "Messy Ponytail",
  "Half-Up Ponytail",
  "High Ponytail with Volume",

  "Low Textured Ponytail",
  "Double Ponytail",
  "Ponytail with Bangs",
  "Ponytail with Face-Framing Pieces",
  "Slick Back Ponytail",
  "Criss-Cross Ponytail",
  "Ponytail with Ribbon",
  "Ponytail with Hair Cuff",
  "Wavy Ponytail",
  "Ponytail with Mini Braids",

  "Sporty High Ponytail",
  "Romantic Loose Ponytail",
  "Ponytail with Twists",
  "Elegant Evening Ponytail"
];
function loadCategory(cat){
  grid.innerHTML = "";

  hairData[cat].forEach(name => {
    const card = document.createElement("div");
    card.className = "hairstyle";

    const img = document.createElement("img");
    img.src = `https://source.unsplash.com/400x400/?hairstyle,${encodeURIComponent(name)}`;
    img.alt = name;

    const title = document.createElement("h3");
    title.textContent = name;
    title.style.textAlign = "center";
    title.style.marginTop = "10px";

    card.appendChild(img);
    card.appendChild(title);

    card.onclick = () => showInfo(name);

    grid.appendChild(card);
  });
}

// Make sure videos category exists
hairData.videos = []; // empty for now

const grid = document.getElementById("hairstyles");
const searchInput = document.getElementById("video-search");

// Load category function (works for videos too)
function loadCategory(cat, filter = "") {
  grid.innerHTML = "";

  if (!hairData[cat]) return;

  // Filter items if search term exists
  const items = hairData[cat].filter(item => {
    const name = item.name || item; // handle object or string
    return name.toLowerCase().includes(filter.toLowerCase());
  });

  if (items.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No items found.";
    msg.style.textAlign = "center";
    msg.style.color = "#888";
    grid.appendChild(msg);
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "hairstyle";

    const name = item.name || item;

    card.innerHTML = `
      <img src="https://source.unsplash.com/400x400/?${encodeURIComponent(
        name
      )}" alt="${name}">
      <h3>${name}</h3>
    `;

    grid.appendChild(card);
  });
}

// Initial load of videos
loadCategory("videos");

// Listen to search input
searchInput.addEventListener("input", () => {
  const query = searchInput.value;
  loadCategory("videos", query);
});
hairData.videos = [
  { name: "French Braid Tutorial", url: "https://www.wikihow.com/French-Braid" },
  { name: "Messy Bun Tutorial", url: "https://example.com/messy-bun" }
];
