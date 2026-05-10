import React, { useMemo, useState } from "react";
import "./RecentlyAdded.css";

import allLogo from "../../assets/icons/logo-all.png";
import wordpressLogo from "../../assets/icons/logo-wordpress.png";
import figmaLogo from "../../assets/icons/logo-figma.png";
import reactLogo from "../../assets/icons/logo-react.png";
import shopifyLogo from "../../assets/icons/logo-shopify.png";
import webflowLogo from "../../assets/icons/logo-webflow.png";
import framerLogo from "../../assets/icons/logo-framer.png";

import dashboardImg from "../../assets/images/products/recent-dashboard.png";
import commerceImg from "../../assets/images/products/recent-commerce.png";
import agencyImg from "../../assets/images/products/recent-agency.png";
import portfolioImg from "../../assets/images/products/recent-portfolio.png";
import saasImg from "../../assets/images/products/recent-saas.png";
import studioImg from "../../assets/images/products/recent-studio.png";
import figmaKitImg from "../../assets/images/products/recent-figma-kit.png";
import shopifyImg from "../../assets/images/products/recent-shopify.png";
import framerImg from "../../assets/images/products/recent-framer.png";

const filterTabs = [
  {
    id: "all",
    label: "All Templates",
    logo: allLogo,
  },
  {
    id: "wordpress",
    label: "WordPress Themes",
    logo: wordpressLogo,
  },
  {
    id: "figma",
    label: "Figma UI Kits",
    logo: figmaLogo,
  },
  {
    id: "react",
    label: "React Templates",
    logo: reactLogo,
  },
  {
    id: "shopify",
    label: "Shopify Stores",
    logo: shopifyLogo,
  },
  {
    id: "webflow",
    label: "Webflow Sites",
    logo: webflowLogo,
  },
  {
    id: "framer",
    label: "Framer Pages",
    logo: framerLogo,
  },
];

const recentProducts = [
  {
    id: 201,
    title: "AstraFlow Business Theme",
    author: "Templaraa Studio",
    price: 62,
    rating: 4,
    category: "wordpress",
    image: dashboardImg,
    slug: "astraflow-business-theme",
    path: "/products/astraflow-business-theme",
  },
  {
    id: 202,
    title: "ShopWave eCommerce Layout",
    author: "LaunchGrid",
    price: 74,
    rating: 5,
    category: "shopify",
    image: commerceImg,
    slug: "shopwave-ecommerce-layout",
    path: "/products/shopwave-ecommerce-layout",
  },
  {
    id: 203,
    title: "AgencyPro React Template",
    author: "Design Studio Pro",
    price: 58,
    rating: 4,
    category: "react",
    image: agencyImg,
    slug: "agencypro-react-template",
    path: "/products/agencypro-react-template",
  },
  {
    id: 204,
    title: "Creator Portfolio Website",
    author: "BrandMotion",
    price: 39,
    rating: 5,
    category: "webflow",
    image: portfolioImg,
    slug: "creator-portfolio-website",
    path: "/products/creator-portfolio-website",
  },
  {
    id: 205,
    title: "CloudCore SaaS Landing",
    author: "PixelCraft Lab",
    price: 49,
    rating: 4,
    category: "framer",
    image: saasImg,
    slug: "cloudcore-saas-landing",
    path: "/products/cloudcore-saas-landing",
  },
  {
    id: 206,
    title: "StudioBase WordPress Site",
    author: "UI Market Lab",
    price: 55,
    rating: 4,
    category: "wordpress",
    image: studioImg,
    slug: "studiobase-wordpress-site",
    path: "/products/studiobase-wordpress-site",
  },
  {
    id: 207,
    title: "Finora Finance UI Kit",
    author: "Nexa UI Studio",
    price: 79,
    rating: 5,
    category: "figma",
    image: figmaKitImg,
    slug: "finora-finance-ui-kit",
    path: "/products/finora-finance-ui-kit",
  },
  {
    id: 208,
    title: "RetailCraft Shopify Theme",
    author: "ThemeCrafters",
    price: 68,
    rating: 4,
    category: "shopify",
    image: shopifyImg,
    slug: "retailcraft-shopify-theme",
    path: "/products/retailcraft-shopify-theme",
  },
  {
    id: 209,
    title: "Launchly Framer Template",
    author: "FrameStack",
    price: 44,
    rating: 5,
    category: "framer",
    image: framerImg,
    slug: "launchly-framer-template",
    path: "/products/launchly-framer-template",
  },
];

function RecentlyAdded({
  searchValue = "",
  onAddToCart,
  onProductClick,
  onRatingFilter,
  onFilterChange,
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedRating, setSelectedRating] = useState(null);

  const filteredProducts = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();

    return recentProducts.filter((product) => {
      const categoryMatch =
        activeFilter === "all" || product.category === activeFilter;

      const searchMatch =
        !keyword ||
        product.title.toLowerCase().includes(keyword) ||
        product.author.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword);

      const ratingMatch = !selectedRating || product.rating >= selectedRating;

      return categoryMatch && searchMatch && ratingMatch;
    });
  }, [searchValue, activeFilter, selectedRating]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter.id);

    if (onFilterChange) {
      onFilterChange(filter);
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

  const handleRatingClick = (event, rating) => {
    event.stopPropagation();

    const nextRating = selectedRating === rating ? null : rating;
    setSelectedRating(nextRating);

    if (onRatingFilter) {
      onRatingFilter(nextRating);
    }
  };

  const renderPills = (groupName) =>
    filterTabs.map((filter) => (
      <button
        key={`${groupName}-${filter.id}`}
        type="button"
        className={
          activeFilter === filter.id ? "recently-pill active" : "recently-pill"
        }
        onClick={() => handleFilterClick(filter)}
      >
        <span className="recently-pill-icon">
          <img src={filter.logo} alt={filter.label} />
        </span>
        {filter.label}
      </button>
    ));

  return (
    <section className="recently-section">
      <div className="container-fluid recently-container">
        <div className="recently-heading">
          <span>RECENTLY ADDED</span>
          <h2>Freshly Uploaded Website Templates</h2>
        </div>
      </div>

      <div className="recently-tabs-full">
        <div className="recently-tabs-marquee">
          <div className="recently-tabs-track">
            <div className="recently-tabs-group">{renderPills("first")}</div>
            <div className="recently-tabs-group" aria-hidden="true">
              {renderPills("second")}
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid recently-container">
        {filteredProducts.length > 0 ? (
          <div className="recently-grid">
            {filteredProducts.map((product) => (
              <article
                className="recently-card"
                key={product.id}
                onClick={() => handleProductClick(product)}
              >
                <div className="recently-img-box">
                  <img src={product.image} alt={product.title} />
                </div>

                <div className="recently-card-content">
                  <h3>{product.title}</h3>
                  <p>by {product.author}</p>

                  <div className="recently-rating-price">
                    <div
                      className="recently-stars"
                      aria-label={`${product.rating} star rating`}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={star <= product.rating ? "filled" : ""}
                          onClick={(event) => handleRatingClick(event, star)}
                          aria-label={`Filter ${star} stars and up`}
                        >
                          <ion-icon
                            name={
                              star <= product.rating ? "star" : "star-outline"
                            }
                          ></ion-icon>
                        </button>
                      ))}
                    </div>

                    <strong>${product.price}</strong>
                  </div>

                  <button
                    type="button"
                    className="recently-cart-btn"
                    onClick={(event) => handleAddToCart(event, product)}
                  >
                    <ion-icon name="cart-outline"></ion-icon>
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="recently-empty">
            <h3>No templates found</h3>
            <p>Try another keyword, category, or rating filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentlyAdded;