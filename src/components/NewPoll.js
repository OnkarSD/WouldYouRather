import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'
import { handleSaveQuestion } from '../actions/questions'

export class NewPoll extends Component {
  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestion: PropTypes.func.isRequired
  }

  state = {
    validSubmit: false,
    isLoading: false,
    option1: '',
    option2: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { authUser, handleSaveQuestion } = this.props
    const { option1, option2 } = this.state

    new Promise((res, rej) => {
      this.setState({ isLoading: true })
      handleSaveQuestion(option1, option2, authUser)
      setTimeout(() => res('success'), 1000)
    }).then(() => {
      this.setState({
        option1: '',
        option2: ''
      })
      this.setState({ validSubmit: true })
    })
  }

  render() {
    const disabled = this.state.option1 === '' || this.state.option2 === ''

    if (this.state.validSubmit === true) {
      return <Redirect to="/" />
    }
    return (
      <div className="card">
        <div className="header">
          Create a New Poll
        </div>
        <div>
            {this.state.isLoading && (
              <Dimmer active inverted>
                <Loader content="Updating" />
              </Dimmer>
            )}
            <p>Question:</p>
            <p>
              <strong>Would you rather...</strong>
            </p>
            <form onSubmit={this.handleSubmit}>
              <input
                type='text'
                id="option1"
                placeholder="Enter option one..."
                value={this.state.option1}
                onChange={this.handleChange}
                autocomplete="off"
              />
              <div style={{ display: 'flex' }}>
                <hr style={{ flex: 4 }}/><div style={{ flex: 1, textAlign: 'center' }}>Or</div><hr style={{ flex: 4 }}/>
              </div>
              <input
                type='text'
                id="option2"
                placeholder="Enter option two..."
                value={this.state.option2}
                onChange={this.handleChange}
                autocomplete="off"
              />
              <input type='submit' value='Submit' disabled={disabled} style={{ marginTop: 10}} />
            </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  }
}

export default connect(mapStateToProps,{ handleSaveQuestion })(NewPoll)
