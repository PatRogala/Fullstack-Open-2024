const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={message.includes('error') ? 'error' : 'notification'}>
            {message}
        </div>
    )
}

export default Notification