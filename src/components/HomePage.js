import clippy from '../images/clippy.jpg'
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
                To change the cards that will appear in the "Cards" tab, 
                please make your selection to the right.
            </p>
            <p>
                To add or edit a deck or card, please visit the "Add/Edit Cards" tab.
            </p>
        </div>
    );
}

function SelectArea() {
    return (
        <div id="select-area">
            <div className='select-box'>
                <label htmlFor='deck-select'>Select a Deck</label>
                <select name="deck" id="deck-select">
                    <option value={0}>Deck 1</option>
                </select><br />
            </div>
            <div className='select-box'>
                <label htmlFor='chapter-select'>Select a Chapter</label>
                <select name="chapter" id="chapter-select">
                    <option value={0}>Chapter 1</option>
                    <option value={1}>Chapter 2</option>
                </select><br />
            </div>
            <input className='button-style' type='button' value={"Start Studying!"} />
        </div>
    );
}

export default function Home() {
    return (
        <>
            <PageTitle />
            <div className="page-content">
                <IntroArea />
                <SelectArea />
            </div>
        </>
    );
}