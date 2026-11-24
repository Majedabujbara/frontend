const API_URL = "";
const STORAGE_KEY = "luqmatna_auth";

export async function login(email, password) {
    let response;

    try {
        response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
    } catch {
        throw new Error("Cannot reach the server. Please try again.");
    }

    if (response.status === 401 || response.status === 400) {
        throw new Error("Incorrect email or password.");
    }

    if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
    }

    let data;
    try {
        data = await response.json();
    } catch {
        throw new Error("Something went wrong. Please try again.");
    }

    const token = data?.accessToken ?? data?.token;

    if (!token) {
        throw new Error("Something went wrong. Please try again.");
    }

    return { ...data, token };
}

export async function logout() {
    clearSession();
}

export function saveSession(data, remember) {
    clearSession();

    const storage = remember ? localStorage : sessionStorage;

    try {
        storage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // The user simply won't stay signed in.
    }
}

export function getSession() {
    try {
        const raw =
            sessionStorage.getItem(STORAGE_KEY) ??
            localStorage.getItem(STORAGE_KEY);

        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function clearSession() {
    try {
        sessionStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        // Ignore storage errors.
    }
}

function isTokenExpired(token) {
    try {
        const payload = token
            .split(".")[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const { exp } = JSON.parse(atob(payload));
        return typeof exp === "number" && exp * 1000 <= Date.now();
    } catch {
        return true;
    }
}

export function isAuthenticated() {
    const session = getSession();

    if (!session?.token) return false;

    if (isTokenExpired(session.token)) {
        clearSession();
        return false;
    }

    return true;
}