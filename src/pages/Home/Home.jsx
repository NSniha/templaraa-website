import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/CategoriesCard/Categories";
import NewArrival from "../../components/NewArrival/NewArrival";
import RecentlyAdded from "../../components/RecentlyAdded/RecentlyAdded";
import JoinOpportunity from "../../components/JoinOpportunity/JoinOpportunity";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const handleNavChange = (item) => {
    console.log("Selected Page:", item);

    /*
      Later React Router:
      navigate(item.path);
    */
  };

  const handleCategoryChange = (category) => {
    console.log("Selected Header Category:", category);

    /*
      Later product listing:
      navigate(`/products?category=${category}`);
    */
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleCartClick = () => {
    console.log("Cart clicked:", cartItems);

    /*
      Later:
      navigate("/cart");
      or openCartSidebar();
    */
  };

  const handleHeroButtonClick = (button) => {
    console.log("Hero button clicked:", button);

    /*
      Later:
      navigate(button.path);
    */
  };

  const handleExploreCategory = (category) => {
    console.log("Go to category listing:", category);

    /*
      Later:
      navigate(category.path);
    */
  };

  const handleExploreMore = (path) => {
    console.log("Go to listing page:", path);

    /*
      Later:
      navigate(path);
    */
  };

  const handleProductClick = ({ path, product }) => {
    console.log("Go to product details page:", path, product);

    /*
      Later:
      navigate(path, { state: { product } });
    */
  };

  const handleRatingFilter = (rating) => {
    console.log("Rating filter selected:", rating);

    /*
      Later product listing/filter:
      setRatingFilter(rating);
    */
  };

  const handleFilterChange = (filter) => {
    console.log("Recently filter selected:", filter);

    /*
      Later:
      navigate(`/products?type=${filter.id}`);
    */
  };

  const handleJoinClick = (path) => {
    console.log("Go to signup page:", path);

    /*
      Later:
      navigate(path);
    */
  };

  const handleFooterLinkClick = (link) => {
    console.log("Footer link clicked:", link);

    /*
      Later:
      navigate(link.path);
    */
  };

  const handleSocialClick = (social) => {
    console.log("Social clicked:", social);

    /*
      Later:
      window.open(social.path, "_blank");
    */
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <>
      <Header
        cartCount={cartCount}
        onNavChange={handleNavChange}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        onCartClick={handleCartClick}
      />

      <Hero onHeroButtonClick={handleHeroButtonClick} />

      <Categories
        searchValue={searchValue}
        onExploreCategory={handleExploreCategory}
        onExploreMore={handleExploreMore}
      />

      <NewArrival
        onAddToCart={handleAddToCart}
        onProductClick={handleProductClick}
        onExploreMore={handleExploreMore}
      />

      <RecentlyAdded
        searchValue={searchValue}
        onAddToCart={handleAddToCart}
        onProductClick={handleProductClick}
        onRatingFilter={handleRatingFilter}
        onFilterChange={handleFilterChange}
      />

      <JoinOpportunity onJoinClick={handleJoinClick} />

      <Footer
        onFooterLinkClick={handleFooterLinkClick}
        onSocialClick={handleSocialClick}
      />
    </>
  );
}

export default Home;