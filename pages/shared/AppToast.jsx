export const AppToast = ({ id, body, type, messages, setMessages }) => {

    const cssClass = "alert-toast " + type;
    setTimeout(() => setMessages(messages.filter((mess, i) => i !== id)), 3000)
    return <div className={cssClass}>
        <p>
            { body }
        </p>
    </div>
}