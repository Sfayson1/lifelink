// This makes VSCode check types as if you are using TypeScript
//@ts-check
import { useState, useEffect } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrorNotification from './ErrorNotification'
import Construct from './Construct'
import './App.css'
import UserList from './ListOfUsers.jsx'
import Nav from './navbars/Mainnavbar.jsx'

// All your environment variables in vite are in this object
console.table(import.meta.env)

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST
console.log('API_HOST: ', import.meta.env.VITE_API_HOST)
if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

/**
 * This is an example of using JSDOC to define types for your component
 * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
 * @typedef {{launch_details: LaunchInfo, message?: string}} LaunchData
 *
 * @returns {React.ReactNode}
 */
function App() {
    // Replace this App component with your own.
    /** @type {[LaunchInfo | undefined, (info: LaunchInfo) => void]} */
    const [launchInfo, setLaunchInfo] = useState()
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getData() {
            let url = `${API_HOST}/api/launch-details`
            console.log('fastapi url: ', url)
            let response = await fetch(url)
            /** @type {LaunchData} */
            let data = await response.json()

            if (response.ok) {
                if (!data.launch_details) {
                    console.log('drat! no launch data')
                    setError('No launch data')
                    return
                }
                console.log('got launch data!')
                setLaunchInfo(data.launch_details)
            } else {
                console.log('drat! something happened')
                setError(data.message)
            }
        }
        getData()
    }, [])

    return (
        // <BrowserRouter>
        //     <Nav />
        //     <div className='container'>
        //         <Routes>
        //             <Route path='/error' element={<ErrorNotification error={error} />} />
        //             <Route path='/construct' element={<Construct info={launchInfo} />} />
        //             <Route path='/users/list' element={<UserList />} />
        //         </Routes>
        //     </div>
        // </BrowserRouter>
        <div>
            <ErrorNotification error={error} />
            <Construct info={launchInfo} />
            <UserList />
        </div>


    )
}

export default App
