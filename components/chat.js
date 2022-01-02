import React from "react"
import { useUserContext } from "../contexts/userContext"
import { Login } from "./login"
import { ChatMessage } from "./chatMessage"
import * as SEA from 'gun/sea'
import * as Gun from "gun"

export const Chat = () => {
    const { user, username } = useUserContext()
    const [db, setDb] = React.useState(Gun())
    const [newMessage, setNewMessage] = React.useState(null)
    const [messages, setMessages] = React.useState([])
    const [lastScrollTop, setLastScrollTop] = React.useState()
    const [canAutoScroll, setCanAutoScroll] = React.useState(true)
    const [unreadMessages, setUnreadMessages] = React.useState(false)
    const scrollBottom = React.useRef(null)

    const match = {
        '.': {
            '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(),
        },
        '-': 1,
    };

    React.useEffect(() => {
        // Get Messages
        db.get('chat')
            .map(match)
            .once(async (data, id) => {
                if (data) {
                    // Key for end-to-end encryption
                    const key = '#foo';
                    var message = {
                        // transform the data
                        who: await db.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
                        what: (await Gun.SEA.decrypt(data.what, key)) + '', // force decrypt as text.
                        when: Gun.state.is(data, 'what'), // get the internal timestamp for the what property.
                    };
                    if (message.what) {
                        setMessages((messages) => [...messages.slice(-100), message].sort((a, b) => a.when - b.when))
                        if (canAutoScroll) {
                            autoScroll();
                        } else {
                            setUnreadMessages(true);
                        }
                    }
                }
            });
    }, [])

    const autoScroll = () => {
        setTimeout(() => scrollBottom?.current.scrollIntoView({ behavior: 'auto' }), 500);
        unreadMessages = false;
    }

    const watchScroll = (e) => {
        canAutoScroll = (e.target.scrollTop || Infinity) > lastScrollTop;
        lastScrollTop = e.target.scrollTop;
    }

    const sendMessage = async (e) => {
        e.preventDefault()

        const secret = await SEA.encrypt(newMessage, '#foo');
        const message = user.get('all').set({ what: secret });
        const index = new Date().toISOString();
        db.get('chat').get(index).put(message);
        setNewMessage('');
        setCanAutoScroll(true);
        autoScroll();
    }

    return (
        <div className="container">
            {!username ? <Login /> : (
                <>
                    <main onScroll={watchScroll} style={{height: '80vh', overflowY: 'scroll'}}>
                        {messages.length && messages.map((message, i) => <ChatMessage key={i} message={message} sender={username} />)}
                        {!messages.length && <p>There are no messages</p>}
                        <div ref={scrollBottom}/>
                    </main>
                    <form onSubmit={sendMessage}>
                        <input placeholder="Type a message..." type={'text'} onChange={e => setNewMessage(e.target.value)} value={newMessage} />
                        <button disabled={!newMessage} type="submit">💥</button>
                    </form>
                </>
            )}
        </div>
    )
}