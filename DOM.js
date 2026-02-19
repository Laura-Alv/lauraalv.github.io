let isFilterVisible = false;
let isAddNewVisible = false;
let nextArticleId = 1;

const typeMap = {
  opinion: { className: "opinion", label: "Opinion" },
  recipe: { className: "recipe", label: "Recipe" },
  update: { className: "update", label: "Update" }
};

function showFilter() {
  const filterForm = document.getElementById("filterContent");
  if (!filterForm) {
    return;
  }

  isFilterVisible = !isFilterVisible;
  filterForm.style.display = isFilterVisible ? "block" : "none";
}

function showAddNew() {
  const addForm = document.getElementById("newContent");
  if (!addForm) {
    return;
  }

  isAddNewVisible = !isAddNewVisible;
  addForm.style.display = isAddNewVisible ? "flex" : "none";
}

function filterArticles() {
  const showOpinion = document.getElementById("opinionCheckbox")?.checked ?? true;
  const showRecipe = document.getElementById("recipeCheckbox")?.checked ?? true;
  const showUpdate = document.getElementById("updateCheckbox")?.checked ?? true;

  document.querySelectorAll("article.opinion").forEach((article) => {
    article.style.display = showOpinion ? "block" : "none";
  });

  document.querySelectorAll("article.recipe").forEach((article) => {
    article.style.display = showRecipe ? "block" : "none";
  });

  document.querySelectorAll("article.update").forEach((article) => {
    article.style.display = showUpdate ? "block" : "none";
  });
}

function addNewArticle() {
  const titleInput = document.getElementById("inputHeader");
  const textInput = document.getElementById("inputArticle");
  const opinionRadio = document.getElementById("opinionRadio");
  const recipeRadio = document.getElementById("recipeRadio");
  const updateRadio = document.getElementById("lifeRadio");
  const articleList = document.getElementById("articleList");

  if (!titleInput || !textInput || !opinionRadio || !recipeRadio || !updateRadio || !articleList) {
    return;
  }

  const title = titleInput.value.trim();
  const text = textInput.value.trim();

  if (!title || !text) {
    return;
  }

  let selectedType = "";
  if (opinionRadio.checked) {
    selectedType = "opinion";
  } else if (recipeRadio.checked) {
    selectedType = "recipe";
  } else if (updateRadio.checked) {
    selectedType = "update";
  }

  if (!selectedType) {
    return;
  }

  const article = document.createElement("article");
  article.className = typeMap[selectedType].className;
  article.id = `aNew${nextArticleId}`;
  nextArticleId += 1;

  const marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = typeMap[selectedType].label;

  const heading = document.createElement("h2");
  heading.textContent = title;

  const body = document.createElement("p");
  body.textContent = text;

  article.appendChild(marker);
  article.appendChild(heading);
  article.appendChild(body);
  articleList.appendChild(article);

  titleInput.value = "";
  textInput.value = "";
  opinionRadio.checked = false;
  recipeRadio.checked = false;
  updateRadio.checked = false;

  filterArticles();
}

window.addEventListener("DOMContentLoaded", () => {
  const filterForm = document.getElementById("filterContent");
  if (filterForm) {
    filterForm.style.display = "none";
  }
});
