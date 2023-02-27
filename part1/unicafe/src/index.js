import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, feed }) => (
  <button onClick={handleClick}>{feed}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const sumAll = () => bad + good + neutral;
  const average = () => (sumAll() != 0 ? ((good - bad) * 100) / sumAll() : 0);
  const positive = () => (sumAll() != 0 ? (good * 100) / sumAll() : 0);

  if (sumAll() === 0) {
    return <>No feedback given</>;
  }

  return (
    <>
      <table>
        <tbody>
          <Statistic name="good" value={good} />
          <Statistic name="neutral" value={neutral} />
          <Statistic name="bad" value={bad} />
          <Statistic name="all" value={sumAll()} />
          <Statistic name="average" value={average()} />
          <Statistic name="positive" value={positive()} />
        </tbody>
      </table>
    </>
  );
};

const Statistic = ({ name, value }) => (
  <>
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  </>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
  };
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  };
  const increaseBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={increaseGood} feed="good" />
        <Button handleClick={increaseNeutral} feed="neutral" />
        <Button handleClick={increaseBad} feed="bad" />
      </div>
      <div>
        <h2>statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
