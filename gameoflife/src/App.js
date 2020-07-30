import React from 'react';
import './App.css';

// components 
import Main from './components/main/Main.js'
import About from './components/about/About.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <nav>
					<a href = "#about">Game Rules/About</a>
				</nav>
        <h1> The Game of Life </h1>
      </header>
      <Main />
      <About />
    </div>
  );
}

export default App;
