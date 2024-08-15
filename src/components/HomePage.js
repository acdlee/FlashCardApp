function PageTitle() {
    return (
        <h2>Welcome!</h2>
    );
}

function ClippyArea() {
    return (
        <img alt="clippy"/>
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
            <label htmlFor='deck-select'>Select a Deck</label><br />
            <select name="deck" id="deck-select">
                <option value={0}>Deck 1</option>
            </select><br />
            <label htmlFor='chapter-select'>Select a Chapter</label><br />
            <select name="chapter" id="chapter-select">
                <option value={0}>Chapter 1</option>
                <option value={1}>Chapter 2</option>
            </select><br />
            <input type="submit" value={"Start Studying!"} />
        </div>
    );
}

function HomeHeader() {
    return (
        <div id="home-header">
            <ClippyArea />
            <PageTitle />
        </div>
    );
}

export default function Home() {
    return (
        <>
            <HomeHeader />
            <div className="page-content">
                <IntroArea />
                <SelectArea />
            </div>
        </>
    );
}