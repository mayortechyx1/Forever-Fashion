import { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import Title from './Title'

const LatestCollection = () => {

  const {products} = useContext(shopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(()=>{
    setLatestProducts(products.slice(0,10));
  }, []);

  return (
    <div className='my-10'>
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
      </div>
    </div>
  )
}

export default LatestCollection