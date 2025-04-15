const container = document.getElementById("extensionsContainer");
const navLinks = document.querySelectorAll(".nav-list ul li a");
console.log(navLinks)

fetch("data.json")
  .then((response) => response.json())
  .then((extensions) => {
    // mapping data di sini, seperti extensions.forEach()
    extensions.forEach((ext) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
            <div>
              <div class="title">
                <img src="${ext.logo}" />
                <div class="title-text">
                    <h3>${ext.name}</h3>
                    <p>${ext.description}</p>
                </div>
              </div>
            </div>
            <div class="actions">
              <button class="remove-btn">Remove</button>
              <div class="toggle ${ext.isActive ? "active" : ""}" data-id="${
        ext.id
      }"></div>
            </div>
          `;
      container.appendChild(card);
    });

    // Event listener toggle
    document.querySelectorAll(".toggle").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");

        const id = parseInt(toggle.getAttribute("data-id"));
        const ext = extensions.find((item) => item.id === id);
        if (ext) {
          ext.isActive = toggle.classList.contains("active"); // ✅ ini diperbaiki
          console.log(
            `"${ext.name}" is now ${ext.isActive ? "active" : "inactive"}`
          );
        }
      });
    });
  });

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // hapus .active dari semua link
    navLinks.forEach((l) => l.classList.remove("active"));

    // tambahkan .active ke link yang diklik
    link.classList.add("active");
  });
});
