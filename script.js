document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("artworks-container");

  const totalArtworks = 36;

  for (let i = 1; i <= totalArtworks; i++) {
    const card = document.createElement("div");
    card.className = "artwork-card";

    // IMAGE
    const img = document.createElement("img");
    img.src = `union${i}.png`;
    img.alt = `Union Artwork #${i}`;
    card.appendChild(img);

    // TITLE
    const title = document.createElement("h3");
    title.textContent = `Union Artwork #${i}`;
    card.appendChild(title);

    // BUTTON ROW
    const buttonRow = document.createElement("div");
    buttonRow.className = "button-row";

    // DOWNLOAD BUTTON
    const downloadBtn = document.createElement("a");
    downloadBtn.href = `union${i}.png`;
    downloadBtn.download = `union${i}.png`;
    downloadBtn.className = "download-btn";
    downloadBtn.textContent = "Download";

    // LIKE BUTTON
    const likeBtn = document.createElement("button");
    likeBtn.className = "like-btn";

    const storedLikes = localStorage.getItem(`likes_${i}`) || 0;
    likeBtn.textContent = `❤️ ${storedLikes}`;

    likeBtn.addEventListener("click", () => {
      let count = parseInt(localStorage.getItem(`likes_${i}`)) || 0;
      count++;
      localStorage.setItem(`likes_${i}`, count);
      likeBtn.textContent = `❤️ ${count}`;
    });

    buttonRow.appendChild(downloadBtn);
    buttonRow.appendChild(likeBtn);
    card.appendChild(buttonRow);

    container.appendChild(card);
  }
});
