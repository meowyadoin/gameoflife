import React from 'react';
import './About.css';

function About(){
    return(
        <div className = "about" id = "about">
            <div id = "rules">
            <h2>
                Game Rules
            </h2>
            <ol>
                <li>
                1. Any live cell with two or three live neighbours survives.
                </li>
                <li>
                2. Any dead cell with three live neighbours becomes a live cell.
                </li>
                3. All other live cells die in the next generation. <br />
                Similarly, all other dead cells stay dead.
            </ol>
            </div>

            <div className = "image">
                <img src = "https://weedynews.com/static/images/93/princeton-university.png"/>          
               
                
            </div>

            <div className= "info">
                <li>John Horton Conway</li>
                <li>Mathemetician and Game of Life Inventor</li>
                <li>1937 - 2020</li>
            </div>

        </div>
    )
}

export default About;