import React from "react";
import { Link } from "react-router-dom";
import "../css/PageHeader.scss";

function PageHeaderCategoryLinks(props) {
  return (
    <ul className="pageHeaderCategoryLinks">
      <li>
        <Link to={"/shop?sort=latest"}>Latest Arrivals</Link>
      </li>
      <li>
        <Link to={"/shop/category/electrics"}>Electrics</Link>
      </li>
      <li>
        <Link to={"/shop/category/acoustics"}>Acoustics</Link>
      </li>
      <li>
        <Link to={"/shop/category/other"}>Other</Link>
      </li>
    </ul>
  );
}

export default PageHeaderCategoryLinks;
