import React from "react"
import { useUserContext } from "../contexts/userContext"

export const Login = () => {
    const { user } = useUserContext()
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const login = () => {
        console.log("Loggin in user")
        user.auth(username, password, ({ err }) => err && alert(err));
    }

    const signup = () => {
        console.log("Called signup")
        user.create(username, password, ({ err }) => {
            if (err) {
                alert(err);
            } else {
                login();
            }
        });
        console.log("Created user")
        console.table(user)
    }

    return (
        <div>
            <label>Username</label>
            <input name="username" value={username} onChange={e => setUsername(e.target.value)} minLength={3} maxLength={16} />

            <label>Password</label>
            <input name="password" value={password} onChange={e => setPassword(e.target.value)} type="password" />

            <button onClick={login}>Login</button>
            <button onClick={signup}>Sign Up</button>
        </div>
    )
}