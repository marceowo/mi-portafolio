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
}); 