import React from "react";
import "../css/PageHeader.scss";
import useDisableScrollOnMount from "../hooks/useDisableScrollOnMount";
import PageHeaderCategoryLinks from "./PageHeaderCategoryLinks";

export default function PageHeaderMobileModal({ toggleIsOpen }) {
  useDisableScrollOnMount();

  return (
    <>
      <div className="mobileHeaderFiller" onClick={toggleIsOpen} />
      <div className="mobileHeaderModal">
        <PageHeaderCategoryLinks />
      </div>
    </>
  );
}
