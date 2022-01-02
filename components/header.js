import Image from "next/image"
import { useUserContext } from "../contexts/userContext"

export const Header = () => {
    const {username, user} = useUserContext()
    const signout = () => {
        user.leave()
        user.set('')
    }

    const _renderUser = () => {
        if (!username) {
            return <h3>Gun.js Chat</h3>
        }
        return (
            <div style={{display: 'flex', justifyContent: 'space-between', paddingLeft: '10%', paddingRight: '10%', margin: 10}}>
                <div>
                    <span style={{marginRight: 20, color: 'white'}}>Hello <strong>{username}</strong></span>
                    <Image src={`https://avatars.dicebear.com/api/initials/${username}.svg`} alt="avatar" height={50} width={50} />
                </div>
                <button onClick={signout}>Sign Out</button>
            </div>
        )
    }

    return (
        <header>
            <h1 style={{textAlign: 'center'}}>🔫💬</h1>
            {_renderUser()}
        </header>
    )
}