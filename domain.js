export const domain = {
  "repo": "manufacturing-operations-dashboard",
  "brand": "PlantPulse",
  "tagline": "Keep the floor moving.",
  "subtitle": "Production lines and downtime incidents in one operational view.",
  "theme": "plantpulse",
  "primary": "incidents",
  "secondary": "lines",
  "primaryLabel": "Incidents",
  "secondaryLabel": "Production lines",
  "statuses": [
    "Open",
    "Investigating",
    "Resolved"
  ],
  "secondaryStatuses": [
    "Running",
    "Maintenance",
    "Stopped"
  ],
  "fields": [
    [
      "owner",
      "Operator",
      "text"
    ],
    [
      "minutes",
      "Downtime (min)",
      "number"
    ],
    [
      "cause",
      "Cause",
      "text"
    ]
  ],
  "secondaryFields": [
    [
      "owner",
      "Supervisor",
      "text"
    ],
    [
      "target",
      "Shift target (units)",
      "number"
    ],
    [
      "actual",
      "Units produced",
      "number"
    ]
  ],
  "relationLabel": "Production line",
  "seeds": [
    [
      "Conveyor sensor fault",
      "Investigating",
      "Jordan Lee",
      32,
      "Sensor alignment"
    ],
    [
      "Packaging jam",
      "Resolved",
      "Sam Morgan",
      18,
      "Feed obstruction"
    ],
    [
      "Hydraulic pressure alert",
      "Open",
      "Alex Kim",
      12,
      "Pressure fluctuation"
    ]
  ],
  "secondarySeeds": [
    [
      "Assembly A",
      "Running",
      "Jordan Lee",
      1200,
      980
    ],
    [
      "Packaging B",
      "Maintenance",
      "Sam Morgan",
      900,
      720
    ]
  ],
  "actions": {
    "Open": [
      "Investigating"
    ],
    "Investigating": [
      "Resolved"
    ]
  },
  "unit": "minutes"
};
