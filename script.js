document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("artworks-container");

  const legacyCount = 55;       // union1.png → union55.png
  const newStart = 56;          // art56.png starts here
  const newEnd = 123;           // art123.png ends here

  // === Insert "New Artworks" label ===
  const newLabel = document.createElement("div");
  newLabel.className = "new-artworks-label";
  newLabel.textContent = "🆕 New Artworks";
  container.before(newLabel);

  // === Render new artworks (most recent first) ===
  for (let i = newEnd; i >= newStart; i--) {
    const card = createArtworkCard(i, `art${i}.png`);
    container.prepend(card);
  }

  // === Render legacy artworks (in order) ===
  for (let i = 1; i <= legacyCount; i++) {
    const card = createArtworkCard(i, `union${i}.png`);
    container.appendChild(card);
  }

  // ====== Generate Artwork Card ======
  function createArtworkCard(index, src) {
    const card = document.createElement("div");
    card.className = "artwork-card";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Union Artwork #${index}`;
    card.appendChild(img);

    const title = document.createElement("h3");
    title.textContent = `Union Artwork #${index}`;
    card.appendChild(title);

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
