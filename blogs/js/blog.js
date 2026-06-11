const BLOGS_PER_PAGE = 12;

const params = new URLSearchParams(window.location.search);
const currentPage = parseInt(params.get("page")) || 1;

fetch("blogs/data/blog.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (blogs) {

    var grid = document.getElementById("blog-grid");
    var pagination = document.getElementById("pagination");

    grid.innerHTML = "";

    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    const end = start + BLOGS_PER_PAGE;

    const pageBlogs = blogs.slice(start, end);

    pageBlogs.forEach(function (blog) {

      var card = document.createElement("div");
      card.className = "blog-card";

      card.innerHTML = `
        <img src="${blog.image.replace('../../','')}">

        <div class="blog-content">

          <span class="blog-category">${blog.category}</span>

          <div class="blog-date">
            <i class="fa-regular fa-calendar"></i> ${blog.date}
          </div>

          <a href="blogs/blog_detail/blog_detail.html?id=${blog.id}">
            <h3>${blog.title}</h3>
          </a>

          <p>${blog.excerpt}</p>

          <br>

          <a href="blogs/blog_detail/blog_detail.html?id=${blog.id}" class="blog-btn">
            Baca Selengkapnya →
          </a>

          <br>

        </div>
      `;

      grid.appendChild(card);

    });

    // Create Pagination
    const totalPages = Math.ceil(
      blogs.length / BLOGS_PER_PAGE
    );

    pagination.innerHTML = "";

    if (totalPages > 1) {

      // Previous button
      if (currentPage > 1) {
        pagination.innerHTML += `
          <a href="?page=${currentPage - 1}" class="page-btn">
            ←
          </a>
        `;
      }

      // Page numbers
      for (let i = 1; i <= totalPages; i++) {

        pagination.innerHTML += `
          <a href="?page=${i}"
             class="page-btn ${i === currentPage ? 'active' : ''}">
             ${i}
          </a>
        `;
      }

      // Next button
      if (currentPage < totalPages) {
        pagination.innerHTML += `
          <a href="?page=${currentPage + 1}" class="page-btn">
            →
          </a>
        `;
      }
    }

  })
  .catch(function (err) {
    console.error("Blog error:", err);
  });