import React, { createContext, useContext } from 'react';
import * as Gun from 'gun';
import 'gun/sea';
import 'gun/axe';

const UserContext = createContext();

export function UserContextProvider({ children }) {
    const db = React.useRef(Gun()).current
    const user = React.useRef(db.user().recall({ sessionStorage: true })).current
    const [username, setUsername] = React.useState('')

    React.useEffect(() => {
        user.get('alias').on(name => setUsername(name))
        db.on('auth', async (event) => {
            const alias = await user.get('alias'); // username string
            setUsername(alias);
        
            console.log(`signed in as ${alias}`);
        });
    }, [])

    let sharedState = {
        db,
        user,
        username,
        setUsername
    }

    return (
        <UserContext.Provider value={sharedState}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}