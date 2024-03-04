import React, { useState } from "react";
import "../css/PageCartModal.scss";
import Button from "./Button";
import { FaRegTrashCan } from "react-icons/fa6";
import useDisableScrollOnMount from "../hooks/useDisableScrollOnMount";
import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "../axiosAPI";
import Skeleton from "react-loading-skeleton";

export default function PageCartModal({ toggleIsOpen }) {
  const [cartIdList, setCartIdList] = useState(
    JSON.parse(localStorage.getItem("cartItems")) ?? [],
  );

  const { data, isFetching, error } = useQuery({
    queryKey: ["cartItems", { ids: cartIdList }],
    queryFn: () => fetchCartItems({ ids: cartIdList }),
  });

  useDisableScrollOnMount();

  const removeItem = (id) => {
    const updatedCartItems = cartIdList.filter((el) => el !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartIdList(updatedCartItems);
  };

  const cartItems = data?.data;
  const isCartEmpty = cartItems?.length === 0;
  const totalCost = cartItems
    ?.map((el) => el.price)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <div className={"pageCartFiller"} onClick={toggleIsOpen} />
      <div className={"pageCartModal"}>
        <div className={"pageCartModalHeader"}>
          <div className={"pageCartModalHeaderTitle"}>Your Order</div>
          <button
            className={"pageCartModalHeaderButton"}
            onClick={toggleIsOpen}
          >
            X
          </button>
        </div>
        <div className={"pageCartModalBody"}>
          {error ? (
            <div>
              Something went wrong, please try again later. {error.message}
            </div>
          ) : isFetching ? (
            Array(3)
              .fill(null)
              .map((_, i) => <PageCartModalItem key={i} isFetching />)
          ) : !isCartEmpty ? (
            cartItems?.map((el) => (
              <PageCartModalItem
                {...el}
                removeItem={removeItem}
                toggleIsCartOpen={toggleIsOpen}
              />
            ))
          ) : (
            <div>Cart is empty</div>
          )}
        </div>
        {!isCartEmpty && !error && (
          <div className={"pageCartModalFooter"}>
            <div className={"pageCartModalFooterPrice"}>
              <div className={"pageCartModalFooterPriceValue"}>
                Total: ${totalCost} USD
              </div>
              <div className={"pageCartModalFooterPriceDescription"}>
                + shipping and tax, calculated at the checkout
              </div>
            </div>
            <Button className={"pageCartModalFooterButton"}>Checkout</Button>
          </div>
        )}
      </div>
    </>
  );
}

function PageCartModalItem({
  name,
  url,
  imgUrl,
  price,
  toggleIsCartOpen,
  removeItem,
  isFetching,
}) {
  const getTextOrSkeleton = (text, width) =>
    isFetching ? <Skeleton style={{ flex: 1, width }} /> : text;

  return (
    <div className={"pageCartItem"}>
      <div className={"pageCartItemImage"}>
        {isFetching ? (
          <Skeleton className={"pageCartItemImageSkeleton"} />
        ) : (
          <a onClick={toggleIsCartOpen} href={url}>
            <img src={imgUrl} alt={name} />
          </a>
        )}
      </div>
      <div className={"pageCartItemInfo"}>
        <div className={"pageCartItemInfoTitle"}>
          <a onClick={toggleIsCartOpen} href={url}>
            {getTextOrSkeleton(name)}
          </a>
        </div>
        <div className={"pageCartItemInfoDescription"}>Sold by Alt & G</div>
      </div>
      <div className={"pageCartItemPrice"}>
        <div className={"pageCartItemPricePrice"}>
          <div className={"pageCartItemPricePriceTitle"}>
            {getTextOrSkeleton(`$${price} USD`)}
          </div>
          <div className={"pageCartItemPricePriceDescription"}>
            + shipping, calculated at checkout
          </div>
        </div>
        <div className={"pageCartItemPriceRemove"}>
          <button onClick={removeItem} disabled={isFetching}>
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
}
