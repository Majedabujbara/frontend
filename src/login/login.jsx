import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, saveSession } from "../auth/auth.js";
import "./login.css";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!location.state?.accountCreated) return;

    setToast("Account created successfully.");

    const timer = window.setTimeout(() => {
      setToast("");
      navigate(location.pathname, { replace: true, state: null });
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.state, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const data = await login(email.trim(), password);
      saveSession(data, remember);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  function handleRegisterClick() {
    navigate("/register");
  }

  return (
      <main className="login-page">
        {toast && (
            <div
                role="status"
                style={{
                  position: "fixed",
                  top: 20,
                  right: 20,
                  zIndex: 1000,
                  padding: "14px 20px",
                  borderRadius: 10,
                  background: "#e8f7ec",
                  border: "1px solid #b8dfc1",
                  color: "#236b35",
                  boxShadow: "0 8px 24px #0002",
                }}
            >
              {toast}
            </div>
        )}

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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />

            <label htmlFor="password">Password</label>
            <div className="password-wrap">
              <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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
                <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                />
                Remember me
              </label>

              <a href="#">Forgot password?</a>
            </div>

            {error && (
                <p
                    role="alert"
                    style={{
                      margin: "0 0 16px",
                      padding: "11px 13px",
                      borderRadius: 10,
                      background: "#fff3f1",
                      border: "1px solid #edc8c2",
                      color: "#bb4c3b",
                      fontSize: 13,
                    }}
                >
                  {error}
                </p>
            )}

            <button
                className="submit-button"
                type="submit"
                disabled={loading}
                style={loading ? { opacity: 0.7, cursor: "wait" } : undefined}
            >
              {loading ? "Signing in..." : "Sign in"}
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