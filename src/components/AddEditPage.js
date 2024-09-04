import { useState } from 'react';

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
                        // Get the new deck name from input text
                        const id = document.getElementById('new-deck-name').value;
                        onAddDeck(id);
                    }}
                    type='button'
                    className='button-style-2'
                    value={"Add Deck"}></input>
            </div>
            <label htmlFor='new-deck-name'>New Deck Name:</label><br />
            <input id='new-deck-name' type='text'></input><br />
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
                        const id = document.getElementById("new-chapter-name").value;
                        const target = document.getElementById("deck-select-new-chapt");
                        const deck_name = target.options[target.selectedIndex].text;
                        onAddChapter(deck_name, id);
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
            <input id='new-chapter-name' type='text'></input><br />
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
    const [toggleBtn, setToggleBtn] = useState(false);  // false => Add Card function

    return (
        <div id='edit-add'>
            <div className='title-button-layout'>
                <h3>Cards</h3>
                {/* I think i should change this button style when i start adding states.
                    Basically, I should render the left-down button classes on default load/
                    on 2nd click, and 1st click i should render right-down button.

                    Based on this state, I'll allow the select select-card, preload question/answer
                */}
                <input type='button' className='button-style-2' value={"Add Edit"}></input><br />
            </div>
            <div className='select-layout'>
                <label htmlFor='deck-select'>Select Deck</label>
                <select
                    onChange={() => {
                        // On deck select change, update the deckSelection state
                        const target = document.getElementById("deck-select-edit-add");
                        handleDeckSelect(target.options[target.selectedIndex].value);
                    }}
                    id='deck-select-edit-add'
                    name='deck-select'
                    className='select-style'>
                    {getDeckOptions(db)}
                </select><br />
            </div>
            <div className='select-layout'>
                <label htmlFor='chapter-select'>Select Chapter</label>
                <select name='chapter-select' className='select-style'>
                    {getChapterOptions(db, deckSelection)}
                </select><br />
            </div>
            <div className='select-layout'>
                <label htmlFor='card-select'>Select Card</label>
                <select name='card-select' className='select-style'>
                    <option value={0}>Card 1</option>
                </select><br />
            </div>
            <label>Question:</label><br />
            <input type='text'></input><br />
            <label>Answer:</label><br />
            <textarea name='answer' rows='5' cols='40'></textarea>
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