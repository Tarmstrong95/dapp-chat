import React, { createContext, useContext } from 'react';
import * as GUN from 'gun';

const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [db, setDb] = React.useState(GUN())
    const [user, setUser] = React.useState(db.user().recall({ sessionStorage: true }))
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
        setDb,
        user,
        setUser,
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