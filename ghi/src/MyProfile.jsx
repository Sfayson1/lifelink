import { useState, useEffect } from 'react';

const MyProfile = () => {
    // State variables
    const [account, setAccount] = useState({});
    const [newPost, setNewPosts] = useState('');
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    // Fetch account details
    const fetchAccount = async () => {
        const tokenUrl = 'http://localhost:8000/token';
        const fetchConfig = { credentials: 'include' };
        const response = await fetch(tokenUrl, fetchConfig);

        if (response.ok) {
            const data = await response.json();
            if (!data) return null;
            setAccount(data.user);
        }
    };

    // Fetch posts with user
    const fetchPostsWithUser = async () => {
        const postUrl = `http://localhost:8000/posts/${account.id}`;
        const response = await fetch(postUrl);
        if (response.ok) {
            const data = await response.json();
            if (data === undefined) return null;
            setPosts(data.posts);
        }
    };

    // Fetch user
    const fetchUser = async () => {
        const userUrl = `http://localhost:8000/users/${account.id}`;
        const response = await fetch(userUrl);
        if (response.ok) {
            const users = await response.json();
            if (users === undefined) return null;
            setUsers([users]);
        }
    };

    // Handle new post submission
    const handleNewPostSubmit = async () => {
        const createPostUrl = 'http://localhost:8000/posts';
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 5);
        const datePosted = currentDate.toISOString().slice(0, 10);
        const response = await fetch(createPostUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${account.access_token}`,
            },
            body: JSON.stringify({
                content: newPost,
                date_posted: datePosted,
            }),
        });
        if (response.ok) {
            fetchPost();
            setNewPosts('');
            console.log('New post created');
        } else {
            console.error('Failed to create a new post');
        }
    };

    // Calculate time difference
    const calculateTimeDifference = (postDate) => {
        const currentDate = new Date();
        const postDateTime = new Date(postDate);
        const timeDifference = Math.floor(
            (currentDate - postDateTime) / (60 * 60 * 1000)
        );
        return timeDifference;
    };

    // Format time difference
    const formatTimeDifference = (hours) => {
        if (hours < 1) return `${Math.floor(hours * 60)}m`;
        if (hours < 24) return `${Math.floor(hours)}h`;
        if (hours < 24 * 7) return `${Math.floor(hours / 24)}d`;
        const postDateTime = new Date(postDate);
        return postDateTime.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    // Fetch account details on component mount
    useEffect(() => {
        fetchAccount();
    }, []);

    // Fetch user and posts whenever account id changes
    useEffect(() => {
        fetchUser();
        fetchPostsWithUser();
    }, [account.id]);

    return (
        <div className="profile-container">
            <div className="relative pb-2 h-full justify-center items-center">
                <div className="flex flex-col pb-5">
                    <div className="relative flex flex-col mb-7">
                        <div className="flex flex-col justify-center items-center"></div>
                    </div>
                </div>
            </div>

            {users.map((user) => {
                return (
                    <div className="user-info" key={user.id}>
                        <h2 className="font-bold text-3xl text-align-left mt-3">
                            {user.first_name} {user.last_name}
                        </h2>
                        <p>{user.email}</p>
                        <p>{user.grad_class}</p>
                    </div>
                )
            })}
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
            <div className="posts-feed">
                {posts.map((post) => {
                    return (
                        <div className="card mb-3" key={post.id}>
                            <div className="card-body">
                                <h5>
                                    {post.user_first_name} {post.user_last_name}
                                </h5>
                                <span>
                                    <small>
                                        {formatTimeDifference(
                                            calculateTimeDifference(
                                                post.date_posted
                                            )
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
        </div>
    )
}


export default MyProfile
