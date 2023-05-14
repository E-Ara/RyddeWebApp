//Finner ut hvilken bruker profil det er
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const user = urlParams.get("user")

document.getElementById("name").innerHTML = user;

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

let ArrayOfTasksDone = [];

//Finner ut hvor mange oppgaver brukeren har gjort
console.log("Querying Firestore for tasks done by user ID: " + user);
firebase.firestore().collection("done")
  .where('doneBy', '==', user)
  .get()
  .then((querySnapshot) => {
    //Sjekker om query inneholder informasjon
    if (querySnapshot.size === 0) {
      console.log("No tasks done by user with ID " + user);
      console.log("Length of array: 0");
    } else {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        ArrayOfTasksDone.push(doc.id);
      });
      console.log("Length of array: " + ArrayOfTasksDone.length);
      
    }
  })
  .catch((error) => {
    console.log("Error getting tasks done by user: ", error);
  });