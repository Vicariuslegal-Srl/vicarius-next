import {FlexBox} from "./Typography";
import Link from 'next/link';

export const HTMLMessPage = ({code, message}) => {

    return <div className="alert-login">
        <div>
            <h1>{code}</h1>
            <p>{message}</p>
            <FlexBox justify="center">
                <a className="regular-btn contained secondary" to='/app/'>
                    TORNA ALLA HOMEPAGE
                </a>
            </FlexBox>
        </div>
    </div>
}