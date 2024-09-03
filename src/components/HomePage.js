import { useState } from 'react';

function PageTitle() {
    return (
        <h2>Home</h2>
    );
}

function IntroArea() {
    return (
        <div id="intro-area">
            <p>Welcome to the Flashcard App!</p>
            <p>
                To change the cards that will appear in the <i> Cards </i>
                tab, please make your selection to the right.
            </p>
            <p>
                To add or edit your cards, visit the 
                <i> Add/Edit Cards </i> tab.
            </p>
        </div>
    );
}

function SelectArea({ db, onStudyBtnClick }) {
    const [chapterSelection, setChapterSelection] = useState("Chapter 1");
    const [deckSelection, setDeckSelection] = useState("Deck 0");

    function handleSelect(e) {
        if (e.target.name == 'chapter') {
            setChapterSelection(e.target.value);
        } else {
            setDeckSelection(e.target.value);
        }
    }

    const deck_options = db.getDeckNames().map((deck_name, index) => {
        return (
            <option key={index} value={deck_name}>{deck_name}</option>
        );
    });

    const chapter_options = db.getChapterNames(deckSelection).map((chapter_name, index) => {
        return (
            <option key={index} value={chapter_name}>{chapter_name}</option>
        );
    });

    return (
        <div id="select-area">
            <div className='select-box'>
                <label htmlFor='deck-select'>Select a Deck</label>
                <select name="deck" id="deck-select" onChange={handleSelect}>
                    {deck_options}
                </select><br />
            </div>
            <div className='select-box'>
                <label htmlFor='chapter-select'>Select a Chapter</label>
                <select name="chapter" id="chapter-select" onChange={handleSelect}>
                    {chapter_options}
                </select><br />
            </div>
            <input
                onClick={() => onStudyBtnClick(chapterSelection, deckSelection)}
                className='button-style' type='button' value={"Start Studying!"} />
        </div>
    );
}

export default function Home({ db, onStudyBtnClick }) {
    return (
        <>
            <PageTitle />
            <div className="page-content">
                <IntroArea />
                <SelectArea db={db} onStudyBtnClick={onStudyBtnClick}/>
            </div>
        </>
    );
}