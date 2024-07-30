import { useState } from 'react';

function QuestionAnswerText() {
  return (
    <>
      <p>Question Goes Here.</p>
    </>
  );
}

function FlipCardButton() {
  return (
    <>
      <input type='button' value='Flip Card'></input>
    </>
  );
}

function QuestionAnswerField() {
  return (
    <div className='qa-field'>
      <QuestionAnswerText />
      <FlipCardButton />
    </div>
  );
}

function CardNav() {
  return (
    <div>
      <input type='button' value='Left'></input>
      <input type='button' value='Right'></input>
    </div>
  );
}

function ChapterNav() {
  return (
    <>
      <nav>
        <p>Chapter 1</p>
      </nav>
    </>
  );  
}

function Flashcard({ data }) {
  return (
    <div className='flashcard'>
      <ChapterNav />
      <CardNav />
      <QuestionAnswerField />
    </div>
  );
}

const DATA = [
  {id: 1, chapter: 1, question: "What is a training instance?", answer: "One training iteration through all the data."},
  {id: 2, chapter: 1, question: "Why use machine learning?", answer: "To accomplish tasks infeasible for a human."},
  {id: 3, chapter: 1, question: "What is machine learning?", answer: "A computer being trained to improve at a task, by some performance measure."},
];

export default function App() {
  return ( 
    <>
      <Flashcard data={DATA} />
    </>);
}