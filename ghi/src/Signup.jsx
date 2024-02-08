import { useState, useEffect } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react'


function Signup() {
    const { token } = useAuthContext()
    const { login } = useToken()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        grad_class: '',
    })

    const handleFormChange = (event) => {
        const value = event.target.value
        const inputName = event.target.name
        setFormData({
            ...formData,
            [inputName]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const userURL = `${import.meta.env.VITE_API_HOST}/api/users/`
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(userURL, fetchConfig)
        if (response.ok) {
            setFormData({
                username: '',
                password: '',
                first_name: '',
                last_name: '',
                email: '',
                grad_class: '',
            })
            login(formData.username, formData.password)
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (token) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return (

    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="card mb-3">
                    <h3 className="card-header">Sign Up</h3>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} id="signup">
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.username}
                                placeholder="Username"
                                required
                                type="text"
                                name="username"
                                id="username"
                                className="form-control"
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.password}
                                placeholder="Password"
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                className="form-control"
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.first_name}
                                placeholder="First Name"
                                required
                                type="text"
                                name="first_name"
                                id="first_name"
                                className="form-control"
                            />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.last_name}
                                placeholder="Last Name"
                                required
                                type="text"
                                name="last_name"
                                id="last_name"
                                className="form-control"
                            />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.email}
                                placeholder="Email"
                                required
                                type="text"
                                name="email"
                                id="email"
                                className="form-control"
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.grad_class}
                                placeholder="Graduating Class"
                                required
                                type="text"
                                name="grad_class"
                                id="grad_class"
                                className="form-control"
                            />
                            <label htmlFor="grad_class">Graduating Class</label>
                        </div>
                        <button onClick={togglePasswordVisibility} type="button" className="btn btn-secondary btn-sm mt-2">
                                {showPassword ? "Hide Password" : "Show Password"}
                        </button>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary">Sign up</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Signup
