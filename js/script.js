let currentSong = new Audio();

let songs;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "Invalid input";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes} : ${formattedSeconds}`;
}

async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");

  let response = await a.text();

  //   console.log(response);

  let div = document.createElement("div");

  div.innerHTML = response;

  let as = div.getElementsByTagName("a");

  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];

    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }

  return songs;

  // console.log(songs)
}

const playMusic = (track, pause = false) => {
  // let audio = new Audio("/songs/" + track)

  currentSong.src = "/songs/" + track;

  if (!pause) {
    currentSong.play();

    play.src = "img/pause.svg";
  }

  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
  // get the list of all the songs

  songs = await getSongs();

  playMusic(songs[0], true);

  console.log(songs);



  // Attach an event listener to play next and prev

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "img/play.svg";
    }
  });

  // listen for timeupdate event

  currentSong.addEventListener("timeupdate", () => {
    console.log(currentSong.currentTime, currentSong.duration);
    let time = document.querySelector(".songtime");

    time.innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )}/${secondsToMinutesSeconds(currentSong.duration)}`;

    let circle = document.querySelector(".circle");

    circle.style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // add an event listener to seekbar

  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

    let circle = document.querySelector(".circle");

    circle.style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  // add hamburger

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  let close = document.querySelector(".close");

  close.addEventListener("click", () => {
    console.log("hello");
    document.querySelector(".left").style.left = "-100%";
  });

  /// PREV AND NEXT btn

  previous.addEventListener("click", () => {
    console.log("prev click");
    console.log(currentSong);

    console.log(currentSong.src.split("/").slice(-1)[0])
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);

    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });

  next.addEventListener("click", () => {
    console.log("next click");
    console.log(currentSong);

    currentSong.pause();

    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);

    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });

  // add volume

  let range = document.querySelector(".range ");

  range.getElementsByTagName("input")[0].addEventListener("change", (e) => {
    console.log(e, e.target, e.target.value);

    currentSong.volume = parseInt(e.target.value) / 100;
  });

  document.getElementById("href").onclick = function () {
    window.location.href = "/page2.html";
  };

  document.getElementById("href2").onclick = function () {
    window.location.href = "/artist.html";
  };
  
  document.getElementById("href3").onclick = function () {
    window.location.href = "/album.html";
  };
  document.getElementById("href4").onclick = function () {
    window.location.href = "/mood.html";
  };
  document.getElementById("href5").onclick = function () {
    window.location.href = "/instrumental.html";

  }
  
  document.getElementById("href6").onclick = function () {
    window.location.href = "/login.html";

  }
  
  document.getElementById("href7").onclick = function () {
    window.location.href = "/signup.html";

  }
  // play the first songs

  // var audio = new Audio(songs[0])
  // audio.play()
}

main();
