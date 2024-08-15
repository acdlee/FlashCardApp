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
        <>
            <p>Welcome to the Flashcard App!</p>
            <p>
                To change the cards that will appear in the "Cards" tab, 
                please make your selection to the right.
            </p>
            <p>
                To add or edit a deck or card, please visit the "Add/Edit Cards" tab.
            </p>
        </>
    );
}

function SelectArea() {
    return (
        <>
            <label htmlFor='deck-select'>Select a Deck</label>
            <select name="deck" id="deck-select">
                <option value={0}>Deck 1</option>
            </select>
            <label htmlFor='chapter-select'>Select a Chapter</label>
            <select name="chapter" id="chapter-select">
                <option value={0}>Chapter 1</option>
                <option value={1}>Chapter 2</option>
            </select>
            <input type="submit" value={"Start Studying!"} />
        </>
    );
}

export default function Home() {
    return (
        <>
            <ClippyArea />
            <PageTitle />
            <IntroArea />
            <SelectArea />
        </>
    );
}