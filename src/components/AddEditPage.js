import { useState, useEffect } from 'react';

function getDeckOptions(db) {
    const deck_options = db.getDeckNames().map((deck_name, index) => {
        return (
            <option key={index} value={deck_name}>{deck_name}</option>
        );
    });

    return deck_options;
}

function getChapterOptions(db, deckSelection) {
    const chapter_options = db.getChapterNames(deckSelection).map((chapter_name, index) => {
        return (
            <option key={index} value={chapter_name}>{chapter_name}</option>
        );
    });

    return chapter_options;
}

function PageTitle() {
    return (
        <h2>Add/Edit</h2>
    );
}

function NewDeckArea({ onAddDeck }) {
    return (
        <>
            <div className='title-button-layout'>
                <h3>Deck</h3>
                <input 
                    onClick={() => {
                        // Get the new deck name from input text and add to DB
                        const id = document.getElementById('new-deck-name').value;
                        onAddDeck(id);
                        // Reset text input
                        const inputText = document.getElementById('new-deck-name');
                        inputText.value = "";
                    }}
                    type='button'
                    className='button-style-2'
                    value={"Add Deck"}></input>
            </div>
            <label htmlFor='new-deck-name'>New Deck Name:</label><br />
            <input autoComplete='off' id='new-deck-name' type='text'></input><br />
        </>
    );
}

function NewChapterArea({ db, onAddChapter }) {
    return (
        <div id='new-area'>
            <div className='title-button-layout more-margin'>
                <h3>Chapter</h3>
                <input
                    onClick={() => {
                        // Get the new chapter name and selected deck
                        const id = document.getElementById("new-chapter-name");
                        const target = document.getElementById("deck-select-new-chapt");
                        const deck_name = target.options[target.selectedIndex].text;
                        // Add new chapter to DB
                        onAddChapter(deck_name, id.value);
                        // Reset text input
                        id.value = "";
                    }}
                    type='button'
                    className='button-style-2'
                    value={"Add Chapter"}></input>
            </div>
            <label htmlFor='deck-select'>Select Deck</label>
            <select id='deck-select-new-chapt' name='deck-select'>
                {getDeckOptions(db)}
            </select><br />
            <label htmlFor='new-chapter-name' id='new-chapt-name'>New Chapter Name:</label><br />
            <input autoComplete='off' id='new-chapter-name' type='text'></input><br />
        </div>
    );
}

function Content({ db }) {
    const [deckSelection, setDeckSelection] = useState("Deck 0");
    const [deckOptions, setDeckOptions] = useState(db.getDeckNames());
    const [chapterOptions, setChapterOptions] = useState(db.getChapterNames(deckSelection));

    function handleDeckSelectEditAdd(selected_deck) {
        setDeckSelection(selected_deck);
    }

    function handleNewDeck(new_deck_name) {
        // Add the new deck
        db.addDeck(new_deck_name);
        // Updating the state will allow select lists to see the update without page refresh
        setDeckOptions(db.getDeckNames());
    }

    function handleNewChapter(deck_name, new_chapter_name) {
        // Add the new chapter
        db.addChapter(deck_name, new_chapter_name);
        // Updating the state will allow select lists to see the update without page refresh
        setChapterOptions(db.getChapterNames());
    }

    function handleNewCard(deck_name, chapter_name, new_card) {
        // new card must be an object with question, answer properties
        // db.addCard(deck_name, chapter_name, new_card);
        console.log(new_card);
    }

    function handleEditCard(deck_name, chapter_name, id, edit_card) {
        // db.editCard(deck_name, chapter_name, id, edit_card["question"], edit_card["answer"]);
        console.log(id, edit_card);
    }

    return (
      <div id='container'>
        <div id='new-chapt-deck'>
            <NewDeckArea onAddDeck={handleNewDeck}/>
            <NewChapterArea db={db} onAddChapter={handleNewChapter}/>
        </div>
        <AddEditCardArea db={db} deckSelection={deckSelection} handleDeckSelect={handleDeckSelectEditAdd}/>
      </div>  
    );
}

