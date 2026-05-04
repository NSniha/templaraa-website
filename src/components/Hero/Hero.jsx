import React from "react";
import "./Hero.css";
import heroImage from "../../assets/images/hero-business.png";

const heroData = {
  titleBlue: "Digital Solutions",
  titleDark: "for Your Business",
  description:
    "Complete with backend and frontend integration. Build, launch, or scale instantly without development delays or complexity.",
  buttons: [
    {
      id: 1,
      label: "Join Now",
      type: "primary",
      path: "/join",
    },
    {
      id: 2,
      label: "Know More",
      type: "outline",
      path: "/about",
    },
  ],
};

const heroCards = {
  buyer: {
    title: "Verified Buyers",
    name: "Jasan Drill",
    role: "CEO",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  },

  about: {
    title: "About",
    highlight: "Templaraa",
    items: [
      "Explore business-ready website templates",
      "Choose verified creator solutions",
      "Deploy instantly with full backend support",
    ],
  },

  payment: {
    title: "Payment Schedule",
    invoiceTitle: "Invoice",
    invoiceAmount: "$ 1200 USD",
    paymentMethod: "Credit Card",
    discount: "15%",
    status: "Paid",
  },
};

function Hero({ data = heroData, cards = heroCards, onHeroButtonClick }) {
  const handleButtonClick = (event, button) => {
    event.preventDefault();

    if (onHeroButtonClick) {
      onHeroButtonClick(button);
    }
  };

  return (
    <section className="templaraa-hero">
      <div className="container-fluid hero-container">
        <div className="hero-content-wrap">
          <div className="hero-left-content">
            <h1>
              <span>{data.titleBlue}</span>
              <br />
              {data.titleDark}
            </h1>

            <p>{data.description}</p>

            <div className="hero-button-group">
              {data.buttons.map((button) => (
                <a
                  key={button.id}
                  href={button.path}
                  className={`hero-button ${button.type}`}
                  onClick={(event) => handleButtonClick(event, button)}
                >
                  {button.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hero-right-visual">
            <img
              src={heroImage}
              alt="Digital solutions for business"
              className="hero-main-image"
            />

            <div className="hero-glass-card hero-buyer-card">
              <h3>{cards.buyer.title}</h3>

              <div className="buyer-profile">
                <img src={cards.buyer.avatar} alt={cards.buyer.name} />

                <div>
                  <h4>
                    {cards.buyer.name}
                    <ion-icon name="checkmark-circle"></ion-icon>
                  </h4>
                  <p>{cards.buyer.role}</p>
                </div>
              </div>
            </div>

            <div className="hero-glass-card hero-about-card">
              <h3>
                {cards.about.title} <span>{cards.about.highlight}</span>
              </h3>

              <div className="about-card-list">
                {cards.about.items.map((item, index) => (
                  <div className="about-card-item" key={item}>
                    <span className={index === 0 ? "outline-check" : "fill-check"}>
                      <ion-icon name="checkmark-outline"></ion-icon>
                    </span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-glass-card hero-payment-card">
              <h3>{cards.payment.title}</h3>

              <div className="payment-heading">
                <span>
                  <ion-icon name="receipt-outline"></ion-icon>
                </span>
                <strong>{cards.payment.invoiceTitle}</strong>
              </div>

              <div className="payment-info">
                <div>
                  <p>Invoice</p>
                  <strong>{cards.payment.invoiceAmount}</strong>
                </div>

                <div>
                  <p>Payment Method</p>
                  <strong>{cards.payment.paymentMethod}</strong>
                </div>
              </div>

              <div className="payment-bottom">
                <strong>
                  Discount <span>{cards.payment.discount}</span>
                </strong>

                <small>{cards.payment.status}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;