import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Progress,
  Label,
  Icon
} from 'semantic-ui-react'
import { styles } from '../utils/helpers'

const YourVoteLabel = () => (
  <div className="vote">
    <Icon name="check circle outline" size="big" className="compact" />
    <div style={{ float: 'right' }}>
      Your Vote
    </div>
  </div>
)

export class PollResult extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }
  handleClick = () => {
    this.props.history.push('/')
  }

  render() {
    const { question, user } = this.props
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const votesTotal = optionOneVotes + optionTwoVotes
    const userVote = user.answers[question.id]

    let option1 = styles.secondary,
      option2 = styles.secondary
    if (optionOneVotes > optionTwoVotes) {
      option1 = styles.primary
    } else if (optionTwoVotes > optionOneVotes) {
      option2 = styles.primary
    }

    return (
      <React.Fragment>
        <div className='header'>
          Results:
          <div style={{ fontWeight: '700' }}>
            Would you rather
          </div>
        </div>
        <div
          style={{ backgroundColor: `${option1.bgColor}` }}
        >
          {userVote === 'optionOne' && <YourVoteLabel />}
          <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
          <Progress
            percent={((optionOneVotes / votesTotal) * 100).toFixed(2)}
            progress
            color={option1.color}
          >
            {optionOneVotes} out of {votesTotal} votes
          </Progress>
        </div>
        <div
          style={{ backgroundColor: `${option2.bgColor}` }}
        >
          {userVote === 'optionTwo' && <YourVoteLabel />}

          <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
          <Progress
            percent={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
            progress
            color={option2.color}
          >
            {optionTwoVotes} out of {votesTotal} votes
          </Progress>
        </div>
        <input type='submit' value='Back' onClick={this.handleClick}/>
      </React.Fragment>
    )
  }
}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser]
  return {
    user
  }
}

export default withRouter(connect(mapStateToProps)(PollResult))
