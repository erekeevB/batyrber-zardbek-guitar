import "../css/GuitarItem.scss";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function GuitarItem({ photoUrl, id, title, price, brand, isFetching }) {
  const navigate = useNavigate();
  const onClick = () => !isFetching && navigate("/item/" + id);
  const getTextOrSkeleton = (text, width) =>
    isFetching ? <Skeleton style={{ flex: 1, width }} /> : text;

  return (
    <div className="guitarItem" onClick={onClick}>
      <div className="guitarItemUpper">
        {isFetching ? (
          <Skeleton className="guitarItemUpperImage" />
        ) : (
          <div className="guitarItemUpperImage">
            <img src={photoUrl} height="140px" alt={"guitar"} />
          </div>
        )}
        <div className="guitarItemUpperButton">{getTextOrSkeleton("View")}</div>
      </div>
      <div className="guitarItemLower">
        <div className="guitarItemLowerTitle">{getTextOrSkeleton(title)}</div>
        <div className="guitarItemLowerBottom">
          <div className="guitarItemLowerPriceLabel">Price</div>
          <div className="guitarItemLowerPriceValue">
            {getTextOrSkeleton("$" + price)}
          </div>
          <div className="guitarItemLowerBrand">
            {getTextOrSkeleton(brand, 50)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuitarItem;
