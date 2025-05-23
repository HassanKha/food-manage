import React from 'react'
import logo from "../../assets/nodata.png";

export default function NoData() {
  return (
    <div className='text-center'>
      <img src={logo} alt="No Data" className='w-100' />
      <h4>no data!</h4>
    </div>
  )
}
