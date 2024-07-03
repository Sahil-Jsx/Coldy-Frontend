import React, { useState, useEffect } from "react";

const Greetings = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    updateGreeting();
  }, []);

  const updateGreeting = () => {
    const currentTime = new Date().getHours();
    let greetingText = "";
    if (currentTime < 12) {
      greetingText = "Good Morning";
    } else if (currentTime >= 12 && currentTime < 18) {
      greetingText = "Good Afternoon";
    } else {
      greetingText = "Good Evening";
    }
    setGreeting(greetingText);
  };

  return (
    <div>
      <span className="font-bold text-md text-dull">{greeting}</span>
    </div>
  );
};

export default Greetings;
