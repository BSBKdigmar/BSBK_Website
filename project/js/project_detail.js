const container = document.getElementById("project-detail");

const params = new URLSearchParams(window.location.search);
const projectId = Number(params.get("id"));

fetch("/project/data/project.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (projects) {
    const project = projects.find(function (p) {
      return p.id === projectId; // now matches correctly
    });

    if (!project) {
      container.innerHTML = "<p>Project tidak ditemukan.</p>";
      return;
    }

    container.innerHTML = `
      <h1>${project.title}</h1>
      <p><strong>${project.date || ""}</strong> ${project.category ? "| " + project.category : ""}</p>

      <div class="detail-gallery">
        ${
          Array.isArray(project.images) && project.images.length > 0
            ? project.images
                .map(function (img) {
                  return `<img src="/${img}" alt="${project.title}" style="max-width:100%; margin:10px 0;">`;
                })
                .join("")
            : "<p>Project images coming soon.</p>"
        }
      </div>

      <div class="detail-info">
        ${
          project.details
            ? Object.entries(project.details)
                .map(function (item) {
                  return `<p><strong>${item[0]}:</strong> ${item[1]}</p>`;
                })
                .join("")
            : ""
        }
      </div>

      ${project.content || ""}
    `;
  })
  .catch(function (err) {
    console.error("Project detail error:", err);
    container.innerHTML = "<p>Gagal memuat detail project.</p>";
  });

