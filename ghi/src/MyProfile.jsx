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
            setAccount(data);

        }
    };

    const fetchPostsWithUser = async () => {
        if (account.user) {
            const user_id = parseInt(account.user.id, 10);
            const postUrl = `http://localhost:8000/posts/${user_id}`;
            const response = await fetch(postUrl);
            if (response.ok) {
                const data = await response.json();
                if (data === undefined) return null;
                setPosts(data.posts);
            }
        }
    };

    const fetchUser = async () => {
    if (account.user) {
        const user_id = parseInt(account.user.id, 10);
        const userUrl = `http://localhost:8000/users/${user_id}`;
        const response = await fetch(userUrl);
        if (response.ok) {
            const users = await response.json();
            if (users === undefined) return null;
            setUsers([users]);
        }
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
            fetchPostsWithUser();
            setNewPosts('');
            console.log('New post created');
        } else {
            console.error('Failed to create a new post');
        }
    };
const Post = ({ post }) => {
    // State variable for the current time
    const [currentTime, setCurrentTime] = useState(new Date());
    console.log(post.date_posted);

    // Calculate time difference
    const calculateTimeDifference = (postDate) => {
         const postDateTime = new Date(postDate.replace(' ', 'T') + 'Z');
        const timeDifference = Math.floor(
            (currentTime - postDateTime) / (60 * 1000)
        );
        return timeDifference;
    };

    const formatTimeDifference = (minutes) => {
        if (minutes < 60) return `${minutes}m`;
        if (minutes < 24 * 60) return `${Math.floor(minutes / 60)}h`;
        if (minutes < 24 * 7 * 60) return `${Math.floor(minutes / (24 * 60))}d`;
        return currentTime.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60 * 1000); // 60 * 1000 milliseconds = 1 minute

        // Clean up the interval on unmount
        return () => {
            clearInterval(timer);
        };
    }, []);
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
    );
};

    // Fetch user and posts whenever account id changes
    useEffect(() => {
        if (account.user) {
            fetchUser();
            fetchPostsWithUser();
        }
    }, [account]);
    // Update the current time every minute

    // Fetch account details on component mount
    useEffect(() => {
        fetchAccount();
    }, []);



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
                {posts.map((post) => <Post key={post.id} post={post} />)}


            </div>
        </div>
        </div>
    )
}


export default MyProfile
