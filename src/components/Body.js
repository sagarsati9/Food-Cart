import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { withOfferLabel } from "./RestaurantCard";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    const [searchText, setSearchText] = useState("");

    //higher order component
    const RestaurantCardOffer = withOfferLabel(RestaurantCard);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        console.log(json);
        console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    };

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) return <h1>Oops looks like you are offline!! Please check your internet connection;</h1>


    if (listOfRestaurants.length === 0) return (<Shimmer />);
    return (
        <div className="body">
            <div className="filter flex">
                <div className="m-4 p-4">
                    <input type="text" className=" border border-solid border-black" value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}></input>
                    <button className="px-4 py-1 bg-green-100 m-4 rounded-lg" onClick={() => {
                        //Filter the restaurant cards and update UI
                        const filteredRestaurant = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                        setFilteredRestaurants(filteredRestaurant);
                    }}>Search</button>
                </div>
                <div className="m-4 p-4 flex items-center">
                    <button className="px-4 py-1 m-4 bg-gray-100 rounded-lg" onClick={() => {
                        const filteredList = listOfRestaurants?.filter(
                            (res) => res.info.avgRating > 4
                        );
                        setFilteredRestaurants(filteredList);
                    }}>Top Rated Restaurants</button>
                </div>
            </div>
            <div className="flex flex-wrap">
                {filteredRestaurants.map((res) => {
                      const {aggregatedDiscountInfoV3}= res?.info;
                    return (
                        <Link key={res?.info?.id} to={"/restaurants/" + res?.info?.id}>
                            {
                                /**if the restaurant has offer then add offer label to it
                               (i.e return higher order component) else return the normal card  */
                             
                               Object.keys(aggregatedDiscountInfoV3).length !==0 ? (<RestaurantCardOffer resData={res}/>) :( <RestaurantCard resData={res} />)

                            }
                        </Link>)
                })}
            </div>
        </div>

    );
};

export default Body;