// JavaScript per aggiungere e rimuovere la classe .small durante lo scroll
window.addEventListener("scroll", function () {
  const albumContainer = document.getElementById("albumContainer");
  const content = document.getElementById("content"); // Assicurati che questo ID sia corretto.
  const disc = document.getElementById("albumDisc");
  const artist = document.getElementById("albumArtist");
  const title = document.getElementById("albumTitle");
  const cover = document.getElementById("albumCover");

  if (window.scrollY > 0) {
    // Aggiungi la classe .small se l'utente ha scrollato più di 0px
    albumContainer.classList.add("small");
    content.style.marginTop = "150px"; // Cambia direttamente il margin-top
    if (window.scrollY > 120) {
      disc.innerHTML =
        '<span class="material-symbols-outlined">adjust</span> Disco 1: La partenza'; // Corretto
      title.innerHTML = "";
      artist.innerHTML = "";
      cover.src = "album/senza_num.png";
    }
    if (window.scrollY > 850) {
      disc.innerHTML =
        '<span class="material-symbols-outlined">adjust</span> Disco 2: Il volo'; // Corretto
      cover.src = "album/senza_num_volo.png";
    }
  } else {
    // Rimuovi la classe .small se lo scroll è sotto gli 0px
    albumContainer.classList.remove("small");
    content.style.marginTop = "220px"; // Riporta il margin-top originale
    if (window.scrollY < 100) {
      disc.innerHTML = ""; // Corretto
      title.innerHTML = "AEREO INTEREMOZIONALE";
      artist.innerHTML = "larder";
      cover.src = "album/copPiccola.png";
    }
  }
});

// Funzione per aprire il video
document.getElementById("openVideo").addEventListener("click", function () {
  document.getElementById("videoContainer").style.display = "block";
  document.getElementById("youtubeVideo").style.display = "block";
});

// Funzione per chiudere il video
document.getElementById("closeVideo").addEventListener("click", function () {
  document.getElementById("videoContainer").style.display = "none";
  document.getElementById("youtubeVideo").style.display = "none"; // Nasconde l'iframe
  document.getElementById("youtubeVideo").src = ""; // Ferma il video
});
