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

function QuestionAnswerField({ target_card, displayQuestion, handleCardFlip }) {
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

function CardNav({ onArrowClick, cardNumber }) {
  return (
    <div className='card-nav'>
      <input onClick={(e) => onArrowClick(e.target.id)} type='image' src={arrow} id='Left'></input>
      <span>{cardNumber + 1}</span>
      <input onClick={(e) => onArrowClick(e.target.id)} type='image' src={arrow} id='Right'></input>
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
  const [cardNavCounter, setCardNavCounter] = useState(0);
  const [displayQuestion, setDisplayQuestion] = useState(true);

  function handleCardFlip() {
    setDisplayQuestion(!displayQuestion);
  }

  function handleCardNav(arrowId) {
    if (arrowId == "Left" && cardNavCounter > 0) {
      setCardNavCounter(cardNavCounter - 1);
    } else if (arrowId == "Right" && cardNavCounter < data[0].length - 1) {
      setCardNavCounter(cardNavCounter + 1);
    }
    // on card change, set the card display to question
    setDisplayQuestion(true);
  }

  return (
    <div className='flashcard'>
      <ChapterNav />
      <CardNav
        onArrowClick={handleCardNav} 
        cardNumber={cardNavCounter}/>
      <QuestionAnswerField 
        target_card={data[0][cardNavCounter]} 
        displayQuestion={displayQuestion} 
        handleCardFlip={handleCardFlip} />
    </div>
  );
}

const DATA = [
  [
    {id: 1, chapter: 1, question: "What is a training instance?", answer: "One training iteration through all the data."},
    {id: 2, chapter: 1, question: "Why use machine learning?", answer: "To accomplish tasks infeasible for a human."},
    {id: 3, chapter: 1, question: "What is machine learning?", answer: "A computer being trained to improve at a task, by some performance measure."},
  ],
  [    
    {id: 4, chapter: 2, question: "What is 2+2", answer: "It's 4 silly!."},
    {id: 5, chapter: 2, question: "What is the integral of x squared?", answer: "x to the third, all divided by 3... + C!"},
    {id: 6, chapter: 2, question: "Cats or dogs?", answer: "Cats."},
  ]
];

export default function App() {
  return ( 
    <>
      <Flashcard data={DATA} />
    </>);
}