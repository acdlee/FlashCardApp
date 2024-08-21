import { useState } from 'react';

function PageTitle() {
    return (
        <h2>Add/Edit</h2>
    );
}

function NewDeckArea() {
    return (
        <>
            <div className='select-section-area'>
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
            <div className='select-section-area more-margin'>
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
            <h3>Cards</h3>
            <input type='button' value={"Add Edit"}></input><br />
            <label htmlFor='deck-select'>Select Deck</label>
            <select name='deck-select'>
                <option value={0}>Deck 1</option>
            </select><br />
            <label htmlFor='chapter-select'>Select Chapter</label>
            <select name='chapter-select'>
                <option value={0}>Chapter 1</option>
            </select><br />
            <label htmlFor='card-select'>Select Card</label>
            <select name='card-select'>
                <option value={0}>Card 1</option>
            </select><br />
            <label>Question:</label><br />
            <input type='text'></input><br />
            <label>Answer:</label><br />
            <input type='text'></input><br />
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