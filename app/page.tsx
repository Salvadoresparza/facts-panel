"use client";

import { useState, ReactNode } from "react";
import { useRouter } from "next/navigation";


type AccordionItemProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={() => setOpen(!open)}>
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* HEADER */}
      <header>
        <div className="logo">
          <div className="logo-mark">F</div>
          <span>FACTS</span>
        </div>

        <nav className="nav-links">
          <button className="nav-link-btn" onClick={() => scrollToSection("como-funciona")}>
            Cómo funciona
          </button>
          <button className="nav-link-btn" onClick={() => scrollToSection("beneficios")}>
            Beneficios
          </button>
          <button className="nav-link-btn" onClick={() => scrollToSection("precios")}>
            Precios
          </button>
          <button className="nav-link-btn" onClick={() => scrollToSection("faq")}>
            Preguntas frecuentes
          </button>
        </nav>

        <div className="nav-actions">
          <button
  className="btn btn-ghost"
  onClick={() => router.push("/login")}
>
  Iniciar sesión
</button>

          <a href="mailto:contacto@factsmx.com?subject=Quiero%20una%20demo%20de%20FACTS">
            <button className="btn btn-primary">Agenda una demo</button>
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div>
            <div className="chip">
              <span className="chip-dot"></span>
              Autofacturación universal para negocios y profesionales
            </div>
            <h1 className="hero-title">
              Autofacturación en <span>2 segundos</span>.<br />
              Sin capturar un solo dato.
            </h1>
            <p className="hero-sub">
              FACTS conecta tu negocio o consultorio con una app universal para tus clientes.
              Ellos escanean el QR de su ticket o recibo digital y reciben su factura automáticamente.
              Tú no vuelves a generar facturas manuales.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => scrollToSection("precios")}>
                Quiero usar FACTS
              </button>
              <button className="btn btn-ghost">Ver demo en video</button>
            </div>
            <p className="hero-note">
              Ideal para restaurantes, clínicas, consultorios, despachos, comercios y profesionales independientes.
            </p>
            <div className="hero-stats">
              <div>
                <strong>Hasta 90% menos tiempo</strong>
                en procesos de facturación.
              </div>
              <div>
                <strong>0 capturas manuales</strong>
                de RFC, uso de CFDI o correos.
              </div>
            </div>
          </div>

          <aside className="hero-card">
            <h3>Así funciona FACTS</h3>
            <ol>
              <li>Tu negocio genera un ticket o recibo digital con QR FACTS.</li>
              <li>Tu cliente escanea el QR con la app FACTS.</li>
              <li>FACTS une el ticket con sus datos fiscales y timbra la factura.</li>
              <li>El cliente recibe XML y PDF en segundos. Tú ves todo en tu panel.</li>
            </ol>
            <div className="hero-card-highlight">
              <strong>FACTS Professional</strong> permite a doctores, abogados y otros
              profesionales sin POS generar recibos digitales con QR para que sus clientes
              se autofacturen sin pedirles RFC ni capturar nada.
            </div>
          </aside>
        </section>

        {/* CÓMO FUNCIONA */}
        <section id="como-funciona" className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Cómo funciona FACTS</h2>
              <p className="section-sub">Para negocios con POS y para profesionales independientes.</p>
            </div>
          </div>

          <div className="grid">
            <div className="card">
              <div className="tag">Para restaurantes y comercios</div>
              <h3>FACTS Business</h3>
              <p>
                Integra FACTS a tu punto de venta. Cada ticket incluye un QR único.
                Cuando tu cliente lo escanea, FACTS genera la factura con sus datos
                fiscales, sin que tu staff haga nada adicional.
              </p>
            </div>
            <div className="card">
              <div className="tag">Para doctores, abogados, consultores</div>
              <h3>FACTS Professional</h3>
              <p>
                Genera un recibo digital con QR en 5 segundos desde tu panel web.
                Tu paciente o cliente escanea el QR, y FACTS le timbra la factura
                sin que tú tengas que pedirle ni un solo dato.
              </p>
            </div>
            <div className="card">
              <div className="tag">Para tus clientes finales</div>
              <h3>App FACTS</h3>
              <p>
                Tus clientes registran sus datos fiscales una sola vez en la app FACTS.
                A partir de ahí, solo escanean QR y reciben su factura al instante,
                sin capturas repetitivas ni correos perdidos.
              </p>
            </div>
            <div className="card">
              <div className="tag">Backoffice</div>
              <h3>Panel con control total</h3>
              <p>
                Consulta todas las facturas emitidas, por sucursal o profesional,
                descarga XML/PDF, exporta reportes y entiende tu operación fiscal
                mes a mes desde un solo lugar.
              </p>
            </div>
          </div>
        </section>

        {/* BENEFICIOS (con acordeón) */}
        <section id="beneficios" className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Beneficios para tu negocio</h2>
              <p className="section-sub">Toca cada beneficio para ver el detalle.</p>
            </div>
          </div>

          <div className="accordion">
            <AccordionItem title="Ahorra tiempo operativo" defaultOpen>
              Elimina horas mensuales capturando RFCs, usos de CFDI, correos y montos.
              Tu equipo se enfoca en atender mejor a tus clientes, no en pelear con la facturación.
            </AccordionItem>

            <AccordionItem title="Menos quejas y correcciones">
              Tus clientes generan su propia factura con sus datos fiscales correctos.
              Menos errores, menos correos reclamando CFDIs mal emitidos.
            </AccordionItem>

            <AccordionItem title="Experiencia premium para tus clientes">
              Tu negocio se percibe moderno, rápido y organizado. Facturar deja de ser un castigo
              y se vuelve un proceso transparente y automatizado.
            </AccordionItem>

            <AccordionItem title="Pago por uso y planes claros">
              Puedes pagar por factura o contratar un plan mensual con descuentos por volumen.
              Sin letras chiquitas ni costos escondidos.
            </AccordionItem>
          </div>
        </section>

        {/* PRECIOS */}
        <section id="precios" className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Planes y precios</h2>
              <p className="section-sub">Paga solo por lo que usas. Descuentos automáticos al crecer.</p>
            </div>
          </div>

          {/* Pago por uso */}
          <div className="card" style={{ marginBottom: 16 }}>
            <span className="tag">Sin plan</span>
            <h3>Pago por factura</h3>
            <p className="price" style={{ marginTop: 4 }}>
              $3.50 <span>MXN por factura timbrada</span>
            </p>
            <p className="price-meta">
              Ideal si facturas pocas veces al mes o estás probando FACTS.
            </p>
          </div>

          {/* Planes */}
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="tag">Profesionales independientes</div>
              <h3>Profesional</h3>
              <p className="price">
                $79 <span>/ mes</span>
              </p>
              <p className="price-meta">Incluye 25 facturas</p>
              <ul className="pricing-list">
                <li>Ideal para doctores, abogados, psicólogos, freelancers.</li>
                <li>Panel básico + recibos con QR.</li>
              </ul>
              <div className="pricing-cta">Empezar con Plan Profesional →</div>
            </div>

            <div className="pricing-card">
              <div className="tag">Profesionales con más volumen</div>
              <h3>Profesional Plus</h3>
              <p className="price">
                $149 <span>/ mes</span>
              </p>
              <p className="price-meta">Incluye 50 facturas</p>
              <ul className="pricing-list">
                <li>Consultorios pequeños, terapeutas con demanda constante.</li>
                <li>Incluye reportes simples y exportación.</li>
              </ul>
              <div className="pricing-cta">Elegir Profesional Plus →</div>
            </div>

            <div className="pricing-card featured">
              <div className="pill">Más elegido</div>
              <div className="tag">Comercios pequeños</div>
              <h3>Negocio Básico</h3>
              <p className="price">
                $299 <span>/ mes</span>
              </p>
              <p className="price-meta">Incluye 100 facturas</p>
              <ul className="pricing-list">
                <li>Perfecto para restaurantes pequeños, barberías, gimnasios.</li>
                <li>Acceso completo a FACTS Business y FACTS Professional.</li>
              </ul>
              <div className="pricing-cta">Contratar Negocio Básico →</div>
            </div>

            <div className="pricing-card">
              <div className="tag">Negocios en crecimiento</div>
              <h3>Negocio Medio</h3>
              <p className="price">
                $499 <span>/ mes</span>
              </p>
              <p className="price-meta">Incluye 200 facturas</p>
              <ul className="pricing-list">
                <li>Restaurantes medianos, clínicas, consultorios con varios profesionales.</li>
                <li>Soporte prioritario y más opciones de reporte.</li>
              </ul>
              <div className="pricing-cta">Subir a Negocio Medio →</div>
            </div>

            <div className="pricing-card">
              <div className="tag">Operación alta</div>
              <h3>Alta Operación</h3>
              <p className="price">
                $899 <span>/ mes</span>
              </p>
              <p className="price-meta">Incluye 400 facturas</p>
              <ul className="pricing-list">
                <li>Restaurantes grandes, clínicas con varias sucursales.</li>
                <li>Reportes avanzados y métricas por sucursal.</li>
              </ul>
              <div className="pricing-cta">Hablar con ventas →</div>
            </div>

            <div className="pricing-card">
              <div className="tag">Cadenas y grandes volúmenes</div>
              <h3>Enterprise</h3>
              <p className="price">
                $1,599 <span>/ mes</span>
              </p>
              <p className="price-meta">Incluye 800 facturas</p>
              <ul className="pricing-list">
                <li>Hospitales, cadenas de restaurantes, franquicias.</li>
                <li>Integración POS + soporte dedicado.</li>
              </ul>
              <div className="pricing-cta">Diseñar un plan Enterprise →</div>
            </div>
          </div>
        </section>

        {/* FAQ con acordeón */}
        <section id="faq" className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Preguntas frecuentes</h2>
              <p className="section-sub">Toca cada pregunta para ver la respuesta.</p>
            </div>
          </div>

          <div className="accordion">
            <AccordionItem title="¿FACTS sustituye a mi PAC actual?" defaultOpen>
              FACTS se integra con un PAC autorizado para timbrar tus CFDIs.
              No tienes que cambiar nada en el SAT; simplemente automatizamos el proceso
              de generación de facturas y la experiencia con tus clientes.
            </AccordionItem>

            <AccordionItem title="¿Qué pasa si un cliente no tiene la app FACTS?">
              Puede descargarla gratis, registrar sus datos fiscales una única vez
              y a partir de entonces usarla en todos los negocios afiliados.
              Si ya la tiene, facturar es tan fácil como escanear un QR.
            </AccordionItem>

            <AccordionItem title="Soy doctor/abogado y no tengo POS, ¿puedo usar FACTS?">
              Sí. Con FACTS Professional puedes generar un recibo digital con QR desde tu panel.
              Tu paciente o cliente escanea el código y obtiene la factura sin que tengas
              que pedirle datos ni entrar al portal del SAT.
            </AccordionItem>

            <AccordionItem title="¿Estoy obligado a un plan fijo?">
              No. Puedes pagar solo por factura a $3.50 MXN si tu volumen es bajo.
              Si tu operación crece, te conviene pasar a un plan mensual con mejor precio por factura.
            </AccordionItem>
          </div>
        </section>
      </main>

      <footer>
        <div>© 2025 FACTS. Autofacturación inteligente para negocios y profesionales en México.</div>
        <div className="footer-links">
          <a href="#precios">Precios</a>
          <a href="#faq">FAQ</a>
          <a href="#">Términos y condiciones</a>
          <a href="#">Aviso de privacidad</a>
        </div>
      </footer>
    </>
  );
}
