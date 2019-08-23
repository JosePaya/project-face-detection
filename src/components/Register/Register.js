import React from 'react'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regFirstName: '',
      regLastName: '',
      regEmail: '',
      regPassword: ''
    }
  }

  onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: this.state.regFirstName,
        lastname: this.state.regLastName,
        email: this.state.regEmail,
        password: this.state.regPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('signin')
        }
      })
  }

  onInputChange = (event) => {
    switch (event.target.id) {
      case 'first-name':
        return this.setState({ regFirstName: event.target.value })
      case 'last-name':
        return this.setState({ regLastName: event.target.value })
      case 'email-address':
        return this.setState({ regEmail: event.target.value })
      case 'password':
        return this.setState({ regPassword: event.target.value })
      default:
        console.log('No match')
    }
  }

  render() {
    return (
      <article className="br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">First Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="first-name"
                  id="first-name"
                  onChange={this.onInputChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Last Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="last-name"
                  id="last-name"
                  onChange={this.onInputChange}
                />
              </div>
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
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.onSubmitRegister}
              />
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Register
