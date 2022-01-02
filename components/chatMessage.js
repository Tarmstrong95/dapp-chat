import Image from "next/image";

export const ChatMessage = ({ message, sender }) => {
    const avatar = `https://avatars.dicebear.com/api/initials/${message.who}.svg`;
    const ts = new Date(message.when);

    return (
        <div style={{ backgroundColor: 'lightgrey', margin: 10, borderRadius: 10, padding: 10, display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center'}}>
                <Image src={avatar} alt="avatar" width={30} height={30} />
                <time style={{marginLeft: 10}}>{ts.toLocaleTimeString()}</time>
            </div>
            <p style={{padding: 10, margin: 0}}>{message.what}</p>
        </div>
    )
}