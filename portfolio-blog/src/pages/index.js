import React from 'react'
import { Link } from 'gatsby' // GATSBY BUILT-IN ROUTING

const IndexPage = () => {
  return (
    <div>
      <h1>Hello!</h1>
      <h2>I'm Guillermo, a full-stack engineer transitioning from Florida to Utah.</h2>
      <p>Does your team need a developer? <Link to="/contact">Let's talk!</Link></p>
    </div>
  )
}

export default IndexPage;