const projectId = "k39n2cfi";
const dataset = "production";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

function renderPortableText(blocks) {

  if (!blocks) return "";

  return blocks.map(block => {

    if (block._type === "block") {

      const text = block.children
        ?.map(child => child.text)
        .join("") || "";

      switch (block.style) {

        case "h1":
          return `<h1>${text}</h1>`;

        case "h2":
          return `<h2>${text}</h2>`;

        case "h3":
          return `<h3>${text}</h3>`;

        case "blockquote":
          return `<blockquote>${text}</blockquote>`;

        default:
          return `<p>${text}</p>`;
      }
    }

    if (block._type === "image" && block.asset?._ref) {

      const parts = block.asset._ref.split("-");

      const imageId = parts[1];
      const dimensions = parts[2];
      const format = parts[3];

      const imageUrl =
        `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}-${dimensions}.${format}`;

      return `
        <img
          src="${imageUrl}"
          alt=""
          class="content-image"
        >
      `;
    }

    return "";

  }).join("");
}

const query = encodeURIComponent(`
*[_type == "blog" && slug.current == "${slug}"][0]{
  title,
  excerpt,
  category,
  author,
  publishedDate,
  content,
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
  
  const blog = data.result;

  const container = document.getElementById("blog-detail");

  if (!blog) {
    container.innerHTML = "<p>Blog tidak ditemukan.</p>";
    return;
  }

  const imageUrl =
    blog.thumbnail?.asset?.url || "";

  const formattedDate =
    blog.publishedDate
      ? new Date(blog.publishedDate)
          .toLocaleDateString("id-ID")
      : "";

  container.innerHTML = `
    <h1 class="blog-title">
      ${blog.title}
    </h1>

    <p class="blog-meta">
      <strong>${formattedDate}</strong>
      | ${blog.category || ""}
      | ${blog.author || ""}
    </p>

    <div class="blog-hero">
      <img src="${imageUrl}" alt="${blog.title}">
    </div>

    <div class="blog-content">
      ${renderPortableText(blog.content)}
    </div>
  `;
})
.catch(err => {
  console.error("Detail error:", err);
});