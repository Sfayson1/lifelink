import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])


    const fetchPosts = async () => {
        const postUrl = `http://localhost:8000/posts/${user_id}`
        const response = await fetch(postUrl)
        if (response.ok) {
            const data = await response.json()
            if (data === undefined) {
                return null
            }
            console.log("**posts**", data)
            setPosts(data)
        }
    }

    const fetchUser = async () => {
        const userUrl = `http://localhost:8000/users/${user_id}`
        const response = await fetch(userUrl)
        if (response.ok) {
            const users = await response.json()
            if (users === undefined) {
                return null
            }
            console.log(users)
            setUsers([users])
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (users.length > 0) {
            fetchPosts()
        }
    }, [users])

    useEffect(() => {
        const fetchPostsData = async () => {
            await fetchPosts()
            console.log('posts:', posts)
        }
        fetchPostsData()
    }, [])

    return (
        <div>
            <div className="relative pb-2 h-full justify-center items-center">
                <div className="flex flex-col pb-5">
                    <div className="relative flex flex-col mb-7">
                        <div className="flex flex-col justify-center items-center">
                            <img
                                className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                                src="#"
                                alt="user-pic"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {users.map((user) => {
                return (
                    <div className="" key={user.id}>
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
                                <h5>{post}</h5>
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
    )
}
export default Profile
