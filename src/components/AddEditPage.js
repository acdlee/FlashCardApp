// Test
import { useState, useEffect } from 'react';

function PageTitle() {
    return (
        <h2>Add/Edit</h2>
    );
}

function NewDeckArea({ onDeckAdd, addDeck }) {
    function handleDeckAdd() {
        // Get the new deck name
        const deckName = document.getElementById('new-deck-name');
        // Add the new deck to the db
        addDeck(deckName.value);
        // Reset text input
        deckName.value = "";
        // Update deck names
        onDeckAdd();
    }
    return (
        <>
            <div className='title-button-layout'>
                <h3>Deck</h3>
                <input 
                    onClick={handleDeckAdd}
                    type='button'
                    className='button-style-2'
                    value={"Add Deck"}></input>
            </div>
            <label htmlFor='new-deck-name'>New Deck Name:</label><br />
            <input autoComplete='off' id='new-deck-name' type='text'></input><br />
        </>
    );
}

function NewChapterArea({ db, deckNames, updateChptState }) {
    const [currentDeck, setCurrentDeck] = useState("Deck 0");
    const [deckOptions, setDeckOptions] = useState([]);

    function updateDeckOptions() {
        // Create a new set of deck options
        const deckOpts = deckNames.map((name, index) => (
            <option key={index}>{name}</option>
        ));

        // Update deckOptions state
        setDeckOptions(deckOpts);
    }

    function onDeckSelect(e) {
        // Update state based off select list
        const selectedDeck = e.target.options[e.target.selectedIndex].value;
        setCurrentDeck(selectedDeck);
    }

    function addNewChapter() {
        // Add the new chapter from the input element to the database
        const newChapterName = document.getElementById('new-chapter-name');
        // Add the new chapter to the database
        db.addChapter(currentDeck, newChapterName.value);
        // Reset input text
        newChapterName.value = "";
        // Update chapter names state 
        updateChptState(db.getChapterNames(currentDeck));
    }

    // When deckNames changes, update the deck select options
    useEffect(() => {
        updateDeckOptions();
    }, [deckNames]);
    
    return (
        <div id='new-area'>
            <div className='title-button-layout more-margin'>
                <h3>Chapter</h3>
                <input
                    onClick={addNewChapter}
                    type='button'
                    className='button-style-2'
                    value={"Add Chapter"}></input>
            </div>
            <label htmlFor='deck-select'>Select Deck</label>
            <select
                onChange={(e) => onDeckSelect(e)}
                id='deck-select-new-chapt' 
                name='deck-select'
            >
                {deckOptions}
            </select><br />
            <label htmlFor='new-chapter-name' id='new-chapt-name'>New Chapter Name:</label><br />
            <input autoComplete='off' id='new-chapter-name' type='text'></input><br />
        </div>
    );
}

function Content({ db }) {
    const [deckNames, setDeckNames] = useState([]);
    const [chapterNames, setChapterNames] = useState([]);

    function addDeck(deckName) {
        db.addDeck(deckName);
    }

    function updateDeckNames() {
        // pull from database to update deckNames state
        setDeckNames(db.getDeckNames());
    }

    // Load deck names on initial load
    useEffect(() => {
        updateDeckNames();
    }, []);

    return (
      <div id='container'>
        <div id='new-chapt-deck'>
            <NewDeckArea onDeckAdd={updateDeckNames} addDeck={addDeck} />
            <NewChapterArea db={db} deckNames={deckNames} updateChptState={setChapterNames} />
        </div>
        <AddEditCardArea db={db} deckNames={deckNames} chptNamesState={chapterNames} />
      </div>  
    );
}

