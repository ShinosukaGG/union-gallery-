document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("artworks-container");

  // --- Legacy artworks ---
  const legacyCount = 55;            // union1.png → union55.png (bottom)

  // --- Previous "new" artworks (art56.png → art123.png) ---
  const prevNewStart = 56;
  const prevNewEnd = 123;

  // --- Brand new additions (no 'art' prefix) ---
  const newestPngStart = 124;        // 124.png → 163.png (40 PNG)
  const newestPngEnd = 163;
  const newestJpgStart = 164;        // 164.jpg → 167.jpg (4 JPG)
  const newestJpgEnd = 167;

  // === Render newest JPG first (top) ===
  for (let i = newestJpgEnd; i >= newestJpgStart; i--) {
    container.prepend(createArtworkCard(i, `${i}.jpg`, true));
  }

  // === Then newest PNG (just below JPG set) ===
  for (let i = newestPngEnd; i >= newestPngStart; i--) {
    container.prepend(createArtworkCard(i, `${i}.png`, true));
  }

  // === Then the older "new" set (no NEW tag) ===
  for (let i = prevNewEnd; i >= prevNewStart; i--) {
    container.prepend(createArtworkCard(i, `art${i}.png`, false));
  }

  // === Finally, the legacy artworks ===
  for (let i = 1; i <= legacyCount; i++) {
    container.appendChild(createArtworkCard(i, `union${i}.png`, false));
  }

  // ===== Generate one artwork card =====
  function createArtworkCard(index, src, isNew) {
    const card = document.createElement("div");
    card.className = "artwork-card";

    // Image
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Union Artwork #${index}`;
    card.appendChild(img);

    // Title with optional NEW badge
    const title = document.createElement("h3");
    title.textContent = `Union Artwork #${index}`;
    if (isNew) {
      const badge = document.createElement("span");
      badge.className = "badge-new";
      badge.textContent = "NEW";
      title.appendChild(badge);
    }
    card.appendChild(title);

    // Buttons
    const buttonRow = document.createElement("div");
    buttonRow.className = "button-row";

    const downloadBtn = document.createElement("a");
    downloadBtn.href = src;
    downloadBtn.download = src;
    downloadBtn.className = "download-btn";
    downloadBtn.textContent = "Download";

    const likeBtn = document.createElement("button");
    likeBtn.className = "like-btn";
    const storedLikes = localStorage.getItem(`likes_${index}`) || 0;
    likeBtn.textContent = `❤️ ${storedLikes}`;
    likeBtn.addEventListener("click", () => {
      let count = parseInt(localStorage.getItem(`likes_${index}`)) || 0;
      count++;
      localStorage.setItem(`likes_${index}`, count);
      likeBtn.textContent = `❤️ ${count}`;
    });

    buttonRow.appendChild(downloadBtn);
    buttonRow.appendChild(likeBtn);
    card.appendChild(buttonRow);

    return card;
  }
});
