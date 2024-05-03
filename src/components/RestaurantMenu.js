import React, { useState } from 'react';
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenu = () => {

    const { resId } = useParams();

    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(null);

    if (resInfo === null) return (<Shimmer />);

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;
    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;


    //filter all categories of items
    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) =>
            c.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    // console.log(categories);




    return (
        <div className='text-center'>
            <h1 className='font-bold my-6 text-2xl'>{name}</h1>
            <p className='font-bold text-lg'>{cuisines.join(", ")} -  {costForTwoMessage}</p>
            {/* categories accordions */}

            {categories.map((category, index) => (
                // RestaurantCategory is a controlled component, it is controlled by RestaurantMenu coz it is 
                // sending showItems props according to which accordion will expand and collapse in menu
                <RestaurantCategory key={category?.card?.card?.title}
                    data={category?.card?.card}
                    showItems={index === showIndex ? true : false}
                    setShowIndex={() => setShowIndex(index)}
                />
            )
            )}

        </div>
    );
};

export default RestaurantMenu;