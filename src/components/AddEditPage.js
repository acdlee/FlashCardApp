import { useState } from 'react';

function PageTitle() {
    return (
        <h2>Add/Edit</h2>
    );
}

function NewDeckArea() {
    return (
        <>
            <h3>Deck</h3>
            <label htmlFor='new-deck-name'>New Deck Name</label><br />
            <input type='text'></input><br />
            <input type='button' value={"Add Deck"}></input>
        </>
    );
}

function NewChapterArea() {
    return (
        <>
            <h3>Chapter</h3>
            <label htmlFor='deck-select'>Select Deck</label>
            <select name='deck-select'>
                <option value={0}>Deck 1</option>
            </select><br />
            <label htmlFor='new-chapter-name'>New Chapter Name</label><br />
            <input type='text'></input><br />
            <input type='button' value={"Add Chapter"}></input>
        </>
    );
}

function Container() {
    return (
      <div id='small-width'>
        <NewDeckArea />
        <NewChapterArea />
      </div>  
    );
}

function AddEditCardArea() {
    return (
        <div id='float-right'>
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
        <Container />
        <AddEditCardArea id='float-right'/>
      </>
    );  
  }