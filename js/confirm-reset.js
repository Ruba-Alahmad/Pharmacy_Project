const confirmResetForm = document.getElementById("confirmResetForm");
const message = document.getElementById("message");

// Show / Hide Password
document.querySelectorAll(".toggle-password").forEach(icon => {
  icon.addEventListener("click", () => {
    const input = icon.previousElementSibling;
    if (input.type === "password") {
      input.type = "text";
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
});

confirmResetForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const code = document.getElementById("code").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");

  if (!code || !newPassword || !confirmPassword) {
    showMessage("Please fill in all fields.", "danger");
    return;
  }

  if (newPassword !== confirmPassword) {
    showMessage("Passwords do not match.", "danger");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, newPassword })
    });

    const data = await res.json();

    if (data.success) {
      showMessage("Password reset successfully! Redirecting...", "success");

      // التحويل حسب الدور مباشرة
      setTimeout(() => {
        if (data.role === "admin") {
          window.location.href = "admin.html";
        } else if (data.role === "pharmacist") {
          window.location.href = "pharmacist.html";
        } else {
          window.location.href = "index.html"; // fallback
        }
      }, 1500);
    } else {
      showMessage(`Error: ${data.message}`, "danger");
    }
  } catch (err) {
    showMessage("Server error. Please try again later.", "danger");
  }
});

function showMessage(text, type) {
  message.innerHTML = `<div class="alert alert-${type}" role="alert">${text}</div>`;
}
