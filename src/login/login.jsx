import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    alert("Login form is ready — it will be connected to the API later.");
  }

  function handleRegisterClick() {
    navigate("/register");
  }

  return (
      <main className="login-page">
        <section className="login-card">
          <div className="brand">
            <div className="brand-icon">☕</div>
            <span>Luqmatna</span>
          </div>

          <div className="welcome">
            <span className="eyebrow">Welcome back</span>
            <h1>Sign in</h1>
            <p>Sign in to your account and order your favorite meal.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
            />

            <label htmlFor="password">Password</label>
            <div className="password-wrap">
              <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
              />

              <button
                  className="show-password"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#">Forgot password?</a>
            </div>

            <button className="submit-button" type="submit">
              Sign in
            </button>
          </form>

          <div className="register-prompt">
            <span>Don't have an account?</span>
            <button
                className="register-link"
                type="button"
                onClick={handleRegisterClick}
            >
              Sign up
            </button>
          </div>
        </section>
      </main>
  );
}