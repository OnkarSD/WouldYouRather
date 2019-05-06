import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Radio } from 'semantic-ui-react'
import { handleSaveQuestionAnswer } from '../actions/users'

export class PollQuestion extends Component {
  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestionAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
  }
  state = {
    value: ''
  }

  handleChange = (e, { value }) => this.setState({ value })

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.value !== '') {
      const { authUser, question, handleSaveQuestionAnswer } = this.props
      handleSaveQuestionAnswer(authUser, question.id, this.state.value)
    }
  }

  render() {
    const { question } = this.props
    const disabled = this.state.value === '' ? true : false

    return (
      <React.Fragment>
        <header as="h4">Would you rather</header>
        <form onSubmit={this.handleSubmit}>
          <form>
            <Radio
              label={question.optionOne.text}
              name="radioGroup"
              value="optionOne"
              checked={this.state.value === 'optionOne'}
              onChange={this.handleChange}
            />
            <br />
            <Radio
              label={question.optionTwo.text}
              name="radioGroup"
              value="optionTwo"
              checked={this.state.value === 'optionTwo'}
              onChange={this.handleChange}
            />
            <input
              type='submit'
              disabled={disabled}
              value="Submit"
            />
          </form>
        </form>
      </React.Fragment>
    )
  }
}

function mapStateToProps({ authUser }, { match }) {
  return {
    authUser
  }
}

export default connect(mapStateToProps,{ handleSaveQuestionAnswer })(PollQuestion)
