import React, { Component } from 'react';

// components
import Grid from '../grid/Grid.js';
import Buttons from '../buttons/Buttons.js';


class Main extends Component {
	constructor() {
		super();
		this.speed = 100;
		this.rows = 30;
		this.cols = 50;

		this.state = {
			generation: 0,
			gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
		}
	}

	selectBox = (row, col) => {
		let gridCopy = arrayClone(this.state.gridFull);
		gridCopy[row][col] = !gridCopy[row][col];
		this.setState({
			gridFull: gridCopy
		});
	}

	seed = () => {
		let gridCopy = arrayClone(this.state.gridFull);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (Math.floor(Math.random() * 4) === 1) {
					gridCopy[i][j] = true;
				}
			}
		}
		this.setState({
			gridFull: gridCopy
		});
    }
    
    playButton = () => {
        clearInterval(this.intervalID)
        this.intervalID = setInterval(this.play, this.speed)
    }

    pauseButton = () => {
        clearInterval(this.intervalID)
    }

    slow = () => {
        
        this.speed = 1000;
        this.playButton();
    }

    fast = () => {
        
        this.speed = 100;
        this.playButton();
    }

    clear = () => {

        var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
        this.setState({
            gridFull: grid,
            generation: 0

        })

    }

    gridSize = (size) => {
		switch (size) {
			case "1":
				this.cols = 20;
				this.rows = 10;
			break;
			case "2":
				this.cols = 50;
				this.rows = 30;
			break;
			default:
				this.cols = 70;
				this.rows = 50;
		}
		this.clear();

	}

//main game functionality 

    play = () => {
		//make two different copies of the grid to check and then change squares
        let g = this.state.gridFull;
        let g2 = arrayClone(this.state.gridFull);
		//loop through every element on the grid
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
				let count = 0; //how many neighbors it has
				//if there is a neighbor, increase the count by 1
				//each cell has 8 potential neighbors, hence 8 lines of checking each neighbor
                if (i > 0) if (g[i - 1][j]) count++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
                if (j < this.cols - 1) if (g[i][j + 1]) count++;
                if (j > 0) if (g[i][j - 1]) count++;
                if (i < this.rows - 1) if (g[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
				if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
				//if less than 2 and more than 3 neighbors, it dies
				if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
				//if it's dead and it has 3 neighbors, it becomes a live cell
                if (!g[i][j] && count === 3) g2[i][j] = true;
            }
        }
        this.setState({
            gridFull: g2,
            generation: this.state.generation + 1
          });
    }


	componentDidMount() {
        this.seed();
        this.playButton();
		
	}

	render() {
		return (
			<div>
                <Buttons
					playButton={this.playButton}
					pauseButton={this.pauseButton}
					slow={this.slow}
					fast={this.fast}
					clear={this.clear}
					seed={this.seed}
					gridSize={this.gridSize}
				/>
				<Grid
					gridFull={this.state.gridFull}
					rows={this.rows}
					cols={this.cols}
					selectBox={this.selectBox}
				/>
				<h2>Generations: {this.state.generation}</h2>
			</div>
		);
	}
}

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

export default Main;