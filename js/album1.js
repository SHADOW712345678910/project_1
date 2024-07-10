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
  let a = await fetch("http://127.0.0.1:5500/album/");

  let response = await a.text();

  //   console.log(response);

  let div = document.createElement("div");

  div.innerHTML = response;

  let as = div.getElementsByTagName("a");

  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];

    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/album/")[1]);
    }
  }

  return songs;

  // console.log(songs)
}

const playMusic = (track, pause = false) => {
  // let audio = new Audio("/songs/" + track)

  currentSong.src = "/album/" + track;

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


  let number1 = document.getElementById("number1");

  number1.innerHTML = songs[0].replaceAll("%20", " ");

  let number2 = document.getElementById("number2");

  number2.innerHTML = songs[1].replaceAll("%20", " ");

  let number3 = document.getElementById("number3");

  number3.innerHTML = songs[2].replaceAll("%20", " ");

  let number4 = document.getElementById("number4");

  number4.innerHTML = songs[3].replaceAll("%20", " ");

  let number5 = document.getElementById("number5");

  number5.innerHTML = songs[4].replaceAll("%20", " ");

  let number6 = document.getElementById("number6");

  number6.innerHTML = songs[5].replaceAll("%20", " ");

  let number7 = document.getElementById("number7");

  number7.innerHTML = songs[6].replaceAll("%20", " ");
  
  let number8 = document.getElementById("number8");

  number8.innerHTML = songs[7].replaceAll("%20", " ");
  

  

  number1.addEventListener("click", (element) => {
    console.log(number1.innerHTML);

    playMusic(number1.innerHTML.trim());
  });

  number2.addEventListener("click", (element) => {
    console.log(number2.innerHTML);

    playMusic(number2.innerHTML.trim());
  });

  number3.addEventListener("click", (element) => {
    console.log(number3.innerHTML);

    playMusic(number3.innerHTML.trim());
  });

  number4.addEventListener("click", (element) => {
    console.log(number4.innerHTML);

    playMusic(number4.innerHTML.trim());
  });

  number5.addEventListener("click", (element) => {
    console.log(number5.innerHTML);

    playMusic(number5.innerHTML.trim());
  });
  number6.addEventListener("click", (element) => {
    console.log(number6.innerHTML);

    playMusic(number6.innerHTML.trim());
  });
  number7.addEventListener("click", (element) => {
    console.log(number7.innerHTML);

    playMusic(number7.innerHTML.trim());
  });
  number8.addEventListener("click", (element) => {
    console.log(number8.innerHTML);

    playMusic(number8.innerHTML.trim());
  });
  number9.addEventListener("click", (element) => {
    console.log(number9.innerHTML);

    playMusic(number9.innerHTML.trim());
  });
  number10.addEventListener("click", (element) => {
    console.log(number10.innerHTML);

    playMusic(number10.innerHTML.trim());
  });
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
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100%";
  });

  /// PREV AND NEXT btn

  previous.addEventListener("click", () => {
    console.log("prev click");
    console.log(currentSong);

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

  let href = document.getElementById("href");

  href.addEventListener("click", click);

  const click = () => {
    {
      window.location.href = "/page2.html";
    }
  };

  // play the first songs

  // var audio = new Audio(songs[0])
  // audio.play()
}

main();
