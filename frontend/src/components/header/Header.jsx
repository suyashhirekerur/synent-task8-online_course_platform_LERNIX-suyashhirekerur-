import { Link } from 'react-router-dom';
import './header.css';
import logo from '../../assets/logo.png'; // Make sure the logo is saved as logo.png in src/assets/

const Header = ({ isAuth }) => {
    return (
        <header>
            <Link to={'/'} className="logo">
                <img src={logo} alt="Lernix Logo" className="logo-img" />
                <span>Lernix</span>
            </Link>

            <div className="link">
                <Link to={'/'}>Home</Link>
                <Link to={'/courses'}>Courses</Link>
                <Link to={'/about'}>About</Link>
                {
                    isAuth ? (
                        <Link to={'/account'}>Account</Link>
                    ) : (
                        <Link to={'/login'}>Login</Link>
                    )
                }
            </div>

        </header>
    );
};

export default Header;