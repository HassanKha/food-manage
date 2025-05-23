import React from 'react'
import Header from '../Shared/Header'
import logo from "../../assets/header.png";

export default function Dashboard() {
  return (
    <div><Header imgPath={logo} title={"Welcome Upskilling"} description={"This is a welcoming screen for the entry of the application , you can now see the options"}/></div>
  )
}
