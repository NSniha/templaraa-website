import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/icons/logo.svg";

const mainNavLinks = [
  {
    id: 1,
    label: "Website Templates",
    path: "/",
  },
  {
    id: 2,
    label: "About",
    path: "/about",
  },
  {
    id: 3,
    label: "Faqs",
    path: "/faqs",
  },
  {
    id: 4,
    label: "Contact",
    path: "/contact",
  },
];

const categories = [
  "All Items",
  "Ecommerce",
  "Business",
  "Entertainment",
  "Personal",
  "Portfolio",
  "Studio",
  "Technology",
  "Corporate",
  "Retails",
];

function Header({
  cartCount = 0,
  onNavChange,
  onCategoryChange,
  onSearchChange,
  onCartClick,
}) {
  const [activeNav, setActiveNav] = useState(1);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const getNavClassName = (itemId) => {
    if (hoveredNav === itemId) {
      return "hovered";
    }

    if (hoveredNav === null && activeNav === itemId) {
      return "active";
    }

    return "";
  };

  const getCategoryClassName = (category) => {
        if (hoveredCategory === category) {
            return "hovered";
        }

        if (hoveredCategory === null && activeCategory === category) {
            return "active";
        }

        return "";
    };

  const handleNavClick = (event, item) => {
    event.preventDefault();

    setActiveNav(item.id);
    setHoveredNav(null);
    setIsTopMenuOpen(false);

    if (onNavChange) {
      onNavChange(item);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setHoveredCategory(null);
    setIsCategoryMenuOpen(false);

    if (onCategoryChange) {
        onCategoryChange(category);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    }
  };

  const closeDrawer = () => {
    setIsTopMenuOpen(false);
    setHoveredNav(null);
  };

  return (
    <>
      <header className="templaraa-header">
        <div className="header-top">
          <div className="container-fluid header-container">
            <div className="header-top-inner">
              <a href="/" className="header-brand" aria-label="Templaraa Home">
                <img src={logo} alt="Templaraa Logo" className="brand-logo" />
              </a>

              <nav
                className="header-nav desktop-nav"
                onMouseLeave={() => setHoveredNav(null)}
              >
                {mainNavLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.path}
                    className={getNavClassName(item.id)}
                    onMouseEnter={() => setHoveredNav(item.id)}
                    onClick={(event) => handleNavClick(event, item)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="header-actions">
                <div className="header-search">
                  <ion-icon name="search-outline"></ion-icon>
                  <input
                    type="text"
                    value={searchValue}
                    placeholder="Search products"
                    onChange={handleSearchChange}
                  />
                </div>

                <button
                  className="cart-button"
                  type="button"
                  aria-label="Open cart"
                  onClick={handleCartClick}
                >
                  <ion-icon name="bag-handle-outline"></ion-icon>
                  <span>{cartCount}</span>
                </button>

                <a href="/signin" className="signin-button">
                  <ion-icon name="person-outline"></ion-icon>
                  <span>Sign In</span>
                </a>

                <button
                  className="menu-toggle"
                  type="button"
                  aria-label="Open main menu"
                  onClick={() => setIsTopMenuOpen(true)}
                >
                  <ion-icon name="menu-outline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="header-category">
          <div className="container-fluid header-container">
            <div className="category-mobile-row">
              <button
                className="category-toggle"
                type="button"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                <ion-icon
                  name={isCategoryMenuOpen ? "close-outline" : "menu-outline"}
                ></ion-icon>
                <span>{activeCategory}</span>
              </button>

              <a href="/seller" className="seller-button mobile-seller">
                Become a Seller
              </a>
            </div>

            <div className={`category-inner ${isCategoryMenuOpen ? "show" : ""}`}>
              <a href="/seller" className="seller-button desktop-seller">
                Become a Seller
              </a>

              <span className="category-divider"></span>

              <div
                className="category-list"
                onMouseLeave={() => setHoveredCategory(null)}
                >
                {categories.map((category) => (
                    <button
                    key={category}
                    type="button"
                    className={getCategoryClassName(category)}
                    onMouseEnter={() => setHoveredCategory(category)}
                    onClick={() => handleCategoryClick(category)}
                    >
                    {category}
                    </button>
                ))}
                </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`drawer-overlay ${isTopMenuOpen ? "show" : ""}`}
        onClick={closeDrawer}
      ></div>

      <aside className={`mobile-drawer ${isTopMenuOpen ? "show" : ""}`}>
        <div className="drawer-header">
          <img src={logo} alt="Templaraa Logo" className="drawer-logo" />

          <button
            type="button"
            className="drawer-close"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <div className="drawer-search">
          <ion-icon name="search-outline"></ion-icon>
          <input
            type="text"
            value={searchValue}
            placeholder="Search products"
            onChange={handleSearchChange}
          />
        </div>

        <nav className="drawer-nav" onMouseLeave={() => setHoveredNav(null)}>
          {mainNavLinks.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className={getNavClassName(item.id)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onClick={(event) => handleNavClick(event, item)}
            >
              {item.label}
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Header;