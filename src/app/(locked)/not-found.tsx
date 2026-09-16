// Scoped to the (locked) route group. notFound() calls inside this subtree
// (e.g. an unknown client slug in locked/[client]/page.tsx) do NOT bubble
// to app/global-not-found.tsx — experimental.globalNotFound only catches
// framework-level "no route matched" 404s, not explicit notFound() calls
// from a separate top-level root-layout group with its own <html><body>.
// This file is the (locked) group's own not-found boundary; (locked)/layout.tsx
// still wraps it, so it renders only the inner markup, no <html>/<body>.
//
// Deliberately generic (no client name, no report title) — an unknown
// client slug must not reveal which slugs exist.
export default function LockedNotFound() {
  return (
    <div className="wrap" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <p className="small">404 · This page could not be found.</p>
    </div>
  );
}
