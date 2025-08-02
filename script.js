document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("artworks-container");

  const legacyCount = 55; // union1.png to union55.png
  const newStart = 56;
  const newEnd = 79; // art56.png to art79.png

  // First render new artworks (go to top)
  for (let i = newEnd; i >= newStart; i--) {
    const card = createArtworkCard(i, `art${i}.png`);
    container.prepend(card);
  }

  // Then render legacy artworks (remain below)
  for (let i = 1; i <= legacyCount; i++) {
    const card = createArtworkCard(i, `union${i}.png`);
    container.appendChild(card);
  }

  // ====== Card Generator Function ======
  function createArtworkCard(index, src) {
    const card = document.createElement("div");
    card.className = "artwork-card";

    // Image
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Union Artwork #${index}`;
    card.appendChild(img);

    // Title
    const title = document.createElement("h3");
    title.textContent = `Union Artwork #${index}`;
    card.appendChild(title);

    // Button Row
    const buttonRow = document.createElement("div");
    buttonRow.className = "button-row";

    // Download Button
    const downloadBtn = document.createElement("a");
    downloadBtn.href = src;
    downloadBtn.download = src;
    downloadBtn.className = "download-btn";
    downloadBtn.textContent = "Download";

    // Like Button
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
