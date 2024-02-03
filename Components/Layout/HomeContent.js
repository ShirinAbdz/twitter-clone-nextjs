import React from "react";
import Tweet from "./Tweet";

const HomeContent = () => {
  return (
    <div>
      <Tweet
        username="john_doe"
        content="This is a sample tweet content."
        date="2024-01-30"
      />
      <Tweet
        username="jane_doe"
        content="Another tweet here!"
        date="2024-01-31"
      />
      <Tweet
        username="john_doe"
        content="This is a sample tweet content."
        date="2024-01-30"
      />
      <Tweet
        username="jane_doe"
        content="Another tweet here!"
        date="2024-01-31"
      />
      <Tweet
        username="john_doe"
        content="This is a sample tweet content."
        date="2024-01-30"
      />
      <Tweet
        username="jane_doe"
        content="Another tweet here!"
        date="2024-01-31"
      />
    </div>
  );
};

export default HomeContent;
