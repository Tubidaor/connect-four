import App from './App';
import ReactDom from 'react-dom'
import React from 'react'


test('App renders', () => {
  const div = document.createElement('div')
  ReactDom.render(
    <App/>, div
  )
  ReactDom.unmountComponentAtNode(div)
});
