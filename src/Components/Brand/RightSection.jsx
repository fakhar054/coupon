import React from "react";
import BrandInfo from "./BrandInfo";
import ContainerList from "./ContainerList";
import CouponType from "./CouponType";
import "./styles.css";

const RightSection = ({
  selectedType,
  handleRadioChange,
  containerTest,
  containers,
  storeName,
  storedescription,
  bannerImage,
  storecoupons,
  popupModal,
  simlarcoupons,
  totalReviews,
  averageRating,
  storeData,
}) => {

  const countContainers = (type) => {
    return containerTest.filter((container) => container.highlight == type).length;
  };
  return (
    <section className="right-section">
      <BrandInfo 
      storeName={storeName} 
      storedescription={storedescription}
      bannerImage={bannerImage} 
      totalReviews={totalReviews}
      averageRating={averageRating}
      />
      <CouponType
        selectedType={selectedType}
        handleRadioChange={handleRadioChange}
        counts={{
          all: containerTest.length,
          featured: countContainers(1),
          verified: countContainers(2),
          exclusive: countContainers(3),
          voucher: countContainers(4),
          deals: countContainers(5),
        }}
      />
      <ContainerList
        containers={containers}
        storeName={storeName}
        storecoupons={storecoupons}
        bannerImage={bannerImage}
        popupModal={popupModal}
        simlarcoupons={simlarcoupons}
        storeData={storeData}
      />
    </section>
  );
};

export default RightSection;
