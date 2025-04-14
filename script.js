const container = document.getElementById("extensionsContainer");

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
                <div class="icon" style="background:${ext.color};"></div>
                <h3>${ext.name}</h3>
              </div>
              <p>${ext.description}</p>
            </div>
            <div class="actions">
              <button class="remove-btn">Remove</button>
              <div class="toggle ${ext.active ? "active" : ""}" data-id="${
        ext.id
      }"></div>
            </div>
          `;
      container.appendChild(card);
    });

    // Tambahkan event listener toggle setelah render
    document.querySelectorAll(".toggle").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");

        // Update data array sesuai id
        const id = parseInt(toggle.getAttribute("data-id"));
        const ext = extensions.find((item) => item.id === id);
        if (ext) {
          ext.active = toggle.classList.contains("active");
          console.log(
            `"${ext.name}" is now ${ext.active ? "active" : "inactive"}`
          );
        }
      });
    });
  });
