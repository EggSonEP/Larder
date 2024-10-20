function pl1(videoId) {
  // Il video YouTube da aprire in Picture-in-Picture
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`; // Aggiungi enablejsapi

  const videoElement = document.getElementById("youtubeVideo");
  videoElement.src = videoUrl;

  // Mostra il video
  videoElement.style.display = "block"; // Cambiato per mostrare il video

  // Attiva Picture-in-Picture
  videoElement
    .requestPictureInPicture()
    .then(() => {
      // Il video parte automaticamente quando PiP è attivato
    })
    .catch((err) => {
      console.error("Errore attivando PiP:", err);
    });
}
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
    if (window.scrollY > 1300) {
      disc.innerHTML =
        '<span class="material-symbols-outlined">adjust</span> Disco 2: Il volo'; // Corretto
      cover.src = "album/senza_num_volo.png";
    }
  } else {
    // Rimuovi la classe .small se lo scroll è sotto gli 0px
    albumContainer.classList.remove("small");
    content.style.marginTop = "320px"; // Riporta il margin-top originale
    if (window.scrollY < 100) {
      disc.innerHTML = ""; // Corretto
      title.innerHTML = "AEREO INTEREMOZIONALE";
      artist.innerHTML = "larder";
      cover.src = "album/copertinainter.png";
    }
  }
});
