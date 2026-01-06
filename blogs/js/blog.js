fetch("blogs/data/blog.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (blogs) {
    var grid = document.getElementById("blog-grid");
    grid.innerHTML = "";

    blogs.forEach(function (blog) {
      var card = document.createElement("div");
      card.className = "blog-card";

      card.innerHTML = `
        <img src="${blog.image}">
        <div class="blog-content">
          <span class="blog-category">${blog.category}</span>
          <a href="blogs/blog_detail/blog_detail.html?id=${blog.id}"><h3>${blog.title}</h3></a>
          <p>${blog.excerpt}</p>
          <a href="blogs/blog_detail/blog_detail.html?id=${blog.id}" class="blog-btn">
            Baca Selengkapnya →
          </a>
        </div>
      `;

      grid.appendChild(card);
    });
  })
  .catch(function (err) {
    console.error("Blog error:", err);
  });
