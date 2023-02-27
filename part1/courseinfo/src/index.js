import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
);

const Part = (props) => (
  <>
    <p>
      {props.name} {props.excercises}
    </p>
  </>
);

const Content = (props) => (
  <>
    <Part name={props.parts[0].name} excercises={props.parts[0].excercises} />
    <Part name={props.parts[1].name} excercises={props.parts[1].excercises} />
    <Part name={props.parts[2].name} excercises={props.parts[2].excercises} />
  </>
);

const Total = (props) => (
  <>
    <p>
      Number of excercises{" "}
      {props.parts[0].excercises +
        props.parts[1].excercises +
        props.parts[2].excercises}
    </p>
  </>
);
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        excercises: 10,
      },
      {
        name: "Using props to pass data",
        excercises: 7,
      },
      {
        name: "State of a component",
        excercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
