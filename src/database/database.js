class Deck {
    // Class representation of a deck.

    // Chapters data
    #chapters;

    constructor() {
        this.#chapters = {};
    }

    addChapter(chapter_name) {
        if (chapter_name != '') {   // empty check
            const new_chapter = new Chapter();
            this.#chapters[chapter_name] = new_chapter;
        }
    }

    getChapter(chapter_name) {
        /**Accessor for a chapter with the associated name chapter_name.
         * Returns undefined if the chapter with chapter_name doesn't exist.
         * 
         */
        if (chapter_name != '') { // empty check
            return this.#chapters[chapter_name];
        }

        return undefined;
    }

    hasChapter(chapter_name) {
        /**Checks if the chapter with name=chapter_name exists in the deck.
         * Returns true if it exists, false otherwise.
         */
        return this.#chapters.hasOwnProperty(chapter_name);
    }

    printDeck() {
        for (const [_, chapter] of Object.entries(this.#chapters)) {
            console.log("\t\tChapter:")
            chapter.printCards();
        }
    }
}

class Chapter {
    // Class representation of a chapter.

    // Cards data
    #cards;

    constructor() {
        this.#cards = [];
        this.id = 0;
    }

    addCard(question, answer) {
        /**Adds the card with input question, answer to the chapter.
         * 
         * Args: the new card's question and answer.
         */
        // Remember to increment the id
        this.#cards.push({id: this.id++,"question" : question, "answer" : answer});
    }

    editCard(id, new_question=undefined, new_answer=undefined) {
        /**
         * Edits the card with id='id' to the new question and/or new answer.
         * 
         * @param {int} id - id for the target card
         * @param {string} question - new question (optional)
         * @param {string} answer - new answer (optional)
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
        /**
         * Returns the associated card with id=id.
         * 
         * @param {int} id - associated id for the desired card
         */
        if (id < this.id) { // ensure the card exists
            return this.#cards[id];
        }
    }

    printCards() {
        for (let i =0; i < this.#cards.length; i++) {
            console.log(this.#cards[i]);
        }
    }
}

class DB {
    // Class representation of a database.

    // Default data
    #data;

    constructor() {
        // Assign default data to the database
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
        /**Adds a flashcard with values=card to a chapter with name=chapter_name to
         * a deck with name=deck_name.
         * 
         */
        if (deck_name != '' && chapter_name != '' && this.hasDeck(deck_name)
            && this.hasChapter(deck_name, chapter_name)) { // empty and existence checks
                this.#data[deck_name].getChapter(chapter_name).addCard(card["question"], card["answer"]);
        }
    }

    addChapter(deck_name, chapter_name) {
        /**Adds a chapter with name=chapter_name to a deck with name=deck_name.
         * 
         */
        if (deck_name != '' && chapter_name != '' && this.hasDeck(deck_name)
            && !this.hasChapter(chapter_name)) { // empty and existence checks
                // if the names aren't empty, the deck exists, and the chapter does not exist:
                this.#data[deck_name].addChapter(chapter_name);
        }
    }

    addDeck(deck_name) {
        /**Adds a deck to the data with name=deck_name.
         * 
         */
        if (deck_name != '' && !this.hasDeck(deck_name)) {  // empty and existence check
            this.#data[deck_name] = new Deck();
        }
    }

    hasDeck(deck_name) {
        /**Checks if the data has the deck with name=deck_name.
         * 
         */
        return this.#data.hasOwnProperty(deck_name);
    }

    hasChapter(deck_name, chapter_name) {
        /**Checks if the data has the chapter with name=chapter_name in deck
         * with name=deck_name.
         */
        if (this.hasDeck(deck_name)) {
            return this.#data[deck_name].hasChapter(chapter_name);
        }

        return false;   // if the deck does not exist, return false
    }

    printDecks() {
        for (const [_, deck] of Object.entries(this.#data)) {
            console.log("_______________________\nDeck:")
            deck.printDeck();
        }
    }
}

if (require.main == module) {
    const db = new DB();
    db.printDecks();

    // print cards and check init dummy data




    // console.log(db.getDeck("Chapter 1"));

    // chpt = new Chapter();
    // chpt.addCard("Does that cat have a hat?", "Yes!");
    // chpt.addCard("What does the fox say?", "Idk.");
    // chpt.editCard(1, undefined, "BOWBOWBOWBOW.");
    // chpt.printCards();

    /*Test Cases:
    1. get a card's q/a
    2. add a card
    3. edit a card
    4. add a chapter
    5. add a deck
    */
}