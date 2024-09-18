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
        const newChapterName = document.getElementById('new-chapter-name').value;
        db.addChapter(currentDeck, newChapterName);
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

    function updateChapterOptions() {
        // Create a new set of chapter options
        // !! This should just use a state variable called chapterNames?
        const chapterOpts = db.getChapterNames(currentDeck).map((name, index) => (
            <option key={index}>{name}</option>
        ));

        // Update chapterOptions state
        setChapterOptions(chapterOpts);
    }

    // When deckNames changes, update the deck select options
    useEffect(() => {
        updateDeckOptions();
    }, [deckNames]);

    useEffect(() => {
        updateChapterOptions();
    }, [currentDeck, chptNamesState]);

    return (
        <div id='edit-add'>
            <div className='title-button-layout'>
                <h3>Cards</h3>
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
                    id='chapter-select'
                    name='chapter-select' 
                    className='select-style'>
                    {chapterOptions}
                </select><br />
            </div>
            <div className='select-layout'>
                <label htmlFor='card-select'>Select Card</label>
                <select 
                    id='card-select' name='card-select' className='select-style'>
                    {}
                </select><br />
            </div>
            <label>Question:</label><br />
            <input autoComplete='off' type='text' id='card-question-text'></input><br />
            <label>Answer:</label><br />
            <textarea id='card-answer-text' name='answer' rows='5' cols='40'></textarea>
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