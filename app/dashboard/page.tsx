"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { QRCodeCanvas } from "qrcode.react";

type DashboardView = "emisor" | "cliente";

export default function DashboardPage() {
  const router = useRouter();

  const [view, setView] = useState<DashboardView>("emisor");

  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState("");
  const [qrData, setQrData] = useState<string | null>(null);

  const total = parseFloat(amount || "0");
  const subtotal = total > 0 ? total / 1.16 : 0;
  const iva = total > 0 ? total - subtotal : 0;

  const handleGenerateQr = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      cliente: clientName || "Consumidor final",
      monto: total.toFixed(2),
      concepto: concept || "Consumo",
      fecha: new Date().toISOString().slice(0, 10),
    };

    setQrData(JSON.stringify(payload));
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <div className="logo-mark">F</div>
          <span>FACTS</span>
        </div>

        <nav className="dashboard-nav">
          {view === "emisor" ? (
            <>
              <div className="dashboard-nav-section">General</div>
              <button className="dashboard-nav-item dashboard-nav-item-active">
                Resumen
              </button>
              <button className="dashboard-nav-item">Facturas</button>
              <button className="dashboard-nav-item">Recibos con QR</button>
              <button className="dashboard-nav-item">Clientes</button>

              <div className="dashboard-nav-section">Configuración</div>
              <button className="dashboard-nav-item">Datos fiscales</button>
              <button className="dashboard-nav-item">Planes y facturación</button>
            </>
          ) : (
            <>
              <div className="dashboard-nav-section">Mi cuenta</div>
              <button className="dashboard-nav-item dashboard-nav-item-active">
                Mis facturas
              </button>
              <button className="dashboard-nav-item">Mis datos fiscales</button>

              <div className="dashboard-nav-section">Configuración</div>
              <button className="dashboard-nav-item">
                Preferencias de correo
              </button>
              <button className="dashboard-nav-item">Seguridad</button>
            </>
          )}
        </nav>
      </aside>

      {/* MAIN */}
      <main className="dashboard-main">
        {/* HEADER */}
        <header className="dashboard-header">
          <div>
            <h1>
              {view === "emisor" ? "Panel de emisor" : "Panel de cliente"}
            </h1>
            <p className="dashboard-muted">
              {view === "emisor"
                ? "Ve tu actividad de facturación y genera recibos con QR."
                : "Consulta las facturas que generes escaneando QR en negocios afiliados."}
            </p>
          </div>

          <div className="dashboard-header-actions">
            <div className="view-toggle">
              <button
                type="button"
                className={
                  "view-toggle-btn" + (view === "emisor" ? " active" : "")
                }
                onClick={() => setView("emisor")}
              >
                Emisor
              </button>
              <button
                type="button"
                className={
                  "view-toggle-btn" + (view === "cliente" ? " active" : "")
                }
                onClick={() => setView("cliente")}
              >
                Cliente
              </button>
            </div>

            <button className="btn btn-ghost" onClick={() => router.push("/")}>
              Cerrar sesión
            </button>

            {view === "emisor" && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  const el = document.getElementById("qr-demo");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Nuevo recibo con QR
              </button>
            )}
          </div>
        </header>

        {view === "emisor" ? (
          <>
            {/* RESUMEN EMISOR */}
            <section className="dashboard-grid">
              <div className="dashboard-card">
                <h2>Facturas emitidas este mes</h2>
                <p className="dashboard-number">72</p>
                <p className="dashboard-muted">Límite de tu plan: 100 facturas</p>
              </div>

              <div className="dashboard-card">
                <h2>Facturas restantes</h2>
                <p className="dashboard-number">28</p>
                <p className="dashboard-muted">
                  Te avisaremos cuando llegues al 80% y al 100% del uso.
                </p>
              </div>

              <div className="dashboard-card">
                <h2>Facturas generadas por tus clientes</h2>
                <p className="dashboard-number">64</p>
                <p className="dashboard-muted">
                  89% de tus facturas ya se generan por autofacturación.
                </p>
              </div>
            </section>

            {/* QR + RECIBO */}
            <section id="qr-demo" className="dashboard-qr">
              <div className="dashboard-qr-left">
                <h2>Generar recibo con QR</h2>
                <p className="dashboard-muted">
                  Completa los datos del cliente y el importe. FACTS genera un
                  recibo con QR para que tu cliente pueda autofacturarse.
                </p>

                <form className="qr-form" onSubmit={handleGenerateQr}>
                  <div className="field">
                    <span>Nombre del cliente</span>
                    <input
                      className="input"
                      type="text"
                      placeholder="Juan Pérez"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>

                  <div className="qr-form-row">
                    <div className="field">
                      <span>Monto total</span>
                      <input
                        className="input"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="450.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>

                    <div className="field">
                      <span>Concepto</span>
                      <input
                        className="input"
                        type="text"
                        placeholder="Consumo en restaurante"
                        value={concept}
                        onChange={(e) => setConcept(e.target.value)}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Generar recibo
                  </button>
                </form>
              </div>

              <div className="dashboard-qr-right">
                <div className="qr-preview-card">
                  <h3>Recibo de pago</h3>
                  <p className="dashboard-muted">
                    Este es el recibo que entregas a tu cliente. El QR permite
                    que genere su factura desde FACTS.
                  </p>

                  <div className="receipt">
                    <div className="receipt-header">
                      <div className="receipt-business">
                        <strong>FACTS RESTAURANTE</strong>
                        <span>RFC: DEMO800101XXX</span>
                        <span>Av. Ejemplo 123, Guadalajara, Jal.</span>
                      </div>
                      <div className="receipt-meta">
                        <span>Fecha: {new Date().toLocaleDateString()}</span>
                        <span>
                          Hora: {new Date().toLocaleTimeString().slice(0, 5)} h
                        </span>
                        <span>Folio: DEMO-0001</span>
                      </div>
                    </div>

                    <div className="receipt-body">
                      <div className="receipt-client">
                        {clientName
                          ? `Cliente: ${clientName}`
                          : "Cliente: Consumidor final"}
                      </div>
                      <div className="receipt-concept">
                        {concept || "Consumo"}
                      </div>

                      <div className="receipt-amounts">
                        <div className="receipt-row">
                          <span>Subtotal</span>
                          <span>
                            {total > 0 ? `$${subtotal.toFixed(2)}` : "$0.00"}
                          </span>
                        </div>
                        <div className="receipt-row">
                          <span>IVA 16%</span>
                          <span>
                            {total > 0 ? `$${iva.toFixed(2)}` : "$0.00"}
                          </span>
                        </div>
                        <div className="receipt-row receipt-total">
                          <span>Total</span>
                          <span>
                            {total > 0 ? `$${total.toFixed(2)}` : "$0.00"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="receipt-qr">
                      {qrData ? (
                        <QRCodeCanvas value={qrData} size={140} />
                      ) : (
                        <span className="qr-placeholder">
                          Genera el recibo para ver el código QR.
                        </span>
                      )}
                    </div>

                    <div className="receipt-footer">
                      <span>Recibo generado con factsmx.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ACTIVIDAD EMISOR */}
            <section className="dashboard-table-section">
              <div className="dashboard-table-header">
                <h2>Actividad reciente</h2>
                <p className="dashboard-muted">
                  Últimas facturas generadas por tus clientes con FACTS.
                </p>
              </div>

              <div className="dashboard-table">
                <div className="dashboard-table-row dashboard-table-row-head">
                  <span>Fecha</span>
                  <span>Cliente</span>
                  <span>Monto</span>
                  <span>Uso CFDI</span>
                  <span>Origen</span>
                </div>

                <div className="dashboard-table-row">
                  <span>10/02/2025</span>
                  <span>Juan Pérez</span>
                  <span>$450.00</span>
                  <span>G03</span>
                  <span>QR en restaurante</span>
                </div>

                <div className="dashboard-table-row">
                  <span>10/02/2025</span>
                  <span>Clínica Santa María</span>
                  <span>$1,250.00</span>
                  <span>D01</span>
                  <span>FACTS Professional</span>
                </div>

                <div className="dashboard-table-row">
                  <span>09/02/2025</span>
                  <span>María López</span>
                  <span>$320.00</span>
                  <span>P01</span>
                  <span>QR en consultorio</span>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* DASHBOARD CLIENTE */}
            <section className="dashboard-grid">
              <div className="dashboard-card">
                <h2>Facturas guardadas</h2>
                <p className="dashboard-number">0</p>
                <p className="dashboard-muted">
                  Aquí verás todas las facturas que generes escaneando QR con
                  FACTS.
                </p>
              </div>

              <div className="dashboard-card">
                <h2>Negocios afiliados</h2>
                <p className="dashboard-number">0</p>
                <p className="dashboard-muted">
                  Muy pronto podrás ver en qué negocios ya puedes usar FACTS.
                </p>
              </div>
            </section>

            <section className="dashboard-table-section">
              <div className="dashboard-table-header">
                <h2>Mis facturas</h2>
                <p className="dashboard-muted">
                  En la versión real, aquí aparecerán las facturas que generes
                  al escanear códigos QR con la app FACTS.
                </p>
              </div>

              <div className="dashboard-empty">
                Aún no tienes facturas en esta demo. Imagina este espacio como
                tu historial de CFDIs siempre a la mano.
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
