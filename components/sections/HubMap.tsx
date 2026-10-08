'use client';
import { useId } from 'react';
import { useReducedMotion } from 'framer-motion';

// Deterministic village positions around a central hub (viewBox 400×400, hub at 200,200).
const VILLAGES = [
  [78, 92], [190, 48], [312, 70], [352, 170], [338, 290], [262, 352], [148, 348], [56, 286], [40, 180], [122, 150], [276, 128], [290, 232], [126, 252], [206, 300],
] as const;

function curve([x, y]: readonly [number, number]) {
  const mx = (x + 200) / 2 + (y - 200) * 0.18;
  const my = (y + 200) / 2 - (x - 200) * 0.18;
  return `M200 200 Q ${mx} ${my} ${x} ${y}`;
}

/** Hub at the centre, villages linked by flowing dashed paths; a tractor and a crew travel on loop. */
export default function HubMap({ className = '', light = false }: { className?: string; light?: boolean }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const line = light ? '#2E7D32' : '#C9E58C';
  const dot = light ? '#1B4D22' : '#FAF7F0';
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Map: one Kisan Bandhu hub serving 10–15 surrounding villages, with tractors and crews dispatched along village roads">
      <defs>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#F2A900" stopOpacity=".35" />
          <stop offset="1" stopColor="#F2A900" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="175" fill="none" stroke={line} strokeOpacity=".25" strokeDasharray="2 6" />
      <circle cx="200" cy="200" r="110" fill="none" stroke={line} strokeOpacity=".18" strokeDasharray="2 6" />
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill={line} opacity=".8" fontFamily="var(--ff-mono)">
        10–15 km catchment
      </text>
      {VILLAGES.map((v, i) => (
        <path key={`p${i}`} id={`${uid}-route-${i}`} d={curve(v)} fill="none" stroke={line} strokeOpacity=".55" strokeWidth="1.6" className="dash-flow" strokeDasharray="6 6" />
      ))}
      {VILLAGES.map(([x, y], i) => (
        <g key={`v${i}`}>
          <circle cx={x} cy={y} r="9" fill={dot} opacity=".14" className="ping-dot" style={{ animationDelay: `${(i % 5) * 0.4}s` }} />
          <path d={`M${x - 7} ${y + 4} v-5 l7 -6 l7 6 v5 z`} fill={dot} />
        </g>
      ))}
      <circle cx="200" cy="200" r="60" fill={`url(#${uid}-glow)`} />
      <g>
        <circle cx="200" cy="200" r="30" fill="#F2A900" />
        <path d="M184 208 v-14 l16 -12 l16 12 v14 z" fill="#143D1E" />
        <rect x="195" y="198" width="10" height="10" fill="#F2A900" />
      </g>
      {!reduce && (
        <>
          {/* tractor */}
          <g>
            <circle r="9" fill="#F2A900" />
            <path d="M-5 2 h6 v-5 h3 l2 3 v2 z" fill="#143D1E" />
            <circle cx="-3" cy="4" r="2.4" fill="#143D1E" />
            <circle cx="4" cy="4" r="1.6" fill="#143D1E" />
            <animateMotion dur="7s" repeatCount="indefinite" rotate="0">
              <mpath href={`#${uid}-route-2`} />
            </animateMotion>
          </g>
          {/* crew */}
          <g>
            <circle r="9" fill="#C9E58C" />
            <circle cx="-2.5" cy="-2" r="2" fill="#143D1E" />
            <circle cx="3" cy="-2" r="2" fill="#143D1E" />
            <path d="M-6 5 q3.5 -5 7 0 M0 5 q3.5 -5 7 0" stroke="#143D1E" strokeWidth="1.6" fill="none" />
            <animateMotion dur="9s" repeatCount="indefinite" begin="1.5s">
              <mpath href={`#${uid}-route-7`} />
            </animateMotion>
          </g>
          <g>
            <circle r="7" fill="#FAF7F0" />
            <path d="M-3 0 h6 M0 -3 v6" stroke="#2E7D32" strokeWidth="1.8" />
            <animateMotion dur="8s" repeatCount="indefinite" begin="3s" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath href={`#${uid}-route-4`} />
            </animateMotion>
          </g>
        </>
      )}
    </svg>
  );
}
