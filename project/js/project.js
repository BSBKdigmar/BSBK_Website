const grid = document.getElementById("gallery-grid");

const PROJECTS_PER_PAGE = 12;

let allProjects = [];
let filteredProjects = [];
let currentFilter = "all";
let currentPage = 1;

/* =========================
   FETCH DATA
========================= */

fetch("project/data/project.json")
  .then(res => res.json())
  .then(data => {
    allProjects = data;
    filteredProjects = allProjects;
    renderProjects(getPaginatedProjects());
    renderPagination();
  });

/* =========================
   PAGINATION LOGIC
========================= */

function getPaginatedProjects() {
  const start = (currentPage - 1) * PROJECTS_PER_PAGE;
  const end = start + PROJECTS_PER_PAGE;
  return filteredProjects.slice(start, end);
}

function goToPage(page) {
  currentPage = page;
  renderProjects(getPaginatedProjects());
  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById("gallery-pagination");
  if (!pagination) return;

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  pagination.innerHTML = "";

  /* PREVIOUS */
  if (currentPage > 1) {
    pagination.innerHTML += `
      <a href="javascript:void(0)" class="arrow" onclick="goToPage(${currentPage - 1})">
        &lsaquo;
      </a>
`;

  }

  /* PAGE NUMBERS */
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      pagination.innerHTML += `<span class="active">${i}</span>`;
    } else {
      pagination.innerHTML += `
        <a href="javascript:void(0)" onclick="goToPage(${i})">${i}</a>
      `;
    }
  }

  /* NEXT */
  if (currentPage < totalPages) {
    pagination.innerHTML += `
      <a href="javascript:void(0)" onclick="goToPage(${currentPage + 1})">
        &rsaquo;
      </a>
    `;
  }
}


/* =========================
   FILTER BUTTONS
========================= */

document.querySelectorAll(".gallery-tabs button")
  .forEach(function (btn) {

    btn.addEventListener("click", function () {

      // active state
      document.querySelectorAll(".gallery-tabs button")
        .forEach(b => b.classList.remove("active"));

      this.classList.add("active");

      // reset page
      currentPage = 1;

      const filter = this.dataset.filter;
      currentFilter = filter;

      if (filter === "all") {
        filteredProjects = allProjects;
      } else {
        filteredProjects = allProjects.filter(function (project) {
          return project.category === filter;
        });
      }

      renderProjects(getPaginatedProjects());
      renderPagination();
    });

  });

/* =========================
   RENDER PROJECTS
========================= */

function renderProjects(projects) {
  grid.innerHTML = "";

  if (projects.length === 0) {
    grid.innerHTML = "<p>No projects found.</p>";
    return;
  }

  projects.forEach(function (project, index) {
    grid.innerHTML += `
      <div class="gallery-card ${project.category}">
        <div class="gallery-slider">
          ${renderImages(project.images, index)}
        </div>

        <a href="${project.link || '#'}" class="gallery-text">
          <div class="gallery-title">${project.title}</div>
          <div class="gallery-desc">
            ${renderDetails(project.details)}
          </div>
        </a>
      </div>
    `;
  });
}

/* =========================
   IMAGE SLIDER
========================= */

function renderImages(images, index) {
  if (!images || images.length === 0) {
    return `
      <div class="gallery-image coming-soon">
        <span>Project Image<br>Coming Soon</span>
      </div>
    `;
  }

  var radios = "";
  var dots = "";

  for (var i = 0; i < images.length; i++) {
    radios += `
      <input type="radio"
             name="slide${index}"
             id="s${index}-${i + 1}"
             ${i === 0 ? "checked" : ""}>
    `;

    dots += `<label for="s${index}-${i + 1}"></label>`;
  }

  return `
    ${radios}
    <div class="slides${images.length}">
      ${images.map(img => `<img src="${img}">`).join("")}
    </div>
    <div class="slider-dots">
      ${dots}
    </div>
  `;
}

/* =========================
   DETAILS
========================= */

function renderDetails(details) {
  if (!details) return "";

  return Object.entries(details)
    .map(function (item) {
      return "<div><strong>" + item[0] + ":</strong> " + item[1] + "</div>";
    })
    .join("");
}

