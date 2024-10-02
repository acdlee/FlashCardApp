// Test
import { useState, useEffect } from 'react';

function PageTitle() {
    return (
        <h2>Add/Edit</h2>
    );
}

function NewDeckArea({ onDeckAdd, addDeck }) {
    return <div>new start</div>
}

function NewChapterArea({ db, deckNames, updateChptState }) {
    return <div>new start</div>
}

function Content({ db }) {

    return (
        <div>
            new start
        </div>
    );
}

function AddEditCardArea({ db, deckNames, chptNamesState }) {

    // JSX
    return (
        <div>
            Start here.
        </div>
    );
}

export default function AddEdit({ db }) {
    return (
      <>
        <PageTitle />
        <Content db={db}/>
      </>
    );  
  }