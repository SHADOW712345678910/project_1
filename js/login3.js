let password = document.getElementById("check");

document.getElementById("pass").onclick = function () {
  if (password.getAttribute("type") == "password") {
    password.setAttribute("type", "text");

    var show = document.getElementById("pass");

    show.src = "/img/pass-hide.svg";
  } else {
    password.setAttribute("type", "password");

    var hide = document.getElementById("pass");

    hide.src = "img/pass-icon.png";
  }
};

function setcookie() {
  console.log("hello");

  var u = document.getElementById("username").value;

  var pass = document.getElementById("check").value;

  document.cookie =
    "username1 =" + u + "; path= http://127.0.0.1:5500/login.html";

  document.cookie =
    "password =" + pass + "; path= http://127.0.0.1:5500/login.html";
}

function getcookiedata() {
  console.log(document.cookie);

  var pass1 = getCookie("password");

  var user = getCookie("username1");

  var user123 = (document.getElementById("username").value = user);

  var pass2 = (document.getElementById("check").value = pass1);

  console.log(pass2.value);
}

function getCookie(cname) {
  console.log("lol");
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

document.getElementById("username").onchange = function () {
  var email = document.getElementById("username").value;

  console.log(email);
};

const handlechange2 = (e) => {
  if (e.target.name == "password") password7 = e.target.value;
};
