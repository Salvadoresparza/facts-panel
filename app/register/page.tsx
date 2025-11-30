"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AccountType = "emisor" | "cliente";

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("emisor");

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();

  // Guardamos el tipo de cuenta en el navegador
  if (typeof window !== "undefined") {
    window.localStorage.setItem("facts_account_type", accountType);
  }

  if (accountType === "emisor") {
    alert(
      "Registro de demo como EMISOR creado. Te llevaremos a un panel de ejemplo de FACTS."
    );
    router.push("/dashboard");
  } else {
    alert(
      "Registro de demo como CLIENTE creado. En producción, esta cuenta usaría la app FACTS para escanear QR y pedir facturas."
    );
    router.push("/dashboard");
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-mark">F</div>
          <span>FACTS</span>
        </div>

        <h1 className="auth-title">Crea tu cuenta FACTS</h1>
        <p className="auth-sub">
          Elige cómo quieres usar FACTS: para emitir facturas como negocio o
          profesional, o solo para pedir facturas como cliente final.
        </p>

        {/* TIPO DE CUENTA */}
        <div className="account-type-toggle">
          <button
            type="button"
            className={
              "account-type-option" +
              (accountType === "emisor" ? " active" : "")
            }
            onClick={() => setAccountType("emisor")}
          >
            Emito facturas
          </button>
          <button
            type="button"
            className={
              "account-type-option" +
              (accountType === "cliente" ? " active" : "")
            }
            onClick={() => setAccountType("cliente")}
          >
            Solo pido facturas
          </button>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* DATOS DE LA CUENTA (COMÚN) */}
          <h2 className="auth-section-title">Datos de la cuenta</h2>
          <p className="auth-section-sub">
            Estos datos se usan para iniciar sesión y comunicarnos contigo.
          </p>

          <div className="auth-grid-2">
            <label className="field">
              <span>Nombre completo</span>
              <input
                type="text"
                className="input"
                placeholder="Juan Pérez"
                required
              />
            </label>

            <label className="field">
              <span>Correo electrónico</span>
              <input
                type="email"
                className="input"
                placeholder="tu.correo@ejemplo.com"
                required
              />
            </label>
          </div>

          <div className="auth-grid-2">
            <label className="field">
              <span>Contraseña</span>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                required
              />
            </label>

            <label className="field">
              <span>Repetir contraseña</span>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                required
              />
            </label>
          </div>

          {/* SI ES EMISOR */}
          {accountType === "emisor" && (
            <>
              <h2 className="auth-section-title">Datos del negocio</h2>
              <p className="auth-section-sub">
                Configuramos tu cuenta como emisor de facturas (doctor, abogado,
                restaurante, comercio, etc.).
              </p>

              <label className="field">
                <span>Nombre comercial</span>
                <input
                  type="text"
                  className="input"
                  placeholder="Restaurante El Buen Sabor"
                  required
                />
              </label>

              <div className="auth-grid-2">
                <label className="field">
                  <span>RFC</span>
                  <input
                    type="text"
                    className="input"
                    placeholder="XAXX010101000"
                    required
                  />
                </label>

                <label className="field">
                  <span>Tipo de negocio</span>
                  <select className="input" required>
                    <option value="">Selecciona...</option>
                    <option>Restaurante / Cafetería</option>
                    <option>Clínica / Consultorio</option>
                    <option>Despacho / Servicios profesionales</option>
                    <option>Comercio / Retail</option>
                    <option>Otro</option>
                  </select>
                </label>
              </div>

              <div className="auth-grid-2">
                <label className="field">
                  <span>Régimen fiscal</span>
                  <input
                    type="text"
                    className="input"
                    placeholder="Régimen Simplificado de Confianza"
                  />
                </label>

                <label className="field">
                  <span>Facturas estimadas al mes</span>
                  <select className="input">
                    <option>&lt; 20</option>
                    <option>20 – 50</option>
                    <option>50 – 100</option>
                    <option>100 – 200</option>
                    <option>&gt; 200</option>
                  </select>
                </label>
              </div>

              <h2 className="auth-section-title">Planes y pagos</h2>
              <p className="auth-section-sub">
                En esta versión demo no configuramos cobros reales. En producción,
                elegirías tu plan y domiciliarías tu tarjeta desde el panel de
                FACTS, con total flexibilidad.
              </p>
            </>
          )}

          {/* SI ES CLIENTE FINAL */}
          {accountType === "cliente" && (
            <>
              <h2 className="auth-section-title">Datos fiscales para facturación</h2>
              <p className="auth-section-sub">
                Usaremos estos datos para generar tus facturas cuando escanees un
                QR en negocios afiliados a FACTS.
              </p>

              <div className="auth-grid-2">
                <label className="field">
                  <span>RFC</span>
                  <input
                    type="text"
                    className="input"
                    placeholder="XAXX010101000"
                    required
                  />
                </label>

                <label className="field">
                  <span>Nombre o razón social</span>
                  <input
                    type="text"
                    className="input"
                    placeholder="Nombre de la persona o empresa"
                  />
                </label>
              </div>

              <label className="field">
                <span>Uso de CFDI más frecuente</span>
                <select className="input">
                  <option value="">Selecciona...</option>
                  <option value="G03">G03 - Gastos en general</option>
                  <option value="P01">P01 - Por definir</option>
                  <option value="D01">
                    D01 - Honorarios médicos, dentales y hospitalarios
                  </option>
                </select>
              </label>

              <label className="field">
                <span>Correo para recibir facturas</span>
                <input
                  type="email"
                  className="input"
                  placeholder="facturas@ejemplo.com"
                />
              </label>
            </>
          )}

          <p className="auth-note">
            Esta es una versión de demostración. No se realizan validaciones con el
            SAT ni cargos a tarjetas. El objetivo es mostrar el flujo de producto.
          </p>

          <button type="submit" className="btn btn-primary auth-submit">
            {accountType === "emisor"
              ? "Crear cuenta como emisor"
              : "Crear cuenta como cliente"}
          </button>
        </form>
      </div>
    </div>
  );
}
