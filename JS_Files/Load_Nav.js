// Dynamically loads the shared navigation into pages
fetch("https://jeremyroalef.github.io/E-Portfolio/Shared/nav.html")
  .then(response => {
    if (!response.ok) throw new Error("Failed to load nav.html");
    return response.text();
  })
  .then(data => {
    document.getElementById("nav-placeholder").innerHTML = data;

    // Once the nav is loaded, attach dropdown functionality
    const script = document.createElement("script");
    script.src = "https://jeremyroalef.github.io/E-Portfolio/JS_Files/Nav_Behaviour.js";
    document.body.appendChild(script);
  })
  .catch(err => console.error(err));
