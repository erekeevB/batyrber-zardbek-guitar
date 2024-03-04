import React, { useEffect, useState } from "react";
import "../css/PageHeader.scss";
import PageCartModal from "./PageCartModal";
import { FaCartShopping, FaBars } from "react-icons/fa6";
import MainLogo from "../main_logo.png";
import MainLogoMobile from "../main_logo_mobile.png";
import PageHeaderMobileModal from "./PageHeaderMobileModal";
import PageHeaderCategoryLinks from "./PageHeaderCategoryLinks";

export default function PageHeader() {
  const [logoWidth, setLogoWidth] = useState(300);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useState(false);

  const toggleIsCartOpen = () => setIsCartOpen((prev) => !prev);
  const toggleIsMobileHeaderOpen = () => setIsMobileHeaderOpen((prev) => !prev);

  useEffect(() => {
    const listenerFn = () => {
      setLogoWidth(window.scrollY === 0 ? 300 : 250);
    };

    document.addEventListener("scroll", listenerFn);
    return () => {
      document.removeEventListener("scroll", listenerFn);
    };
  }, []);

  return (
    <>
      <header className="mobile pageHeader">
        <button
          onClick={toggleIsMobileHeaderOpen}
          className={"pageHeaderButton"}
        >
          <FaBars />
        </button>
        <div className="pageHeaderImage">
          <img src={MainLogoMobile} alt="logo" />
        </div>
        <button className="pageHeaderButton" onClick={toggleIsCartOpen}>
          <FaCartShopping />
        </button>
      </header>
      <header className="desktop pageHeader">
        <div className="pageHeaderUpper container">
          <div className="pageHeaderUpperItem">
            <img
              src={MainLogo}
              className="pageHeaderUpperItemImage"
              alt="logo"
              style={{ width: logoWidth }}
            />
          </div>
          <div className="pageHeaderUpperItem middle">
            <input
              type="text"
              className="pageHeaderUpperItemSearch"
              value="Search by model/type/name"
            />
            <button className="pageHeaderUpperItemButton">Search</button>
          </div>
          {/*<div className="pageHeaderUpperItem">*/}
          {/*  <a href="/">Login/Register</a>*/}
          {/*</div>*/}
        </div>
        <div className="pageHeaderLower">
          <div className="pageHeaderLowerInner container">
            <div className="pageHeaderLowerLeft">
              <PageHeaderCategoryLinks />
            </div>
            <button className="pageHeaderLowerRight" onClick={toggleIsCartOpen}>
              <FaCartShopping />
            </button>
          </div>
        </div>
      </header>
      {isCartOpen && <PageCartModal toggleIsOpen={toggleIsCartOpen} />}
      {isMobileHeaderOpen && (
        <PageHeaderMobileModal toggleIsOpen={toggleIsMobileHeaderOpen} />
      )}
    </>
  );
}
