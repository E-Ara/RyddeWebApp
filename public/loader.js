window.addEventListener("load", async () => {
  const loader = document.querySelector(".loader");
  if (loader) {
    // Wait for Firestore data to be loaded
    await loadDataFromFirestore();

    // Hide the loader
    loader.classList.add("loader-hidden");

    // Remove the loader from the DOM after the transition ends
    loader.addEventListener("transitionend", () => {
      if (loader.parentNode === document.body) {
        document.body.removeChild(loader);
      }
    });
  }
});
async function loadDataFromFirestore() {
  // TODO: Replace with code to load data from Firebase Firestore
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading delay
}