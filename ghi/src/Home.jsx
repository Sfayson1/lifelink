import { useEffect, useState } from 'react'
const Home = () => {
    const [posts, setPosts] = useState([])
    const [newPost, setNewPosts] = useState('')
    const [token, setToken] = useState();

    const fetchPosts = async () => {
        const postUrl = 'http://localhost:8000/posts/all'
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
        const tokenUrl = "http://localhost:8000/token";
        const fetchConfig = {credentials: 'include'};

        const response = await fetch(tokenUrl, fetchConfig);


        if (response.ok) {
            const data = await response.json();


            if (!data) {
                return null;
            }

            setToken(data.access_token);
        }
    }

    useEffect(() => {
        fetchPosts(),
        fetchToken()
    }, [])


    const handleNewPostSubmit = async () => {
        const createPostUrl = 'http://localhost:8000/posts'
        const currentDate = new Date().toISOString().slice(0, 10);
        const response = await fetch(createPostUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`,
            },
            body: JSON.stringify({
                content: newPost,
                date_posted: currentDate,
            }),
        })
        if (response.ok) {
            fetchPosts()
            setNewPosts('')
        } else {
            console.error('Failed to create a new post')
        }
    }

    const formatTimeDifference = (hours,postDate) => {
        if (hours < 1) {
            return `${Math.floor(hours * 60)}m`
        } else if (hours < 24) {
            return `${Math.floor(hours)}h`
        } else if (hours < 24 * 7) {
            return `${Math.floor(hours / 24)}d`
        } else {
            const postDateTime = new Date(postDate)
            return postDateTime.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            })
        }
    }

    const calculateTimeDifference = (postDate) => {
        const currentDate = new Date()
        const postDateTime = new Date(postDate)
        const timeDifference = Math.floor(
            (currentDate - postDateTime) / (60 * 60 * 1000)
        )
        return timeDifference
    }

    return (
        <div className="home-container">
            <div className="new-post-container">
                <input
                    placeholder="What's new"
                    value={newPost}
                    onChange={(e) => setNewPosts(e.target.value)}
                />

                <button onClick={handleNewPostSubmit}>Submit</button>
            </div>

            <div className="posts-feed">
                {posts.length > 0 &&
                    posts.map((post) => {
                        return (
                            <div className="card mb-3" key={post.id}>
                                <div className="card-body">
                                    <h5>{post.user_id}</h5>
                                    <span>
                                        <small>
                                            {formatTimeDifference(
                                                calculateTimeDifference(
                                                    post.date_posted
                                                ), post.date_posted
                                            )}
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
export default Home;
