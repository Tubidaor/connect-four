import { React, Component } from 'react'

export default class Column extends Component {

  render() {
    return (
      <div className="connect4-column">
        {this.props.column}
      </div>)
  }
}