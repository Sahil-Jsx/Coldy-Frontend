import React, { useState, useEffect } from "react";

const Greetings = () => {
  const [greeting, setGreeting] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    updateGreeting();
    setCurrentDate(getFormattedDate());
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

  const getFormattedDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex justify-between items-center">
      <span className="font-bold text-md text-dull">{greeting}</span>
      <span className="text-sm text-black-500">{currentDate}</span>
    </div>
  );
};

export default Greetings;
