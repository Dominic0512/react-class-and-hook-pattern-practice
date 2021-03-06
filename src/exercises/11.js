// The provider pattern
import React, {Fragment} from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()

function ToggleConsumer(props) {
  return (
    <ToggleContext.Consumer {...props}>
      {context => {
        if (!context) {
          throw new Error(
            `Toggle.Consumer cannot be rendered outside the Toggle component`,
          )
        }
        return props.children(context)
      }}
    </ToggleContext.Consumer>
  )
}

class Toggle extends React.Component {
  static Consumer = ToggleConsumer
  static On = ({children}) => (
    <ToggleConsumer>
      {({on}) => (on ? children : null)}
    </ToggleConsumer>
  )
  static Off = ({children}) => (
    <ToggleConsumer>
      {({on}) => (on ? null : children)}
    </ToggleConsumer>
  )
  static Button = props => (
    <ToggleConsumer>
      {({on, toggle}) => (
          <Switch on={on} onClick={toggle} {...props} />
        )
      }
    </ToggleConsumer>
  )

  toggle = () =>  this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
   
  state = {on: false, toggle: this.toggle}
  
  render() {
    const {children, ...rest} = this.props
    const ui =
      typeof children === 'function' ? children(this.state) : children

    return (
      <ToggleContext.Provider value={this.state} {...rest}>
        {ui}
      </ToggleContext.Provider>
    )
  }
}

const Layer1 = () => <Layer2 />
const Layer2 = () => (
  <Fragment>
    <Toggle.On>The button is on</Toggle.On>
    <Toggle.Off>The button is off</Toggle.Off>
    <Layer3 />
  </Fragment>
)
const Layer3 = () => <Layer4 />
const Layer4 = () => <Toggle.Button />

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}

/*
// without the changes you're going to make,
// this is what the usage would look like. You're looking at "prop drilling"

const Layer1 = ({on, toggle}) => <Layer2 on={on} toggle={toggle} />
const Layer2 = ({on, toggle}) => (
  <Fragment>
    {on ? 'The button is on' : 'The button is off'}
    <Layer3 on={on} toggle={toggle} />
  </Fragment>
)
const Layer3 = ({on, toggle}) => <Layer4 on={on} toggle={toggle} />
const Layer4 = ({on, toggle}) => <Switch on={on} onClick={toggle} />

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, toggle}) => <Layer1 on={on} toggle={toggle} />}
    </Toggle>
  )
}
*/

Usage.title = 'The Provider Pattern'

export {Toggle, Usage as default}
