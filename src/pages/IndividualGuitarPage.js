import { Carousel } from "react-responsive-carousel";
import "../css/IndividualGuitarPage.scss";
import { useState } from "react";
import Button from "../components/Button";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividualGuitar } from "../axiosAPI";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import GuitarPlaceholder from "../guitar_placeholder.jpeg";

function IndividualGuitarPage() {
  const { id } = useParams();

  const { data, isFetching, error } = useQuery({
    queryKey: ["individualGuitar", { id }],
    queryFn: () => fetchIndividualGuitar({ id }),
  });

  const [activeTab, setActiveTab] = useState(0);

  if (error) return <div>Something went wrong, please try again later</div>;

  const { description, name, price, mediaUrl } = data?.data ?? {};

  const addActivePrefix = (num) => (num === activeTab ? " active" : "");

  const addItemToCart = () => {
    if (isFetching) return;

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) ?? [];
    if (!cartItems.includes(id)) {
      cartItems = [...cartItems, id];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      toast.success("Item added to your cart");
    }
  };

  const getTextOrSkeleton = (text, width) =>
    isFetching ? <Skeleton style={{ flex: 1, width }} /> : text;

  return (
    <div className="GuitarPage container">
      <div className={"GuitarPageLeft"}>
        <Carousel
          swipeable
          emulateTouch
          infiniteLoop
          showStatus={false}
          className={"GuitarPageLeftCarousel"}
        >
          {isFetching ? (
            <Skeleton className={"GuitarPageLeftCarouselImg fetching"} />
          ) : mediaUrl.length > 0 ? (
            mediaUrl.map((pageUrl, i) => (
              <img
                key={i}
                src={pageUrl}
                alt={"guitar"}
                className="GuitarPageLeftCarouselImg"
              />
            ))
          ) : (
            [
              <img
                src={GuitarPlaceholder}
                alt={"guitar"}
                className="GuitarPageLeftCarouselImg"
              />,
            ]
          )}
        </Carousel>
        <div className={"GuitarPageLeftInfo"}>
          <div className={"GuitarPageLeftInfoHeaderContainer"}>
            <div className={"GuitarPageLeftInfoHeader"}>
              <div
                onClick={() => setActiveTab(0)}
                className={"GuitarPageLeftInfoHeaderTab" + addActivePrefix(0)}
              >
                Spec
              </div>
              <div
                onClick={() => setActiveTab(1)}
                className={"GuitarPageLeftInfoHeaderTab" + addActivePrefix(1)}
              >
                Description
              </div>
            </div>
          </div>
          <div className={"GuitarPageLeftInfoContent"}>
            {isFetching ? (
              <Skeleton height={400} style={{ flex: 1 }} />
            ) : activeTab === 0 ? (
              <GuitarDetails data={data?.data ?? {}} />
            ) : (
              description
            )}
          </div>
        </div>
      </div>
      <div className={"GuitarPageRight"}>
        <div className={"GuitarPageRightInfo"}>
          <h1 className={"GuitarPageRightInfoTitle"}>
            {getTextOrSkeleton(name)}
          </h1>
          <div className={"GuitarPageRightInfoPrice"}>
            {getTextOrSkeleton(price + "$")}
          </div>
        </div>
        <div className={"GuitarPageRightCheckout"}>
          <Button
            onClick={addItemToCart}
            className={"GuitarPageRightCheckoutButton"}
            disabled={isFetching}
          >
            <span>Add to Card</span>
          </Button>
        </div>
        <div className={"GuitarPageRightPerks"}>
          <div className={"GuitarPageRightPerksInner"}>
            <div>24 hour return policy</div>
            <div>2 day delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualGuitarPage;

const GuitarDetails = ({
  data: {
    seller,
    handedness,
    year,
    length,
    width,
    height,
    weight,
    volume,
    type,
    brand,
  },
}) => {
  return (
    <div className="guitarDetails">
      <ul className="guitarDetailsList">
        {seller && (
          <li>
            <span>Seller: </span>
            {seller}
          </li>
        )}
        {year && (
          <li>
            <span>Year: </span>
            {year}
          </li>
        )}
        {brand && (
          <li>
            <span>Brand: </span>
            {brand}
          </li>
        )}
        {type && (
          <li>
            <span>Type: </span>
            {type}
          </li>
        )}
        {volume && (
          <li>
            <span>Volume: </span>
            {volume}
          </li>
        )}
        {weight && (
          <li>
            <span>Weight: </span>
            {weight}
          </li>
        )}
        {handedness && (
          <li>
            <span>Handedness: </span>
            {handedness}
          </li>
        )}
        {length && (
          <li>
            <span>Length: </span>
            {length}
          </li>
        )}
        {width && (
          <li>
            <span>Width: </span>
            {width}
          </li>
        )}
        {height && (
          <li>
            <span>Height: </span>
            {height}
          </li>
        )}
      </ul>
    </div>
  );
};
