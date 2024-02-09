import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    const [posts, setPosts] = useState([])
    const [newPost, setNewPosts] = useState('')
    const [token, setToken] = useState()

    const fetchPost = async () => {
        const postUrl = `${import.meta.env.VITE_API_HOST}/posts/all`
        const response = await fetch(postUrl)
        if (response.ok) {
            const data = await response.json()
            if (data === undefined) {
                return null
            }

            setPosts(data.posts)
        }
    }

    const fetchToken = async () => {
        const tokenUrl = `${import.meta.env.VITE_API_HOST}/token`
        const fetchConfig = { credentials: 'include' }

        const response = await fetch(tokenUrl, fetchConfig)

        if (response.ok) {
            const data = await response.json()

            if (!data) {
                return null
            }
            setToken(data.access_token)
        }
    }

    useEffect(() => {
        fetchPost()
        fetchToken()
    }, [])

    const handleNewPostSubmit = async () => {
        const createPostUrl = `${import.meta.env.VITE_API_HOST}/posts`
        const currentDate = new Date()
        currentDate.setHours(currentDate.getHours() + 5)
        const datePosted = currentDate.toISOString().slice(0, 10)
        const response = await fetch(createPostUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                content: newPost,
                date_posted: datePosted,
            }),
        })
        if (response.ok) {
            fetchPost()
            setNewPosts('')
        } else {
            console.error('Failed to create a new post')
        }
    }

    const formatPostDate = (postDate) => {
        const date = new Date(postDate);
        const options = { month: 'short', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    return (
        <div className="home-container">
            <div className="new-post-container position-relative">
                <div className="input-group mb-3">
                    <textarea
                        className="form-control"
                        placeholder="What's new?"
                        value={newPost}
                        onChange={(e) => setNewPosts(e.target.value)}
                    />

                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleNewPostSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <h1>LifeLink Feed</h1>
            <div className="posts-feed">
                {posts.length > 0 &&
                    posts.map((post) => {
                        return (
                            <div className="card mb-3" key={post.id}>
                                <div className="card-body">
                                    <Link to={`/profile/${post.user_id}`}>
                                        <h5>
                                            {post.user_first_name}{' '}
                                            {post.user_last_name}
                                        </h5>
                                    </Link>
                                    <span>
                                        <small>
                                            {formatPostDate(post.date_posted)}
                                        </small>
                                    </span>
                                    <p className="card-text">{post.content}</p>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Home
