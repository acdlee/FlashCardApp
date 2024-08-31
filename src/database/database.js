class Deck {
    #chapters;  // Chapters data

    constructor() {
        /**Class representation of a Deck.
         * 
         * Functions:
         * void addChapter(chapter_name)
         * getChapter(chapter_name) -> Chapter()
         * hasChapter(chapter_name) -> boolean
         * void printDeck()
         */
        this.#chapters = {};
    }

    addChapter(chapter_name) {
        /**Adds a Chapter object with name (reference string) chapter_name to the Deck.
         * 
         * @param {string} chapter_name - the name (reference string) of the new Chapter object
         * @returns nothing
         */
        if (chapter_name != '' && !this.hasChapter(chapter_name)) {   // empty and existence check
            const new_chapter = new Chapter();
            this.#chapters[chapter_name] = new_chapter;
        }
    }

    getChapter(chapter_name) {
        /**Accessor for a Chapter object associated with 'chapter_name', within the Deck.
         * 
         * @param {string} chapter_name - the name (reference string) of the desired Chapter object
         * @returns Chapter object if found, undefined otherwise
         */
        if (chapter_name != '' && this.hasChapter(chapter_name)) {   // empty and existence check
            return this.#chapters[chapter_name];
        }

        return undefined;
    }

    hasChapter(chapter_name) {
        /**Checks if the Deck has a Chapter with associated name (reference string) chapter_name.
         * 
         * @param {string} chapter_name - the name (reference string) of the Chapter in question
         * @returns boolean
         */
        return this.#chapters.hasOwnProperty(chapter_name);
    }

    printDeck() {
        /**Prints the Deck for debugging.
         * 
         */
        console.log("__________\nDeck:")
        for (const [_, chapter] of Object.entries(this.#chapters)) {
            console.log("\t\tChapter:")
            chapter.printCards();
        }
    }
}

class Chapter {
    #cards; // Cards data

    constructor() {
        /**Class representation of a Chapter.
         * 
         * Functions:
         * void addCard(question, answer)
         * void editCard(id, new_question, new_answer)
         * getCard(id) -> object
         * void printCards()
         */
        this.#cards = [];
        this.id = 0;
    }

    addCard(question, answer) {
        /**Adds an object representing a card with input args question and answer.
         * The associated 'id' is handled internally.
         * 
         * @param {string} question - the card question
         * @param {string} answer - the card answer
         * @returns nothing
         */
        // Remember to increment the id
        this.#cards.push({id: this.id++,"question" : question, "answer" : answer});
    }

    editCard(id, new_question=undefined, new_answer=undefined) {
        /**Edits the card object with id='id' to the new question and/or new answer.
         * 
         * @param {int} id - id for the target card
         * @param {string} question - new question
         * @param {string} answer - new answer
         */
        if (id < this.id) { // ensure the card exists
            // Edit question
            if (new_question) {
                this.#cards[id]["question"] = new_question;
            }
            // Edit answer
            if (new_answer) {
                this.#cards[id]["answer"] = new_answer;
            }
        }
    }

    getCard(id) {
        /**Accessor for the associated card with id='id'.
         * 
         * @param {int} id - associated id for the desired card
         * @returns object
         */
        if (id < this.id) { // ensure the card exists
            return this.#cards[id];
        }
    }

    printCards() {
        /**Prints the cards for debugging.
         * 
         */
        for (let i =0; i < this.#cards.length; i++) {
            console.log(this.#cards[i]);
        }
    }
}

class DB {
    #data;  // Flashcards data

    constructor() {
        /**Class representation of the database for the Flashcard App.
         * 
         * Functions:
         * void initData()
         * void addCard(deck_name, chapter_name, card)
         * void addChapter(deck_name, chapter_name)
         * void addDeck(deck_name)
         * hasDeck(deck_name) -> boolean
         * hasChapter(deck_name, chapter_name) -> boolean
         * void printDecks()
         */
        this.dummy_data = {
            "Chapter 1": 
            [
              {question: "What is a training instance?", answer: "One training iteration through all the data."},
              {question: "Why use machine learning?", answer: "To accomplish tasks infeasible for a human."},
              {question: "What is machine learning?", answer: "A computer being trained to improve at a task, by some performance measure."},
            ],
            "Chapter 2":
            [    
              {question: "What is 2+2?", answer: "It's 4 silly!"},
              {question: "What is the integral of x squared?", answer: "x to the third, all divided by 3... + C!"},
              {question: "Cats or dogs?", answer: "Cats."},
            ]
        };
        this.initData();
    }

    initData() {
        /**Initializes the data based off some dummy data.
         * 
         */
        this.#data = {};
        const deck_name = "Deck 0";
        this.addDeck(deck_name); // add the deck
        for (const [chapter_name, chapter_cards] of Object.entries(this.dummy_data)) {
            this.addChapter(deck_name, chapter_name);
            for (let i = 0; i < chapter_cards.length; i++) {
                this.addCard(deck_name, chapter_name, chapter_cards[i]);
            }
        }
        
    }

    addCard(deck_name, chapter_name, card) {
        /**Adds a flashcard with values='card' to a chapter with name='chapter_name' to
         * a deck with name='deck_name'.
         * 
         * @param {string} deck_name - Target deck name
         * @param {string} chapter_name - Target chapter name
         * @param {object} card - New flashcard values
         */
        if (deck_name != '' && chapter_name != '' && this.hasDeck(deck_name)
            && this.hasChapter(deck_name, chapter_name)) { // empty and existence checks
                this.#data[deck_name].getChapter(chapter_name).addCard(card["question"], card["answer"]);
        }
    }

    addChapter(deck_name, chapter_name) {
        /**Adds a chapter with name='chapter_name' to a deck with name='deck_name'.
         * 
         * @param {string} deck_name - Target deck name
         * @param {string} chapter_name - New chapter name
         */
        if (deck_name != '' && chapter_name != '' && this.hasDeck(deck_name)
            && this.hasChapter(deck_name, chapter_name) == false) { // empty and existence checks
                // if the names aren't empty, the deck exists, and the chapter does not exist:
                this.#data[deck_name].addChapter(chapter_name);
        }
    }

    addDeck(deck_name) {
        /**Adds a deck to the data with name='deck_name'.
         * 
         * @param {string} deck_name - New deck name
         */
        if (deck_name != '' && !this.hasDeck(deck_name)) {  // empty and existence check
            this.#data[deck_name] = new Deck();
        }
    }

    hasDeck(deck_name) {
        /**Checks if the data has the deck with name='deck_name'.
         * 
         * @param {string} deck_name - Target deck name
         * @returns boolean
         */
        return this.#data.hasOwnProperty(deck_name);
    }

    hasChapter(deck_name, chapter_name) {
        /**Checks if the data has the chapter with name='chapter_name' in deck
         * with name='deck_name'.
         * 
         * @param {string} deck_name - Target deck name
         * @param {string} chapter_name - Target chapter name
         * @returns boolean
         */
        if (this.hasDeck(deck_name)) {
            return this.#data[deck_name].hasChapter(chapter_name);
        }

        return false;   // if the deck does not exist, return false
    }

    getCard(deck_name, chapter_name, id) {
        /**Returns a flashcard with id='id' from a chapter with name='chapter_name' and
         * deck with name='deck_name'.
         * 
         * @param {string} deck_name - Target deck name
         * @param {string} chapter_name - Target chapter name
         * @param {int} card - Target card id
         */
        if (deck_name != '' && chapter_name != '' && this.hasDeck(deck_name)
            && this.hasChapter(deck_name, chapter_name)) { // empty and existence checks
                return this.#data[deck_name].getChapter(chapter_name).getCard(id);
        }
    }

    editCard(deck_name, chapter_name, id, question, answer) {
        /**Edits a flashcard with id='id' from a chapter with name='chapter_name' and
         * deck with name='deck_name', with new values question='question and answer='answer'.
         * 
         * @param {string} deck_name - Target deck name
         * @param {string} chapter_name - Target chapter name
         * @param {int} card - Target card id
         */
        if (deck_name != '' && chapter_name != '' && this.hasDeck(deck_name)
            && this.hasChapter(deck_name, chapter_name)) { // empty and existence checks
                this.#data[deck_name].getChapter(chapter_name).editCard(id, question, answer);
        }
    }

    printDecks() {
        /**Prints each deck for debugging.
         * 
         */
        for (const [_, deck] of Object.entries(this.#data)) {
            deck.printDeck();
        }
    }
}

class TestDB {
    /*Test Cases:
    1. get a card's q/a
    2. add a card
    3. edit a card
    4. add a chapter (dupe and unique chapter)
    5. add a deck   (dupe and unique deck)
    6. adding a new chapter and card to a new deck

    Still need to test:
    1. adding a card to a deck that doesn't exist
    2. adding a card to a chapter that doesn't exist
    3. editing a card that doesn't exist
    */
    #db;

    constructor() {
        /**Test class for the DB class.
         * 
         */
        this.#db = new DB();    // inits dummy data by default
    }

    testDummyData() {
        this.#db.printDecks();
    }

    testAddCard() {
        const question = "What does the cat have?"
        const answer = "A hat.";
        const new_card = {"question": question, "answer": answer};
        const deck_name = "Deck 0";
        const chapter_name = "Chapter 1";
        this.#db.addCard(deck_name, chapter_name, new_card);
        this.#db.printDecks();
    }

    testGetCard() {
        const id = 0;
        const deck_name = "Deck 0";
        const chapter_name = "Chapter 1";
        const card = this.#db.getCard(deck_name, chapter_name, id);
        console.log(card);
    }

    testEditCard() {
        const id = 0;
        const deck_name = "Deck 0";
        const chapter_name = "Chapter 1";
        const question = "What the?";
        const answer = "Oh, I understand.";

        console.log(this.#db.getCard(deck_name, chapter_name, id));
        this.#db.editCard(deck_name, chapter_name, id, question, answer);
        console.log(this.#db.getCard(deck_name, chapter_name, id));
    }

    testAddChapter() {
        const deck_name = "Deck 0";
        // const new_chapter = "Chapter 2";
        const new_chapter = "Chapter 3";
        this.#db.addChapter(deck_name, new_chapter);
        this.#db.printDecks();
    }

    testAddDeck() {
        // const deck_name = "Deck 0";
        const deck_name = "Deck 1";
        this.#db.addDeck(deck_name);
        this.#db.printDecks();
    }

    testFullAdd() {
        const question = "I hope this works?"
        const answer = "It does!";
        const new_card = {"question": question, "answer": answer};
        const deck_name = "Deck 1";
        const chapter_name = "Chapter 1";

        this.#db.addDeck(deck_name);
        this.#db.addChapter(deck_name, chapter_name);
        this.#db.addCard(deck_name, chapter_name, new_card);

        this.#db.printDecks();
    }
}

if (require.main == module) {
    const test = new TestDB();
    // test.testDummyData();
    // test.testAddCard();
    // test.testGetCard();
    // test.testEditCard();
    // test.testAddChapter();
    // test.testAddDeck();
    // test.testFullAdd();
}