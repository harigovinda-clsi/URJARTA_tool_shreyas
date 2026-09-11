<!DOCTYPE html>
<html lang="en" class="dark-blue">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>URJA RTA | All-India State Capitals & Regional TRANSCO Grid Engine</title>
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    .dark-blue {
      --bg-main: #070f1e;
      --bg-panel: #0f172a;
      --bg-card: #1e293b;
      --border-color: #334155;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --grid-line: rgba(30, 41, 59, 0.5);
    }
    .light-white {
      --bg-main: #f8fafc;
      --bg-panel: #ffffff;
      --bg-card: #f1f5f9;
      --border-color: #cbd5e1;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --grid-line: rgba(203, 213, 225, 0.6);
    }
    .slate-grey {
      --bg-main: #18181b;
      --bg-panel: #27272a;
      --bg-card: #3f3f46;
      --border-color: #52525b;
      --text-main: #fafafa;
      --text-muted: #a1a1aa;
      --grid-line: rgba(63, 63, 70, 0.5);
    }
    body { background-color: var(--bg-main); color: var(--text-main); transition: all 0.3s ease; }
    .panel-bg { background-color: var(--bg-panel); }
    .card-bg { background-color: var(--bg-card); }
    .border-theme { border-color: var(--border-color); }
    .text-muted-theme { color: var(--text-muted); }
    .canvas-grid {
      background-image: 
        linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
        linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
      background-size: 32px 32px;
    }
  </style>
