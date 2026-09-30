import type { TsdChainHeroProps } from "@/types/content";

// Dikey zincir: dört halka, aşağı akan mal (Ink) ve yukarı akan para
// (Flare) noktaları, sağda köşeli ayraç. Noktalar SVG animateMotion;
// reduced-motion'da CSS ile gizli (tahsildar.css .chain-art).
const YS = [50, 165, 280, 395];

export function ChainHero({ nodes, bracket, legendGoods, legendMoney }: TsdChainHeroProps) {
  return (
    <div className="chain-art" aria-hidden="true">
      <svg viewBox="0 0 380 470" xmlns="http://www.w3.org/2000/svg">
        {YS.slice(0, 3).map((y, i) => (
          <line key={y} className="ln" x1="46" y1={y + 26} x2="46" y2={YS[i + 1] - 26} />
        ))}
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <circle className="goods" r="3.5">
              <animateMotion
                dur="4.2s"
                begin={`-${(k * 1.4).toFixed(2)}s`}
                repeatCount="indefinite"
                path={`M39 ${YS[0] + 28} L39 ${YS[3] - 28}`}
              />
            </circle>
            <circle className="money" r="4">
              <animateMotion
                dur="3.4s"
                begin={`-${(k * 1.13).toFixed(2)}s`}
                repeatCount="indefinite"
                path={`M53 ${YS[3] - 28} L53 ${YS[0] + 28}`}
              />
            </circle>
          </g>
        ))}
        {nodes.map((n, i) => {
          const y = YS[i];
          return (
            <g key={n.title}>
              <circle className="nd" cx="46" cy={y} r="26" />
              <text className="nd-n" x="46" y={y + 4.5} textAnchor="middle">
                {i + 1}
              </text>
              <text className="nd-t" x="90" y={y - 2}>
                {n.title}
              </text>
              <text className="nd-s" x="90" y={y + 17}>
                {n.sub}
              </text>
            </g>
          );
        })}
        <path className="br" d="M322 34 H334 V411 H322" />
        <text className="br-t" transform="translate(356 222) rotate(90)" textAnchor="middle">
          {bracket}
        </text>
        <circle className="goods" cx="96" cy="452" r="3.5" />
        <text className="lg-t" x="106" y="456">
          {legendGoods}
        </text>
        <circle className="money" cx="206" cy="452" r="4" />
        <text className="lg-t" x="216" y="456">
          {legendMoney}
        </text>
      </svg>
    </div>
  );
}
