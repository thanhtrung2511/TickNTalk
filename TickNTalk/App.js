import React, { Component } from 'react'
import allReducers from './reducers/allReducers'
import ScreenNavigation from './screens/ScreenNavigation'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

let store=createStore(allReducers);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <ScreenNavigation/>
      </Provider>
    )
  }
}
