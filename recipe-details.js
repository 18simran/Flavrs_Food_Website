window.addEventListener("load", () => {
  const recipeDetailsContainer = document.querySelector(".recipe-details-info");
  const recipeImageContainer = document.querySelector(".recipe-details-img");

  const recipeData = JSON.parse(localStorage.getItem("selectedRecipe"));

  if (recipeData) {
    recipeDetailsContainer.innerHTML = `
      <h1>${recipeData.name}</h1>
      <p>${recipeData.description || "No description available."}</p>
        <a href="#instructions" class="go-to-recipe">JUMP TO RECIPE</a>
      
    `;

    recipeImageContainer.innerHTML = `
      <img class="recipe-img" src="${recipeData.thumbnail_url}" alt="${recipeData.name}" />
    `;
  } else {
    recipeDetailsContainer.innerHTML = `<p>No recipe details found.</p>`;
  }

  //instructions section
  const instructionsContainer = document.getElementById("instructions");

  let instructionsHTML = `
  <h1>Instructions <br> <span>You Will Need To Make ${recipeData.name}</span></h1>
  <ul type="square">
`;

  for (let i = 0; i < recipeData.instructions.length; i++) {
    instructionsHTML += `<li>${recipeData.instructions[i].display_text}</li>`;
  }

  instructionsHTML += `</ul>`;

  instructionsContainer.innerHTML = instructionsHTML;
  //Video Recipe
  const recipeVideo = document.querySelector(".recipe-video");
  recipeVideo.innerHTML = `
  <h1>Watch Video </h1>
  <video controls autoplay loop muted>
  <source src="${recipeData.original_video_url}" type="video/mp4">
   </video>`;

  const nutrientsContainer = document.querySelector(".nutrients");

  let nutrientsHTML = `

  <ul type="square">
`;
  Object.keys(recipeData.nutrition).forEach((key) => {
    if (key !== "updated_at") {
      nutrientsHTML += `<li>${key}: ${recipeData.nutrition[key]}</li>`;
    }
  });

  nutrientsHTML += `</ul>
  <div class="nutrition-images" >
  <img src="./images/nutrition1.jpg"/ alt="nutrition-image">
  <img src="./images/nutrition2.jpg"/ alt="nutrition-image">
    <img src="./images/nutrition3.jpg"/ alt="nutrition-image">
      <img src="./images/nutrition4.jpg"/ alt="nutrition-image">
      <div>
  `;

  nutrientsContainer.innerHTML = nutrientsHTML;
});
{
  /* <p class="recipe-time-taken" ><strong>Cooking Time:</strong> ${
        recipeData.cook_time_minutes || "N/A"
      } minutes</p>
      <p><strong>Servings:</strong> ${recipeData.num_servings || "N/A"}</p> */
}
document.addEventListener("DOMContentLoaded", () => {
  const goToRecipesLink = document.getElementById("goToRecipes");

  if (goToRecipesLink) {
    goToRecipesLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "recipes.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const btnNavEl = document.querySelector(".btn-mobile-nav");
  const headerEl = document.querySelector(".main-header");

  btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  });
});
