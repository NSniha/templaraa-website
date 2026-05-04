import React, { useEffect, useRef, useState } from "react";
import "./NewArrival.css";

import arrivalBg from "../../assets/images/new-arrival-bg.png";
import dashboardImg from "../../assets/images/new-dashboard.png";
import ecommerceImg from "../../assets/images/new-ecommerce.png";
import agencyImg from "../../assets/images/new-agency.png";
import saasImg from "../../assets/images/new-saas.png";
import portfolioImg from "../../assets/images/new-portfolio.png";
import studioImg from "../../assets/images/new-studio.png";
import corporateImg from "../../assets/images/new-corporate.png";
import retailImg from "../../assets/images/new-retail.png";
import financeImg from "../../assets/images/new-finance.png";

const newArrivalProducts = [
  {
    id: 101,
    title: "InsightPro Admin Dashboard",
    author: "Templaraa Studio",
    sales: 126,
    price: 62,
    image: dashboardImg,
    badge: "Premium",
    category: "Dashboard",
    slug: "insightpro-admin-dashboard",
    path: "/products/insightpro-admin-dashboard",
  },
  {
    id: 102,
    title: "NovaShop eCommerce UI",
    author: "LaunchGrid",
    sales: 98,
    price: 74,
    image: ecommerceImg,
    badge: "New",
    category: "eCommerce",
    slug: "novashop-ecommerce-ui",
    path: "/products/novashop-ecommerce-ui",
  },
  {
    id: 103,
    title: "AgencyFlow Landing Kit",
    author: "Design Studio Pro",
    sales: 142,
    price: 58,
    image: agencyImg,
    badge: "",
    category: "Agency",
    slug: "agencyflow-landing-kit",
    path: "/products/agencyflow-landing-kit",
  },
  {
    id: 104,
    title: "Cloudly SaaS Website",
    author: "PixelCraft Lab",
    sales: 87,
    price: 49,
    image: saasImg,
    badge: "",
    category: "SaaS",
    slug: "cloudly-saas-website",
    path: "/products/cloudly-saas-website",
  },
  {
    id: 105,
    title: "Creator Portfolio Pack",
    author: "BrandMotion",
    sales: 113,
    price: 39,
    image: portfolioImg,
    badge: "Popular",
    category: "Portfolio",
    slug: "creator-portfolio-pack",
    path: "/products/creator-portfolio-pack",
  },
  {
    id: 106,
    title: "StudioGrid Creative Site",
    author: "UI Market Lab",
    sales: 76,
    price: 55,
    image: studioImg,
    badge: "",
    category: "Studio",
    slug: "studiogrid-creative-site",
    path: "/products/studiogrid-creative-site",
  },
  {
    id: 107,
    title: "Corporate Edge Template",
    author: "WebFrame Studio",
    sales: 91,
    price: 68,
    image: corporateImg,
    badge: "",
    category: "Corporate",
    slug: "corporate-edge-template",
    path: "/products/corporate-edge-template",
  },
  {
    id: 108,
    title: "RetailPlus Storefront",
    author: "ThemeCrafters",
    sales: 104,
    price: 59,
    image: retailImg,
    badge: "Premium",
    category: "Retail",
    slug: "retailplus-storefront",
    path: "/products/retailplus-storefront",
  },
  {
    id: 109,
    title: "FinTrack Finance Dashboard",
    author: "Nexa UI Studio",
    sales: 132,
    price: 79,
    image: financeImg,
    badge: "Hot",
    category: "Finance",
    slug: "fintrack-finance-dashboard",
    path: "/products/fintrack-finance-dashboard",
  },
];

