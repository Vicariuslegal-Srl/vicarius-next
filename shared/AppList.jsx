export const AppListItemAction = ({children}) => {

    return <div className="app-list__item__action">
        {children}
    </div>
}

export const AppListItemHTML = ({title, html}) => {

    return <div className="app-list__item__text">
        <span className="title">{title}</span>
        {html}
    </div>
}

export const AppListItemIcon = ({children, weight}) => {

    return <div className={"app-list__item__icon " + weight}>
        {children}
    </div>
}

export const AppListItemText = ({title, subtitle}) => {

    return <div className="app-list__item__text">
        <span className="title">{title}</span>
        {subtitle && <span className="subtitle">{subtitle}</span>}
    </div>
}

export const AppListItem = ({children, border}) => {

    return <li className={"app-list__item" + (border ? " bordered" : "")}>
        {children}
    </li>
}

export const AppList = ({children}) => {

    return <div className="app-list">
        <ul>
            {children}
        </ul>
    </div>
}