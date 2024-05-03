import React, { useState } from 'react'
import ItemList from './ItemList';

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {

const[expand, setExpand] = useState(0);


  const handleClick = () => {
    setShowIndex();
    setExpand(!expand);
  };

  return (
    <div>
      <div className='mx-auto my-4 w-6/12 bg-gray-50 shadow-lg p-4 '>
        <div className='flex justify-between cursor-pointer' onClick={handleClick}>
          <span className='font-bold text-lg'>{data.title} ({data?.itemCards?.length})</span>
          <span >⬇️</span>
        </div>
        {showItems && expand && <ItemList items={data?.itemCards} />}
      </div>
    </div>
  )
}

export default RestaurantCategory;