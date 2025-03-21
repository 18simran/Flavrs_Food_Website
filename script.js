console.log("Hello world!");
const myName = "simran kaur";
const go = "Give it a Try";
console.log(myName);
// // Fixing flexbox gap property missing in some Safari versions
const h1 = document.querySelector(".hero-heading");
console.log(h1);
h1.addEventListener("click", function () {
  h1.textContent = go;
  h1.style.textAlign = "center";
});
// ******************
// const ls_year = document.querySelector(".year");
// const current_Year = new Date().getFullYear();
// ls_year.textContent = current_Year;
// *****************
const ls_year = document.querySelector(".year");
const current_Year = new Date().getFullYear();
ls_year.textContent = current_Year;
/*make mobile navigation work*/
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".main-header");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});
//smooth scrolling animation
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});
// Sticky navigation

const sectionHeroEl = document.querySelector(".hero-section");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.querySelector(".main-header").classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.querySelector(".main-header").classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

//
const trybtn = document.querySelector(".navigation-link-active");
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".cta-form");
  const toast = document.getElementById("toast");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Log all form data to check what's being submitted
    console.log("Form data:", data);

    console.log("Name:", data.name);
    if (!data.name || !data.email || !data["hear-from"]) {
      showToast("Please fill in all fields.", "error");
      return;
    }

    try {
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = "Signing up...";

      await new Promise((resolve) => setTimeout(resolve, 1500));

      showToast(
        `Thank you for signing up ${data.name} . Your first meal is on us!`,
        "success"
      );

      trybtn.textContent = "Order Now";
      trybtn.style.backgroundColor = "#3b9c3b";
      form.reset();
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    } finally {
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = false;
      submitButton.textContent = "Sign up now";
    }
  });

  function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast show toast-${type}`;
    setTimeout(() => {
      toast.className = "toast";
    }, 8000);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const goToRecipesLink = document.getElementById("goToRecipes");

  if (goToRecipesLink) {
    goToRecipesLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "recipes.html";
    });
  }
});
const mealLink = document.querySelector(".meal-link");
mealLink.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "recipes.html";
});
