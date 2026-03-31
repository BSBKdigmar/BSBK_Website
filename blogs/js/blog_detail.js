const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

fetch("../data/blog.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (blogs) {

    const blog = blogs.find(function (b) {
      return b.id === blogId;
    });

    const container = document.getElementById("blog-detail");

    if (!blog) {
      container.innerHTML = "<p>Blog tidak ditemukan.</p>";
      return;
    }

    container.innerHTML = `
      <h1 class="blog-title">${blog.title}</h1>
      <p class="blog-meta"><strong>${blog.date}</strong> | ${blog.category}</p>

      <div class="blog-hero">
        <img src="${blog.image}" alt="${blog.title}">
      </div>

      <div class="blog-content">
        ${blog.content}
      </div>

      <div class="detail-gallery">
        ${
          Array.isArray(blog.inline_image) && blog.inline_image.length > 0
            ? `
              <h2 class="gallery-title">Dokumentasi Proyek</h2>
              <div class="gallery-row">
                ${blog.inline_image
                  .map(function (item) {
                    return `
                      <div class="gallery-card">
                        <img src="../../${item.src}" alt="${item.title}">
                        <div class="gallery-overlay">
                          <span>${item.title}</span>
                        </div>
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            `
            : "<p>blog images coming soon.</p>"
        }
      </div>
    `;
  })
  .catch(function (err) {
    console.error("Detail error:", err);
  });