import React from 'react'
import './footer.css';
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>
                    &copy; 2026 Your E-Learning Platform <b>Lernix</b>. All rights reserved. <br />Made with ❤️ by <a href="">Suyash Hirekerur</a>
                </p>
                <div className="social-links">
                    <a href="https://www.instagram.com/suyashhirekerur">
                        <FaInstagram />
                    </a>
                    <a href="https://www.x.com/suyashhirekerur">
                        <FaXTwitter />
                    </a>
                    <a href="https://www.linkedin.com/in/suyashhirekerur/">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/suyashhirekerur">
                        <FaSquareGithub />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer