import { getCurrentPoints } from "./landingPage.js";

document.getElementById("signOut").addEventListener("click", () => {
  document.cookie = "UserLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
})

//Finner ut hvilken bruker profil det er
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const user = urlParams.get("user")

document.getElementById("name").innerHTML = user;
const UserPoints = getCurrentPoints(user);

if (getCurrentPoints(user)) {
  console.log(UserPoints)
  if (UserPoints >= 400) {
    console.log("Hit goal", UserPoints)
    document.getElementById("GjoremaalEkspert").classList.remove("badge-locked");
  }
  else {
    console.log("could not get user poinst")
  }
}

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
      let ArrayOfTasksDone = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        ArrayOfTasksDone.push(doc.id);
      });
      console.log("Length of array: " + ArrayOfTasksDone.length);
      if (ArrayOfTasksDone.length >= 10) {
        console.log("10 tasks done");
        document.getElementById("10Gjoremaal").classList.remove("badge-locked");
      }
      if (ArrayOfTasksDone.length >= 25) {
        console.log("25 tasks done");
        document.getElementById("25Gjoremaal").classList.remove("badge-locked");
      }
    }
  })
  .catch((error) => {
    console.log("Error getting tasks done by user: ", error);
  });


//Finner ut hvor mange ganger brukeren har lagd middag
console.log("Querying Firestore for middag tasks done by user ID: " + user);
firebase.firestore().collection("done")
  .where('doneBy', '==', user)
  .where("task", "==", "LageMiddag")
  .get()
  .then((querySnapshot) => {
    //Sjekker om query inneholder informasjon
    if (querySnapshot.size === 0) {
      console.log("No  middag tasks done by user with ID " + user);
      console.log("Length of array: 0");
    } else {
      let ArrayOfDinnerDone = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        ArrayOfDinnerDone.push(doc.id);
      });
      console.log("Length of Dinner array: " + ArrayOfDinnerDone.length);
      if (ArrayOfDinnerDone.length >= 4) {
        console.log("4 dinner done");
        document.getElementById("kongensKokk").classList.remove("badge-locked");
      }
    }
  })
  .catch((error) => {
    console.log("Error getting tasks done by user: ", error);
  }); 