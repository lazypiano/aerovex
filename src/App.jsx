import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --sky: #0a0f1e;
    --sky2: #0d1a2e;
    --horizon: #0e2a4a;
    --electric: #00d4ff;
    --pulse: #4af0c4;
    --glow: #0099cc;
    --warn: #ff6b35;
    --white: #f0f6ff;
    --muted: #5a7a9a;
    --card: rgba(13, 26, 46, 0.85);
    --border: rgba(0, 212, 255, 0.15);
  }

  .aam-root {
    font-family: 'Syne', sans-serif;
    background: var(--sky);
    min-height: 100vh;
    color: var(--white);
    position: relative;
    overflow-x: hidden;
  }

  /* Animated sky background */
  .sky-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    background: radial-gradient(ellipse at 20% 50%, #0a2040 0%, transparent 60%),
                radial-gradient(ellipse at 80% 20%, #001830 0%, transparent 50%),
                linear-gradient(180deg, #020710 0%, #0a1628 40%, #0d2240 100%);
  }

  .grid-overlay {
    position: fixed;
    inset: 0;
    z-index: 0;
    background-image:
      linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridDrift 20s linear infinite;
  }

  @keyframes gridDrift {
    0% { transform: translateY(0); }
    100% { transform: translateY(60px); }
  }

  .horizon-glow {
    position: fixed;
    bottom: -100px;
    left: -10%;
    right: -10%;
    height: 300px;
    background: radial-gradient(ellipse at center bottom, rgba(0,153,204,0.12) 0%, transparent 70%);
    z-index: 0;
    pointer-events: none;
  }

  /* Stars */
  .stars {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    animation: twinkle var(--d, 3s) var(--delay, 0s) ease-in-out infinite alternate;
  }

  @keyframes twinkle {
    from { opacity: 0.1; }
    to { opacity: 0.8; }
  }

  /* Layout */
  .content {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px 60px;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32px 0 48px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 48px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-mark {
    width: 40px;
    height: 40px;
    position: relative;
  }

  .logo-text {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 0.08em;
    background: linear-gradient(135deg, var(--electric), var(--pulse));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .logo-sub {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .status-pill {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--pulse);
    background: rgba(74, 240, 196, 0.08);
    border: 1px solid rgba(74, 240, 196, 0.2);
    padding: 6px 14px;
    border-radius: 20px;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background: var(--pulse);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }

  /* Hero */
  .hero {
    margin-bottom: 48px;
  }

  .hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--electric);
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-bottom: 12px;
    opacity: 0.8;
  }

  .hero-title {
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
  }

  .hero-title span {
    background: linear-gradient(135deg, var(--electric) 0%, var(--pulse) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-sub {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: var(--muted);
    letter-spacing: 0.05em;
    line-height: 1.7;
  }

  /* Booking Card */
  .booking-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 60px rgba(0, 212, 255, 0.05), 0 30px 80px rgba(0,0,0,0.4);
    margin-bottom: 32px;
  }

  .card-tabs {
    display: flex;
    border-bottom: 1px solid var(--border);
  }

  .tab {
    flex: 1;
    padding: 18px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-align: center;
    cursor: pointer;
    color: var(--muted);
    border: none;
    background: transparent;
    font-family: 'Syne', sans-serif;
    transition: all 0.2s;
    position: relative;
  }

  .tab.active {
    color: var(--electric);
    background: rgba(0, 212, 255, 0.04);
  }

  .tab.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--electric), transparent);
  }

  .card-body {
    padding: 32px;
  }

  /* Route selector */
  .route-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 12px;
    align-items: center;
    margin-bottom: 24px;
  }

  .swap-btn {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: rgba(0, 212, 255, 0.05);
    color: var(--electric);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    font-size: 18px;
  }

  .swap-btn:hover {
    background: rgba(0, 212, 255, 0.12);
    border-color: var(--electric);
    transform: rotate(180deg);
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--electric);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0.7;
  }

  .field-select, .field-input {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 16px;
    color: var(--white);
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 600;
    width: 100%;
    outline: none;
    transition: all 0.2s;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
  }

  .field-select:focus, .field-input:focus {
    border-color: rgba(0, 212, 255, 0.5);
    background: rgba(0, 212, 255, 0.05);
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.08);
  }

  .field-select option {
    background: #0d1a2e;
    color: var(--white);
  }

  .field-input::placeholder {
    color: var(--muted);
    font-weight: 400;
  }

  .details-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 28px;
  }

  .search-btn {
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, var(--glow), var(--electric));
    border: none;
    border-radius: 12px;
    color: var(--sky);
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.25s;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
  }

  .search-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--pulse), var(--electric));
    opacity: 0;
    transition: opacity 0.25s;
  }

  .search-btn:hover::before { opacity: 1; }
  .search-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0, 212, 255, 0.35); }
  .search-btn:active { transform: translateY(0); }

  .search-btn span { position: relative; z-index: 1; }

  /* Results */
  .results-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .results-title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: var(--muted);
    text-transform: uppercase;
  }

  .results-count {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: var(--electric);
    opacity: 0.7;
  }

  .flight-card {
    background: rgba(10, 20, 35, 0.6);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 14px;
    cursor: pointer;
    transition: all 0.22s;
    position: relative;
    overflow: hidden;
  }

  .flight-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, var(--electric), var(--pulse));
    opacity: 0;
    transition: opacity 0.2s;
  }

  .flight-card:hover {
    border-color: rgba(0, 212, 255, 0.35);
    background: rgba(0, 212, 255, 0.04);
    transform: translateX(4px);
  }

  .flight-card:hover::before { opacity: 1; }

  .flight-card.selected {
    border-color: rgba(0, 212, 255, 0.5);
    background: rgba(0, 212, 255, 0.06);
  }

  .flight-card.selected::before { opacity: 1; }

  .flight-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .flight-times {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .time-block { text-align: center; }

  .time-value {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .time-port {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.1em;
    margin-top: 4px;
  }

  .flight-path {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 0 16px;
  }

  .path-duration {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--electric);
    letter-spacing: 0.15em;
    opacity: 0.7;
  }

  .path-line {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, var(--border), rgba(0,212,255,0.4), var(--border));
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .path-craft {
    font-size: 16px;
    background: var(--sky);
    padding: 0 6px;
    filter: drop-shadow(0 0 6px rgba(0,212,255,0.5));
  }

  .path-stops {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--pulse);
    letter-spacing: 0.1em;
  }

  .flight-price {
    text-align: right;
  }

  .price-value {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(135deg, var(--white), var(--electric));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }

  .price-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.1em;
    margin-top: 4px;
  }

  .flight-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 14px;
    border-top: 1px solid var(--border);
  }

  .meta-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.08em;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .tag-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--electric);
    opacity: 0.5;
  }

  .tag-green .tag-dot { background: var(--pulse); }
  .tag-warn .tag-dot { background: var(--warn); }

  .select-badge {
    margin-left: auto;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--electric);
    border: 1px solid rgba(0,212,255,0.3);
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.1em;
    transition: all 0.2s;
  }

  .flight-card.selected .select-badge {
    background: rgba(0,212,255,0.1);
    color: var(--electric);
  }

  /* Booking modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(2, 7, 16, 0.85);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal {
    background: #0a1628;
    border: 1px solid rgba(0,212,255,0.2);
    border-radius: 24px;
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 0 80px rgba(0,212,255,0.1), 0 40px 100px rgba(0,0,0,0.5);
    animation: slideUp 0.25s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .modal-header {
    padding: 28px 28px 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .modal-title {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  .modal-sub {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    margin-top: 4px;
    letter-spacing: 0.08em;
  }

  .close-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .close-btn:hover { color: var(--white); border-color: rgba(255,255,255,0.3); }

  .modal-body { padding: 24px 28px 28px; }

  .flight-summary {
    background: rgba(0,212,255,0.04);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 20px;
    margin-bottom: 24px;
  }

  .summary-route {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .summary-port {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--electric);
  }

  .summary-arrow { color: var(--muted); font-size: 20px; }

  .summary-details {
    display: flex;
    gap: 20px;
  }

  .summary-item {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  .summary-item strong {
    display: block;
    color: var(--white);
    font-size: 13px;
    margin-top: 2px;
  }

  /* Form */
  .form-section {
    margin-bottom: 24px;
  }

  .form-section-title {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--electric);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 14px;
    opacity: 0.7;
  }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .form-row.single { grid-template-columns: 1fr; }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }

  .form-field:last-child { margin-bottom: 0; }

  .form-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .form-input {
    background: rgba(0,0,0,0.3);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    color: var(--white);
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    width: 100%;
    outline: none;
    transition: all 0.2s;
  }

  .form-input:focus {
    border-color: rgba(0,212,255,0.4);
    background: rgba(0,212,255,0.04);
  }

  .form-input::placeholder { color: var(--muted); font-weight: 400; }

  .pricing-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    font-size: 13px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 8px;
  }

  .pricing-label { color: var(--muted); font-family: 'DM Mono', monospace; font-size: 12px; letter-spacing: 0.05em; }
  .pricing-value { font-weight: 600; }

  .pricing-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
  }

  .pricing-total-label { font-weight: 700; letter-spacing: 0.05em; }
  .pricing-total-value { font-size: 22px; font-weight: 800; color: var(--electric); }

  .confirm-btn {
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, var(--glow), var(--electric));
    border: none;
    border-radius: 12px;
    color: var(--sky);
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.25s;
    text-transform: uppercase;
    margin-top: 20px;
  }

  .confirm-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,212,255,0.35); }

  /* Success */
  .success-screen {
    text-align: center;
    padding: 40px 28px;
  }

  .success-icon {
    font-size: 64px;
    margin-bottom: 20px;
    filter: drop-shadow(0 0 20px rgba(74,240,196,0.6));
    animation: floatIcon 3s ease-in-out infinite;
  }

  @keyframes floatIcon {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .success-title {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 10px;
    background: linear-gradient(135deg, var(--pulse), var(--electric));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .success-sub {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .booking-ref {
    font-family: 'DM Mono', monospace;
    font-size: 22px;
    font-weight: 500;
    color: var(--electric);
    background: rgba(0,212,255,0.06);
    border: 1px solid var(--border);
    padding: 14px 24px;
    border-radius: 10px;
    letter-spacing: 0.2em;
    margin-bottom: 28px;
  }

  /* Stats bar */
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 40px;
  }

  .stat-item {
    background: rgba(13, 26, 46, 0.7);
    padding: 20px;
    text-align: center;
  }

  .stat-value {
    font-size: 26px;
    font-weight: 800;
    background: linear-gradient(135deg, var(--white), var(--electric));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
    margin-bottom: 4px;
  }

  .stat-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  @media (max-width: 600px) {
    .route-row { grid-template-columns: 1fr auto 1fr; }
    .details-row { grid-template-columns: 1fr 1fr; }
    .details-row > *:last-child { grid-column: 1/-1; }
    .flight-times { gap: 10px; }
    .time-value { font-size: 18px; }
    .price-value { font-size: 22px; }
    .stats-bar { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
  }
`;

const PORTS = [
  { code: "LAX", name: "Los Angeles Skyport", city: "Los Angeles" },
  { code: "SFO", name: "SF Embarcadero Pad", city: "San Francisco" },
  { code: "NYC", name: "Hudson Yards Vertiport", city: "New York" },
  { code: "MIA", name: "Brickell Air Hub", city: "Miami" },
  { code: "CHI", name: "Lakeshore Skyport", city: "Chicago" },
  { code: "DAL", name: "Uptown Vertiport", city: "Dallas" },
  { code: "DEN", name: "Mile High Skypad", city: "Denver" },
  { code: "SEA", name: "Puget Sound Airpad", city: "Seattle" },
];

const CRAFTS = ["Joby S4", "Archer Midnight", "Wisk Cora", "Lilium Jet", "Overair Butterfly"];
const CLASSES = ["Economy Pod", "Business Air", "First Altitude"];

function generateFlights(from, to, date) {
  const departures = ["06:15", "08:30", "10:45", "12:00", "14:20", "16:50", "18:35", "20:10"];
  const durations = [22, 24, 26, 28, 30, 32, 35, 38];
  const prices = [129, 149, 159, 179, 199, 219, 249, 289];
  const baseFlights = departures.slice(0, 6).map((dep, i) => {
    const [h, m] = dep.split(":").map(Number);
    const dur = durations[i];
    const arrH = Math.floor((h * 60 + m + dur) / 60) % 24;
    const arrM = (h * 60 + m + dur) % 60;
    const arr = `${String(arrH).padStart(2, "0")}:${String(arrM).padStart(2, "0")}`;
    return {
      id: i,
      dep, arr,
      duration: `${dur}m`,
      price: prices[i],
      craft: CRAFTS[i % CRAFTS.length],
      seats: Math.floor(Math.random() * 8) + 2,
      emission: Math.floor(Math.random() * 3) + 1,
      quiet: Math.random() > 0.4,
    };
  });
  return baseFlights;
}

const StarField = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    dur: 2 + Math.random() * 3,
  }));
  return (
    <div className="stars">
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          top: `${s.top}%`, left: `${s.left}%`,
          "--d": `${s.dur}s`, "--delay": `${s.delay}s`
        }} />
      ))}
    </div>
  );
};

export default function AAMBooking() {
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("LAX");
  const [to, setTo] = useState("SFO");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [flightClass, setFlightClass] = useState("Economy Pod");
  const [flights, setFlights] = useState(null);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingRef] = useState(() => "AAM-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  const [form, setForm] = useState({ first: "", last: "", email: "", phone: "", card: "", exp: "", cvv: "" });

  const swap = () => { setFrom(to); setTo(from); };

  const search = () => {
    if (!from || !to || from === to) return;
    setFlights(generateFlights(from, to, date));
    setSelected(null);
  };

  const book = () => {
    if (!selected) return;
    setModal(true);
  };

  const confirm = () => {
    if (!form.first || !form.last || !form.email) return;
    setSuccess(true);
  };

  const fromPort = PORTS.find(p => p.code === from);
  const toPort = PORTS.find(p => p.code === to);
  const selFlight = flights?.find(f => f.id === selected);

  return (
    <div className="aam-root">
      <style>{style}</style>
      <div className="sky-bg" />
      <div className="grid-overlay" />
      <div className="horizon-glow" />
      <StarField />

      <div className="content">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <svg className="logo-mark" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L36 20L20 30L4 20L20 4Z" stroke="#00d4ff" strokeWidth="1.5" fill="none" opacity="0.6"/>
              <path d="M8 20L20 10L32 20" stroke="#4af0c4" strokeWidth="1.5" fill="none"/>
              <circle cx="20" cy="20" r="3" fill="#00d4ff"/>
              <path d="M20 10V30" stroke="#00d4ff" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4"/>
            </svg>
            <div>
              <div className="logo-text">AEROVEX</div>
              <div className="logo-sub">Advanced Air Mobility</div>
            </div>
          </div>
          <div className="status-pill">
            <div className="status-dot" />
            All routes active
          </div>
        </header>

        {/* Hero */}
        <div className="hero">
          <div className="hero-eyebrow">Next-generation urban air travel</div>
          <h1 className="hero-title">Fly above<br /><span>the city.</span></h1>
          <p className="hero-sub">Zero-emission eVTOL flights between city skyports.<br />Quiet, fast, and electric.</p>
        </div>

        {/* Stats */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-value">24</div>
            <div className="stat-label">Active Skyports</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">0g</div>
            <div className="stat-label">CO₂ Emissions</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">~25m</div>
            <div className="stat-label">Avg. Flight Time</div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="booking-card">
          <div className="card-tabs">
            {["oneway", "roundtrip", "charter"].map(t => (
              <button key={t} className={`tab ${tripType === t ? "active" : ""}`} onClick={() => setTripType(t)}>
                {t === "oneway" ? "One Way" : t === "roundtrip" ? "Round Trip" : "Charter"}
              </button>
            ))}
          </div>
          <div className="card-body">
            {/* Route row */}
            <div className="route-row">
              <div className="field-group">
                <div className="field-label">From</div>
                <select className="field-select" value={from} onChange={e => setFrom(e.target.value)}>
                  {PORTS.map(p => (
                    <option key={p.code} value={p.code}>{p.code} — {p.city}</option>
                  ))}
                </select>
              </div>
              <button className="swap-btn" onClick={swap}>⇄</button>
              <div className="field-group">
                <div className="field-label">To</div>
                <select className="field-select" value={to} onChange={e => setTo(e.target.value)}>
                  {PORTS.filter(p => p.code !== from).map(p => (
                    <option key={p.code} value={p.code}>{p.code} — {p.city}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Details */}
            <div className="details-row">
              <div className="field-group">
                <div className="field-label">Depart</div>
                <input type="date" className="field-input" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="field-group">
                <div className="field-label">Passengers</div>
                <select className="field-select" value={passengers} onChange={e => setPassengers(e.target.value)}>
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} passenger{n > 1 ? "s" : ""}</option>)}
                </select>
              </div>
              <div className="field-group">
                <div className="field-label">Class</div>
                <select className="field-select" value={flightClass} onChange={e => setFlightClass(e.target.value)}>
                  {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <button className="search-btn" onClick={search}>
              <span>Search Flights →</span>
            </button>
          </div>
        </div>

        {/* Results */}
        {flights && (
          <div>
            <div className="results-header">
              <div className="results-title">Available Flights</div>
              <div className="results-count">{from} → {to} · {flights.length} options</div>
            </div>
            {flights.map(f => (
              <div key={f.id} className={`flight-card ${selected === f.id ? "selected" : ""}`} onClick={() => setSelected(f.id)}>
                <div className="flight-main">
                  <div className="flight-times">
                    <div className="time-block">
                      <div className="time-value">{f.dep}</div>
                      <div className="time-port">{from}</div>
                    </div>
                    <div className="flight-path">
                      <div className="path-duration">{f.duration}</div>
                      <div className="path-line">
                        <span className="path-craft">✦</span>
                      </div>
                      <div className="path-stops">direct</div>
                    </div>
                    <div className="time-block">
                      <div className="time-value">{f.arr}</div>
                      <div className="time-port">{to}</div>
                    </div>
                  </div>
                  <div className="flight-price">
                    <div className="price-value">${f.price}</div>
                    <div className="price-label">per person</div>
                  </div>
                </div>
                <div className="flight-meta">
                  <div className="meta-tag tag-green"><div className="tag-dot" />Zero emission</div>
                  <div className="meta-tag"><div className="tag-dot" />{f.craft}</div>
                  <div className="meta-tag"><div className="tag-dot" />{f.seats} seats left</div>
                  {f.quiet && <div className="meta-tag tag-green"><div className="tag-dot" />Quiet mode</div>}
                  <div className="select-badge">{selected === f.id ? "✓ Selected" : "Select"}</div>
                </div>
              </div>
            ))}

            {selected !== null && (
              <button className="search-btn" style={{ marginTop: 8 }} onClick={book}>
                <span>Continue to Booking →</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && !success && setModal(false)}>
          <div className="modal">
            {!success ? (
              <>
                <div className="modal-header">
                  <div>
                    <div className="modal-title">Confirm Booking</div>
                    <div className="modal-sub">{fromPort?.city} → {toPort?.city}</div>
                  </div>
                  <button className="close-btn" onClick={() => setModal(false)}>×</button>
                </div>
                <div className="modal-body">
                  {/* Flight Summary */}
                  <div className="flight-summary">
                    <div className="summary-route">
                      <div className="summary-port">{from}</div>
                      <div className="summary-arrow">→</div>
                      <div className="summary-port">{to}</div>
                    </div>
                    <div className="summary-details">
                      <div className="summary-item">Depart<strong>{selFlight?.dep}</strong></div>
                      <div className="summary-item">Arrive<strong>{selFlight?.arr}</strong></div>
                      <div className="summary-item">Duration<strong>{selFlight?.duration}</strong></div>
                      <div className="summary-item">Aircraft<strong>{selFlight?.craft}</strong></div>
                    </div>
                  </div>

                  {/* Passenger Info */}
                  <div className="form-section">
                    <div className="form-section-title">Passenger Details</div>
                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">First Name</label>
                        <input className="form-input" placeholder="Jane" value={form.first} onChange={e => setForm({...form, first: e.target.value})} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Last Name</label>
                        <input className="form-input" placeholder="Doe" value={form.last} onChange={e => setForm({...form, last: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-row single">
                      <div className="form-field">
                        <label className="form-label">Email</label>
                        <input className="form-input" type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-row single">
                      <div className="form-field">
                        <label className="form-label">Phone</label>
                        <input className="form-input" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="form-section">
                    <div className="form-section-title">Payment</div>
                    <div className="form-row single">
                      <div className="form-field">
                        <label className="form-label">Card Number</label>
                        <input className="form-input" placeholder="•••• •••• •••• ••••" value={form.card} onChange={e => setForm({...form, card: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">Expiry</label>
                        <input className="form-input" placeholder="MM / YY" value={form.exp} onChange={e => setForm({...form, exp: e.target.value})} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">CVV</label>
                        <input className="form-input" placeholder="•••" value={form.cvv} onChange={e => setForm({...form, cvv: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <div className="pricing-row">
                      <span className="pricing-label">Base fare × {passengers}</span>
                      <span className="pricing-value">${(selFlight?.price || 0) * parseInt(passengers)}</span>
                    </div>
                    <div className="pricing-row">
                      <span className="pricing-label">Skyport fee</span>
                      <span className="pricing-value">$12</span>
                    </div>
                    <div className="pricing-row">
                      <span className="pricing-label">Carbon offset</span>
                      <span className="pricing-value" style={{color: "var(--pulse)"}}>$0 ✓</span>
                    </div>
                    <div className="pricing-total">
                      <span className="pricing-total-label">Total</span>
                      <span className="pricing-total-value">${(selFlight?.price || 0) * parseInt(passengers) + 12}</span>
                    </div>
                  </div>

                  <button className="confirm-btn" onClick={confirm}>
                    <span>Confirm & Pay →</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="success-screen">
                <div className="success-icon">🛸</div>
                <div className="success-title">You're booked!</div>
                <div className="success-sub">Your flight from {fromPort?.city} to {toPort?.city}<br />departs at {selFlight?.dep}. See you at the skyport.</div>
                <div className="booking-ref">{bookingRef}</div>
                <button className="confirm-btn" onClick={() => { setModal(false); setSuccess(false); setFlights(null); setSelected(null); }}>
                  <span>Done ✓</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
