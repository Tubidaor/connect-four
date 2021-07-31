import { React, Component } from 'react'


export default class playChip extends Component {

  renderChips() {
    switch(this.props.identifier) {
      case 1:
        return <div className="connect4-player1 play-chip"></div>
      case 2:
        return <div className="connect4-player2 play-chip"></div>
      default:
        return <div onClick={() => this.props.dropper(this.props.coordinate)}
          className="connect4-blank play-chip"> </div>
    }
  }

  render() {
    return this.renderChips()
  }
}
