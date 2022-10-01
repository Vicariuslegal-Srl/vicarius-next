import Image from 'next/image';
import Link from 'next/link';
import { FlexBox } from './Typography';
import { AppAvatar } from './AppAvatar';
import { AppList, AppListItem, AppListItemIcon, AppListItemText } from './AppList';
import { constants } from '../constants/constants';

export const AppAside = ({ title, items, children }) => {

    const css = "alert-aside full-box closed";

    return <aside className={css}>
        <div className='alert-aside__menu-wrapper'>
            <div className='alert-title is-desktop'>
                <h3>{ title.toUpperCase() }</h3>
            </div>
            <AppList>
                {items && items.map((item, i) => <AppListItem key={i} href={item.url} border>
                    {item.cover_image && <span className='absolute-img'>
                        <Image 
                            alt={item.title}
                            src={constants.remoteBaseUrl + item.cover_image} 
                            width='300'
                            height='150'
                        />
                    </span>}
                    {item.avatar && <>
                        <AppListItemIcon weight="small">
                            <Image 
                                alt={item.name} 
                                src={constants.remoteBaseUrl + item.avatar} 
                                width='35' height='35' />
                        </AppListItemIcon>
                        <AppListItemText
                            title={item.name}
                            //subtitle={user.places}
                            // subtitle={user.areas.map(e => e.area).join(', ')}
                        />
                    </>}
                    { !item.avatar && item.title && <span>{ item.title }</span>}
                </AppListItem>)}
                <AppListItem>
                    {children}
                </AppListItem>
            </AppList>
        </div>
    </aside>
}