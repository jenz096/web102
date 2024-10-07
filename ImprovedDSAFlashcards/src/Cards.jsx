import React, { useState } from 'react';
import './Cards.css'; // Ensure you add the CSS for the borders here

function Cards({ cards }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState("");  // For storing user input
  const [feedback, setFeedback] = useState("");    // For feedback (correct/incorrect)
  const [hasSubmitted, setHasSubmitted] = useState(false);  // To track submission status
  const [inputBorderClass, setInputBorderClass] = useState(""); // For controlling the border color

  // Handle moving to the next card in sequence
  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length); // Cycle through cards
    resetCardState();
  };

  // Handle moving to the previous card in sequence
  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => 
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1 // Wrap around to the last card
    );
    resetCardState();
  };

  // Reset card state when moving between cards
  const resetCardState = () => {
    setIsFlipped(false); 
    setUserGuess("");  // Reset the input box
    setFeedback("");   // Reset feedback
    setHasSubmitted(false); // Reset submission state
    setInputBorderClass(""); // Reset border color
  };

  // Handle user guess submission
  const handleSubmit = () => {
    setHasSubmitted(true);
    const correctAnswer = cards[currentCardIndex].answer.toLowerCase();

    // Set feedback and border color based on correctness
    if (userGuess.toLowerCase() === correctAnswer) {
      setFeedback("Correct!");
      setInputBorderClass("correct"); // Apply green border
    } else {
      setFeedback("Incorrect. The correct answer is " + cards[currentCardIndex].answer);
      setInputBorderClass("incorrect"); // Apply red border
    }
  };

  // Handle the card flip manually
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

      <div>
        <input 
          type="text" 
          placeholder="Enter your guess" 
          value={userGuess} 
          onChange={(e) => setUserGuess(e.target.value)} 
          className={`guess-input ${inputBorderClass}`} // Dynamically set the class for border color
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Show feedback after the user submits */}
      {hasSubmitted && <p>{feedback}</p>}

      {/* Navigation buttons */}
      <div className="navigation-buttons">
        <button onClick={handlePrevCard}>&larr; Back</button>
        <button onClick={handleNextCard}>&rarr; Next</button>
      </div>
    </div>
  );
}

export default Cards;
