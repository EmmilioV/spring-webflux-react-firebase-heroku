import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = ({children}) => (
  <section>
    <h1>Home</h1>
    <div>
      {children}
    </div>
    <p>welcome to the question and answer app.</p>
    <Link to="/questions" className="button">
      View Questions
    </Link>
    <footer>
      <p>
        This is the homepage of question and answer page
        this is the main page.
      </p>
      </footer>
  </section>
)
export default HomePage