function NewArrival({ onAddToCart, onProductClick, onExploreMore }) {
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const activeCardRef = useRef(0);
  const isPausedRef = useRef(false);

  const [activeGroup, setActiveGroup] = useState(0);

  const totalGroups = 4;
  const groupStartIndexes = [0, 2, 4, 6];

  const getCardDistance = () => {
    const slider = sliderRef.current;
    const card = slider?.querySelector(".new-arrival-card");

    if (!slider || !card) return 0;

    const sliderStyle = window.getComputedStyle(slider);
    const gap =
      Number.parseFloat(sliderStyle.columnGap || sliderStyle.gap) || 22;

    return card.offsetWidth + gap;
  };

  const updateActiveGroupByCard = (cardIndex) => {
    let groupIndex = 0;

    if (cardIndex >= 6) {
      groupIndex = 3;
    } else if (cardIndex >= 4) {
      groupIndex = 2;
    } else if (cardIndex >= 2) {
      groupIndex = 1;
    }

    setActiveGroup(groupIndex);
  };

  const scrollToCard = (cardIndex, behavior = "smooth") => {
    const slider = sliderRef.current;
    const distance = getCardDistance();

    if (!slider || !distance) return;

    const maxCardIndex = newArrivalProducts.length - 1;
    const safeCardIndex = Math.max(0, Math.min(cardIndex, maxCardIndex));

    activeCardRef.current = safeCardIndex;

    slider.scrollTo({
      left: safeCardIndex * distance,
      behavior,
    });

    updateActiveGroupByCard(safeCardIndex);
  };

  const scrollToGroup = (groupIndex) => {
    const targetCardIndex = groupStartIndexes[groupIndex] || 0;
    scrollToCard(targetCardIndex, "smooth");
  };

  const goToNextCard = () => {
    const nextCard =
      activeCardRef.current >= newArrivalProducts.length - 1
        ? 0
        : activeCardRef.current + 1;

    scrollToCard(nextCard, "smooth");
  };

  const goToPreviousCard = () => {
    const previousCard =
      activeCardRef.current <= 0
        ? newArrivalProducts.length - 1
        : activeCardRef.current - 1;

    scrollToCard(previousCard, "smooth");
  };

  const handleSliderScroll = () => {
    const slider = sliderRef.current;
    const distance = getCardDistance();

    if (!slider || !distance) return;

    const currentCardIndex = Math.round(slider.scrollLeft / distance);

    activeCardRef.current = Math.max(
      0,
      Math.min(currentCardIndex, newArrivalProducts.length - 1)
    );

    updateActiveGroupByCard(activeCardRef.current);
  };

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        goToNextCard();
      }
    }, 2800);
  };

  const pauseAutoSlide = () => {
    isPausedRef.current = true;
  };

  const resumeAutoSlide = () => {
    isPausedRef.current = false;
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      scrollToCard(activeCardRef.current, "auto");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleExploreMore = () => {
    if (onExploreMore) {
      onExploreMore("/products");
    }
  };

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick({
        id: product.id,
        slug: product.slug,
        path: product.path,
        product,
      });
    }
  };

  const handleAddToCart = (event, product) => {
    event.stopPropagation();

    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        slug: product.slug,
        quantity: 1,
        product,
      });
    }
  };

  return (
    <section className="new-arrival-section">
      <div className="container-fluid new-arrival-container">
        <div
          className="new-arrival-wrapper"
          style={{ backgroundImage: `url(${arrivalBg})` }}
        >
          <div className="new-arrival-top">
            <div>
              <span className="new-arrival-label">NEW ARRIVALS</span>
              <h2>Fresh templates, built for faster launch</h2>
            </div>

            <button
              type="button"
              className="new-arrival-explore-btn"
              onClick={handleExploreMore}
            >
              Explore More
            </button>
          </div>

          <div
            className="new-arrival-slider"
            ref={sliderRef}
            onScroll={handleSliderScroll}
            onMouseEnter={pauseAutoSlide}
            onMouseLeave={resumeAutoSlide}
            onTouchStart={pauseAutoSlide}
            onTouchEnd={resumeAutoSlide}
          >
            {newArrivalProducts.map((product) => (
              <article
                className="new-arrival-card card"
                key={product.id}
                onClick={() => handleProductClick(product)}
              >
                {product.badge ? (
                  <span
                    className={`new-arrival-ribbon ${
                      product.badge.toLowerCase() === "premium"
                        ? "premium"
                        : product.badge.toLowerCase() === "hot"
                        ? "hot"
                        : product.badge.toLowerCase() === "popular"
                        ? "popular"
                        : ""
                    }`}
                  >
                    {product.badge}
                  </span>
                ) : null}

                <div className="new-arrival-img-box">
                  <img src={product.image} alt={product.title} />
                </div>

                <div className="new-arrival-card-body">
                  <span className="new-arrival-category">
                    {product.category}
                  </span>

                  <h3>{product.title}</h3>

                  <p>
                    by {product.author}
                    <span>({product.sales} Sales)</span>
                  </p>

                  <div className="new-arrival-card-bottom">
                    <strong>${product.price}</strong>

                    <button
                      type="button"
                      className="new-arrival-cart-btn"
                      onClick={(event) => handleAddToCart(event, product)}
                    >
                      <ion-icon name="cart-outline"></ion-icon>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="new-arrival-dots">
            {Array.from({ length: totalGroups }).map((_, index) => (
              <button
                key={index}
                type="button"
                className={activeGroup === index ? "active" : ""}
                onClick={() => scrollToGroup(index)}
                aria-label={`Go to new arrival group ${index + 1}`}
              ></button>
            ))}
          </div>

          <div className="new-arrival-mobile-controls">
            <button
              type="button"
              className="new-arrival-control-btn prev"
              onClick={goToPreviousCard}
              aria-label="Previous product"
            >
              <ion-icon name="chevron-back-outline"></ion-icon>
            </button>

            <button
              type="button"
              className="new-arrival-control-btn next"
              onClick={goToNextCard}
              aria-label="Next product"
            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewArrival;