import React from 'react';
import './App.css';

// COMPONENTS
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceDetection from './components/FaceDetection/FaceDetection'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'

const particlesOptions = {
  particles: {
    color: { value: '#611d70' },
    number: {
      value: 80,
      density: { enable: true, value_area: 800 }
    },
    size: { value: 2, random: false },
    opacity: { value: 1 },
    line_linked: {
      distance: 175,
      color: '#a71dc5',
      opacity: 0.4,
      width: 2
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        }
      }
    }
  }
}

const initialState = {
  input: ''
  , imageURL: ''
  , boxes: [{}]
  , route: 'signin'
  , isUserSignedIn: false
  , user: {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  buildFaceBox = (bounding_box, image_size) => ({
    left_col: bounding_box.left_col * image_size.width,
    right_col: image_size.width - (bounding_box.right_col * image_size.width),
    top_row: bounding_box.top_row * image_size.height,
    bottom_row: image_size.height - (bounding_box.bottom_row * image_size.height)
  })

  renderBoxes = (boxes) => {
    this.setState({ boxes: boxes })
  }

  getImageSize = (image) => {
    return {
      width: Number(image.width),
      height: Number(image.height)
    }
  }

  onSubmitForm = () => {
    let boxes = []

    this.setState(state => {
      return { imageURL: state.input }
    }, () => {
      // GET response from external API and pass data to
      // internal API before final update
      fetch('https://shrouded-forest-76172.herokuapp.com/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageURL: this.state.imageURL
        })
      })
        .then(response => response.json())
        .then(response => {

          // GET response from internal API and update user entries
          if (response !== 'Err1000: Clarifai Error') {
            fetch('https://shrouded-forest-76172.herokuapp.com/image', {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(entries => this.setState(Object.assign(this.state.user, { entries })))
              .catch(error => console.log('Internal API error', error))

            // Build face boxes using Clarifai API response
            const image_size = this.getImageSize(document.getElementById('face-image'))
            for (var region of response.outputs[0].data.regions) {
              boxes.push(this.buildFaceBox(region.region_info.bounding_box, image_size))
            }

            this.renderBoxes(boxes)
            
          }

        })
        .catch(error => console.log('Face detection API error', error))
    })
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isUserSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isUserSignedIn: true })
    } else if (route === 'signin') {
      this.setState(initialState)
    }
    this.setState({ route: route })
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  }

  render() {
    const { isUserSignedIn, imageURL, boxes, route } = this.state
    const { firstname, entries } = this.state.user

    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isUserSignedIn={isUserSignedIn} />
        {route === 'home'
          ?
          <div>
            <Logo />
            <Rank
              firstName={firstname}
              entries={entries}
            />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmitForm={this.onSubmitForm} />
            <FaceDetection imageURL={imageURL} boxes={boxes} />
          </div>
          : (
            route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )

        }
      </div>
    );
  }
}

export default App;
