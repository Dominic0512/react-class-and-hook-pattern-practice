import React from 'react'
import {Switch} from '../switch'
import { useStateWithCallback } from './util';

const defaultState = {
  on: false 
}

function Toggle(props) {
  const [state, setState] = useStateWithCallback(defaultState);

  const isControlled = React.useCallback((prop) => {
    return props[prop] !== undefined
  }, [props])

  const getState = React.useCallback(() => {
    return {
      on: isControlled('on') ? props.on : state.on
    }
  }, [state, props])

  const toggle = React.useCallback(() => {
    const { on: stateOn } = getState();
    if (isControlled('on')) {
      props.onToggle(!stateOn)
    } else {
      setState(
        ({on}) => ({on: !on}),
        () => {
          props.onToggle(stateOn)
        },
      )
    }
  }, [isControlled, getState])

  return <Switch on={getState().on} onClick={toggle} />
}

class Usage extends React.Component {
  state = {bothOn: false}
  handleToggle = on => {
    this.setState({bothOn: on})
  }
  render() {
    const {bothOn} = this.state
    const {toggle1Ref, toggle2Ref} = this.props
    return (
      <div>
        <Toggle
          on={bothOn}
          onToggle={this.handleToggle}
          ref={toggle1Ref}
        />
        <Toggle
          on={bothOn}
          onToggle={this.handleToggle}
          ref={toggle2Ref}
        />
      </div>
    )
  }
}
Usage.title = 'Control Props'

export {Toggle, Usage as default}
