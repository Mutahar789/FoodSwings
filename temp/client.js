const ws = new WebSocket(`ws://localhost:8080`)

const CityDistance = () => {

    const [username, setUsername] = React.useState(``)
    const [Pw, setPw] = React.useState(``)

    const formSubmit = async (ev) => {
        ev.preventDefault()
        if(username && Pw){
            const info = {
                uname : username,
                password : Pw
            }
            ws.send(JSON.stringify(info))
            setUsername('')
            setPw('')
        }
    }

    const usernameChange = (ev) => {
        setUsername(ev.target.value)
    }
    const passwordChange = (ev) => {
        setPw(ev.target.value)
    }

    return (
        <form onSubmit={formSubmit}>
            <h1>Login</h1>
            <h2>Username:</h2>
            <input type="Email" onChange={usernameChange} />
            <h2>Password:</h2>
            <input type="text" onChange={passwordChange} />
            <h2> </h2>
            <input type="submit" />
        </form>
    )
}

const App = () => {
    return (
        <div>
            <CityDistance />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector(`#root`))
