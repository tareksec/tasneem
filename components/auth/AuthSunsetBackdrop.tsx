import React from "react";

export function AuthSunsetBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-[#E24E2B] selection:text-white">
      {/* Background Sky Gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#FDE8DB] via-[#F6B286] via-45%-[#D95338] via-70%-[#6D1B36] to-[#1C0819] pointer-events-none" />

      {/* Sun Glow */}
      <div className="fixed top-[18%] left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-b from-[#FFF2E2] to-[#FFA756]/40 blur-3xl opacity-70 pointer-events-none" />

      {/* Atmospheric Mountain Silhouette Layers (SVG) */}
      <div className="fixed inset-x-0 bottom-0 z-0 pointer-events-none h-[420px] sm:h-[500px] lg:h-[620px] overflow-hidden">
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full object-cover"
        >
          {/* Distant Mountain Layer 1 */}
          <path
            d="M0 340 L160 270 L340 330 L520 230 L720 310 L940 210 L1140 290 L1320 220 L1440 280 L1440 600 L0 600 Z"
            fill="#C0443E"
            fillOpacity="0.45"
          />

          {/* Mid Mountain Layer 2 with Pine Ridges */}
          <path
            d="M0 390 L120 340 L220 380 L380 300 L560 370 L680 290 L820 360 L1020 270 L1180 350 L1340 280 L1440 330 L1440 600 L0 600 Z"
            fill="#801C34"
            fillOpacity="0.75"
          />

          {/* Near Mountain Layer 3 with Evergreen Forest Silhouette */}
          <path
            d="M0 450 L90 410 L180 440 L280 390 L420 450 L560 380 L700 440 L850 370 L980 430 L1120 360 L1260 420 L1380 370 L1440 400 L1440 600 L0 600 Z"
            fill="#4A0D23"
            fillOpacity="0.9"
          />

          {/* Foreground Deep Silhouette Layer with Stylized Pine Trees */}
          <path
            d="M0 500 L80 470 L170 510 L310 450 L450 510 L590 450 L730 500 L870 440 L1010 490 L1150 430 L1290 480 L1440 430 L1440 600 L0 600 Z"
            fill="#1E0716"
          />

          {/* Individual Pine Tree Silhouettes on Lower Left & Right */}
          <g fill="#1E0716" opacity="0.95">
            {/* Left Pine Cluster */}
            <polygon points="40,360 30,410 50,410" />
            <polygon points="40,380 25,440 55,440" />
            <polygon points="40,410 20,480 60,480" />
            <rect x="38" y="480" width="4" height="40" />

            <polygon points="85,390 77,430 93,430" />
            <polygon points="85,410 72,460 98,460" />
            <polygon points="85,430 68,500 102,500" />
            <rect x="83" y="500" width="4" height="30" />

            {/* Right Pine Cluster */}
            <polygon points="1380,350 1370,400 1390,400" />
            <polygon points="1380,370 1365,430 1395,430" />
            <polygon points="1380,400 1360,470 1400,470" />
            <rect x="1378" y="470" width="4" height="40" />

            <polygon points="1340,380 1332,420 1348,420" />
            <polygon points="1340,400 1327,450 1353,450" />
            <polygon points="1340,420 1323,490 1357,490" />
            <rect x="1338" y="490" width="4" height="30" />
          </g>
        </svg>
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
