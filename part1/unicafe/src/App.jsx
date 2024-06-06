import { useState } from "react";
import RatingButtons from "./RatingButtons";
import Ratings from "./Ratings";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleActions = [
    () => setGood(good + 1),
    () => setNeutral(neutral + 1),
    () => setBad(bad + 1),
  ];

  return (
    <div>
      <RatingButtons handleActions={handleActions} />
      <Ratings good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
