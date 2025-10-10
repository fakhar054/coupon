import React from 'react'
import './MobileAddsStore.css'
import SingleCardComponent from './SingleCardComponent'
import SecondCardComponent from './SecondCardComponent'
import SimilarStores from './SimilarStores'

function MobileAddsStore({ storepageBannerTwo, storepageBannerOne, featureStoreNames, simlarcoupons }) {
  return (
    <div>
      <div className="singleCardMobile">
      <SingleCardComponent storepageBannerTwo={storepageBannerTwo}/>
      </div>

      <div className="secondCardMobile">
      <SecondCardComponent storepageBannerOne={storepageBannerOne} />
      </div>

      <div className="similarStoresMobile">
      <SimilarStores featureStoreNames={featureStoreNames} simlarcoupons={simlarcoupons}/>
      </div>


    </div>
  )
}



export default MobileAddsStore;