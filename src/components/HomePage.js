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

function SelectArea({ onStudyBtnClick }) {
    const [chapterSelection, setChapterSelection] = useState(0);
    const [deckSelection, setDeckSelection] = useState(0);

    function handleSelect(e) {
        if (e.target.name == 'chapter') {
            setChapterSelection(e.target.value);
        } else {
            setDeckSelection(e.target.value);
        }
    }

    return (
        <div id="select-area">
            <div className='select-box'>
                <label htmlFor='deck-select'>Select a Deck</label>
                <select name="deck" id="deck-select" onChange={handleSelect}>
                    <option value={0}>Deck 1</option>
                </select><br />
            </div>
            <div className='select-box'>
                <label htmlFor='chapter-select'>Select a Chapter</label>
                <select name="chapter" id="chapter-select" onChange={handleSelect}>
                    <option value={0}>Chapter 1</option>
                    <option value={1}>Chapter 2</option>
                </select><br />
            </div>
            <input
                onClick={() => onStudyBtnClick(chapterSelection, deckSelection)}
                className='button-style' type='button' value={"Start Studying!"} />
        </div>
    );
}

export default function Home({ onStudyBtnClick }) {
    return (
        <>
            <PageTitle />
            <div className="page-content">
                <IntroArea />
                <SelectArea onStudyBtnClick={onStudyBtnClick}/>
            </div>
        </>
    );
}