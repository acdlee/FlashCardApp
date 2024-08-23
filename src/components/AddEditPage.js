import { useState } from 'react';

function PageTitle() {
    return (
        <h2>Add/Edit</h2>
    );
}

function NewDeckArea() {
    return (
        <>
            <div className='title-button-layout'>
                <h3>Deck</h3>
                <input type='button' className='button-style-2' value={"Add Deck"}></input>
            </div>
            <label htmlFor='new-deck-name'>New Deck Name:</label><br />
            <input type='text'></input><br />
        </>
    );
}

function NewChapterArea() {
    return (
        <div id='new-area'>
            <div className='title-button-layout more-margin'>
                <h3>Chapter</h3>
                <input type='button' className='button-style-2' value={"Add Chapter"}></input>
            </div>
            <label htmlFor='deck-select'>Select Deck</label>
            <select name='deck-select'>
                <option value={0}>Deck 1</option>
            </select><br />
            <label htmlFor='new-chapter-name' id='new-chapt-name'>New Chapter Name:</label><br />
            <input type='text'></input><br />
        </div>
    );
}

function Content() {
    return (
      <div id='container'>
        <div id='new-chapt-deck'>
            <NewDeckArea />
            <NewChapterArea />
        </div>
        <AddEditCardArea/>
      </div>  
    );
}

function AddEditCardArea() {
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
                <select name='deck-select' className='select-style'>
                    <option value={0}>Deck 1</option>
                </select><br />
            </div>
            <div className='select-layout'>
                <label htmlFor='chapter-select'>Select Chapter</label>
                <select name='chapter-select' className='select-style'>
                    <option value={0}>Chapter 1</option>
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

export default function AddEdit() {
    return (
      <>
        <PageTitle />
        <Content />
      </>
    );  
  }