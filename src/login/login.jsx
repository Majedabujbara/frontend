import { useState } from "react";
import "./login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    alert("واجهة الدخول جاهزة—سيتم ربطها بالـ API لاحقًا.");
  }

  function handleRegisterClick() {
    alert("صفحة التسجيل سيتم ربطها لاحقًا.");
  }

  return (
      <main className="login-page" dir="rtl">
        <section className="login-card">
          <div className="brand">
            <div className="brand-icon">☕</div>
            <span>لقمتنا</span>
          </div>

          <div className="welcome">
            <span className="eyebrow">أهلًا وسهلًا</span>
            <h1>سجّل دخولك</h1>
            <p>ادخل إلى حسابك واطلب وجبتك المفضلة.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
            />

            <label htmlFor="password">كلمة المرور</label>
            <div className="password-wrap">
              <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="أدخل كلمة المرور"
                  autoComplete="current-password"
                  required
              />

              <button
                  className="show-password"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "إخفاء" : "إظهار"}
              </button>
            </div>

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" />
                تذكرني
              </label>

              <a href="#">نسيت كلمة المرور؟</a>
            </div>

            <button className="submit-button" type="submit">
              تسجيل الدخول
            </button>
          </form>

          <div className="register-prompt">
            <span>ما عندك حساب؟</span>
            <button
                className="register-link"
                type="button"
                onClick={handleRegisterClick}
            >
              التسجيل
            </button>
          </div>
        </section>
      </main>
  );
}