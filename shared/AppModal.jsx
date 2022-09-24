export const AppModal = ({children, close}) => {

    return <div className="modal-container full-box">
        <div className="modal-box">
            {children}
            <div className="modal-box__footer">
                <span className="regular-btn" onClick={() => close()}>CHIUDI</span>
            </div>
        </div>
    </div>
}