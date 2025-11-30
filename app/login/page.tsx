"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí luego conectarás con tu backend.
    router.push("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-mark">F</div>
          <span>FACTS</span>
        </div>

        <h1 className="auth-title">Inicia sesión en FACTS</h1>
        <p className="auth-sub">
          Accede a tu panel para generar recibos con QR y revisar tus facturas.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <span>Correo electrónico</span>
            <input
              type="email"
              placeholder="tu.correo@ejemplo.com"
              required
              className="input"
            />
          </label>

          <label className="field">
            <span>Contraseña</span>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="input"
            />
          </label>

          <button type="submit" className="btn btn-primary auth-submit">
            Entrar
          </button>
        </form>

        <p className="auth-footer">
  ¿Aún no tienes cuenta?{" "}
  <span
    className="auth-link"
    onClick={() => router.push("/register")}
  >
    Regístrate
  </span>
</p>

      </div>
    </div>
  );
}
