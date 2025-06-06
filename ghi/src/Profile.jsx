import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'




const Profile = () => {
    let { user_id } = useParams()
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    const formatPostDate = (postDate) => {
        const date = new Date(postDate);
        const options = { month: 'short', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    const fetchPostsWithUser = async () => {
        const postUrl = `${import.meta.env.VITE_API_HOST}/posts/${user_id}`
        const response = await fetch(postUrl)
        if (response.ok) {
            const data = await response.json()
            if (data === undefined) {
                return null
            }
            setPosts(data.posts)
        }
    }

    const fetchUser = async () => {
        const userUrl = `${import.meta.env.VITE_API_HOST}/users/${user_id}`
        const response = await fetch(userUrl)
        if (response.ok) {
            const users = await response.json()
            if (users === undefined) {
                return null
            }
            setUsers([users])
        }
    }
    useEffect(() => {
        fetchUser()
        fetchPostsWithUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user_id])

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
export default Profile
