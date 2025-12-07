"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { QRCodeCanvas } from "qrcode.react";

type DashboardView = "emisor" | "cliente";

export default function DashboardPage() {
  const router = useRouter();

  const [view, setView] = useState<DashboardView>("emisor");
  const [accountType, setAccountType] = useState<DashboardView | null>(null);

  const [businessName, setBusinessName] = useState("FACTS");
  const [businessRFC, setBusinessRFC] = useState("XAXX010101000");

  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerWhatsapp, setCustomerWhatsapp] = useState("");

  const [qrData, setQrData] = useState<string | null>(null);
  const [receiptDate, setReceiptDate] = useState<Date | null>(null);

  const total = parseFloat(amount || "0");

  // Leer configuración básica desde el registro
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedType = window.localStorage.getItem("facts_account_type");
    if (storedType === "emisor" || storedType === "cliente") {
      setAccountType(storedType);
      setView(storedType);
    }

    const storedName = window.localStorage.getItem("facts_business_name");
    const storedRfc = window.localStorage.getItem("facts_business_rfc");

    if (storedName && storedName.trim().length > 0) {
      setBusinessName(storedName);
    }
    if (storedRfc && storedRfc.trim().length > 0) {
      setBusinessRFC(storedRfc);
    }
  }, []);

  const handleGenerateQr = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNaN(total) || total <= 0) {
      alert("Ingresa un monto total mayor a 0.");
      return;
    }

    const now = new Date();
    setReceiptDate(now);

    const dateString = now.toISOString().slice(0, 10);

    const payload = {
      negocio: businessName,
      rfcEmisor: businessRFC,
      monto: total.toFixed(2),
      concepto: concept || "Consumo",
      fecha: dateString,
      contactoEmail: customerEmail || undefined,
      contactoWhatsapp: customerWhatsapp || undefined,
    };

    setQrData(JSON.stringify(payload));

    const fechaLinea = now.toLocaleDateString();
    const horaLinea = now.toLocaleTimeString().slice(0, 5);

    const baseMessageLines = [
      `Recibo de pago - ${businessName}`,
      `RFC emisor: ${businessRFC}`,
      `Fecha: ${fechaLinea}  Hora: ${horaLinea} h`,
      `Concepto: ${concept || "Consumo"}`,
      `Importe: $${total.toFixed(2)} (IVA incluido)`,
      "",
      "Para descargar tu factura, abre la app FACTS y escanea el código QR de este recibo."
    ];

    const baseMessage = baseMessageLines.join("\n");

    if (typeof window !== "undefined") {
      if (customerWhatsapp.trim()) {
        const phone = customerWhatsapp.replace(/[^0-9]/g, "");
        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
          baseMessage
        )}`;
        window.open(waUrl, "_blank");
      } else if (customerEmail.trim()) {
        const mailto = `mailto:${encodeURIComponent(
          customerEmail
        )}?subject=${encodeURIComponent(
          "Tu recibo de pago"
        )}&body=${encodeURIComponent(baseMessage)}`;
        window.location.href = mailto;
      }
    }
  };

  const handlePrint = () => {
    if (typeof window === "undefined") return;
    window.print();
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <div className="logo-mark">F</div>
          <span>FACTS</span>
        </div>

        {accountType && (
          <p className="dashboard-muted" style={{ fontSize: 11, marginBottom: 8 }}>
            Te registraste como{" "}
            <strong>
              {accountType === "emisor" ? "emisor" : "cliente"}
            </strong>
          </p>
        )}

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
              <button className="dashboard-nav-item">
                Planes y facturación
              </button>
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
                : "Consulta y organiza las facturas que generas escaneando QR en negocios afiliados."}
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

            <span className="chip">
              <span className="chip-dot" />
              {view === "emisor" ? "Modo emisor" : "Modo cliente"}
            </span>

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
                <p className="dashboard-muted">
                  Límite de tu plan: 100 facturas
                </p>
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
                  La mayoría de tus facturas ya se generan por autofacturación.
                </p>
              </div>
            </section>

            {/* QR + RECIBO */}
            <section id="qr-demo" className="dashboard-qr">
              <div className="dashboard-qr-left">
                <h2>Generar recibo con QR</h2>
                <p className="dashboard-muted">
                  Completa el concepto y el importe. FACTS genera un recibo con
                  QR para que tu cliente pueda solicitar su factura desde la app.
                </p>

                <form className="qr-form" onSubmit={handleGenerateQr}>
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

                  <div className="qr-form-row">
                    <div className="field">
                      <span>WhatsApp del cliente (opcional)</span>
                      <input
                        className="input"
                        type="tel"
                        placeholder="521XXXXXXXXXX"
                        value={customerWhatsapp}
                        onChange={(e) => setCustomerWhatsapp(e.target.value)}
                      />
                    </div>

                    <div className="field">
                      <span>Correo del cliente (opcional)</span>
                      <input
                        className="input"
                        type="email"
                        placeholder="cliente@correo.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
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
                    que genere su factura desde la app FACTS.
                  </p>

                  <div className="receipt receipt-print-area">
                    <div className="receipt-header">
                      <div className="receipt-business">
                        <strong>{businessName}</strong>
                        <span>RFC: {businessRFC}</span>
                        <span>Dirección registrada en FACTS</span>
                      </div>
                      <div className="receipt-meta">
                        <span>
                          Fecha:{" "}
                          {receiptDate
                            ? receiptDate.toLocaleDateString()
                            : "—"}
                        </span>
                        <span>
                          Hora:{" "}
                          {receiptDate
                            ? `${receiptDate
                                .toLocaleTimeString()
                                .slice(0, 5)} h`
                            : "—"}
                        </span>
                        <span>Folio: FACTS-0001</span>
                      </div>
                    </div>

                    <div className="receipt-body">
                      <div className="receipt-concept">
                        {concept || "Consumo"}
                      </div>

                      <div className="receipt-amounts">
                        <div className="receipt-row receipt-total">
                          <span>Importe</span>
                          <span>
                            {total > 0 ? `$${total.toFixed(2)}` : "$0.00"}
                          </span>
                        </div>
                      </div>

                      <div className="receipt-row">
                        <span> </span>
                        <span style={{ fontSize: 10 }}>
                          Precios ya incluyen IVA.
                        </span>
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

                    <div className="receipt-qr-legend">
                      Escanea este código con la app <strong>FACTS</strong> para
                      descargar tu factura.
                    </div>

                    <div className="receipt-footer">
                      <span>Recibo generado con factsmx.com</span>
                    </div>
                  </div>

                  <div className="receipt-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={handlePrint}
                    >
                      Imprimir recibo
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={handlePrint}
                    >
                      Descargar PDF
                    </button>
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
                  Aquí verás todas las facturas que generes escaneando códigos
                  QR con FACTS.
                </p>
              </div>

              <div className="dashboard-card">
                <h2>Negocios afiliados</h2>
                <p className="dashboard-number">0</p>
                <p className="dashboard-muted">
                  Muy pronto podrás ver en qué negocios ya puedes usar FACTS
                  para solicitar tus facturas.
                </p>
              </div>
            </section>

            <section className="dashboard-table-section">
              <div className="dashboard-table-header">
                <h2>Mis facturas</h2>
                <p className="dashboard-muted">
                  Aquí se concentrará el historial de CFDIs que generes con la
                  app FACTS.
                </p>
              </div>

              <div className="dashboard-empty">
                Aún no tienes facturas aquí. Este espacio concentrará tu
                historial de CFDIs siempre a la mano.
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
