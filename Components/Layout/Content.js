// Content.js

import React from "react";
import HomeContent from "../../pages/home";
import DefaultContent from "../../pages/profile";

const Content = ({ currentContent }) => {
  return (
    <div>
      {currentContent === "profile" && <DefaultContent />}
      {currentContent === "home" && <HomeContent />}
    </div>
  );
};

export default Content;
