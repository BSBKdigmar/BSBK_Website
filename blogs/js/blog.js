const BLOGS_PER_PAGE = 12;

const projectId = "k39n2cfi";
const dataset = "production";

const params = new URLSearchParams(window.location.search);
const currentPage = parseInt(params.get("page")) || 1;

const query = encodeURIComponent(`
*[_type == "blog"] | order(publishedDate desc) {
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedDate,
  author,
  thumbnail{
    asset->{
      url
    }
  }
}
`);

fetch(
  `https://${projectId}.api.sanity.io/v2021-06-07/data/query/${dataset}?query=${query}`
)
.then(res => {
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
})
.then(data => {
  if (data.error) {
    throw new Error(`Sanity error: ${data.error.description}`);
  }

  const blogs = data.result || [];

  var grid = document.getElementById("blog-grid");
  var pagination = document.getElementById("pagination");

  grid.innerHTML = "";

  const start = (currentPage - 1) * BLOGS_PER_PAGE;
  const end = start + BLOGS_PER_PAGE;

  const pageBlogs = blogs.slice(start, end);

  pageBlogs.forEach(function (blog) {

    const imageUrl =
      blog.thumbnail?.asset?.url ||
      "/images/default-blog.jpg";

    const formattedDate =
      blog.publishedDate
        ? new Date(blog.publishedDate).toLocaleDateString("id-ID")
        : "";

    var card = document.createElement("div");

    card.className = "blog-card";

    card.innerHTML = `
      <img src="${imageUrl}" alt="${blog.title}">

      <div class="blog-content">

        <span class="blog-category">
          ${blog.category || ""}
        </span>

        <div class="blog-date">
          <i class="fa-regular fa-calendar"></i>
          ${formattedDate}
        </div>

        <a href="blogs/blog_detail/blog_detail.html?slug=${blog.slug}">
          <h3>${blog.title}</h3>
        </a>

        <p>${blog.excerpt || ""}</p>

        <br>

        <a
          href="blogs/blog_detail/blog_detail.html?slug=${blog.slug}"
          class="blog-btn"
        >
          Baca Selengkapnya →
        </a>

        <br>

      </div>
    `;

    grid.appendChild(card);

  });

  const totalPages = Math.ceil(
    blogs.length / BLOGS_PER_PAGE
  );

  pagination.innerHTML = "";

  if (totalPages > 1) {

    if (currentPage > 1) {
      pagination.innerHTML += `
        <a href="?page=${currentPage - 1}" class="page-btn">
          ←
        </a>
      `;
    }

    for (let i = 1; i <= totalPages; i++) {
      pagination.innerHTML += `
        <a
          href="?page=${i}"
          class="page-btn ${i === currentPage ? 'active' : ''}"
        >
          ${i}
        </a>
      `;
    }

    if (currentPage < totalPages) {
      pagination.innerHTML += `
        <a href="?page=${currentPage + 1}" class="page-btn">
          →
        </a>
      `;
    }

  }

})
.catch(err => {
  console.error("Blog error:", err);
});