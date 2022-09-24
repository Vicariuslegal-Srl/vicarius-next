export const AppAvatar = ({src, weight='normal', alt='avatar image'}) => {

    return <div className={'app-avatar ' + weight}>
        <img
            src={src}
            alt={alt}
        />
    </div>

}