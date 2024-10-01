import React, { useState } from 'react';
import './Cards.css';

function Cards({cards}) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNextCard = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * cards.length);
    } while (randomIndex === currentCardIndex); // Ensure the new card is different from the current one

    setCurrentCardIndex(randomIndex);
    setIsFlipped(false); // Reset flip state when moving to the next card
  };

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <div className="card" onClick={handleCardFlip}>
        <p>{isFlipped ? cards[currentCardIndex].answer : cards[currentCardIndex].question}</p>
        {isFlipped && cards[currentCardIndex].image && (
          <img className="image" src={cards[currentCardIndex].image} alt="Card visual" />
        )}
      </div>
      <button onClick={handleNextCard}>&rarr;</button>
    </div>
  );
}

export default Cards;