console.log("recipes");
const searchBtn = document.querySelector(".search-button");
const searchInput = document.getElementById("search-text");
const defaultSearchTerm = "ice-cream";
const recipesContainer = document.getElementById("recipes-container");

const handleSearch = (event) => {
  const isPageLoad = !event || event.type === "load";
  const text = isPageLoad
    ? defaultSearchTerm
    : searchInput.value || defaultSearchTerm;
  recipesContainer.innerHTML = `<p>Loading recipes, please wait...</p>`;
  console.log(text);
  const xhr = new XMLHttpRequest();
  console.log(xhr);
  xhr.open(
    "GET",
    `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${text}`
  );
  xhr.setRequestHeader(
    "X-RapidAPI-Key",
    "b4066d0cd4msh18832150e056665p16383ejsn170860891360"
  );
  xhr.setRequestHeader("X-RapidAPI-Host", "tasty.p.rapidapi.com");

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      console.log(response.results);

      let output = "";
      if (response.results.length > 0) {
        for (let i = 0; i < response.results.length; i++) {
          const recipe = response.results[i];
          const recipeData = JSON.stringify(recipe).replace(/'/g, "&apos;");
          output += `
            <div class="box">
            <div class="recipe-image" data-recipe='${recipeData}'>
              <img src="${recipe.thumbnail_url}" alt="${recipe.name}" />
              </div>
              <p>${recipe.name}</p>
            </div>
          `;
        }
      } else {
        output = `<p>No recipes found for "${text}".</p>`;
      }

      recipesContainer.innerHTML = output;

      const recipeImages = document.querySelectorAll(".recipe-image");
      recipeImages.forEach((imgContainer) => {
        imgContainer.addEventListener("click", () => {
          const recipeData = imgContainer
            .getAttribute("data-recipe")
            .replace(/&apos;/g, "'");
          localStorage.setItem("selectedRecipe", recipeData);
          window.location.href = "recipe-details.html";
        });
      });
    }
  });
  xhr.send();
};

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") handleSearch(event);
});

window.addEventListener("load", () => handleSearch({ type: "load" }));
