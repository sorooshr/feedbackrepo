import React from 'react'
import Card from '../shared/Card'
import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
        <div>
            <h1>About this App</h1>
            <p>Feedback App to leave a us a happy feedback</p>
            <p>version: 1.0.0</p>
           <p>
               <Link to='/'>Back To Home</Link>
           </p>
        </div>
    </Card>
  )
}

export default AboutPage