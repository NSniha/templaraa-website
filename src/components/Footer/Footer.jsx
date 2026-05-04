import React from "react";
import "./Footer.css";
import logo from "../../assets/icons/logo.svg";

const footerLinks = [
  {
    id: 1,
    label: "Home",
    path: "/",
  },
  {
    id: 2,
    label: "About Us",
    path: "/about",
  },
  {
    id: 3,
    label: "Templates",
    path: "/products",
  },
  {
    id: 4,
    label: "Contact",
    path: "/contact",
  },
  {
    id: 5,
    label: "Privacy & Policy",
    path: "/privacy-policy",
  },
];

const socialLinks = [
  {
    id: 1,
    label: "Dribbble",
    path: "https://dribbble.com",
    icon: "logo-dribbble",
  },
  {
    id: 2,
    label: "YouTube",
    path: "https://youtube.com",
    icon: "logo-youtube",
  },
  {
    id: 3,
    label: "Instagram",
    path: "https://instagram.com",
    icon: "logo-instagram",
  },
  {
    id: 4,
    label: "LinkedIn",
    path: "https://linkedin.com",
    icon: "logo-linkedin",
  },
];

function Footer({ onFooterLinkClick, onSocialClick }) {
  const currentYear = new Date().getFullYear();

  const handleFooterLinkClick = (event, link) => {
    event.preventDefault();

    if (onFooterLinkClick) {
      onFooterLinkClick(link);
    }
  };

  const handleSocialClick = (event, social) => {
    event.preventDefault();

    if (onSocialClick) {
      onSocialClick(social);
    }
  };

  return (
    <footer className="templaraa-footer">
      <div className="container-fluid footer-container">
        <div className="footer-top">
          <a href="/" className="footer-logo" aria-label="Templaraa Home">
            <img src={logo} alt="Templaraa Logo" />
          </a>

          <div className="footer-contact">
            <a href="tel:+10095447818" className="footer-contact-card">
              <ion-icon name="call-outline"></ion-icon>
              <span>+1 (009) 544-7818</span>
            </a>

            <a
              href="mailto:support@templaraa.com"
              className="footer-contact-card"
            >
              <ion-icon name="mail-outline"></ion-icon>
              <span>support@templaraa.com</span>
            </a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>@{currentYear} All rights Reserved</p>

          <nav className="footer-nav">
            {footerLinks.map((link, index) => (
              <React.Fragment key={link.id}>
                <a
                  href={link.path}
                  onClick={(event) => handleFooterLinkClick(event, link)}
                >
                  {link.label}
                </a>

                {index !== footerLinks.length - 1 && (
                  <span className="footer-dot"></span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="footer-social">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.path}
                aria-label={social.label}
                onClick={(event) => handleSocialClick(event, social)}
              >
                <ion-icon name={social.icon}></ion-icon>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;