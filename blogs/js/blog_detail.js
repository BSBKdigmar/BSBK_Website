const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

fetch("../../blogs/data/blog.json")
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
        <img src="../../${blog.image}" alt="${blog.title}">
      </div>

      <div class="blog-content">
        ${blog.content}
      </div>
    `;
  })
  .catch(function (err) {
    console.error("Detail error:", err);
  });
