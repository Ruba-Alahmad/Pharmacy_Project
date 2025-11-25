const signupForm = document.getElementById("signupForm");
const message = document.getElementById("message");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!username || !email || !password || !role) {
    showMessage("Please fill in all fields.", "danger");
    return;
  }

  // إرسال البيانات للباك-إند
  fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, role })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      // حساب جديد تم إنشاؤه → إيميل تحقق تم إرساله
      showMessage("Account created! Please check your email to activate your account.", "success");
      signupForm.reset();
    } else {
      showMessage(data.message, "danger");
    }
  })
  .catch(() => {
    showMessage("Server error. Please try again later.", "danger");
  });
});

function showMessage(text, type) {
  message.innerHTML = `<div class="alert alert-${type}" role="alert">${text}</div>`;
}





