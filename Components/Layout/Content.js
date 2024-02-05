// import React, { useEffect } from "react";
// import Profile from "@/pages/Profile";
// import Home from "@/pages/home";
// import { useRouter } from "next/router";

// const Content = ({ currentContent }) => {
//   const router = useRouter();
//   const isRoot = router.pathname === "/";

//   useEffect(() => {
//     const handleRouteChange = (url) => {
//       // No specific actions needed when the route is "/"
//       // You can leave this function empty or remove it if not required
//     };

//     // Initial check when the component mounts
//     handleRouteChange(router.pathname);

//     // Listen for route changes
//     const routeChangeComplete = router.events.on("routeChangeComplete", handleRouteChange);

//     return () => {
//       // Cleanup the event listener when the component is unmounted
//       routeChangeComplete();
//     };
//   }, []);

//   return (
//     <div>
//       {isRoot && <Profile />}
//       {currentContent === "home" && <Home />}
//     </div>
//   );
// };

// export default Content;



import React, { useEffect, useState } from "react";
import Profile from "@/pages/Profile";
import Home from "@/pages/home";
import { useRouter } from "next/router";

const Content = ({ currentContent }) => {
  const router = useRouter();
  const [isRoot, setIsRoot] = useState(false);

  useEffect(() => {
    // Update isRoot state based on the current route
    setIsRoot(router.pathname === "/");
  }, [router.pathname]);

  return (
    <div>
      {isRoot && <Profile />}
      {currentContent === "home" && !isRoot && <Home />}
    </div>
  );
};

export default Content;
