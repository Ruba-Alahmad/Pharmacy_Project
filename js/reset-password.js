const resetForm = document.getElementById("resetForm");
const message = document.getElementById("message");

resetForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();

  if (!email) {
    showMessage("Please enter your email.", "danger");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/send-reset-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (data.success) {
      showMessage(`Verification code sent to ${email}. Please check your email.`, "success");

      // تحويل المستخدم لصفحة confirm-reset بعد 3 ثواني
      setTimeout(() => {
        window.location.href = "confirm-reset.html";
      }, 3000);

    } else {
      showMessage(data.message || "Error sending verification code.", "danger");
    }

  } catch (error) {
    showMessage("Server error. Please try again later.", "danger");
    console.error(error);
  }
});

function showMessage(text, type) {
  message.innerHTML = `<div class="alert alert-${type}" role="alert">${text}</div>`;
}

