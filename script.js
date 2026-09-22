"use strict";

/*
  MIRAKI
  Static website JavaScript

  Salon service information is configured inside SERVICE_DATA below.
  Enquiries are prepared for WhatsApp using the salon contact number.
*/

const SERVICE_DATA = [
  {
    number: "01",
    name: "Hair",
    description: "To be added",
    startingPrice: "To be added",
    image: "https://i.ibb.co/HpHx5Yxc/a670e1e7149e2b29f7f882908790d205.jpg",
    subcategories: [
      { name: "To be added", price: "To be added" }
    ]
  },

  {
    number: "02",
    name: "Skin",
    description: "To be added",
    startingPrice: "To be added",
    image: "https://i.ibb.co/JSsRh0n/67d211731e1ea9d42db856cc60b079d1.jpg",
    subcategories: [
      { name: "To be added", price: "To be added" }
    ]
  },

  {
    number: "03",
    name: "Bridal",
    description: "To be added",
    startingPrice: "To be added",
    image: "https://i.ibb.co/39tPYvkQ/file-0000000074fc81faab9ccd41e2900710.png",
    subcategories: [
      { name: "To be added", price: "To be added" }
    ]
  },

  {
    number: "04",
    name: "Nails",
    description: "To be added",
    startingPrice: "To be added",
    image: "https://i.ibb.co/Ps3NrcGS/afd9f91ae6d6bde5258142c87e1ec2df.jpg",
    subcategories: [
      { name: "To be added", price: "To be added" }
    ]
  },

  {
    number: "05",
    name: "Makeup",
    description: "To be added",
    startingPrice: "To be added",
    image: "https://i.ibb.co/RTt8gQY5/43ba94fbb68d7f328d9d5f90efcc1309.jpg",
    subcategories: [
      { name: "To be added", price: "To be added" }
    ]
  }
];


/* -------------------------------
   HOME SERVICE CARDS
-------------------------------- */

function renderHomeCards() {
  const container = document.getElementById("home-service-cards");

  if (!container) return;

  container.innerHTML = SERVICE_DATA.map(item => `
    <a class="service-card"
       href="#services"
       aria-label="Explore ${item.name} services">

      <img src="${item.image}"
           alt="${item.name} beauty service"
           loading="lazy">

      <div class="service-card-content">
        <small>${item.number} / SIGNATURE</small>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>

      <span class="card-arrow" aria-hidden="true">↗</span>
    </a>
  `).join("");
}


/* -------------------------------
   SERVICES MENU
-------------------------------- */

function renderServiceMenu() {
  const container = document.getElementById("service-menu");

  if (!container) return;

  container.innerHTML = SERVICE_DATA.map(item => `
    <article class="service-entry">

      <div class="service-entry-head">

        <span class="service-number">
          ${item.number}
        </span>

        <div>
          <h3>${item.name}</h3>

          <p>${item.description}</p>

          <span class="starting-price">
            STARTING AT · ${item.startingPrice}
          </span>
        </div>

      </div>

      <details class="service-accordion">

        <summary>
          Explore ${item.name.toLowerCase()} services
        </summary>

        <ul class="service-list">

          ${item.subcategories.map(service => `
            <li>
              <span>${service.name}</span>
              <span>${service.price}</span>
            </li>
          `).join("")}

        </ul>

      </details>

    </article>
  `).join("");
}


/* -------------------------------
   ENQUIRY SERVICE DROPDOWN
-------------------------------- */

function populateServiceSelect() {
  const select = document.getElementById("service-select");

  if (!select) return;

  SERVICE_DATA.forEach(item => {

    const option = document.createElement("option");

    option.value = item.name;
    option.textContent = item.name;

    select.appendChild(option);
  });
}


/* -------------------------------
   MOBILE NAVIGATION
-------------------------------- */

