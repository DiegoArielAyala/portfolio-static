// Cierra el menú de navegación al hacer clic en un enlace
document.querySelectorAll(".navbar-nav .nav-item .menu-link").forEach(link => {
    link.addEventListener("click", () => {
        const navbarCollapse = document.querySelector(".navbar-collapse");
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
            bsCollapse.hide();
        }
    });
});

document.querySelector("html").addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) {
        bsCollapse.hide();
    }
});

// Toast con bootstrap
function createBootstrapToast(message, type = "success") {
    const icons = {
        success: `<i class="bi bi-check-circle-fill text-success fs-5 me-2"></i>`,
        danger: `<i class="bi bi-x-circle-fill text-danger fs-5 me-2"></i>`,
        info: `<div class="spinner-border text-warning me-2" style="width: 1.25rem; height: 1.25rem;" role="status"><span class="visually-hidden">Loading...</span></div>`
    };

    const borderClasses = {
        success: "border-start border-4 border-success",
        danger: "border-start border-4 border-danger",
        info: "border-start border-4 border-warning"
    };

    const toastContainer = document.getElementById("toast-container");

    const toastEl = document.createElement("div");
    toastEl.className = `toast align-items-center shadow-sm bg-white ${borderClasses[type]} border-0 mb-2`;
    toastEl.setAttribute("role", "alert");
    toastEl.setAttribute("aria-live", "assertive");
    toastEl.setAttribute("aria-atomic", "true");

    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body d-flex align-items-center">
                ${icons[type]}<span class="fw-semibold">${message}</span>
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toastEl);

    const toast = new bootstrap.Toast(toastEl);
    toast.show();

    toastEl.addEventListener("hidden.bs.toast", () => {
        toastEl.remove();
    });
}

// Formulario de contacto
const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    createBootstrapToast(t("Enviando mensaje..."), "info");

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action || window.location.href, {
            method: "POST",
            body: formData,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        if (response.ok) {
            form.reset();
            createBootstrapToast(t("Mensaje enviado."), "success");
        } else {
            createBootstrapToast(t("Error al enviar mensaje."), "danger");
        }
    } catch (error) {
        createBootstrapToast(t("Error en la red."), "danger");
    }
});

// Configuración de AOS
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 500,
        once: true,
        easing: "ease-in-out",
    });
});

// Resalta el enlace del menú según la sección visible
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".menu-link");

    function onScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 300;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active-link");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active-link");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", onScroll);
});


// Copiar email
function copyEmail() {
    navigator.clipboard.writeText("diegoa.ayala@gmail.com");
    alert(t("email_copied"));
}
