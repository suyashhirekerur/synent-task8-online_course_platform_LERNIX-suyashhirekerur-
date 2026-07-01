
import "./paymentSuccess.css";
import { useParams, Link } from 'react-router-dom';

const PaymentSuccess = ({ user }) => {
    const params = useParams()
    return (
        <div className="payment-success-page">
            {user && <div className="success-message">
            <h2>Payment Successful</h2>
            <p>Your course subscription has been activated</p>
            <p>Reference Number - {params.id}</p>
            <Link to={`/${user._id}/dashboard`} className="common-btn">Go To Dashboard</Link>
            </div>
            }
        </div>
    )
}

export default PaymentSuccess;