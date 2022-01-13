import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../asserts/logo.png'

export const PublicNavbar = () => (
  <nav>
    <section>
      <img class="logo" src={logo}></img>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
    </section>
  </nav>
)

export const PrivateNavbar = () => (
  <nav>
    <section>
    <img class="logo" src={logo}></img>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
      <Link to="/new">New</Link>
      <Link to="/list">List</Link>
      <Link to="/favorites">Favorites</Link>
    </section>
  </nav>
)
