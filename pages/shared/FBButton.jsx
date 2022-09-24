import { useState, Fragment } from "react";
import { AppModal } from "./AppModal";

export const FBButton = ({ caption, getFBStatus, ...props }) => {

    const [isBox, setIsBox] = useState(false);

    return <Fragment>
        <button className="alert-facebook-btn" onClick={() => getFBStatus()}>
            <i className="fab fa-facebook-f" />
            Accedi con Facebook
        </button>
        {caption && <div>
            <p className="message-switcher" onClick={() => setIsBox(!isBox)}>
                <span className="fa fa-question-circle"></span>
                Perchè accedere con facebook?
            </p>
            {isBox && <AppModal close={() => setIsBox(false)}>
                <span className="box-message-fb-btn">
                    Accedendo con il tuo account Facebook potrai pubblicare i tuoi Alert
                    anche in tutti Gruppi Facebook associati al network di Vicarius Legal
                </span>
                <span className="closing-btn" onClick={() => setIsBox(false)}>
                    Ok ho capito
                </span>
            </AppModal>}
        </div>}
    </Fragment>
}