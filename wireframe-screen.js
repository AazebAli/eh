document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submit-query").addEventListener("click", async () => {
    const name = document.getElementById("text-wrapper-23").value.trim();
    const email = document.getElementById("text-wrapper-22").value.trim();
    const contact = document.getElementById("text-wrapper-25").value.trim();
    const problem = document.getElementById("text-wrapper-16").value.trim();

    if (!name || !email || !contact || !problem) {
      alert("Please fill in all fields.");
      return;
    }

    const data = { name, email, contact, problem };

    try {
      const response = await fetch("http://localhost:3000/submit-problem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      alert(result.message);
       window.location.href = "index.html";
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit query.");
    }
  });
});
