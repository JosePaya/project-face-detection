import React from 'react'

class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home')
        }
      })
      .catch(() => 'Unable to sign in')
  }

  onInputChange = event => {
    switch (event.target.id) {
      case 'email-address':
        return this.setState({ signInEmail: event.target.value })
      case 'password':
        return this.setState({ signInPassword: event.target.value })
      default:
        console.log('No match')
    }
  }

  render() {
    const { onRouteChange } = this.props
    return (
      <article className="br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onInputChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onInputChange}
                />
              </div>
              {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label> */}
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmitSignIn}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('register')}
                className='f6 link dim black pa3 pointer'>Register
                            </p>

            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Signin
