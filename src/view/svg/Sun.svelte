<defs>
  <linearGradient id="sunGradient" gradientTransform="rotate(90)">
    <stop offset="0%" stop-color="#ff1e72" />
    <stop offset="50%" stop-color="#ff7220" />
  </linearGradient>

  <mask id="sun-bands">
    <rect x="0" y="0" width="100" height="36" fill="white" />
    <rect x="0" y="37" width="100" height="2" fill="white" />
    <rect x="0" y="40" width="100" height="2" fill="white" />
    <rect x="0" y="43" width="100" height="3" fill="white" />
    <rect x="0" y="47" width="100" height="3" fill="white" />
  </mask>
</defs>

<circle id="sun" cx="50" cy="40" r="32" fill="pink"/>
<circle id="sun" cx="50" cy="40" r="31" mask="url(#sun-bands)" fill="url('#sunGradient')"/>
