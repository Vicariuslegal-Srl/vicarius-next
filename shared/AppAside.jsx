import Image from 'next/image';
import Link from 'next/link';
import { FlexBox } from './Typography';
import { AppAvatar } from './AppAvatar';

export const AppAside = ({ title, items }) => {

    const css = "alert-aside full-box closed";

    return <aside className={css}>
        <div className='alert-aside__menu-wrapper'>
            <div className='alert-title is-desktop'>
                <h3>{ title.toUpperCase() }</h3>
            </div>
            <ul className='alert-aside__menu'>
                <li>{items && items.map((item, i) => <Link key={i} href={item.url}>
                    <a>
                        {item.cover_image && <>
                            <Image 
                                alt={item.title}
                                src={item.cover_image}
                                className='absolute-img' 
                                width='300'
                                height='150'
                            /><br/>
                        </>}
                        {item.avatar && <>
                            <FlexBox justify='flex-start'>
                                <AppAvatar 
                                    src={item.avatar}
                                    weight='small'
                                    alt={item.name}
                                />
                                <span style={{ marginLeft: "10px"}}>{ item.name }</span>
                            </FlexBox>
                        </>}
                        <span>{ !item.avatar && item.title }</span>
                    </a>
                </Link>)}</li>
            </ul>
        </div>
    </aside>
}