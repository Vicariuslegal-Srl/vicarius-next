export const AppDateItem = ({dateString, month='short'}) => {

    const options = { day: 'numeric', month };
    const displayDate = new Date(dateString).toLocaleDateString('it-IT', options)

    return <span className='alert-list__date'>
        <i className="fas fa-calendar" /> {displayDate}
    </span>
}
