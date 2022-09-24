import Link from 'next/link';
import {FlexBox} from "./Typography";
import {AppAvatar} from "./AppAvatar";
import {Fragment} from "react";
import {useRequestUser} from "./utils";
import Logo from '../logo_colored.png';

const window = {location: {}};
const routes = [];
const termsRoutes = [];

export const AppAside = ({isOpen, setIsOpen}) => {

    const css = "alert-aside full-box " + isOpen;
    const { requestUser } = useRequestUser();

    return <aside className={css} onClick={() => setIsOpen("closed")}>
        <div className='alert-aside__menu-wrapper'>
            <div className='alert-title is-desktop'>
                <h3>MENU</h3>
            </div>
            <ul className='alert-aside__menu'>
                <li className='user-card'>
                    {requestUser ? <Fragment>
                        <FlexBox justify='center'>
                            <AppAvatar
                                src={requestUser.picture}
                                weight='large'
                            />
                        </FlexBox>
                        <FlexBox justify='center'>
                            <a href={'/app/user/' + requestUser.id}>
                                <h2>{requestUser.name}</h2>
                                <span>Visualizza profilo</span>
                            </a>
                        </FlexBox>
                    </Fragment> : <FlexBox justify='center'>
                        <AppAvatar
                            src={Logo}
                            weight='large'
                        />
                    </FlexBox>}
                </li>
                {requestUser && <li>
                    <span className="title">
                        Vicarius è la piattaforma web che ti consente di trovare colleghi
                        disponibili per domiciliazioni e sostituzioni legali in tutta Italia
                    </span>
                </li>}
                { routes.map((route, i) => route.label && <li key={i} className={window.location.pathname === route.path ? " current" : ""}>
                    <a href={route.path}>
                        <i className={"fa fa-" + route.icon} />
                        {route.label}
                    </a>
                </li>) }
                {requestUser && <Fragment>
                    <li>
                        <a href='/modifica/profilo/0/'>
                            <i className="fas fa-user"/>
                            Modifica Profilo
                        </a>
                    </li>
                    {/*
                    <li>
                        <a href='/modifica/foto_profilo/0/'>
                            <i className="fa fa-picture-o"/>
                            Modifica Foto Profilo
                        </a>
                    </li>
                    <li>
                        <a href='/modifica/dati/0/'>
                        <i className="fa fa-suitcase"/>
                        Modifica Dati Professionali
                        </a>
                    </li>
                    */}
                    <li>
                        <a href='/accounts/password_change/'>
                            <i className="fas fa-key"/>
                            Modifica Password
                        </a>
                    </li>
                    <li>
                        <a href='/app/logout'>
                            <i className="fas fa-sign-out-alt"/>
                            Logout
                        </a>
                    </li>
                </Fragment>}
            </ul>
            <div className='is-desktop'>
                <span className='copyright'>
                    Vicariuslegal Srl - Roma
                    ©2020 - Diritti Riservati
                </span>
                {termsRoutes.map((route, i) => <a key={i} to={route.path} className='term-route'>
                    <i className={'fa fa-' + route.icon} /> {route.label}
                </a>)}
            </div>
        </div>
    </aside>
}