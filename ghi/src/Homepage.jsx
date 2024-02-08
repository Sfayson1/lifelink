import { useNavigate } from 'react-router-dom'


const Homepage = () => {
    const navigate = useNavigate()

    const navigateToSignup = () => {
        navigate('/signup')
    }

    return (
        <div>
            {' '}
            <input placeholder="What's happening now?!" />
            <button onClick={navigateToSignup} className="btn btn-sm btn-primary"> submit </button>
            <div className="card mb-3">
                <div className="cardbody">
                    <h5>Johnny Appleseed</h5>
                    <span>
                        <small>1h</small>
                    </span>
                    <p>
                        Ever since I signed up for LifeLink, I&apos;ve been winning on scratch tickets every day.
                        I got a sick job at google, and they let me nap in the pods all day.
                        I&apos;m living the dream!
                    </p>
                </div>
            </div>
            <div className="card mb-3">
                <div className="cardbody">
                    <h5>Sherika Fayson</h5>
                    <span>
                        <small>1h</small>
                    </span>
                    <p>
                        What is your current position and company? Any
                        opportunities for other alumni?
                    </p>
                </div>
            </div>
            <div className="card mb-3">
                <div className="cardbody">
                    <h5>James Bratcher</h5>
                    <span>
                        <small>1h</small>
                    </span>
                    <p>
                        Tell us if you are enjoying life after Hack Reactor!
                    </p>
                </div>
            </div>
            <div className="card">
                <div className="cardbody">
                    <h5>Zack Hitchcock</h5>
                    <span>
                        <small>1h</small>
                    </span>
                    <p>
                        Share a link to your project, on our project!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Homepage
