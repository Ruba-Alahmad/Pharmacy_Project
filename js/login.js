const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
const forgotPassword = document.getElementById("forgotPassword");
const togglePassword = document.getElementById("togglePassword");

//----------------------
//  عند الضغط على زر Login
//----------------------
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!role || !email || !password) {
    showMessage("Please fill all fields.", "danger");
    return;
  }

  try {
    //  إرسال الطلب للباك اند
    const res = await fetch("https://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();

    //  خطأ
    if (!res.ok || data.success === false) {
      showMessage(data.message || "Invalid email, password, or role.", "danger");
      return;
    }

    // ✔️ نجاح
    showMessage("Login successful! Redirecting...", "success");

    //  تخزين بيانات المستخدم (اختياري)
    localStorage.setItem("user", JSON.stringify(data.user));

    //  التحويل حسب الدور
    setTimeout(() => {
      if (data.user.role === "admin") {
        window.location.href = "admin.html";
      } else if (data.user.role === "pharmacist") {
        window.location.href = "pharmacist.html";
      }
    }, 1500);

  } catch (error) {
    showMessage("Server error. Please try again later.", "danger");
    console.error(error);
  }
});

//----------------------
//  Show / Hide Password
//----------------------
togglePassword.addEventListener("click", () => {
  const passwordField = document.getElementById("password");
  const type = passwordField.type === "password" ? "text" : "password";
  passwordField.type = type;

  togglePassword.innerHTML = type === "password"
    ? '<i class="fas fa-eye"></i>'
    : '<i class="fas fa-eye-slash"></i>';
});

//----------------------
//  Forgot password
//----------------------
forgotPassword.addEventListener("click", () => {
  window.location.href = "reset-password.html";
});

//----------------------
//  Function: message
//----------------------
function showMessage(text, type) {
  message.innerHTML = `<div class="alert alert-${type}" role="alert">${text}</div>`;
}





