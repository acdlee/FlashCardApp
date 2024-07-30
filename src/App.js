import { useState } from 'react';

function ChapterNav() {
  return (
    <>
      <nav>
        <p>Chapter 1</p>
      </nav>
    </>
  );  
}

function Flashcard() {
  return (
    <>
      <ChapterNav />
    </>
  );
}

export default function App() {
  return ( 
    <>
      <Flashcard />
    </>);
}