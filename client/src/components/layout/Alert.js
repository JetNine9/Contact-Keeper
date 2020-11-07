import React, {useContext} from 'react'
import AlertContext from '../../context/alert/alertContext'

export const Alert = () => {

    const alertContext = useContext(AlertContext)

    // reminder that alertContext.alerts is an array
    return (
        alertContext.alerts.length > 0 && alertContext.alerts.map((alert) => {
            return <div key={alert.id} className={`alert alert-${alert.type}`} >
                    <i className="fas fa-info-circle" ></i> {alert.message}
            </div>
        })
    )
}

export default Alert;
