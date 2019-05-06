import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import Login from './Login'
import Nav from './Nav'
import Home from './Home'
import UserCard from './UserCard'
import NewPoll from './NewPoll'
import Leaderboard from './Leaderboard'
import NoMatch from './NoMatch'

class App extends Component {

  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    const { authUser } = this.props
    return (
      <Router>
        <div className="App">
          {authUser === null ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Route
              render={() => (
                <Login />
              )}
            />
            </div>
          ) : (
            <React.Fragment>
              <Nav />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Switch>
                  <div style={{ width: 600, }}>
                    <Route exact path="/" component={Home} />
                    <Route path="/questions/bad_id" component={NoMatch} />
                    <Route path="/questions/:question_id" component={UserCard} />
                    <Route path="/add" component={NewPoll} />
                    <Route path="/leaderboard" component={Leaderboard} />
                  </div>
                </Switch>
                </div>
            </React.Fragment>
          )}
        </div>
      </Router>
    )
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  }
}

export default connect(mapStateToProps,{ handleInitialData })(App)
