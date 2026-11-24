import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./registration.css";

const labelClass = "mt-[18px] mb-2 block text-sm font-bold";

const inputClass =
    "box-border h-[50px] w-full rounded-xl border border-solid border-field-line bg-field px-3.5 font-[inherit] text-ink outline-none focus:border-focus focus:shadow-[0_0_0_3px_#b879321c]";

const toggleClass =
    "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 font-[inherit] text-xs text-brand-link";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const fullName = String(data.get("fullName") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim().toLowerCase();
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, email, password }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
            response.status === 409
                ? "This email is already registered."
                : result?.message ||
                result?.detail ||
                "Could not create account. Please try again."
        );
        return;
      }

      navigate("/", {
        replace: true,
        state: { accountCreated: true, email },
      });
    } catch {
      setError("Cannot reach the server. Please try again.");
    }
  }

  function handleLoginClick() {
    navigate("/");
  }

  return (
      <main className="box-border grid min-h-screen place-items-center bg-cream bg-[radial-gradient(circle_at_15%_15%,#f2d9ad_0,transparent_28%)] p-6 font-[Tahoma,Arial,sans-serif] text-ink">
        <section className="box-border w-full max-w-110 rounded-3xl border border-solid border-line bg-white px-5.5 py-7 shadow-[0_24px_70px_#50371918] sm:p-9.5">
          <div className="flex items-center gap-2.5 text-[19px] font-extrabold text-brand-text">
            <div className="grid size-11 place-items-center rounded-[14px] bg-sand-soft text-[23px]">
              ☕
            </div>
            <span>Luqmatna</span>
          </div>

          <div className="mt-7.5 mb-6.5">
            <span className="text-[13px] font-bold text-brand">Join us</span>
            <h1 className="my-2 text-[30px] font-bold">Create your account</h1>
            <p className="m-0 leading-[1.8] text-muted">
              Sign up for a new account and order your favorite meal with ease.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName" className={labelClass}>
              Full name
            </label>
            <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className={inputClass}
            />

            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
                className={inputClass}
            />

            <label htmlFor="phone" className={labelClass}>
              Phone number
            </label>
            <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="07XXXXXXXX"
                autoComplete="tel"
                required
                className={inputClass}
            />

            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <div className="relative">
              <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className={`${inputClass} pr-15.5`}
              />
              <button
                  type="button"
                  className={toggleClass}
                  onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm password
            </label>
            <div className="relative">
              <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  className={`${inputClass} pr-15.5`}
              />
              <button
                  type="button"
                  className={toggleClass}
                  onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>

            {error && (
                <p role="alert" className="mt-3 mb-0 text-[13px] text-red-700">
                  {error}
                </p>
            )}

            <label className="mt-4.25 mb-5.75 flex items-center gap-1.75 text-[13px] text-muted-dark">
              <input type="checkbox" required />
              I agree to the
              <a href="#" className="text-brand-link no-underline hover:underline">
                Terms &amp; Conditions
              </a>
            </label>

            <button
                type="submit"
                className="h-13 w-full cursor-pointer rounded-xl border-0 bg-brand font-[inherit] font-bold text-white hover:bg-brand-dark"
            >
              Create account
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted">
            <span>Already have an account?</span>
            <button
                type="button"
                onClick={handleLoginClick}
                className="cursor-pointer border-0 bg-transparent p-0 font-[inherit] font-bold text-brand hover:underline"
            >
              Sign in
            </button>
          </div>
        </section>
      </main>
  );
}