function AddEditCardArea({ db, deckNames, chptNamesState }) {
    const [currentDeck, setCurrentDeck] = useState("Deck 0");
    const [currentChapter, setCurrentChapter] = useState("Chapter 1");
    // We can create our own hook for these two
    const [deckOptions, setDeckOptions] = useState([]);
    const [chapterOptions, setChapterOptions] = useState([]);
    const [cardOptions, setCardOptions] = useState([]);
    const [cardQuestion, setCardQuestion] = useState("");
    const [cardAnswer, setCardAnswer] = useState("");

    function updateDeckOptions() {
        // Create a new set of deck options
        const deckOpts = deckNames.map((name, index) => (
            <option key={index}>{name}</option>
        ));

        // Update deckOptions state
        setDeckOptions(deckOpts);
    }

    function onDeckSelect(e) {
        // Update state based off select list
        const selectedDeck = e.target.options[e.target.selectedIndex].value;
        setCurrentDeck(selectedDeck);
    }

    function onChapterSelect(e) {
        // Update state based off select list
        const selectedChpt = e.target.options[e.target.selectedIndex].value;
        setCurrentChapter(selectedChpt);
    }

    function updateChapterOptions() {
        // Create a new set of chapter options
        const chapterOpts = db.getChapterNames(currentDeck).map((name, index) => (
            <option key={index}>{name}</option>
        ));

        // Update chapterOptions state
        setChapterOptions(chapterOpts);
    }

    function updateCardOptions() {
        // Create a new set of card options
        const cardOpts = db.getCards(currentDeck, currentChapter).map((card, index) => (
            <option key={index} value={card.id}>Card {card.id + 1}</option>
        ));
        
        // Update cardOptions state
        setCardOptions(cardOpts);
    }

    function updateDisplayCard(e=false) {
        // we could make this function really cool, lots of repeated code
        if (e) {
            // Update state based off card select list
            const selectedCard = e.target.options[e.target.selectedIndex].value;
            const targetCard = db.getCard(currentDeck, currentChapter, selectedCard);
            setCardQuestion(targetCard.question);
            setCardAnswer(targetCard.answer);
        } else {
            // Update state based off deck and chapter select list
            const targetCard = db.getCard(currentDeck, currentChapter, 0);  // default Card 0
            if (targetCard) {
                // If the card exists, load data
                setCardQuestion(targetCard.question);
                setCardAnswer(targetCard.answer);
            } else {
                setCardQuestion("");
                setCardAnswer("");
            }
        }
    }

    // When deckNames changes, update the deck select options
    useEffect(() => {
        updateDeckOptions();
    }, [deckNames]);

    useEffect(() => {
        updateChapterOptions();
    }, [currentDeck, chptNamesState]);

    useEffect(() => {
        updateCardOptions();
    }, [currentDeck, currentChapter]);

    useEffect(() => {
        updateDisplayCard();
    }, [currentDeck, currentChapter]);

    useEffect(() => {
        // On initial load, populate card text
        const targetCard = db.getCard(currentDeck, currentChapter, 0);
        setCardQuestion(targetCard.question);
        setCardAnswer(targetCard.answer);
    }, []);

    return (
        <div id='edit-add'>
            <div className='title-button-layout'>
                <h3>Cards</h3>
                <label class="switch">
                    <input type="checkbox"></input>
                    <span class="slider round"></span>
                </label>
                <input type='button' className='button-style-2' value={"Add Card"}></input><br />
            </div>
            <div className='select-layout'>
                <label htmlFor='deck-select'>Select Deck</label>
                <select
                    onChange={(e) => onDeckSelect(e)}
                    id='deck-select-edit-add'
                    name='deck-select'
                    className='select-style'
                >
                    {deckOptions}
                </select><br />
            </div>
            <div className='select-layout'>
                <label htmlFor='chapter-select'>Select Chapter</label>
                <select
                    onChange={(e) => onChapterSelect(e)}
                    id='chapter-select'
                    name='chapter-select' 
                    className='select-style'>
                    {chapterOptions}
                </select><br />
            </div>
            <div className='select-layout'>
                <label htmlFor='card-select'>Select Card</label>
                <select
                    onChange={(e) => updateDisplayCard(e)}
                    id='card-select'
                    name='card-select'
                    className='select-style'
                >
                    {cardOptions}
                </select><br />
            </div>
            <label>Question:</label><br />
            <input
                value={cardQuestion}
                onChange={(e) => {
                    setCardQuestion(e.target.value);
                }}
                autoComplete='off'
                type='text'
                id='card-question-text'
            ></input><br />
            <label>Answer:</label><br />
            <textarea
                value={cardAnswer}
                onChange={(e) => {
                    setCardAnswer(e.target.value);
                }}
                id='card-answer-text'
                name='answer'
                rows='5'
                cols='40'
            ></textarea>
        </div>
    );
}

export default function AddEdit({ db }) {
    return (
      <>
        <PageTitle />
        <Content db={db}/>
      </>
    );  
  }