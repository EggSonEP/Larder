let player;
const tracks = [
  {
    title: "L'AEREO INTEREMOZIONALE",
    youtubeId: "", // Sostituisci con l'ID corretto
  },
  {
    title: "Bomba nucleare",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID_2", // Sostituisci con l'ID corretto
  },
  {
    title: "da così a COSÌ (r1)",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID_3", // Sostituisci con l'ID corretto
  },
  {
    title: "non perdere tempo",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID_4", // Sostituisci con l'ID corretto
  },
  {
    title: "è estate",
    youtubeId: "Jf_S1wNZJCo", // Sostituisci con l'ID corretto
  },
  {
    title: "Serena",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID_6", // Sostituisci con l'ID corretto
  },
  {
    title: "come Peter Pan",
    youtubeId: "TDeetLsaAe8", // Sostituisci con l'ID corretto
  },
  {
    title: "un accordo (r2)",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID_8", // Sostituisci con l'ID corretto
  },
  {
    title: "SPARATO AL PETTO",
    youtubeId: "085QACuTJWs", // Sostituisci con l'ID corretto
  },
  {
    title: "FEDE (senza cacciavite)",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID_10", // Sostituisci con l'ID corretto
  },
  {
    title: "VERDE D'INVIDIA",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID_11", // Sostituisci con l'ID corretto
  },
  {
    title: "per non sembrare fragile",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID_12", // Sostituisci con l'ID corretto
  },
  {
    title: "aspettiamo",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID_13", // Sostituisci con l'ID corretto
  },
  {
    title: "nascondino (poker face)",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID_14", // Sostituisci con l'ID corretto
  },
  {
    title: "una vibrazione",
    youtubeId: "bvOSu74ebJo", // Sostituisci con l'ID corretto
  },
  {
    title: "FILM A COLORI",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID_16", // Sostituisci con l'ID corretto
  },
  {
    title: "delicato fottuto algoritmo (DFA)",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID_17", // Sostituisci con l'ID corretto
  },
  {
    title: "[BONUS] Eva RMX",
    youtubeId: "kUI31hMnU3A", // Sostituisci con l'ID corretto
  },
];

let currentTrackIndex = 0;
let isPlaying = false;

// Funzione per caricare il video di YouTube
function loadTrack(trackIndex) {
  const videoId = tracks[trackIndex].youtubeId;
  player.loadVideoById(videoId);
  isPlaying = true;
  document.getElementById("playPause").textContent = "Pause";
  updateProgress(); // Inizializza la barra di avanzamento
}

// Funzione per riprodurre o mettere in pausa il video
function togglePlayPause() {
  if (isPlaying) {
    player.pauseVideo();
    document.getElementById("playPause").textContent = "Play";
  } else {
    player.playVideo();
    document.getElementById("playPause").textContent = "Pause";
  }
  isPlaying = !isPlaying;
}

// Funzione per riprodurre la traccia successiva
function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Cicla le tracce
  loadTrack(currentTrackIndex);
}

// Funzione per riprodurre la traccia precedente
function playPrevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Cicla le tracce
  loadTrack(currentTrackIndex);
}

// Funzione per aggiornare la barra di avanzamento
function updateProgress() {
  if (player && isPlaying) {
    const time = player.getCurrentTime(); // Ottieni il tempo attuale
    const duration = player.getDuration(); // Ottieni la durata totale
    const progressBar = document.getElementById("progress");

    if (duration > 0) {
      progressBar.value = (time / duration) * 100; // Aggiorna la barra di avanzamento
    }
  }
}

// Funzione per cambiare la posizione del video in base alla barra di avanzamento
function setProgress(event) {
  const progressBar = document.getElementById("progress");
  const duration = player.getDuration();
  const newTime = (event.target.value / 100) * duration;
  player.seekTo(newTime);
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
      onReady: function (event) {
        loadTrack(currentTrackIndex); // Carica la prima traccia
      },
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
