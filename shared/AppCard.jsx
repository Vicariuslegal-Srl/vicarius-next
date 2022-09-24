import {FlexBox} from "./Typography";
import {AppAvatar} from "./AppAvatar";

export const AppCard = ({children, src, title, description, inline=false}) => {

    const cssClass = inline ? 'app-card app-card__inline' : 'app-card app-card__full'

    return <div className={cssClass} >
        <div className='app-card__content'>
            {children}
        </div>
    </div>
}