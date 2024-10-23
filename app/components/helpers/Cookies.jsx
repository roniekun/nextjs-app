import React, { useEffect } from "react";
import Cookies from "js-cookie";

const CookieExample = () => {
  useEffect(() => {
    // Set a cookie
    Cookies.set("username", "JohnDoe", { expires: 7 });

    // Get the cookie
    const username = Cookies.get("username");
    console.log(username); // Outputs 'JohnDoe'

    // Cleanup: remove the cookie
    return () => {
      Cookies.remove("username");
    };
  }, []);

  return <div>Check the console for cookie output.</div>;
};

export default CookieExample;
