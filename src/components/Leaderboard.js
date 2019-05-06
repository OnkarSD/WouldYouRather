import React, { Component, Fragment } from 'react'
import PropType from 'prop-types'
import { connect } from 'react-redux'
import { Segment, div, Header, Image, Label, Divider} from 'semantic-ui-react'

const trophyColor = ['yellow', 'grey', 'orange']

export class Leaderboard extends Component {
  static propType = {
    leaderboardData: PropType.array.isRequired
  }
  render() {
    const { leaderboardData } = this.props

    return (
      <React.Fragment>
        {leaderboardData.map((user, idx) => (
          <div className='card' key={user.id}>
            <Label corner="left" icon="trophy" color={trophyColor[idx]} />
            <div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }} verticalAlign="middle">
                  <Image src={user.avatarURL} />
                </div>
                <div style={{ flex: 2, padding: 10 }}>
                  <div textAlign="left">
                    {user.name}
                  </div>
                  <div>
                    <div>Answered questions</div>
                    <div>{user.answerCount}</div>
                  </div>
                  <Divider />
                  <div>
                    <div>Created questions</div>
                    <div>{user.questionCount}</div>
                  </div>
                </div>
                <div textAlign="center">
                  <div className='card'>
                    <div style={{ fontSize: 16 }}>Score</div>
                    <div>
                      <div className='label dot green'>
                        {user.questionCount + user.answerCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    )
  }
}

function mapStateToProps({ users }) {
  const leaderboardData = Object.values(users)
    .map(user => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3)
  return {
    leaderboardData
  }
}

export default connect(mapStateToProps)(Leaderboard)
