import { CDN_URL } from "../utils/constants";
import React from "react";

const RestaurantCard = (props) => {

    const { resData } = props;

    const {
        cloudinaryImageId,
        name,
        avgRating,
        cuisines,
        costForTwo,
        sla,
    } = resData?.info;

    return (
        <div className="m-4 p-4 w-[250px] bg-gray-100 rounded-lg hover:bg-gray-300">
            <img className="rounded-lg" alt="res-logo" src={CDN_URL + cloudinaryImageId} />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{costForTwo}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{sla?.slaString}</h4>
        </div>
    );

};

//Higher Order Component

//input - RestaurantCard ==> RestaurantCardWithOffer

export const withOfferLabel = (RestaurantCard) => {
    return (props) => {
        const offer = props?.resData?.info?.aggregatedDiscountInfoV3;
        return (
            <div>
                <label className="absolute bg-black text-white m-1 p-1 rounded-lg">{offer?.header}  {offer?.subHeader} </label>
                <RestaurantCard {...props} />
            </div>
        )
    }
}

export default RestaurantCard;