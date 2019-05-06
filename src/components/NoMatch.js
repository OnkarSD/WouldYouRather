import React, { Component } from 'react'

export class NoMatch extends Component {
  render() {
    return (
      <div textAlign="center">
        <header as="h3">No Match 404 Error</header>
        <p>Nothing to see here. Please use the menu to try again.</p>
      </div>
    )
  }
}

export default NoMatch
