// src/pages/DevReporteSource.tsx
// Dev-only viewer for src/pages/ReportePublico.tsx — NOT mounted in production.
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// Vite raw import: bundles the file content as a string at build time.
// eslint-disable-next-line import/no-unresolved
import source from "./ReportePublico.tsx?raw";

export default function DevReporteSource() {
  const [copied, setCopied] = useState(false);
  const lines = source.split("\n").length;
  const bytes = new Blob([source]).size;

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = source;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
    }
  };

  const download = () => {
    const blob = new Blob([source], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ReportePublico.tsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
      <Helmet>
        <title>DEV · ReportePublico.tsx source</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header style={{ position: "sticky", top: 0, zIndex: 10, background: "#020617", borderBottom: "1px solid #1e293b", padding: "12px 20px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <strong style={{ fontSize: 14 }}>src/pages/ReportePublico.tsx</strong>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>{lines} lines · {(bytes / 1024).toFixed(1)} KB</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            onClick={copy}
            style={{ background: copied ? "#16a34a" : "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            {copied ? "✓ Copiado" : "Copiar todo"}
          </button>
          <button
            onClick={download}
            style={{ background: "#334155", color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            Descargar .tsx
          </button>
        </div>
      </header>

      <pre style={{ margin: 0, padding: 20, fontSize: 12, lineHeight: 1.5, whiteSpace: "pre", overflow: "auto" }}>
        {source}
      </pre>
    </main>
  );
}