function setupNavigation() {

  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".menu-toggle");
  const close = document.querySelector(".menu-close");
  const overlay = document.querySelector(".nav-overlay");
  const links = nav.querySelectorAll("a");


  function setOpen(open) {

    toggle.setAttribute(
      "aria-expanded",
      String(open)
    );

    toggle.setAttribute(
      "aria-label",
      open
        ? "Close navigation"
        : "Open navigation"
    );

    nav.classList.toggle(
      "open",
      open
    );

    nav.setAttribute(
      "aria-hidden",
      String(!open)
    );

    overlay.hidden = !open;

    document.body.classList.toggle(
      "menu-open",
      open
    );


    if (open) {
      close.focus();
    } else {
      toggle.focus();
    }
  }


  toggle.addEventListener("click", () => {

    const isOpen =
      toggle.getAttribute("aria-expanded") === "true";

    setOpen(!isOpen);
  });


  close.addEventListener(
    "click",
    () => setOpen(false)
  );


  overlay.addEventListener(
    "click",
    () => setOpen(false)
  );


  links.forEach(link => {

    link.addEventListener(
      "click",
      () => setOpen(false)
    );

  });


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        toggle.getAttribute("aria-expanded") === "true"
      ) {
        setOpen(false);
      }

    }
  );
}


/* -------------------------------
   HASH-BASED PAGE NAVIGATION
-------------------------------- */

function routeToHash() {

  const validPages = new Set([
    "home",
    "gallery",
    "services",
    "contact",
    "enquiry"
  ]);


  const requested =
    window.location.hash.replace(/^#/, "") ||
    "home";


  const page =
    validPages.has(requested)
      ? requested
      : "home";


  document.querySelectorAll(".page").forEach(section => {

    const active =
      section.dataset.page === page;

    section.hidden = !active;

    section.classList.toggle(
      "active",
      active
    );

  });


  document.querySelectorAll(
    ".site-nav a"
  ).forEach(link => {

    if (link.hash === `#${page}`) {

      link.setAttribute(
        "aria-current",
        "page"
      );

    } else {

      link.removeAttribute(
        "aria-current"
      );

    }

  });


  window.scrollTo({
    top: 0,

    behavior:
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth"
  });
}


/* -------------------------------
   PREVENT PAST APPOINTMENT DATES
-------------------------------- */

function setupDateMinimum() {

  const dateInput =
    document.getElementById(
      "preferred-date"
    );

  if (!dateInput) return;


  const now = new Date();


  const localToday =
    `${now.getFullYear()}-` +
    `${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-` +
    `${String(
      now.getDate()
    ).padStart(2, "0")}`;


  dateInput.min = localToday;
}


/* -------------------------------
   WHATSAPP ENQUIRY FORM
-------------------------------- */

function setupEnquiryForm() {

  const form =
    document.getElementById(
      "enquiry-form"
    );

  const status =
    document.getElementById(
      "form-status"
    );


  if (!form || !status) return;


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      status.hidden = true;


      if (!form.checkValidity()) {

        form.reportValidity();

        status.textContent =
          "Please complete the required fields with valid details.";

        status.hidden = false;

        return;
      }


      const dateInput =
        document.getElementById(
          "preferred-date"
        );

      const chosenDate =
        form.elements.date.value;


      if (
        chosenDate &&
        chosenDate < dateInput.min
      ) {

        status.textContent =
          "Please choose today or a future date.";

        status.hidden = false;

        return;
      }


      const name =
        form.elements.name.value.trim();


      const phone =
        form.elements.phone.value.trim();


      const email =
        form.elements.email.value.trim() ||
        "To be added";


      const service =
        form.elements.service.value ||
        "To be added";


      const date =
        form.elements.date.value ||
        "To be added";


      const message =
        form.elements.message.value.trim() ||
        "To be added";


      const whatsappMessage = [

        "Hello Miraki, I would like to make an enquiry.",

        "",

        `Name: ${name}`,

        `Phone: ${phone}`,

        `Email: ${email}`,

        `Service: ${service}`,

        `Preferred date: ${date}`,

        `Message: ${message}`

      ].join("\n");


      const whatsappUrl =
        `https://wa.me/918700173741?text=${encodeURIComponent(
          whatsappMessage
        )}`;


      window.open(
        whatsappUrl,
        "_blank",
        "noopener"
      );


      status.textContent =
        "Your enquiry is ready to send on WhatsApp.";

      status.hidden = false;

    }
  );
}


/* -------------------------------
   AUTOMATIC COPYRIGHT YEAR
-------------------------------- */

function setupFooterYear() {

  const year =
    document.getElementById(
      "copyright-year"
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }
}


/* -------------------------------
   INITIALIZE WEBSITE
-------------------------------- */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderHomeCards();

    renderServiceMenu();

    populateServiceSelect();

    setupNavigation();

    setupDateMinimum();

    setupEnquiryForm();

    setupFooterYear();

    routeToHash();

    window.addEventListener(
      "hashchange",
      routeToHash
    );

  }
);
