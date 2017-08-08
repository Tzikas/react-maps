import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Map from '../map'
import About from '../about'
import RandomCityMap from '../random-cities'
const App = () => (
  <div>
    <header>
      <Link to="/">Map</Link>
      <Link to="/home">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/RandomCityMap">Random Cities</Link>
      
    </header>

    <main>
      <Route exact path="/" component={Map} />    
      <Route exact path="/home" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/RandomCityMap" component={RandomCityMap} />
      
    </main>
  </div>
)


export default App
