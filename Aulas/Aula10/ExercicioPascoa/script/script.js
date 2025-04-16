function mostrarImagem() {
  const image = document.querySelector("#minhaImagem");
  const button = document.querySelector(".button"); 
  const main = document.querySelector("main")
  const audio = document.querySelector("#audio");

  if (image.style.display === "none" || image.style.display === "") {
    image.style.display = "block";
    main.style.backgroundImage = "url(https://wallpapers.com/images/hd/confetti-background-gcbvawexbsqvn1ib.jpg)";
    button.style.position = "absolute";
    button.style.right = "10%";
    button.style.bottom = "80px";
    button.textContent = "Press Here to disable";
    audio.play();

  } else {
    image.style.display = "none";
    main.style.backgroundImage = "none";
    button.style.position = "absolute";
    button.style.top = "77%";
    button.style.right = "50%";
    button.style.transform = "translateX(50%)";
    button.textContent = "Press Here";
    audio.pause();
    audio.currentTime = 0;
  }
}
