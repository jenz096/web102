import { useState } from 'react'
import Cards from './Cards'
import './App.css'
import stackVsQueueImage from './assets/stack_vs_queue.png';
import binaryTreeImage from './assets/binary_tree.png';
import hashTableImage from './assets/hash_table.png';
import graphImage from './assets/graph.png';


const cards = [
  {
    id: 1,
    question: "What is a data structure?",
    answer: "Organizes and stores data.",
    category: "category-1"
  },
  {
    id: 2,
    question: "Difference between stack and queue?",
    answer: "Stack: LIFO; Queue: FIFO.",
    image: stackVsQueueImage,
    category: "category-2"
  },
  {
    id: 3,
    question: "What is a linked list?",
    answer: "Nodes linked in sequence.",
    category: "category-2"
  },
  {
    id: 4,
    question: "What is a binary tree?",
    answer: "Tree with max 2 children per node.",
    image: binaryTreeImage,
    category: "category-2"
  },
  {
    id: 5,
    question: "What is a graph?",
    answer: "Nodes connected by edges.",
    image: graphImage,
    category: "category-2"
  },
  {
    id: 6,
    question: "What is Big O notation?",
    answer: "Measures algorithm efficiency.",
    category: "category-3"
  },
  {
    id: 7,
    question: "What is a hash table?",
    answer: "Key-value pairs with fast access.",
    image: hashTableImage,
    category: "category-2"
  },
  {
    id: 8,
    question: "What is sorting?",
    answer: "Arranging data in order.",
    category: "category-3"
  },
  {
    id: 9,
    question: "Define binary search.",
    answer: "Search sorted array in halves.",
    category: "category-3"
  },
  {
    id: 10,
    question: "What is a graph?",
    answer: "Nodes connected by edges.",
    image: graphImage,
    category: "category-2"
  }
];

function App() {
return(
  <>
  <div className="main">
    <h2>Learn Basic Data Structures and Algorithms!</h2>
    <h3>Will you pass the easiest DSA test in your life?</h3>
    <p>Number of cards: 10</p>
    <Cards cards={cards} />
    
    
  </div>
  
  </>

);
}

export default App
