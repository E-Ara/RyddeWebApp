let buttonLock = document.getElementById("ChangeLock");
let buttonUnlock = document.getElementById("Unlock");
let badge = document.querySelectorAll(".badgeIMG");

buttonLock.addEventListener("click", () => {
  badge.forEach((badge) => {
    badge.classList.add("badge-locked");
  });
});

buttonUnlock.addEventListener("click", () => {
  badge.forEach((badge) => {
    badge.classList.remove("badge-locked");
  });
});