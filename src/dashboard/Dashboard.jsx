import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout as signOut } from "../auth/auth.js";
import "./dashboard.css";

const initialUsers = [
  { id: 1, firstName: "Sarah", email: "sarah.johnson@example.com", status: "Active" },
  { id: 2, firstName: "Ahmad", email: "ahmad.khalil@example.com", status: "Active" },
  { id: 3, firstName: "Lina", email: "lina.haddad@example.com", status: "Active" },
  { id: 4, firstName: "Omar", email: "omar.nasser@example.com", status: "Active" },
];

function Icon({ name }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "home") {
    return <svg {...props}><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" /></svg>;
  }

  if (name === "users") {
    return <svg {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  }

  if (name === "search") {
    return <svg {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
  }

  if (name === "view") {
    return <svg {...props}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>;
  }

  if (name === "edit") {
    return <svg {...props}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" /></svg>;
  }

  if (name === "delete") {
    return <svg {...props}><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" /></svg>;
  }

  return null;
}

const initial = (name) => name.trim().slice(0, 1).toUpperCase();

export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState("Users");
  const [modal, setModal] = useState(null);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((user) =>
        `${user.firstName} ${user.email}`.toLowerCase().includes(q)
    );
  }, [users, query]);

  function toast(text) {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function saveUser(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const firstName = String(data.get("firstName")).trim();
    const email = String(data.get("email")).trim();

    if (modal.user) {
      setUsers((rows) =>
          rows.map((user) =>
              user.id === modal.user.id ? { ...user, firstName, email } : user
          )
      );
      toast("User information updated");
    } else {
      setUsers((rows) => [
        { id: Date.now(), firstName, email, status: "Active" },
        ...rows,
      ]);
      toast("User added");
    }

    setModal(null);
  }

  function logout() {
    signOut();
    navigate("/", { replace: true });
  }

  function deleteUser() {
    setUsers((rows) => rows.filter((user) => user.id !== modal.user.id));
    setModal(null);
    toast("User deleted");
  }

  return (
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <div className="dashboard-brand">
            <span className="dashboard-brand-icon">☕</span>
            <span>Luqmatna</span>
          </div>

          <p className="dashboard-nav-label">MENU</p>

          <nav className="dashboard-nav" aria-label="Main navigation">
            {["Home", "Users"].map((item) => (
                <button
                    key={item}
                    className={`dashboard-nav-item ${
                        page === item ? "is-active" : ""
                    }`}
                    onClick={() => setPage(item)}
                >
                  <Icon name={item.toLowerCase()} />
                  {item}
                </button>
            ))}
          </nav>

          <div className="dashboard-sidebar-bottom">
            <div className="dashboard-help">
              <strong>Need a hand?</strong>
              <span>Manage your account and users from this dashboard.</span>
            </div>

            <div className="dashboard-profile">
              <span className="dashboard-avatar">AD</span>
              <span>
              <strong>Admin User</strong>
              <small>Administrator</small>
            </span>
            </div>
          </div>
        </aside>

        <main className="dashboard-main">
          <header className="dashboard-topbar">
            <div className="dashboard-breadcrumb">
              Dashboard <span>/</span> <strong>{page}</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="dashboard-secondary" onClick={logout}>
                Log out
              </button>
              <div className="dashboard-admin-avatar">AD</div>
            </div>
          </header>

          {page === "Users" ? (
              <>
                <div className="dashboard-heading">
                  <div>
                    <span className="dashboard-eyebrow">LUQMATNA ADMIN</span>
                    <h1>User management</h1>
                    <p>View and manage everyone who has joined Luqmatna.</p>
                  </div>
                </div>

                <section className="dashboard-table-card">
                  <div className="dashboard-table-header">
                    <div>
                      <h2>All users</h2>
                      <p>A list of registered Luqmatna users</p>
                    </div>

                    <label className="dashboard-search">
                      <Icon name="search" />
                      <input
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          placeholder="Search users..."
                          aria-label="Search users"
                      />
                    </label>
                  </div>

                  <div className="dashboard-table-scroll">
                    <table className="dashboard-table">
                      <thead>
                      <tr>
                        <th>First name</th>
                        <th>Email address</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                      </thead>

                      <tbody>
                      {filtered.length ? (
                          filtered.map((user) => (
                              <tr key={user.id}>
                                <td>
                            <span className="dashboard-user">
                              <span className="dashboard-avatar">
                                {initial(user.firstName)}
                              </span>
                              <strong>{user.firstName}</strong>
                            </span>
                                </td>

                                <td>{user.email}</td>

                                <td>
                            <span className="dashboard-status">
                              {user.status}
                            </span>
                                </td>

                                <td>
                                  <div className="dashboard-actions">
                                    <button
                                        className="dashboard-action"
                                        title="Show user"
                                        aria-label={`Show ${user.firstName}`}
                                        onClick={() =>
                                            setModal({ type: "show", user })
                                        }
                                    >
                                      <Icon name="view" />
                                    </button>

                                    <button
                                        className="dashboard-action"
                                        title="Edit user"
                                        aria-label={`Edit ${user.firstName}`}
                                        onClick={() =>
                                            setModal({ type: "edit", user })
                                        }
                                    >
                                      <Icon name="edit" />
                                    </button>

                                    <button
                                        className="dashboard-action is-delete"
                                        title="Delete user"
                                        aria-label={`Delete ${user.firstName}`}
                                        onClick={() =>
                                            setModal({ type: "delete", user })
                                        }
                                    >
                                      <Icon name="delete" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                          ))
                      ) : (
                          <tr>
                            <td className="dashboard-empty" colSpan="4">
                              No users found.
                            </td>
                          </tr>
                      )}
                      </tbody>
                    </table>
                  </div>

                  <div className="dashboard-table-footer">
                    Showing {filtered.length} of {users.length} users
                  </div>
                </section>
              </>
          ) : (
              <>
                <div className="dashboard-heading">
                  <div>
                    <span className="dashboard-eyebrow">LUQMATNA ADMIN</span>
                    <h1>Home</h1>
                    <p>Welcome to your Luqmatna dashboard.</p>
                  </div>
                </div>

                <section className="dashboard-home-card">
                  <h2>Welcome back, Admin</h2>
                  <p>
                    Use the Users page to view registered users and manage their
                    information.
                  </p>
                  <button
                      className="dashboard-primary"
                      onClick={() => setPage("Users")}
                  >
                    Go to users
                  </button>
                </section>
              </>
          )}
        </main>

        {modal && (
            <div
                className="dashboard-overlay"
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setModal(null);
                }}
            >
              <section className="dashboard-modal" role="dialog" aria-modal="true">
                <header className="dashboard-modal-header">
                  <div>
                    <h2>
                      {modal.type === "show"
                          ? "User details"
                          : modal.type === "delete"
                              ? "Delete user"
                              : "Edit user"}
                    </h2>
                    <p>
                      {modal.type === "show"
                          ? "Account information"
                          : modal.type === "delete"
                              ? "This action cannot be undone."
                              : "Enter the user's information below."}
                    </p>
                  </div>

                  <button
                      className="dashboard-close"
                      aria-label="Close"
                      onClick={() => setModal(null)}
                  >
                    ×
                  </button>
                </header>

                {modal.type === "show" && (
                    <>
                      <div className="dashboard-modal-body">
                        <div className="dashboard-detail-user">
                    <span className="dashboard-avatar">
                      {initial(modal.user.firstName)}
                    </span>
                          <div>
                            <strong>{modal.user.firstName}</strong>
                            <small>{modal.user.email}</small>
                          </div>
                        </div>

                        <div className="dashboard-detail-row">
                          <span>First name</span>
                          <strong>{modal.user.firstName}</strong>
                        </div>

                        <div className="dashboard-detail-row">
                          <span>Email address</span>
                          <strong>{modal.user.email}</strong>
                        </div>
                      </div>

                      <div className="dashboard-modal-footer">
                        <button
                            className="dashboard-secondary"
                            onClick={() => setModal(null)}
                        >
                          Close
                        </button>
                      </div>
                    </>
                )}

                {modal.type === "edit" && (
                    <form className="dashboard-modal-body" onSubmit={saveUser}>
                      <label className="dashboard-field">
                        First name
                        <input
                            name="firstName"
                            defaultValue={modal.user?.firstName ?? ""}
                            required
                        />
                      </label>

                      <label className="dashboard-field">
                        Email address
                        <input
                            name="email"
                            type="email"
                            defaultValue={modal.user?.email ?? ""}
                            required
                        />
                      </label>

                      <label className="dashboard-field">
                        Password
                        <input
                            name="password"
                            type="password"
                            placeholder="Leave blank to keep current password"
                        />
                        <small>The current password is not shown.</small>
                      </label>

                      <div className="dashboard-modal-footer">
                        <button
                            type="button"
                            className="dashboard-secondary"
                            onClick={() => setModal(null)}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="dashboard-primary">
                          Save changes
                        </button>
                      </div>
                    </form>
                )}

                {modal.type === "delete" && (
                    <>
                      <div className="dashboard-modal-body">
                        <p className="dashboard-confirm-copy">
                          Are you sure you want to delete{" "}
                          <strong>{modal.user.firstName}</strong>? Their account will
                          be removed from this list.
                        </p>
                      </div>

                      <div className="dashboard-modal-footer">
                        <button
                            className="dashboard-secondary"
                            onClick={() => setModal(null)}
                        >
                          Cancel
                        </button>
                        <button
                            className="dashboard-danger"
                            onClick={deleteUser}
                        >
                          Delete user
                        </button>
                      </div>
                    </>
                )}
              </section>
            </div>
        )}

        {notice && (
            <div className="dashboard-toast" role="status">
              {notice}
            </div>
        )}
      </div>
  );
}