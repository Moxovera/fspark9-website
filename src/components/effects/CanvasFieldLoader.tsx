"use client";

import dynamic from "next/dynamic";

// CLAUDE.md: mouse tracking canvas efekti ssr:false ile yüklenecek —
// sunucuda canvas'ın hiçbir işi yok. Next.js Server Component'lerde
// `dynamic(..., { ssr: false })` çağrısına izin vermiyor ("Please move it
// into a Client Component") — page.tsx server olduğu için bu çağrı bir
// client sarmalayıcıya taşındı.
const CanvasField = dynamic(() => import("./CanvasField"), { ssr: false });

export default CanvasField;
