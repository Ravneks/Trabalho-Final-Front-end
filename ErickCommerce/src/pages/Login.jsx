import React, { useState } from "react";
import { userAuth } from "../api/userAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      await userAuth.login({ email, password: pass });
      nav("/"); // vai pra home depois do login
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="container login-page">
      <div className="login-card">
        <h2 className="login-brand">Entrar</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="label">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className="label">
            Senha
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          </label>

          <button className="btn" type="submit">Entrar</button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </main>
  );
}