function AddEditCardArea({ db, deckSelection, handleDeckSelect }) {
    const [chapterSelection, setChapterSelection] = useState("Chapter 1");
    const [cardOptions, setCardOptions] = useState([]);
    const [cards, setCards] = useState([]);
    const [cardQuestion, setCardQuestion] = useState("");
    const [cardAnswer, setCardAnswer] = useState("");
    const [cardSelect, setCardSelect] = useState("0");

    let thisOne = "";

    useEffect(() => {
        const deck_select = document.getElementById('deck-select-edit-add');
        const deck_selected = deck_select.options[deck_select.selectedIndex];
        thisOne = deck_selected.value;
    }, [deckSelection]);

    async function getData() {
        // Set chapter state based off input element value
        const chpt_select = document.getElementById('chapter-select');
        const selected = chpt_select.options[chpt_select.selectedIndex];
        console.log("this is the selected", selected);
        setChapterSelection(selected.value);

        // Get the deck from input element value
        const deck_select = document.getElementById('deck-select-edit-add');
        const deck_selected = deck_select.options[deck_select.selectedIndex];
        handleDeckSelect(deck_selected.value);
        console.log("Deck selection", deck_selected.value, deckSelection);

        // Set card data, if it exists
        const data = db.getCards(thisOne, selected.value);
        setCards(data);
        const results = [];

        if (data != []) {
            // Store results in the results array
            console.log("did not enter the no card clause");
            data.forEach(element => {
                results.push(
                    <option key={"Card " + element["id"]} value={element["id"]}>Card {element["id"] + 1}</option>
                    // <option key={"Card " + element["id"]} value={element}>Card {element["question"]}</option>
                );
            });
        } else {
            console.log("We entered the no cards clause");
            results.push(
                <option key={"No Cards"}>Empty</option>
            );
        }

        
        setCardOptions(results);
        changeCard();
    }

    async function changeCard() {
        // Get the chapter from input element value
        const chpt_select = document.getElementById('chapter-select');
        const selected = chpt_select.options[chpt_select.selectedIndex];
        
        // Get the deck from input element value
        const deck_select = document.getElementById('deck-select-edit-add');
        const deck_selected = deck_select.options[deck_select.selectedIndex];
        console.log(deckSelection);

        // flag for new deck
        let new_deck_flag = db.getChapterNames(deck_selected.value).length == 0;

        // Set the card displays, if cards exist
        if (db.getChapter(deckSelection, selected.value).size != 0 && !new_deck_flag) {
            setCardQuestion(db.getCard(deckSelection, selected.value, cardSelect)["question"]);
            setCardAnswer(db.getCard(deckSelection, selected.value, cardSelect)["answer"]);
        } else {
            // if empty chapter or deck, empty card text, select card text, and select chapter text
            setCardQuestion("");
            setCardAnswer("");
        }
        
    }

    // Load card data on initial load
    useEffect(() => {
        getData();
    }, []);
    // Update card text on cardSelect state change
    useEffect(() => {
        changeCard();
    }, [cardSelect]);

    return (
        <div id='edit-add'>
            <div className='title-button-layout'>
                <h3>Cards</h3>
                <input type='button' className='button-style-2' value={"Add Card"}></input><br />
            </div>
            <div className='select-layout'>
                <label htmlFor='deck-select'>Select Deck</label>
                <select
                    onChange={() => {
                        // On deck select change, update the deckSelection state
                        const target = document.getElementById("deck-select-edit-add");
                        handleDeckSelect(target.options[target.selectedIndex].value);
                        getData();
                    }}
                    id='deck-select-edit-add'
                    name='deck-select'
                    className='select-style'>
                    {getDeckOptions(db)}
                </select><br />
            </div>
            <div className='select-layout'>
                <label htmlFor='chapter-select'>Select Chapter</label>
                <select 
                    onChange={() => {
                        getChapterOptions(db, deckSelection);
                        getData();
                    }}
                    id='chapter-select'
                    name='chapter-select' 
                    className='select-style'>
                    {getChapterOptions(db, deckSelection)}
                </select><br />
            </div>
            <div className='select-layout'>
                <label htmlFor='card-select'>Select Card</label>
                <select 
                    onChange={(e) => {
                        setCardSelect(e.target.value);
                        changeCard();    
                    }}
                    id='card-select' name='card-select' className='select-style'>
                    {cardOptions}
                </select><br />
            </div>
            <label>Question:</label><br />
            <input autoComplete='off' value={cardQuestion} onChange={(e) => {
                setCardQuestion(e.target.value);
            }} type='text' id='card-question-text'></input><br />
            <label>Answer:</label><br />
            <textarea value={cardAnswer} onChange={(e) => {
                setCardAnswer(e.target.value);
            }} id='card-answer-text' name='answer' rows='5' cols='40'></textarea>
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