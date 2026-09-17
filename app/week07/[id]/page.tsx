import Link from "next/link";
import { shops } from "../components/shopitem";
import Loading from "../components/Loading";
import { Suspense } from "react";
// import { useState, useEffect } from "react";

export default async function ShopDetail({ params }) {
  const { id } = await params;

  // const shop = shops.find(
  //   item => item.id === Number(id)
  // );

  // const [shop, setShop] = useState({});

  // useEffect(()=>{
  //   const fetchData = async () => {
  //       try{
  //       const resData = await fetch(`http://localhost:8000/${id}`);
  //       if(resData.ok) {
  //         const resShop = await resData.json();
  //         setShop(resShop);
  //       } else {
  //         throw new Error(`Network response was not ok.`);
  //     }
  //       } catch (error) {
  //         console.log(`Error fetching data: ${error}`);
  //       }
  //     }
  //       fetchData();
  // },[shop]);
  let shops = {};

  try {
    const resData = await fetch(`http://localhost:8000/shops/${id}`);
    if (!resData.ok) {
      throw new Error(`Network response was not ok.`);
    }
    shops = await resData.json();
    console.log(shops);
  } catch (error) {
    console.log(`Error fetching data: ${error}`);
  }


  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="w-xl mx-auto p-6">
          <h1 className="text-3xl font-bold">
            Shop Detail
          </h1>

          <div
            key={shops.shopId}
            className="border rounded-lg p-4 m-4"
          >
            <p className="mt-4 font-semibold">
              ID: {shops?.shopId}
            </p>
             <p className="mt-4 font-semibold">
              Name: {shops?.shopName}
            </p>
            <p className="my-4">
              Type: {shops?.shopType}
            </p>
             <p className="mt-4 font-semibold">
              Location Lat = {shops?.shopLoc?.lat} Lon = {shops?.shopLoc?.lon} 
            </p>
            <p className="my-4">
              Open Status:{" "}
              <span className={shops?.shopStatus ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                {shops?.shopStatus ? "true" : "false"}
              </span>
            </p>
          </div>

          <Link
            href="/week07"
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >Back</Link>

        </div>
      </Suspense>
    </>
  );
}