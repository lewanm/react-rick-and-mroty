import React,{ReactElement} from 'react'
import "./app.css"

import Characters from './views/character'
import Home from './views/home'

function App() : ReactElement{

  return (
    <div className="App">
      <p className="title">Rick & Mroty</p>
      <Home/>
      <Characters/>
    </div>
  )
}

export default App
