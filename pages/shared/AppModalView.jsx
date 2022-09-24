import Link from 'next/link';

const window = {};

export const AppModalView = ({title, children, close}) => {

    document.body.style.overflow = 'hidden';

    return <div className="modal-view-container full-box">
        {window.isMobile && <header className="modal-view-container__header">
            <a
                to='/app'
                onClick={() => document.body.style.overflow = 'auto'}
                className="regular-btn fas fa-arrow-left"/>
            <h3>
                {title.toUpperCase()}
            </h3>
        </header>}
        <div className="modal-view-container__content">
            {!window.isMobile && <header
                className="modal-view-container__header cropped"
            >
                <h3>
                    {title.toUpperCase()}
                </h3>
            </header>}
            {children}
            {!window.isMobile && <footer className="modal-view-container__footer">
                <span className="regular-btn" onClick={() => {
                    document.body.style.overflow = 'auto';
                    close();
                }}>CHIUDI</span>
            </footer>}
        </div>
    </div>
}