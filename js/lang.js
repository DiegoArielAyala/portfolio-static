let translations = {};
let currentLang = "es"; 

async function loadLanguage(lang) {
    try {
        const res = await fetch(`/static/lang/${lang}.json`);
        if (!res.ok) throw new Error("Could not load language file");
        translations = await res.json();

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });

        document.querySelectorAll("[data-i18n-html]").forEach(el => {
            const key = el.getAttribute("data-i18n-html");
            if (translations[key]) {
                el.innerHTML = translations[key];
            }
        });

        currentLang = lang;

        const btn = document.getElementById("lang-toggle");
        if (btn) btn.textContent = lang.toUpperCase();
    } catch (error) {
        console.error("Error loading language:", error);
    }
}

function toggleLanguage() {
    const nextLang = currentLang === "es" ? "en" : "es";
    loadLanguage(nextLang);
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("lang-toggle");
    if (btn) {
        btn.addEventListener("click", toggleLanguage);
    }
});

function t(key) {
    return translations[key] || key;
}

window.t = t;
