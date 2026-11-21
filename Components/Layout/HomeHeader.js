import React from "react";
import PageHeader from "./PageHeader";

export default function HomeHeader() {
  // The right-hand column (with its own search) is hidden on small screens,
  // so the header shows a search box there.
  return <PageHeader title="Home" withSearch />;
}