</head>
<body class="h-screen w-screen flex flex-col overflow-hidden font-sans select-none">

  <!-- PART 1: Top Header Bar -->
  <header class="panel-bg border-b border-theme px-6 py-3 flex items-center justify-between z-20 shrink-0">
    <div class="flex items-center space-x-3">
      <div class="bg-sky-500/20 p-2 rounded-lg border border-sky-400/30">
        <i data-lucide="zap" class="w-6 h-6 text-sky-400"></i>
      </div>
      <div>
        <h1 class="text-lg font-bold tracking-wide flex items-center gap-2">
          URJA RTA: All-India National Grid Engine
          <span class="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
            DYNAMIC POWER LOGIC ACTIVE
          </span>
        </h1>
        <p class="text-xs text-muted-theme">28 State Capitals + Delhi & Regional TRANSCO District Substation Telemetry</p>
      </div>
    </div>

    <div class="flex items-center space-x-3">
      <!-- Theme Selector -->
      <div class="flex card-bg p-1 rounded-lg border border-theme space-x-1 text-xs">
        <button onclick="setTheme('dark-blue')" id="btn-theme-dark" class="px-2.5 py-1 rounded font-medium">Dark Blue</button>
        <button onclick="setTheme('light-white')" id="btn-theme-light" class="px-2.5 py-1 rounded font-medium">Light White</button>
        <button onclick="setTheme('slate-grey')" id="btn-theme-grey" class="px-2.5 py-1 rounded font-medium">Slate Grey</button>
      </div>

      <!-- Scope View Mode Toggle Button -->
      <div class="flex card-bg p-1 rounded-lg border border-theme space-x-1 text-xs font-mono">
        <button onclick="setViewMode('CAPITALS')" id="view-capitals" class="px-3 py-1 rounded font-semibold bg-sky-600 text-white">
          State Capitals (29)
        </button>
        <button onclick="setViewMode('REGIONAL_SUBSTATIONS')" id="view-regional" class="px-3 py-1 rounded font-semibold text-muted-theme">
          Regional TRANSCO Grids
        </button>
      </div>

      <!-- Stress Load Toggles -->
      <div class="flex card-bg p-1 rounded-lg border border-theme space-x-1 text-xs">
        <button onclick="setStress('NORMAL')" id="stress-normal" class="px-2.5 py-1 rounded font-medium bg-emerald-500/20 text-emerald-300">Normal Flow</button>
        <button onclick="setStress('PEAK_DEMAND')" id="stress-peak" class="px-2.5 py-1 rounded font-medium text-muted-theme">Peak Deficit Surge</button>
      </div>

      <button onclick="toggleDrawer('agent-drawer')" class="card-bg hover:opacity-80 text-xs px-3 py-2 rounded-lg font-mono border border-theme">
        Policy Inspector
      </button>

      <button onclick="toggleDrawer('ai-drawer')" class="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3.5 py-2 rounded-lg font-semibold flex items-center gap-1.5 shadow-lg">
        <i data-lucide="bot" class="w-4 h-4"></i> URJA AI TA
      </button>
    </div>
  </header>

  <!-- Live Telemetry & Digital Oscilloscope Panel -->
  <div class="panel-bg border-b border-theme px-6 py-2 flex items-center justify-between text-xs font-mono shrink-0 z-20">
    <div class="flex items-center space-x-6">
      <div class="flex items-center gap-2">
        <i data-lucide="activity" class="w-4 h-4 text-sky-400"></i>
        <span class="text-muted-theme">AC FREQ:</span>
        <span id="tel-freq" class="text-emerald-400 font-bold">50.00 Hz</span>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-muted-theme">RMS VOLTAGE:</span>
        <span id="tel-voltage" class="text-emerald-400 font-bold">230 V</span>
      </div>

      <div class="flex items-center gap-2">
        <i data-lucide="zap" class="w-4 h-4 text-amber-400"></i>
        <span class="text-muted-theme">NATIONAL GEN/LOAD:</span>
        <span id="tel-genload">0 kW / 0 kW</span>
      </div>

      <div class="flex items-center gap-2">
        <i data-lucide="cpu" class="w-4 h-4 text-purple-400"></i>
        <span class="text-muted-theme">GRID WELFARE:</span>
        <span id="tel-welfare" class="text-purple-300 font-bold">100%</span>
      </div>
    </div>

    <!-- Live Oscilloscope Canvas -->
    <div class="flex items-center space-x-3 bg-black/40 px-3 py-1 rounded border border-theme">
      <span class="text-[10px] text-muted-theme">OSCILLOSCOPE WAVE:</span>
      <canvas id="oscilloscope" width="200" height="28" class="rounded bg-black/60"></canvas>
    </div>
  </div>

  <!-- PART 2: Main Viewport & Drawers -->
  <div class="flex flex-1 overflow-hidden relative">
    
    <!-- Spatial Canvas Region -->
    <div class="relative flex-1 canvas-grid p-6 overflow-auto">
      <svg id="bus-lines" class="absolute inset-0 w-[1400px] h-[900px] pointer-events-none z-0"></svg>
      <div id="canvas-nodes" class="relative w-[1400px] h-[900px] z-10"></div>
    </div>

    <!-- Policy Inspector Drawer -->
    <div id="agent-drawer" class="hidden w-96 panel-bg border-l border-theme flex flex-col h-full shadow-2xl z-30 shrink-0">
      <div class="p-4 border-b border-theme flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <i data-lucide="sliders" class="w-5 h-5 text-purple-400"></i>
          <h2 class="text-sm font-bold">Policy & Shapley Inspector</h2>
        </div>
        <button onclick="toggleDrawer('agent-drawer')" class="text-muted-theme hover:text-white">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      <div id="agent-list" class="flex-1 p-4 space-y-3 overflow-y-auto"></div>
    </div>

    <!-- AI TA Copilot Drawer -->
    <div id="ai-drawer" class="w-96 panel-bg border-l border-theme flex flex-col h-full shadow-2xl z-30 shrink-0">
      <div class="p-4 border-b border-theme flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <i data-lucide="bot" class="w-5 h-5 text-purple-400"></i>
          <h2 class="text-sm font-bold">URJA AI TA</h2>
        </div>
        <button onclick="toggleDrawer('ai-drawer')" class="text-muted-theme hover:text-white">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div id="ai-messages" class="flex-1 p-4 space-y-3 overflow-y-auto text-xs font-sans">
        <div class="p-3 rounded-lg card-bg border border-theme text-muted-theme">
          <p class="font-semibold text-purple-400 mb-1">URJA AI Assistant</p>
          <p class="leading-relaxed">All-India state capitals and TRANSCO regional substations loaded. Trip breakers or activate "Peak Deficit Surge" to test real-time load shedding and Shapley payoffs!</p>
        </div>
      </div>

      <div class="p-3 border-t border-theme flex items-center gap-2">
        <input type="text" id="ai-input" onkeydown="if(event.key==='Enter') sendAiMessage()" placeholder="Ask about TRANSCO grids, load shed, or voltage..." class="flex-1 card-bg border border-theme text-xs px-3 py-2 rounded-lg focus:outline-none" />
        <button onclick="sendAiMessage()" class="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg">
          <i data-lucide="send" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- PART 3: Data Topology Configuration -->
  <script>
    // All 28 State Capitals + New Delhi
    const ALL_STATE_CAPITALS = [
      { id: 'c1', name: 'New Delhi (NCR)', region: 'Northern', voltageKV: 400, x: 280, y: 150, baseLoad: 1200, baseGen: 900, priority: 1 },
      { id: 'c2', name: 'Mumbai (MH)', region: 'Western', voltageKV: 400, x: 180, y: 400, baseLoad: 1400, baseGen: 1100, priority: 1 },
      { id: 'c3', name: 'Bengaluru (KA)', region: 'Southern', voltageKV: 400, x: 320, y: 580, baseLoad: 1100, baseGen: 800, priority: 1 },
      { id: 'c4', name: 'Chennai (TN)', region: 'Southern', voltageKV: 400, x: 420, y: 620, baseLoad: 1050, baseGen: 950, priority: 1 },
      { id: 'c5', name: 'Kolkata (WB)', region: 'Eastern', voltageKV: 400, x: 700, y: 320, baseLoad: 980, baseGen: 900, priority: 1 },
      { id: 'c6', name: 'Hyderabad (TG)', region: 'Southern', voltageKV: 400, x: 380, y: 460, baseLoad: 920, baseGen: 850, priority: 1 },
      { id: 'c7', name: 'Amaravati (AP)', region: 'Southern', voltageKV: 220, x: 440, y: 520, baseLoad: 600, baseGen: 450, priority: 2 },
      { id: 'c8', name: 'Dispur (AS)', region: 'North-Eastern', voltageKV: 220, x: 920, y: 220, baseLoad: 410, baseGen: 500, priority: 2 },
      { id: 'c9', name: 'Patna (BR)', region: 'Eastern', voltageKV: 220, x: 620, y: 240, baseLoad: 750, baseGen: 400, priority: 2 },
      { id: 'c10', name: 'Raipur (CG)', region: 'Western', voltageKV: 220, x: 500, y: 360, baseLoad: 580, baseGen: 700, priority: 2 },
      { id: 'c11', name: 'Panaji (GA)', region: 'Western', voltageKV: 132, x: 200, y: 500, baseLoad: 250, baseGen: 150, priority: 3 },
      { id: 'c12', name: 'Gandhinagar (GJ)', region: 'Western', voltageKV: 400, x: 120, y: 300, baseLoad: 850, baseGen: 1200, priority: 1 },
      { id: 'c13', name: 'Chandigarh (HR/PB)', region: 'Northern', voltageKV: 220, x: 290, y: 90, baseLoad: 500, baseGen: 300, priority: 2 },
      { id: 'c14', name: 'Shimla (HP)', region: 'Northern', voltageKV: 132, x: 320, y: 60, baseLoad: 300, baseGen: 650, priority: 2 },
      { id: 'c15', name: 'Ranchi (JH)', region: 'Eastern', voltageKV: 220, x: 640, y: 300, baseLoad: 620, baseGen: 500, priority: 2 },
      { id: 'c16', name: 'Thiruvananthapuram (KL)', region: 'Southern', voltageKV: 220, x: 310, y: 720, baseLoad: 680, baseGen: 400, priority: 2 },
      { id: 'c17', name: 'Bhopal (MP)', region: 'Western', voltageKV: 400, x: 360, y: 320, baseLoad: 800, baseGen: 950, priority: 1 },
      { id: 'c18', name: 'Imphal (MN)', region: 'North-Eastern', voltageKV: 132, x: 1020, y: 260, baseLoad: 180, baseGen: 100, priority: 3 },
      { id: 'c19', name: 'Shillong (ML)', region: 'North-Eastern', voltageKV: 132, x: 910, y: 260, baseLoad: 210, baseGen: 280, priority: 3 },
      { id: 'c20', name: 'Aizawl (MZ)', region: 'North-Eastern', voltageKV: 132, x: 990, y: 300, baseLoad: 150, baseGen: 90, priority: 3 },
      { id: 'c21', name: 'Kohima (NL)', region: 'North-Eastern', voltageKV: 132, x: 1030, y: 210, baseLoad: 160, baseGen: 100, priority: 3 },
      { id: 'c22', name: 'Bhubaneswar (OD)', region: 'Eastern', voltageKV: 400, x: 660, y: 400, baseLoad: 720, baseGen: 850, priority: 1 },
      { id: 'c23', name: 'Jaipur (RJ)', region: 'Northern', voltageKV: 400, x: 220, y: 220, baseLoad: 890, baseGen: 600, priority: 2 },
      { id: 'c24', name: 'Gangtok (SK)', region: 'North-Eastern', voltageKV: 132, x: 780, y: 180, baseLoad: 120, baseGen: 300, priority: 3 },
      { id: 'c25', name: 'Agartala (TR)', region: 'North-Eastern', voltageKV: 132, x: 930, y: 320, baseLoad: 220, baseGen: 200, priority: 3 },
      { id: 'c26', name: 'Lucknow (UP)', region: 'Northern', voltageKV: 400, x: 460, y: 210, baseLoad: 1150, baseGen: 800, priority: 1 },
      { id: 'c27', name: 'Dehradun (UK)', region: 'Northern', voltageKV: 220, x: 350, y: 110, baseLoad: 420, baseGen: 700, priority: 2 },
      { id: 'c28', name: 'Itanagar (AR)', region: 'North-Eastern', voltageKV: 132, x: 1000, y: 150, baseLoad: 140, baseGen: 250, priority: 3 },
      { id: 'c29', name: 'Srinagar (JK)', region: 'Northern', voltageKV: 220, x: 220, y: 40, baseLoad: 520, baseGen: 400, priority: 2 }
    ];

    // Regional TRANSCO District Grid Substations
    const REGIONAL_SUBSTATIONS = [
      { id: 'r1', name: 'Noida 400kV GSS (UPPTCL)', region: 'UP', voltageKV: 400, x: 300, y: 160, baseLoad: 950, baseGen: 300, priority: 1 },
      { id: 'r2', name: 'Chandrapur Super Grid (MAHATRANSCO)', region: 'MH', voltageKV: 400, x: 420, y: 380, baseLoad: 400, baseGen: 1800, priority: 1 },
      { id: 'r3', name: 'Hoodi 220kV GSS (KPTCL)', region: 'KA', voltageKV: 220, x: 340, y: 560, baseLoad: 750, baseGen: 200, priority: 2 },
      { id: 'r4', name: 'Sriperumbudur Substation (TANTRANSCO)', region: 'TN', voltageKV: 400, x: 440, y: 600, baseLoad: 880, baseGen: 500, priority: 1 },
      { id: 'r5', name: 'Meramundali 400kV Grid (OPTCL)', region: 'OD', voltageKV: 400, x: 620, y: 380, baseLoad: 500, baseGen: 1200, priority: 1 },
      { id: 'r6', name: 'Korba Thermal Grid (CGSPTCL)', region: 'CG', voltageKV: 400, x: 530, y: 340, baseLoad: 300, baseGen: 1600, priority: 1 },
      { id: 'r7', name: 'Jetpur 220kV Substation (GETCO)', region: 'GJ', voltageKV: 220, x: 100, y: 320, baseLoad: 600, baseGen: 900, priority: 2 },
      { id: 'r8', name: 'Kalyani Substation (WBSETCL)', region: 'WB', voltageKV: 220, x: 720, y: 300, baseLoad: 550, baseGen: 200, priority: 2 },
      { id: 'r9', name: 'Bhagalpur 132kV GSS (BSPTCL)', region: 'BR', voltageKV: 132, x: 660, y: 230, baseLoad: 480, baseGen: 100, priority: 3 }
    ];

    const state = {
      theme: 'dark-blue',
      viewMode: 'CAPITALS',
      stress: 'NORMAL',
      nodes: [],
      actions: [],
      metrics: { frequencyHz: 50.0, voltageRMS: 230, globalScore: 100, totalGenKW: 0, totalLoadKW: 0 },
      timeStep: 0
    };

    function initNodes() {
      const source = state.viewMode === 'CAPITALS' ? ALL_STATE_CAPITALS : REGIONAL_SUBSTATIONS;
      state.nodes = source.map(n => ({
        ...n,
        isolated: false,
        manualOverride: false,
        loadKW: n.baseLoad,
        genKW: n.baseGen
      }));
    }

    function setTheme(themeName) {
      state.theme = themeName;
      document.documentElement.className = themeName;
    }

    function setViewMode(mode) {
      state.viewMode = mode;
      document.getElementById('view-capitals').className = mode === 'CAPITALS' ? "px-3 py-1 rounded font-semibold bg-sky-600 text-white" : "px-3 py-1 rounded font-semibold text-muted-theme";
      document.getElementById('view-regional').className = mode === 'REGIONAL_SUBSTATIONS' ? "px-3 py-1 rounded font-semibold bg-sky-600 text-white" : "px-3 py-1 rounded font-semibold text-muted-theme";
      initNodes();
      stepSimulation();
    }

    function setStress(level) {
      state.stress = level;
      document.getElementById('stress-normal').className = level === 'NORMAL' ? "px-2.5 py-1 rounded font-medium bg-emerald-500/20 text-emerald-300" : "px-2.5 py-1 rounded font-medium text-muted-theme";
      document.getElementById('stress-peak').className = level === 'PEAK_DEMAND' ? "px-2.5 py-1 rounded font-medium bg-red-500/20 text-red-300" : "px-2.5 py-1 rounded font-medium text-muted-theme";
      stepSimulation();
    }

    function toggleDrawer(id) {
      document.getElementById(id).classList.toggle('hidden');
    }

    function toggleNodeOverride(id) {
      const node = state.nodes.find(n => n.id === id);
      if (node) {
        node.manualOverride = !node.manualOverride;
        node.isolated = node.manualOverride;
        stepSimulation();
      }
    }
  </script>

  <!-- PART 4: Execution Engine, Rendering & AI Interactions -->
  <script>
    // Active Dynamic Calculation Engine
    function stepSimulation() {
      state.timeStep += 1;
      let totalGen = 0;
      let totalLoad = 0;

      const stressMultiplier = state.stress === 'PEAK_DEMAND' ? 1.45 : 1.0;

      state.nodes.forEach(node => {
        const sineWave = Math.sin((state.timeStep + parseInt(node.id.replace(/\D/g, ''))) * 0.4) * 40;
        node.loadKW = Math.max(80, Math.round((node.baseLoad + sineWave) * stressMultiplier));
        
        if (!node.isolated) {
          totalGen += node.genKW;
          totalLoad += node.loadKW;
        }
      });

      const deficit = totalLoad - totalGen;
      state.actions = [];

      state.nodes.forEach(node => {
        let shedKW = 0;
        let sharedKW = 0;

        if (!node.isolated) {
          // If total network has deficit, apply proportional load shedding
          if (deficit > 0) {
            const nodeShare = node.loadKW / totalLoad;
            shedKW = Math.min(node.loadKW * 0.5, Math.round(deficit * nodeShare * 1.2));
          }

          // Generators share power to offset load
          if (node.genKW > node.loadKW) {
            sharedKW = Math.round((node.genKW - node.loadKW) * 0.35);
          }
        }

        // Compute non-zero Shapley Value based on contribution to load shedding or power sharing
        const shapleyPayoff = node.isolated ? 0 : parseFloat(((sharedKW * 0.15) - (shedKW * 0.08) + 12).toFixed(1));
        const qValue = parseFloat((90 - (shedKW * 0.05) + (sharedKW * 0.02)).toFixed(1));

        state.actions.push({
          nodeId: node.id,
          shedLoadKW: shedKW,
          powerSharedKW: sharedKW,
          shapleyPayoff: shapleyPayoff,
          qValue: qValue
        });
      });

      state.metrics = {
        frequencyHz: parseFloat((50.0 + (totalGen - totalLoad) * 0.00015 + Math.sin(state.timeStep * 0.5) * 0.08).toFixed(2)),
        voltageRMS: Math.max(195, Math.min(245, Math.round(230 - (deficit > 0 ? deficit * 0.003 : -5)))),
        globalScore: Math.max(40, Math.min(100, Math.round(100 - (deficit > 0 ? deficit * 0.008 : 0)))),
        totalGenKW: Math.round(totalGen),
        totalLoadKW: Math.round(totalLoad)
      };

      drawOscilloscope();
      render();
    }

    function drawOscilloscope() {
      const canvas = document.getElementById('oscilloscope');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = state.metrics.frequencyHz < 49.8 ? '#ef4444' : '#38bdf8';

      const freq = state.metrics.frequencyHz;
      const centerY = canvas.height / 2;

      for (let x = 0; x < canvas.width; x++) {
        const y = centerY + Math.sin((x + state.timeStep * 5) * (freq * 0.003)) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    function render() {
      document.getElementById('tel-freq').innerText = `${state.metrics.frequencyHz.toFixed(2)} Hz`;
      document.getElementById('tel-voltage').innerText = `${state.metrics.voltageRMS} V`;
      document.getElementById('tel-genload').innerText = `${state.metrics.totalGenKW} kW / ${state.metrics.totalLoadKW} kW`;
      document.getElementById('tel-welfare').innerText = `${state.metrics.globalScore}%`;

      // SVG Bus Connections
      const svg = document.getElementById('bus-lines');
      svg.innerHTML = '';
      state.nodes.forEach((node, i) => {
        state.nodes.slice(i + 1, i + 3).forEach(target => {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', node.x);
          line.setAttribute('y1', node.y);
          line.setAttribute('x2', target.x);
          line.setAttribute('y2', target.y);
          line.setAttribute('stroke', node.isolated || target.isolated ? '#ef4444' : '#0284c7');
          line.setAttribute('stroke-width', '1.5');
          if (node.isolated || target.isolated) line.setAttribute('stroke-dasharray', '4 4');
          svg.appendChild(line);
        });
      });

      // Map Nodes
      const container = document.getElementById('canvas-nodes');
      container.innerHTML = '';
      state.nodes.forEach(node => {
        const action = state.actions.find(a => a.nodeId === node.id);
        const div = document.createElement('div');
        div.style.left = `${node.x}px`;
        div.style.top = `${node.y}px`;
        div.className = `absolute transform -translate-x-1/2 -translate-y-1/2 w-52 card-bg border ${
          node.isolated ? 'border-red-500 bg-red-950/20' : 'border-theme'
        } rounded-xl p-2.5 shadow-lg backdrop-blur-md`;

        div.innerHTML = `
          <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-theme">
            <span class="text-xs font-bold font-mono truncate">${node.name}</span>
            <span class="text-[9px] font-mono px-1 py-0.5 rounded bg-sky-500/20 text-sky-300">${node.voltageKV}kV</span>
          </div>
          <div class="text-[10px] font-mono space-y-1 text-muted-theme">
            <div class="flex justify-between"><span>Load / Gen:</span><span class="font-semibold text-slate-200">${node.loadKW} / ${node.genKW} kW</span></div>
            ${action && action.shedLoadKW > 0 ? `<div class="text-amber-400 font-semibold flex justify-between"><span>Shed Load:</span><span>-${action.shedLoadKW} kW</span></div>` : ''}
            ${action && action.powerSharedKW > 0 ? `<div class="text-emerald-400 font-semibold flex justify-between"><span>Shared Out:</span><span>+${action.powerSharedKW} kW</span></div>` : ''}
          </div>
          <div class="mt-2 pt-1.5 border-t border-theme flex items-center justify-between">
            <span class="text-[9px] font-mono text-muted-theme">Grid Breaker</span>
            <button onclick="toggleNodeOverride('${node.id}')" class="text-[9px] font-mono px-2 py-0.5 rounded border ${node.manualOverride ? 'bg-red-500/30 border-red-500 text-red-200' : 'card-bg border-theme hover:bg-slate-700'}">
              ${node.manualOverride ? 'OFF (TRIPPED)' : 'ON (ACTIVE)'}
            </button>
          </div>
        `;
        container.appendChild(div);
      });

      // Policy Inspector List
      const agentList = document.getElementById('agent-list');
      agentList.innerHTML = '';
      state.nodes.forEach(node => {
        const action = state.actions.find(a => a.nodeId === node.id);
        const item = document.createElement('div');
        item.className = 'card-bg border border-theme rounded-lg p-3 space-y-1.5';
        item.innerHTML = `
          <div class="flex items-center justify-between border-b border-theme pb-1">
            <span class="text-xs font-bold font-mono">${node.name}</span>
            <span class="text-[10px] font-mono text-purple-400">Q-Val: ${action ? action.qValue : 0}</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-[10px] font-mono text-muted-theme">
            <div><span class="block text-[9px]">Shedding Load</span><span class="${action && action.shedLoadKW > 0 ? 'text-amber-400' : 'text-slate-400'} font-semibold">${action ? action.shedLoadKW : 0} kW</span></div>
            <div><span class="block text-[9px]">Shapley Value</span><span class="text-emerald-400 font-semibold">${action && action.shapleyPayoff >= 0 ? '+' : ''}${action ? action.shapleyPayoff : 0}</span></div>
          </div>
        `;
        agentList.appendChild(item);
      });

      lucide.createIcons();
    }

    function sendAiMessage() {
      const input = document.getElementById('ai-input');
      const text = input.value.trim();
      if (!text) return;

      const msgBox = document.getElementById('ai-messages');
      msgBox.innerHTML += `
        <div class="p-2.5 rounded-lg bg-purple-900/30 border border-purple-700/40 text-purple-200 ml-6 text-right">
          <p>${text}</p>
        </div>
      `;
      input.value = '';

      setTimeout(() => {
        let reply = `Currently tracking ${state.nodes.length} grid nodes in ${state.viewMode} mode. System voltage is at ${state.metrics.voltageRMS}V RMS.`;
        if (text.toLowerCase().includes('surge') || text.toLowerCase().includes('peak')) reply = 'Switch to "Peak Deficit Surge" at the top bar to trigger high demand load shedding across state capitals!';
        if (text.toLowerCase().includes('transco')) reply = 'TRANSCO substations represent intra-state transmission entities like UPPTCL, MAHATRANSCO, and KPTCL stepping power down to distribution networks.';

        msgBox.innerHTML += `
          <div class="p-2.5 rounded-lg card-bg border border-theme text-muted-theme mr-6">
            <p class="font-semibold text-purple-400 mb-1">URJA AI Assistant</p>
            <p>${reply}</p>
          </div>
        `;
        msgBox.scrollTop = msgBox.scrollHeight;
      }, 500);
    }

    // Startup Sequence
    setTheme('dark-blue');
    initNodes();
    stepSimulation();
    setInterval(stepSimulation, 1200);
  </script>
</body>
</html>
