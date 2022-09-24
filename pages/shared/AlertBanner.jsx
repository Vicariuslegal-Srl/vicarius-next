import { constants } from "../constants/constants";
import {Fragment, useEffect, useState} from "react";

const window = {};

export const AlertBanner = () => {

    const [bannerId, setBannerId] = useState(!window.isMobile ? constants.fiverrUrlDesktop : constants.amazonUrlMobile);

    useEffect(() => {
        if (!window.isMobile){
            setInterval(() => {
                return setBannerId(bannerId === constants.amazonUrlDesktop ? constants.fiverrUrlDesktop : constants.amazonUrlDesktop);
            }, 13000)
        }
    }, [bannerId])

    return <div className="alert-banner">
        <div className='alert-banner__fixed-container'>
            <div className='alert-banner__badge'>Annuncio</div>
            <div className='alert-banner__wrapper'>
                {!window.isMobile
                    ? <Fragment>
                        <iframe
                            title="desktop-amazon-banner"
                            src={bannerId}
                            width="160"
                            height="600"
                            scrolling="no"
                            // border="0"
                            // marginwidth="0"
                            style={{border: "none"}}
                            // frameborder="0"
                        />
                    </Fragment>
                    : <div>
                        <iframe
                            title='mobile-fiverr-banner'
                            src={constants.fiverrUrlMobile}
                            loading="lazy" data-with-title="true" className="fiverr_nga_frame" frameBorder="0"
                            width="300"
                            height="900"
                        />
                        <iframe
                            title="mobile-amazon-banner"
                            src={bannerId}
                            width="300"
                            height="250"
                            scrolling="no"
                            // border="0"
                            // marginwidth="0"
                            style={{border: "none"}}
                            // frameborder="0"
                        />
                    </div>}
            </div>
        </div>
    </div>
}