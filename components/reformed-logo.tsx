'use client'

import React from 'react'

interface ReformedLogoProps {
  className?: string
}

export function ReformedLogo({ className = 'h-10 w-auto' }: ReformedLogoProps) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform hover:scale-[1.04] transition-transform duration-300 ease-out"
      >
        {/* Dynamic drop shadow for a premium tactile feel */}
        <defs>
          <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0a192f" floodOpacity="0.18" />
          </filter>
        </defs>

        <g filter="url(#logo-shadow)">
          {/* ─────────────────────────────────────────────────────────────────
              1. MAIN BLUE R-BOOK COVER (Left & Right Isometric Shells)
          ───────────────────────────────────────────────────────────────── */}
          {/* Main isometric R outline base - Deep royal blue color */}
          <path
            d="M 100 22 
               L 154 58 
               L 154 116 
               L 100 152 
               L 46 116 
               L 46 58 
               Z"
            fill="#124D85"
            stroke="#0e3c68"
            strokeWidth="1"
          />

          {/* ─────────────────────────────────────────────────────────────────
              2. BOOK PAGES STRIPES (Left bottom representation of pages layout)
          ───────────────────────────────────────────────────────────────── */}
          {/* White pages showing on lower left bottom edge */}
          <path
            d="M 52 110 
               L 100 142
               L 100 147
               L 52 115 
               Z"
            fill="#EFECE5"
          />
          <path
            d="M 52 119 
               L 100 151
               L 100 156
               L 52 124 
               Z"
            fill="#DCD9D0"
          />

          {/* Underlay shadow/spine accent lines */}
          <path
            d="M 52 112 M 100 144"
            stroke="#124D85"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* ─────────────────────────────────────────────────────────────────
              3. RED INTERIOR PARALLELOGRAM (Bookmark / Sovereign Accent)
          ───────────────────────────────────────────────────────────────── */}
          {/* This represents the red bookmark in the inner fold/top face */}
          <path
            d="M 78 40 
               L 104 57 
               L 88 88 
               L 62 71 
               Z"
            fill="#D92D2D"
            stroke="#b82121"
            strokeWidth="0.8"
          />

          {/* ─────────────────────────────────────────────────────────────────
              4. INNER CUTOUTS & LIGHT / PARCHMENT PAGES FOR EXCELLENT CONTRAST
          ───────────────────────────────────────────────────────────────── */}
          {/* Top-Right inner page of the open 'R' book */}
          <path
            d="M 100 52 
               L 142 80 
               L 110 114 
               L 100 101 
               Z"
            fill="#FAF8F3"
            stroke="#E3DCBD"
            strokeWidth="0.8"
          />

          {/* Inner Shadow / fold depth of the book core */}
          <path
            d="M 100 52 L 100 101"
            stroke="#C0BCAE"
            strokeWidth="1.2"
          />

          {/* ─────────────────────────────────────────────────────────────────
              5. BOOK WRITING AND DETAILS (ESTD-2020)
          ───────────────────────────────────────────────────────────────── */}
          {/* Curved spine ornament representing outer book covers */}
          <path
            d="M 46 58 
               L 100 22 
               L 154 58 
               M 46 64 
               L 100 28 
               L 154 64"
            stroke="#FAF8F3"
            strokeWidth="1.2"
            strokeOpacity="0.85"
          />

          {/* Spine crease lines depicting the spine of the R */}
          <path
            d="M 100 22 L 100 152"
            stroke="#FAF8F3"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />

          {/* Double underline spine binding page layer marks */}
          <path
            d="M 100 152 
               L 154 116 
               M 100 146 
               L 154 110"
            stroke="#FAF8F3"
            strokeWidth="1"
            strokeOpacity="0.7"
          />

          {/* ESTD-2020 Slanted typography on the open page */}
          <text
            x="114"
            y="98"
            fill="#124D85"
            fontSize="7.5"
            fontWeight="bold"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            transform="rotate(6, 114, 98)"
            className="select-none tracking-widest opacity-80"
          >
            ESTD-2020
          </text>
        </g>
      </svg>
    </div>
  )
}
