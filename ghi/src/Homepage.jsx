import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Homepage.css'

const Homepage = () => {
    const navigate = useNavigate()

    const navigateToSignup = () => {
        navigate('/signup')
    }

    return (
        <div>
            {' '}
            <input placeholder="What's happening now?!" />
            <button onClick={navigateToSignup}> submit </button>
            <div className="card">
                <div className="cardbody">
                    <h5>Johnnyeta2024</h5>
                    <span>
                        <small>1h</small>
                    </span>
                    <p>
                        "This is how life is going after Hack Reactor. Tell us a
                        great story or two and where you are at in life."
                    </p>
                </div>
            </div>
            <div className="card">
                <div className="cardbody">
                    <h5>Johnnyeta2024</h5>
                    <span>
                        <small>1h</small>
                    </span>
                    <p>
                        "What is your current position and company? Any
                        opportunities for other alumni?"
                    </p>
                </div>
            </div>
            <div className="card">
                <div className="cardbody">
                    <h5>Johnnyeta2024</h5>
                    <span>
                        <small>1h</small>
                    </span>
                    <p>
                        "Tell us if you are enjoying life after Hack Reactor!"
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Homepage
