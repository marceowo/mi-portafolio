document.addEventListener("DOMContentLoaded", () => {

  // ── DARK MODE ──
  const toggleBtn = document.querySelector("#theme-toggle");

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    toggleBtn.textContent = "🌙";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    toggleBtn.textContent = isLight ? "🌙" : "☀️";
  });

// ── VALIDACIÓN DEL FORMULARIO ──────────────────────
  const form = document.querySelector("#contact-form");
  const nameInput = document.querySelector("#name");
  const messageInput = document.querySelector("#message");
  const nameError = document.querySelector("#name-error");
  const messageError = document.querySelector("#message-error");
  const successMsg = document.querySelector("#form-success"); 

  function validateName (){
    if (nameInput.value.trim().length <2) {
            nameError.textContent = "Name must be at least 2 characters.";
            return false;
            }
            nameError.textContent = " "; 
            return true;     
    }

    function validateMessage() { 
        if (messageInput.value.trim().length < 10 ) {
             messageError.textContent = "Message must be at least 10 characters.";
            return false;
            }
        
        messageError.textContent = "";
        return true;
     }

    nameInput.addEventListener("input", validateName);
    nameInput.addEventListener("blur", validateName);

    messageInput.addEventListener("input", validateMessage);
    messageInput.addEventListener("blur", validateMessage);


form.addEventListener("submit", (e) => {
  e.preventDefault();

    const nameOk = validateName();
    const messageOk = validateMessage();


    if (nameOk && messageOk) {
        form.reset();
        successMsg.style.display = "block";
        setTimeout(() => successMsg.style.display = "none", 4000);
    } 
});

// ── FETCH GITHUB REPOS ──────────────────────────────
async function loadRepos() {
  const grid = document.querySelector(".projects-grid");

  try {
    const response = await fetch("https://api.github.com/users/marceowo/repos?sort=updated&per_page=3");
    const repos = await response.json();

    grid.innerHTML = ""; // limpia las cards estáticas

    repos.forEach((repo) => {
      grid.innerHTML += `
        <article class="project-card">
          <div class="project-img"></div>
          <div class="project-info">
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description yet."}</p>
            <div class="project-tags">
              ${repo.language ? `<span class="tag">${repo.language}</span>` : ""}
            </div>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn">View project</a>
          </div>
        </article>
      `;
    });

  } catch (error) {
    console.error("Error loading repos:", error);
  }
}

loadRepos();


}); 
