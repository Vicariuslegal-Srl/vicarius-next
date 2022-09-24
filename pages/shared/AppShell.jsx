import {Fragment, useState, useRef, Children, isValidElement, cloneElement, useEffect} from "react";
import { AppMain } from "./AppMain";
import { AppAside } from "./AppAside";
import { AlertBanner } from "./AlertBanner";
import { AppToast } from "./AppToast";
import Logo from '../logo.png';
import {API, saveUser, useRequestUser} from "./utils";
import Link from 'next/link';
import Image from 'next/image';
import AvatarImage from "../avatar.png"
import {constants} from "../constants/constants";

const window = {};

const usersListAPI = {

    call: value => {

        return API('user/' + value)
            .then(response => response.data || []);
    },
    search: async value => {
        const searchAtts = ['first_name', 'last_name', 'dati_utente__citta'];
        const qString = '?' + searchAtts.map(e => e + '=' + value).join('&')
        const remote = value.length > 0 ? await usersListAPI.call(qString) : false;
        return remote || [];
    }
}

const UsersResultList = ({searchValue, list, closeUsersList}) => {

    const classCSS = "app-users-list " + (window.isMobile ? 'fixed' : 'desktop')
    const searchAtts = ['first_name', 'last_name', 'dati_utente__citta'];
    const qString = '?' + searchAtts.map(e => e + '=' + searchValue).join('&');

    return <div className={classCSS}>
        <ul>
            {list.length > 0 ? <Fragment>
                <li className="app-users-list__item">
                    {/*<a href={`/app/users/${qString}`} onClick={() => closeUsersList()}>
                        <i className='fas fa-search' style={{
                            fontSize: '15px',
                            marginRight: '10px'
                        }}/>
                        Visualizza elenco completo dei risultati
                    </a>*/}
                </li>
                {list.slice(0, 5).map((user, i) => <li key={i} className="app-users-list__item">
                    {/*<a href={`/app/user/${user.id}`} onClick={() => closeUsersList()}>
                        <figure className="portrait">
                            <Image alt={user.name} src={user.picture} />
                        </figure>
                        <div className="element">
                            <span>{user.name}</span>
                        </div>
                    </a>*/}
                </li>)}
            </Fragment> : <li className="app-users-list__item">Nessun utente trovato</li>}
        </ul>
    </div>
}

const AppHeader = ({ activeSearch, setActiveSearch, setMenuIsOpen }) => {

    const [searchValue, setSearchValue] = useState('');
    const [usersList, setUsersList] = useState([]);
    const [unread, setUnread] = useState(0);
    const searchInput = useRef(null);
    const headerCSS = activeSearch ? "alert-header search-active" : "alert-header";
    const { requestUser } = useRequestUser();

    useEffect(() => {
        if (requestUser){
            API('notification/')
                .then(response => setUnread(response.data.filter(n => !n.read).length))
                .catch(err => console.log(err));
        }
    }, [requestUser])

    return <header className={headerCSS}>
        {requestUser && <span className="alert-header__portrait btn pointer is-mobile" onClick={() => setMenuIsOpen("open")}>
            <i className="fas fa-bars"/>
        </span>}
        <a href="/app/" className="alert-header__title">
            <Image src={Logo} alt="vicarius logo" />
            <h2>Vicarius Legal</h2>
        </a>
        <div className="alert-header__search-container">
            <div className="alert-header__search-bar">
                {!activeSearch ? <i className="fas fa-search ico" onClick={() => {
                    if (window.isMobile){
                        setActiveSearch(true);
                        searchInput.current.focus();
                    }
                }} /> : <i className="fas fa-arrow-left pointer ico" onClick={() => {
                    setActiveSearch(false);
                    setUsersList([]);
                }} />}
                    <input ref={searchInput} placeholder="cerca per nome o città" type="text" onChange={async event => {
                        const result = await usersListAPI.search(event.target.value);
                        setUsersList(result);
                        setActiveSearch(true);
                        setSearchValue(event.target.value)
                    }}/>
            </div>
            {activeSearch && <UsersResultList searchValue={searchValue} list={usersList} closeUsersList={() => {
                setActiveSearch(false);
                setUsersList([]);
            }} />}
        </div>
        {requestUser ? <Fragment>
            <a href='/app/notifications' className="alert-header__portrait btn" badge={unread <= 99 ? unread : '∞'}>
                <i className="fa fa-bell" />
            </a>
            <span className="alert-header__portrait is-desktop">
                <Image src={requestUser ? requestUser.picture : AvatarImage} alt="Profilo"/>
            </span>
        </Fragment> : <a href='/app/login' className='alert-header_login-btn regular-btn contained secondary'>
            ACCEDI
        </a>}
    </header>
}

export const AppShell = ({ children, ...props }) => {

    const [messages, setMessages] = useState([]);
    const [menuIsOpen, setMenuIsOpen] = useState("closed");
    const [activeSearch, setActiveSearch] = useState(false);

    useEffect(() => {

        API(constants.userCheckingUrl).then(response => response && response.data && saveUser(response.data))
    }, [])

    const addMessage = mess => {
        let messagesList = messages.slice(0);
        messagesList.push(mess);
        setMessages(messagesList);
    }

    return <Fragment>
        <AppHeader
            activeSearch={activeSearch}
            setActiveSearch={value => setActiveSearch(value)}
            setMenuIsOpen={status => setMenuIsOpen(status)}
        />
        <AppMain>
            <AppAside isOpen={menuIsOpen} setIsOpen={status => setMenuIsOpen(status)} />
            { Children.map(children, child => {
                if (isValidElement(child)) {
                  return cloneElement(child, {addMessage: mess => addMessage(mess)});
                }
                return child;
            }) }
            <AlertBanner />
            { messages.map((mess, i) => <AppToast
                key={i}
                id={i}
                body={mess.body}
                type={mess.type}
                messages={messages}
                setMessages={list => setMessages(list)}
            />) }
        </AppMain>
    </Fragment>
}