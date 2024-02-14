import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'


function UserList() {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const userApiUrl = `${import.meta.env.VITE_API_HOST}/users`
        const response = await fetch(userApiUrl)
        if (response.ok) {
            const data = await response.json()

            if (data === undefined) {
                return null
            }

            setUsers(data)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

return (
    <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-5 g-4">
            {users.map((user) => (
                <div className="col d-flex" key={user.id}>
                    <div className="card mb-3 flex-fill">
                        <div className="card-header">
                            <Link to={`/profile/${user.id}`}>
                                <h2 className="text-center">
                                    {user.first_name} {user.last_name}
                                </h2>
                            </Link>
                        </div>
                        <div className="card-body flex-grow-1">
                            <h5 className="card-title">
                                Graduating Class: {user.grad_class}
                            </h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)
}

export default UserList

