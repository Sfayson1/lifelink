import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { Modal, Button } from 'react-bootstrap';





function MyProfile () {
    // State variables
    const [account, setAccount] = useState({});
    const [newPost, setNewPosts] = useState('');
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { logout } = useToken();



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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const [isDeleted, setIsDeleted] = useState(false);


    const handleDelete = async () => {
        setShow(true);
        }
    const confirmDelete = async () => {
        const userURL = `http://localhost:8000/users/${account.user.id}`;
        const response = await fetch(userURL, {
            method:"DELETE",
            headers: {
                'Authorization': `Bearer ${account.access_token}`,
            },
        });
        if (response.ok){
            setIsDeleted(true);
        }
        setShow(false);

    }


    useEffect(() => {
    if (isDeleted) {
        logout();
        navigate('/welcome');
    }
    }, [isDeleted, logout, navigate]);


const Post = ({ post }) => {
    // State variable for the current time
    const [currentTime, setCurrentTime] = useState(new Date());


    const handleDeletePost = async () => {

        const userURL = `http://localhost:8000/posts/${post.id}/`;
        const response = await fetch(userURL, {
        method:"DELETE",
        headers: {
        'Authorization': `Bearer ${account.access_token}`,
        },
    });
    if (response.ok){
        navigate('/users/profile/mine');
        fetchPostsWithUser();
    }
    }
    // Calculate time difference
    const calculateTimeDifference = (postDate) => {
        const postDateTime = new Date(postDate);
        const currentTime = new Date();
        postDateTime.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
        const timeDifference = Math.floor(
            (currentTime - postDateTime) / 1000 // calculate time difference in seconds
        );
        return timeDifference;
    };

    const formatTimeDifference = (seconds) => {
        if (seconds < 60) return `${seconds}s`; // less than 1 minute
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m`; // less than 1 hour
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h`; // less than 1 day
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d`; // less than 1 week
        return currentTime.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setPosts(posts.map(post => ({
                ...post,
                timeDifference: calculateTimeDifference(post.date_posted)
            })));
        }, 1000); // update every second

        // Clean up the interval on unmount
        return () => {
            clearInterval(timer);
        };
    }, [posts]);
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
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary" type="button">
                    <Link to={`/UpdatePost/${post.id}`}style={{ color: 'white' }}>Edit</Link>
                </button>
                <button onClick={handleDeletePost} className="btn btn-primary" type="button">Delete</button>
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
            <div className="d-grid gap-4 d-md-flex justify-content-md-end">
                <div className="btn-group">
                    <p>

                    </p>
                </div>
                <button className="btn btn-danger" onClick={handleDelete}>Delete Account</button>
                <button className="btn btn-primary"><Link to={'/user/update'} style={{color:'white'}}>Update Profile</Link> </button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>woah there!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deleting this user is permanent. Pressing yes will also delete all the users posts. Are you sure?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>
                        🖕🏼
                    </Button>
                </Modal.Footer>
            </Modal>
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
