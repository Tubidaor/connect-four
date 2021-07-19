import { React, Component } from 'react'
import './App.css';
import PlayChip from './playChip'
import Column from './column'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.connect4Matrix = []
    this.state = {
      turn: true,
      board: [],
      gameStarted: false
    }
  }



  createMatrix() {
    let newConnect4Matrix = []
    for(let x = 0; x < 7; x ++) {
      let newColumn = []
      for(let y = 0; y < 6; y ++) {
        newColumn.push(0)
      }
      newConnect4Matrix.push(newColumn)
    }
    this.connect4Matrix = newConnect4Matrix
  }

  generateBoard() {
    console.log('game generated')
    this.createMatrix()
    let gameboard = []
      for(let i = 0; i < 7; i ++) {
        let newColumn = []
        for(let j = 0; j < 6; j++) {
          newColumn.push(
            <PlayChip
              identifier={0}
              dropper={this.dropper}
              coordinate={[i,j]}
            >
            </PlayChip>
          )
        }
      gameboard.push(<Column column={newColumn}></Column>)
      }
    this.setState({
      board: gameboard,
      gameStarted: true
    })
  }

  updateRenderFromModel() {
    let newBoardRender = []

    for(let x = 0; x < this.connect4Matrix.length; x ++) {
      let newColumn = []

      for(let y = 0; y < this.connect4Matrix[x].length; y ++) {
        if(this.connect4Matrix[x][y] === 1) {
          newColumn.push(
            <PlayChip
              identifier={1}
              dropper={this.dropper}
              coordinate={[x,y]}
            >
            </PlayChip>)
        } else if(this.connect4Matrix[x][y] === 2) {
          newColumn.push(
            <PlayChip
              identifier={2}
              dropper={this.dropper}
              coordinate={[x,y]}
            >
            </PlayChip>)
        } else {
          newColumn.push(
            <PlayChip
              identifier={0}
              dropper={this.dropper}
              coordinate={[x,y]}
            >
            </PlayChip>)
        }
      }
      newBoardRender.push(<Column column={newColumn}></Column>)
    }
    return newBoardRender
  }


  dropper = (coordinates) => {
    let landingCoordinates = []
      for(let y = 0; y < this.connect4Matrix[coordinates[0]].length; y ++) {
        if(this.connect4Matrix[coordinates[0]][y] === 0) {
          this.connect4Matrix[coordinates[0]][y] = this.state.turn? 1: 2
          landingCoordinates.push(coordinates[0])
          landingCoordinates.push(y)
          break
        }
      }
      if(this.checkPositiveDiagonal(landingCoordinates, this.state.turn? 1: 2)
        === true) {
          return this.executeWinner(this.state.turn? 1:2)
        } else if( this.checkHorizontal(landingCoordinates, this.state.turn
          ? 1: 2
          ) === true
        ) {
          return this.executeWinner(this.state.turn? 1: 2)
        } else if( this.checkVertical(landingCoordinates, this.state.turn ? 1: 2
          ) === true) {
            return this.executeWinner(this.state.turn? 1: 2)
        } else if( this.checkNegativeDiagonal(
          landingCoordinates, this.state.turn? 1: 2) === true) {
            return this.executeWinner(this.state.turn? 1: 2)
        } else {
          this.setState((prev) => {
            return {
              board: this.updateRenderFromModel(),
              turn: !prev.turn
            }
          })
        }
  }

  checkPositiveDiagonal(coordinates, identifier) {
    let counter = 0

    while(true) {
      if(coordinates[0] + counter +1 === 7) {
        break;
      } else if(coordinates[1] + counter +1 === 6) {
        break;
      }
      counter += 1
    }

    let backwardsCounter = 0
    let winTracker = 0

    while(true) {
      console.log("coordinates", coordinates, "matrix", this.connect4Matrix, "counter", counter, "backwards", backwardsCounter)
      console.log(typeof(this.connect4Matrix[coordinates[0]][coordinates[1]]))
      console.log(coordinates[0] + counter - backwardsCounter,coordinates[1] + counter - backwardsCounter)
      // if(this.connect4Matrix[coordinates[0] + counter - backwardsCounter][
      //   coordinates[1] + counter - backwardsCounter] === identifier) 
      console.log(this.connect4Matrix[5][3])
      if(this.connect4Matrix[6][3] === identifier)
      {
        winTracker += 1
        if(winTracker === 4) {
          return true
        }
    } else {
      winTracker = 0
    }

    if(coordinates[0] + counter - (backwardsCounter +1) === -1) {
      break;
    } else if(coordinates[1] + counter - (backwardsCounter +1) === -1) {
      break;
    }
    backwardsCounter += 1

  }
  return false
}

  checkNegativeDiagonal(coordinates, identifier) {
    let counter = 0

    while(true) {
      if(coordinates[0] + counter +1 === 7) {
        break;
      } else if (coordinates[1] - counter - 1 === -1) {
        break;
      }
      counter += 1
    }

    let backwardsCounter = 0
    let winTracker = 0

    while(true) {
      if(this.connect4Matrix[coordinates[0] + counter - backwardsCounter]
        [coordinates[1] + backwardsCounter] === identifier) {
          winTracker += 1
          if(winTracker === 4) {
            return true
          }
        } else {
          winTracker = 0
        }
      if(coordinates[0] + counter - [backwardsCounter +1] === -1) {
        break;
      } else if (coordinates[1] - counter + (backwardsCounter +1) === 6) {
        break;
      }

      backwardsCounter += 1
    }

    return false

  }

  checkHorizontal(coordinates, identifier) {
    let counter = 0

    while(true) {
      if(coordinates[0] + counter + 1 === 7) {
        break;
      }
      counter += 1
    }

    let backwardsCounter = 0
    let winTracker = 0

    while(true) {
      if(this.connect4Matrix[coordinates[0] + counter - backwardsCounter]
        [coordinates[1]] === identifier) {
          winTracker += 1
          if(winTracker === 4) {
            return true
          }
        } else {
          winTracker = 0
        }
      if(coordinates[0] + counter - (backwardsCounter +1) === -1) {
        break;
      }
      if(coordinates[0] + counter - (backwardsCounter +1) === -1) {
        break;
      }

      backwardsCounter += 1
    }

    return false
  }

  checkVertical(coordinates, identifier) {
    let counter = 0

    while(true) {
      if(coordinates[1] + counter + 1 === 6) {
        break;
      }
      counter += 1
    }

    let backwardsCounter = 0
    let winTracker = 0

    while(true) {
      if(this.connect4Matrix[coordinates[0]][coordinates[1] + counter -
      backwardsCounter] === identifier) {
        winTracker += 1

        if(winTracker === 4) {
          return true
        }
      } else {
        winTracker = 0
      }

      if(coordinates[1] + counter - (backwardsCounter +1) === -1) {
        break;
      }

      backwardsCounter += 1
    }

    return false
  }

  executeWinner(identifier) {
    let player = ""
    if(identifier === 1) {
      player = "Red"
    } else if (identifier === 2) {
      player = "Blue"
    }

    this.setState({
      board: <div className="winner-statement">{`${player} Won the game!`}</div>
    })
  }

  render() {
    return (
      <div className="connect4">
        {this.state.gameStarted? this.state.board :
        <div onClick={() => this.generateBoard()} className="start-game">
          Start
        </div>}
      </div>)
  }

}


