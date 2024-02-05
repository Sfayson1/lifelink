function Launch() {
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
        <div>
            <ErrorNotification error={error} />
            <Construct info={launchInfo} />
        </div>
    )
}

export default Launch
