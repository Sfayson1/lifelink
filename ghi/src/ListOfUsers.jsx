import  { useState, useEffect } from "react";


function UserList() {
    const [users, setUsers] = useState([]);


    const fetchUsers = async () => {
        const userApiUrl = "http://localhost:8000/users";
        const response = await fetch(userApiUrl);
        if (response.ok) {
            const data = await response.json();

            if (data === undefined) {
                return null;
            }

            setUsers(data)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])





    return (
        <div className="container mt-5">
            {users.map(user => (
                <div className="card mb-3" key={ user.id }>
                    <div className="card-header">
                        <h2 className="text-center">{ user.first_name } { user.last_name }</h2>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Graduating Class: { user.grad_class }</h5>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserList;