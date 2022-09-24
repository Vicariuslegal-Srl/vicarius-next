export const Box = ({ children }) => {

    return <div className="alert-box">
        {children}
    </div>
}

export const FlexBox = ({ children, justify='between' }) => {

    return <div className={"alert-flex-box " + justify}>
        {children}
    </div>
}

export const FlexItemContainer = ({ children }) => {

    return <div className={"alert-flex-item-container"}>
        {children}
    </div>
}
