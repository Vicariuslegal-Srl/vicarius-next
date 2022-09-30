import Image from 'next/image';
import Link from 'next/link';

export const AppAside = ({ title, items }) => {

    const css = "alert-aside full-box closed";

    return <aside className={css}>
        <div className='alert-aside__menu-wrapper'>
            <div className='alert-title is-desktop'>
                <h3>{ title.toUpperCase() }</h3>
            </div>
            <ul className='alert-aside__menu'>
                <li>{items.map((item, i) => <Link key={i} href={item.url}>
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
                        <span>{ item.title }</span>
                    </a>
                </Link>)}</li>
            </ul>
        </div>
    </aside>
}