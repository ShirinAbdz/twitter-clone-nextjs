

import React, { useEffect, useState } from "react";
import Profile from "../../pages/Profile";
import Home from "../../pages/home";
import { useRouter } from "next/router";

const Content = ({ currentContent }) => {
  const router = useRouter();
  const [isRoot, setIsRoot] = useState(false);

  useEffect(() => {
    setIsRoot(router.pathname === "/");
  }, [router.pathname]);

  return (
    <div>
      {currentContent === "profile" && isRoot && <Profile />}
      {currentContent === "home" && !isRoot && <Home />}
    </div>
  );
};

export default Content;
