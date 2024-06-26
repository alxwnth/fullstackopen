import { useState } from "react";
import RatingButtons from "./components/RatingButtons";
import Statistics from "./components/Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const ratings = [good, neutral, bad];

  const handleActions = [
    () => {
      setGood(good + 1);
      setTotal(total + 1);
    },
    () => {
      setNeutral(neutral + 1);
      setTotal(total + 1);
    },
    () => {
      setBad(bad + 1);
      setTotal(total + 1);
    },
  ];

  return (
    <div>
      <RatingButtons handleActions={handleActions} />
      <Statistics total={total} ratings={ratings} />
    </div>
  );
};

export default App;
