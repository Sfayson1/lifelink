import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    // const formatTimeDifference = (hours) => {
    //     if (hours < 1) {
    //         return `${Math.floor(hours * 60)}m` // Less than 1 hour, show in minutes
    //     } else if (hours < 24) {
    //         return `${Math.floor(hours)}h` // Less than 24 hours, show in hours
    //     } else if (hours < 24 * 7) {
    //         return `${Math.floor(hours / 24)}d` // Less than 7 days, show in days
    //     } else {
    //         // Over 7 days, show the date in the format "MMM DD"
    //         const postDateTime = new Date(postDate)
    //         return postDateTime.toLocaleDateString('en-US', {
    //             month: 'short',
    //             day: 'numeric',
    //         })
    //     }
    // }

    // const calculateTimeDifference = (postDate) => {
    //     const currentDate = new Date()
    //     const postDateTime = new Date(postDate)
    //     const timeDifference = Math.floor(
    //         (currentDate - postDateTime) / (60 * 60 * 1000)
    //     )
    //     return timeDifference
    // }

    const fetchPosts = async () => {
        const postUrl = 'http://localhost:8000/posts/username'
        const response = await fetch(postUrl)
        if (response.ok) {
            const posts = await response.json()
            console.log('Response data:', posts)
            if (posts === undefined) {
                return null
            }
            console.log('posts:', posts)
            setPosts(posts.posts) // change here
        }
    }
    const fetchUser = async () => {
        const userUrl = 'http://localhost:8000/users/1'
        const response = await fetch(userUrl)
        if (response.ok) {
            const users = await response.json()
            if (users === undefined) {
                return null
            }
            console.log("users:" ,users)
            setUsers([users])
        }
    }


    useEffect(() => {

            fetchPosts()
            fetchUser()
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

            {users.map(user => {
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
            <h1 className="font-bold text-3xl text-align-left mt-3">PostFeed</h1>
            <div className="posts-feed">
                {posts.map(post => {
                    return (
                        <div className="card mb-3" key={post.id}>
                            <div className="card-body">
                                <h5>post</h5>
                                {/* <span>
                                    <small>
                                        {formatTimeDifference(
                                            calculateTimeDifference(
                                                post.date_posted
                                            )
                                        )}
                                    </small>
                                </span> */}
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
