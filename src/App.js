import { useState } from 'react';
import arrow from './images/arrow.png';

function QuestionAnswerText({ question, answer, displayQuestion }) {  
  return (
    <>
      <p>{displayQuestion ? question : answer}</p>
    </>
  );
}

function FlipCardButton({ onFlipCardChange }) {
  return (
    <>
      <input 
        type='button'
        value='Flip Card'
        onClick={onFlipCardChange}
      >
        </input>
    </>
  );
}

function QuestionAnswerField({ target_card }) {
  const [displayQuestion, setDisplayQuestion] = useState(true);

  function handleCardFlip() {
    setDisplayQuestion(!displayQuestion);
  }

  return (
    <div className='qa-field'>
      <QuestionAnswerText
       question={target_card['question']}
       answer={target_card['answer']}
       displayQuestion={displayQuestion} />
      <FlipCardButton 
        onFlipCardChange={handleCardFlip}
      />
    </div>
  );
}

function CardNav() {
  return (
    <div className='card-nav'>
      <input type='image' src={arrow}></input>
      <input type='image' src={arrow}></input>
    </div>
  );
}

function ChapterNav() {
  return (
    <>
      <nav className='chapter-nav'>
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
      <QuestionAnswerField target_card={data[0]}/>
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