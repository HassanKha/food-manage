import React from 'react'
import logo from "../../assets/nodata.png";

export default function NoData() {
  return (
    <div className='text-center  mx-auto
     d-flex flex-column justify-content-center align-items-center'>
      <img src={logo} alt="No Data" className='w-25 m-auto' />
      <h4>No Data !</h4>
    </div>
  )
}
