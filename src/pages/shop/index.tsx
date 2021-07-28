import { useRouter } from 'next/router'
import React, { useEffect } from 'react'



const ShopPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/shop/all')
  }, [])
  return (
    <>
    </>
  )
}

export default ShopPage;