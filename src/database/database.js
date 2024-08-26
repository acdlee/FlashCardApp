class Deck {
    // Class representation of a deck.

    // Chapters data
    #chapters;

    constructor() {
        this.#chapters = {};
    }

    addChapter(chapter_name) {
        if (chapter_name != '') {   // empty check
            const new_chapter = Chapter();
            this.#chapters[chapter_name] = new_chapter;
        }
    }

    getChapter(chapter_name) {
        if (chapter_name != '') { // empty check
            return this.#chapters[chapter_name];
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
        this.#data = {
            "Chapter 1": 
            [
              {id: 1, chapter: 1, question: "What is a training instance?", answer: "One training iteration through all the data."},
              {id: 2, chapter: 1, question: "Why use machine learning?", answer: "To accomplish tasks infeasible for a human."},
              {id: 3, chapter: 1, question: "What is machine learning?", answer: "A computer being trained to improve at a task, by some performance measure."},
            ],
            "Chapter 2":
            [    
              {id: 4, chapter: 2, question: "What is 2+2?", answer: "It's 4 silly!"},
              {id: 5, chapter: 2, question: "What is the integral of x squared?", answer: "x to the third, all divided by 3... + C!"},
              {id: 6, chapter: 2, question: "Cats or dogs?", answer: "Cats."},
            ]
        };
    }

    getDeck(deck_name) {
        /**Accessor for a deck.
         * 
         * Args: deck name
         * Returns: the requested deck; undefined if the deck doesn't exist
         */
        if (this.#data.hasOwnProperty(deck_name)) {
            return this.#data[deck_name];
        }

        return undefined;
    }

    getChapter(deck_name, chapter_name) {
        /**Accessor for a chapter.
         * 
         * Args: deck name, chapter name
         * Returns: the requested chapter; undefined if the deck/chapter doesn't exist
         */
        if (this.#data.hasOwnProperty(deck_name)) {
            return this.#data[deck_name];
        }

        return undefined;
    }

    addNewDeck(deck_name) {
        /**Method to add a new deck to the data.
         * 
         * Args: new deck name
         */
        if (!this.#data.hasOwnProperty(deck_name)) {
            return this.#data[deck_name] = [];
        }
    }
}

if (require.main == module) {
    const db = new DB();
    // console.log(db.getDeck("Chapter 1"));

    db.addNewDeck("Cats");
    // console.log(db.getDeck("Cats"));

    chpt = new Chapter();
    chpt.addCard("Does that cat have a hat?", "Yes!");
    chpt.addCard("What does the fox say?", "Idk.");
    chpt.editCard(1, undefined, "BOWBOWBOWBOW.");
    chpt.printCards();
}