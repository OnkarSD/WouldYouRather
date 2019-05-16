import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
import PollQuestion from './PollQuestion'
import PollResult from './PollResult'
import PollTeaser from './PollTeaser'
import { colors } from '../utils/helpers'

const pollTypes = {
  POLL_SAMPLE: 'POLL_SAMPLE',
  POLL_QUESTION: 'POLL_QUESTION',
  POLL_RESULT: 'POLL_RESULT'
}

const PollContent = props => {
  const { pollType, question, unanswered } = props

  switch (pollType) {
    case pollTypes.POLL_SAMPLE:
      return <PollTeaser question={question} unanswered={unanswered} />
    case pollTypes.POLL_QUESTION:
      return <PollQuestion question={question} />
    case pollTypes.POLL_RESULT:
      return <PollResult question={question} />
    default:
      return
  }
}

export class UserCard extends Component {
  static propTypes = {
    question: PropTypes.object,
    author: PropTypes.object,
    pollType: PropTypes.string,
    unanswered: PropTypes.bool,
    question_id: PropTypes.string
  }
  render() {
    const {
      author,
      question,
      pollType,
      badPath,
      unanswered = null
    } = this.props

    if (badPath === true) {
      return <Redirect to="/404" />
    }

    const tabColor = unanswered === true ? colors.green : colors.blue
    const borderTop =
      unanswered === null
        ? `1px solid ${colors.grey}`
        : `2px solid ${tabColor.hex}`

    return (
      <div className='card'>
        <h3>
          {author.name} asks:
        </h3>

        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <Image src={author.avatarURL} />
            </div>
            <div style={{ flex: 4, padding: 10 }}>
              <PollContent
                pollType={pollType}
                question={question}
                unanswered={unanswered}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(
  { users, questions, authUser },
  { match, question_id }
) {
  let question,
    author,
    pollType,
    badPath = false
  if (question_id !== undefined) {
    question = questions[question_id]
    author = users[question.author]
    pollType = pollTypes.POLL_SAMPLE
  } else {
    const { question_id } = match.params
    question = questions[question_id]
    const user = users[authUser]

    if (question === undefined) {
      badPath = true
    } else {
      author = users[question.author]
      pollType = pollTypes.POLL_QUESTION
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = pollTypes.POLL_RESULT
      }
    }
  }

  return {
    badPath,
    question,
    author,
    pollType
  }
}

export default connect(mapStateToProps)(UserCard)
