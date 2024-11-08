let player;
const tracks = [
  {
    title: "L'AEREO INTEREMOZIONALE",
    youtubeId: "Zb9Hm6mJLrY", // Sostituisci con l'ID corretto
  },
  {
    title: "Bomba nucleare",
    youtubeId: "I5hJGO1jNUo", // Sostituisci con l'ID corretto
  },
  {
    title: "da così a COSÌ (r1)",
    youtubeId: "vuoYCh8SxHU", // Sostituisci con l'ID corretto
  },
  {
    title: "non perdere tempo",
    youtubeId: "5CGnxiReUT4", // Sostituisci con l'ID corretto
  },
  {
    title: "è estate",
    youtubeId: "Jf_S1wNZJCo", // Sostituisci con l'ID corretto
  },
  {
    title: "Serena",
    youtubeId: "OzFaMOJUtVU", // Sostituisci con l'ID corretto
  },
  {
    title: "come Peter Pan",
    youtubeId: "TDeetLsaAe8", // Sostituisci con l'ID corretto
  },
  {
    title: "un accordo (r2)",
    youtubeId: "oLeoMt_sKBc", // Sostituisci con l'ID corretto
  },
  {
    title: "SPARATO AL PETTO",
    youtubeId: "085QACuTJWs", // Sostituisci con l'ID corretto
  },
  {
    title: "FEDE (senza cacciavite)",
    youtubeId: "XwN3zu-o82A", // Sostituisci con l'ID corretto
  },
  {
    title: "VERDE D'INVIDIA",
    youtubeId: "gSYNTkJ5b7M", // Sostituisci con l'ID corretto
  },
  {
    title: "per non sembrare fragile",
    youtubeId: "wf0UuEfOnHc", // Sostituisci con l'ID corretto
  },
  {
    title: "aspettiamo",
    youtubeId: "cfCqubZYCW8", // Sostituisci con l'ID corretto
  },
  {
    title: "nascondino (poker face)",
    youtubeId: "6ZjCh64UnTY", // Sostituisci con l'ID corretto
  },
  {
    title: "una vibrazione",
    youtubeId: "bvOSu74ebJo", // Sostituisci con l'ID corretto
  },
  {
    title: "FILM A COLORI",
    youtubeId: "oQaMYxaFjxQ", // Sostituisci con l'ID corretto
  },
  {
    title: "delicato fottuto algoritmo (DFA)",
    youtubeId: "Jg2XGh7yOrE", // Sostituisci con l'ID corretto
  },
  {
    title: "[BONUS] Eva RMX",
    youtubeId: "kUI31hMnU3A", // Sostituisci con l'ID corretto
  },
];

let currentTrackIndex = 0;
let isPlaying = false; // Il video parte in pausa
const playPauseButton = document.getElementById("playPause");
playPauseButton.textContent = "play_arrow"; // Icona di "Play" iniziale

let updateProgressInterval; // Intervallo per aggiornare la progress bar

// Funzione per caricare il video di YouTube
function loadTrack(trackIndex) {
  const videoId = tracks[trackIndex].youtubeId;
  player.loadVideoById(videoId);

  // Rimuovi la classe `active-track` da tutti i brani
  const allTracks = document.querySelectorAll(".song-title p, .song-duration");
  allTracks.forEach((track) => track.classList.remove("active-track"));

  // Aggiungi la classe `active-track` agli elementi della traccia attiva
  const activeTitle = document.querySelector(
    `li:nth-child(${trackIndex + 1}) .song-title p`
  );
  const activeDuration = document.querySelector(
    `li:nth-child(${trackIndex + 1}) .song-meta .song-duration:first-child`
  );
  const activeDate = document.querySelector(
    `li:nth-child(${trackIndex + 1}) .song-meta .song-duration:last-child`
  );

  currentTrackIndex = trackIndex;
  activeTitle.classList.add("active-track");
  activeDuration.classList.add("active-track");
  activeDate.classList.add("active-track");

  // Aggiorna lo stato di riproduzione e il pulsante
  isPlaying = true;
  const playPauseButton = document.getElementById("playPause");
  playPauseButton.textContent = "pause"; // Icona "Pause"
  playPauseButton.style.color = "#ebb12a"; // Colore dell'icona

  // Avvia la riproduzione
  player.playVideo();
  startProgressUpdate();
}

// Funzione per aprire il video specifico su YouTube
function openvideo(trackIndex) {
  const videoId = tracks[trackIndex].youtubeId; // Ottieni l'ID YouTube della traccia
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  window.open(url, "_blank");
}

