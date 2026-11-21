import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const tabSx = { textTransform: "none", fontWeight: 700, fontSize: "1rem", color: "var(--text)" };

// Tab bar shared by the profile and Explore pages. Render the panel yourself with <TabPanel>.
export default function AppTabs({ value, onChange, labels, name }) {
  return (
    <Tabs
      value={value}
      onChange={(_, v) => onChange(v)}
      aria-label={`${name} tabs`}
      indicatorColor="primary"
      textColor="inherit"
      variant="fullWidth"
      sx={{ borderBottom: "1px solid var(--border)", color: "var(--text)" }}
    >
      {labels.map((label, i) => (
        <Tab
          key={label}
          label={label}
          sx={tabSx}
          id={`${name}-tab-${i}`}
          aria-controls={`${name}-tabpanel-${i}`}
        />
      ))}
    </Tabs>
  );
}

export function TabPanel({ value, index, name, children }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${name}-tabpanel-${index}`}
      aria-labelledby={`${name}-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}
