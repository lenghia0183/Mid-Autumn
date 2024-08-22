import React from "react";
import Header from "../../components/Header";

const Test = () => {
  const logo = <img src="/path/to/logo.png" alt="Logo" className="h-8" />;

  const userOptions = [
    { label: "Login", path: "/login" },
    { label: "Sign Up", path: "/signup" },
  ];

  return (
    <div>
      <Header logo={logo} userOptions={userOptions} />
      {/* Rest of your app */}
    </div>
  );
};

export default Test;
