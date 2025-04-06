function waitForEmailAndInjectButton() {
  const target = document.querySelector("div[role='main']");
  if (!target) return;

  const observer = new MutationObserver(() => {
    const existingButton = document.getElementById("ai-summary-btn");
    const emailBody = document.querySelector("div.a3s");

    if (!existingButton && emailBody) {
      const header = document.querySelector("div.adn.ads");

      const button = document.createElement("button");
      button.id = "ai-summary-btn";
      button.innerText = "Summarize with AI";
      button.style.margin = "10px";
      button.style.padding = "8px 16px";
      button.style.backgroundColor = "#1a73e8";
      button.style.color = "#fff";
      button.style.border = "none";
      button.style.borderRadius = "4px";
      button.style.cursor = "pointer";

      button.onclick = async () => {
        button.innerText = "Summarizing...";
        try {
          const response = await fetch("https://gmail-ai-summarizer-backend-bxir.onrender.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailBody.innerText })
          });

          const data = await response.json();
          alert("Summary:\n\n" + data.summary);
          button.innerText = "Summarize with AI";
        } catch (err) {
          console.error(err);
          alert("Error summarizing email.");
          button.innerText = "Try Again";
        }
      };

      header?.appendChild(button);
    }
  });

  observer.observe(target, { childList: true, subtree: true });
}

window.addEventListener("load", () => {
  setTimeout(waitForEmailAndInjectButton, 3000);
});
