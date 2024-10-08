import { useState } from 'react'; 

import { DB } from './database/database'
import Home from './components/HomePage';
import AddEdit from './components/AddEditPage'

import arrow from './images/arrow.png';
import cross from './images/chapter_nav_cross.png'

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
        className='button-style'
        onClick={onFlipCardChange}
      ></input>
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

function ChapterNav({ db, onChapterChange, currentChapter, deck }) {
  const [chapterNavState, setChapterNavState] = useState(false);

  function handleChapterNavClick() {
    // handle nav-slide animation
    const menu = document.getElementById('drop-down-menu');
    if (!menu.classList.contains('active')) {
      // show menu
      menu.classList.add('active');
      menu.style.height = "auto";

      let height = menu.clientHeight + 'px';
      menu.style.height = "0px";

      setTimeout(() => {
        menu.style.height = height;
      }, 0);
    } else {
      // remove menu
      menu.style.height = "0px";
      menu.classList.remove('active');
    }
    
    setChapterNavState(!chapterNavState);
  }

  const chapters = db.getChapters(deck).map((chpt_name) => {
    return (
      <li key={chpt_name}>
        <a
          onClick={(e) => {
            onChapterChange(e.target.innerHTML);
            handleChapterNavClick();
          }}
        href='#'>{chpt_name}</a>
      </li>
    );
  });

  return (
    <>
      <div className='chapter-nav'>
        <div className='chapter-nav-control'>
          <input
            type='image' 
            src={cross}
            className={chapterNavState ? 'chapter-nav-animation' : ''}
            onClick={() => handleChapterNavClick()}></input>
          <span>{chapterNavState ? "Pick a chapter!" : currentChapter}</span>
        </div>
        <ul id='drop-down-menu'>{chapters}</ul>
      </div>
    </>
  );  
}

function Flashcard({ db, chapter, deck }) {
  const [cardNavCounter, setCardNavCounter] = useState(0);
  const [displayQuestion, setDisplayQuestion] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(chapter);

  function handleCardFlip() {
    setDisplayQuestion(!displayQuestion);
  }

  function handleChapterSelection(chapterString) {
    // update current chapter
    setCurrentChapter(chapterString);

    // on card change, set the card display to question
    setDisplayQuestion(true);
    // Reset to first card
    setCardNavCounter(0);
  }

  function handleCardNav(arrowId) {
    if (arrowId == "Left" && cardNavCounter > 0) {
      setCardNavCounter(cardNavCounter - 1);
    } else if (arrowId == "Right" && cardNavCounter < db.getChapter(deck, currentChapter).size - 1) {
      setCardNavCounter(cardNavCounter + 1);
    }
    // on card change, set the card display to question
    setDisplayQuestion(true);
  }

  return (
    <div className='flashcard'>
      <ChapterNav
        db={db}
        onChapterChange={handleChapterSelection}
        currentChapter={currentChapter}
        deck={deck}/>
      <CardNav
        onArrowClick={handleCardNav} 
        cardNumber={cardNavCounter}/>
      <QuestionAnswerField 
        target_card={db.getCard(deck, currentChapter, cardNavCounter)}
        displayQuestion={displayQuestion} 
        handleCardFlip={handleCardFlip} />
    </div>
  );
}

function Nav({ onNavClick }) {
  return (
    <nav>
      <ul>
        <li id="home" onClick={(e) => onNavClick(e.target.id)}>Home</li>
        <li id="edit" onClick={(e) => onNavClick(e.target.id)}>Add/Edit Cards</li>
        <li id="cards" onClick={(e) => onNavClick(e.target.id)}>Cards</li>
      </ul>
    </nav>
  );
}

const DATA = [
  [
    {id: 1, chapter: 1, question: "What is a training instance?", answer: "One training iteration through all the data."},
    {id: 2, chapter: 1, question: "Why use machine learning?", answer: "To accomplish tasks infeasible for a human."},
    {id: 3, chapter: 1, question: "What is machine learning?", answer: "A computer being trained to improve at a task, by some performance measure."},
  ],
  [    
    {id: 4, chapter: 2, question: "What is 2+2?", answer: "It's 4 silly!"},
    {id: 5, chapter: 2, question: "What is the integral of x squared?", answer: "x to the third, all divided by 3... + C!"},
    {id: 6, chapter: 2, question: "Cats or dogs?", answer: "Cats."},
  ]
];

export default function App() {
  const [pageDisplay, setPageDisplay] = useState(0);
  const [displayChapter, setDisplayChapter] = useState("Chapter 1");
  const [displayDeck, setDisplayDeck] = useState("Deck 0");
  const [db] = useState(() => new DB());  // Database - renders once

  function handleStudyBtnClick(chapter_name, deck_name) {
    // Given chapter and deck names, load the "cards" page with appropriate data
    setDisplayChapter(chapter_name);
    setDisplayDeck(deck_name);
    setPageDisplay(1);
  }

  function handleNavClick(navId) {
    if (navId == "home") {
      setPageDisplay(0);
    } else if (navId == "cards") {
      setPageDisplay(1);
    } else {
      setPageDisplay(2);
    }
  }

  function setDisplay() {
    let display = <Home />; // default to home
    if (!pageDisplay) {
      display = <Home
                  db={db} 
                  onStudyBtnClick={(chapter, deck) => handleStudyBtnClick(chapter, deck)}/>;
    } else if (pageDisplay == 1) {
      display = <Flashcard db={db} chapter={displayChapter} deck={displayDeck}/>;
    } else {
      display = <AddEdit db={db}/>;
    }

    return display;
  }

  return (
    <div>
      <Nav onNavClick={handleNavClick}/>
      <div id="card">
        {setDisplay()}
      </div>
    </div>);
}