// Funzione per riprodurre o mettere in pausa il video
function togglePlayPause() {
  if (isPlaying) {
    player.pauseVideo();
    playPauseButton.textContent = "play_arrow"; // Icona "Play"
    clearInterval(updateProgressInterval); // Ferma l'aggiornamento della barra di avanzamento
  } else {
    player.playVideo();
    playPauseButton.textContent = "pause"; // Icona "Pause"
    startProgressUpdate(); // Riavvia l'aggiornamento della barra di avanzamento
  }

  playPauseButton.style.color = "#ebb12a"; // Colore dell'icona
  isPlaying = !isPlaying;
}

// Funzione per riprodurre la traccia successiva
function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Cicla le tracce
  loadTrack(currentTrackIndex);
  isPlaying = true;
  playPauseButton.textContent = "pause"; // Icona "Play"
}

// Funzione per riprodurre la traccia precedente
function playPrevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Cicla le tracce
  loadTrack(currentTrackIndex);
  isPlaying = true;
  playPauseButton.textContent = "pause"; // Icona "Play"
}

// Funzione per iniziare l'aggiornamento della progress bar
function startProgressUpdate() {
  clearInterval(updateProgressInterval); // Pulisci qualsiasi intervallo esistente
  updateProgressInterval = setInterval(updateProgress, 200); // Aggiorna ogni 200ms
}

// Funzione per aggiornare la progress bar e la posizione dell'icona
function updateProgress() {
  if (player && isPlaying) {
    const time = player.getCurrentTime();
    const duration = player.getDuration();
    const progressBar = document.getElementById("progress");

    if (duration > 0) {
      const percentage = (time / duration) * 100;
      progressBar.value = percentage;

      // Aggiorna il gradiente della barra per mostrare il tempo trascorso
      progressBar.style.background = `linear-gradient(to right, #4e3a1d ${percentage}%, #ebb12a ${percentage}%)`;

      // Aggiorna la posizione dell'icona dell'aereo
      const airplaneIcon = document.getElementById("airplane-icon");
      const progressWidth = progressBar.offsetWidth;
      const leftPos = (percentage / 100) * progressWidth;
      airplaneIcon.style.left = `${leftPos}px`;
    }
  }
}

// Aggiungi l'evento per spostare manualmente il cursore
document.getElementById("progress").addEventListener("input", setProgress);

// Funzione per cambiare la posizione del video in base alla barra di avanzamento
function setProgress(event) {
  const progressBar = document.getElementById("progress");
  const duration = player.getDuration();
  const newTime = (event.target.value / 100) * duration;
  player.seekTo(newTime);
  isPlaying = true;
  playPauseButton.textContent = "pause"; // Icona "Play"
}

// Aggiungi eventi ai bottoni
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("nextTrack").addEventListener("click", playNextTrack);
  document.getElementById("prevTrack").addEventListener("click", playPrevTrack);
  document
    .getElementById("playPause")
    .addEventListener("click", togglePlayPause);

  // Aggiungi evento alla barra di avanzamento
  document.getElementById("progress").addEventListener("input", setProgress);
});

// Inizializza il lettore di YouTube
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: tracks[currentTrackIndex].youtubeId,
    events: {
      onStateChange: function (event) {
        if (event.data === YT.PlayerState.ENDED) {
          playNextTrack(); // Passa alla traccia successiva alla fine
        }
      },
    },
  });

  // Aggiorna la barra di avanzamento ogni secondo
  setInterval(updateProgress, 1000);
}
const progress = document.getElementById("progress");
const airplaneIcon = document.getElementById("airplane-icon");

function updateProgressBar() {
  const max = progress.max;
  const value = progress.value;

  // Calcola la percentuale del tempo trascorso
  const percentage = (value / max) * 100;

  // Aggiorna il gradiente della barra per mostrare il tempo trascorso
  progress.style.background = `linear-gradient(to right, #4e3a1d ${percentage}%, #ebb12a ${percentage}%)`;

  // Aggiorna anche la posizione dell'icona dell'aereo
  const progressWidth = progress.offsetWidth;
  const leftPos = (value / max) * progressWidth;
  airplaneIcon.style.left = `${leftPos}px`;
}

// Inizializza la posizione della barra
updateProgressBar();

// Aggiorna quando cambia valore
progress.addEventListener("input", updateProgressBar);
