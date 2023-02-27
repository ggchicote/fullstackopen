import React, {useState} from "react";
import ReactDOM from "react-dom";


const CButton = ({handleClick,text}) => (<button onClick={handleClick}>{text}</button>)

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(6))

  const randomButton = () => (
    setSelected(Math.floor(Math.random() * 6))
  )

  const sumVote = () => {
    const newArray = [...votes]
    newArray[selected] += 1 
    setVotes(newArray)
  }

  const moreVotedAnecdote = () => {
    let maxVotes = Math.max.apply(null,votes)
    return votes.indexOf(maxVotes)
  }

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
        <br />
        has {votes[selected]} votes      
        <p>
          <CButton handleClick={sumVote} text="vote" />
          <CButton handleClick={randomButton} text="next anecdote" />
        </p>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        {props.anecdotes[moreVotedAnecdote()]}
        <br />
        has {votes[moreVotedAnecdote()]} votes      
      </div>
    </>    
  )
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
