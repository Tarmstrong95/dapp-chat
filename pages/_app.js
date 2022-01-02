import { UserContextProvider } from "../contexts/userContext"

function Application({ Component, pageProps }) {
    return (
        <UserContextProvider>
            <Component {...pageProps} />
        </UserContextProvider>
    )
}

export default Application