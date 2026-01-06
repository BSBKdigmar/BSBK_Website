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
      <h1>${blog.title}</h1>
      <p><strong>${blog.date}</strong> | ${blog.category}</p>
      <img src="../../${blog.image}" style="max-width:100%; margin:20px 0;">
      ${blog.content}
    `;
  })
  .catch(function (err) {
    console.error("Detail error:", err);
  });

  