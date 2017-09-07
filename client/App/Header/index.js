import React from "react";
import {
  UlHeader,
  WrapperHeader,
  LiHeader,
  WrapperImg
} from "./elements";




export default function Header({ children, className }) {
  const numbers = ['Home', 'Data', 'Storage', 'About us'].map((number) =>
    <LiHeader>{number}</LiHeader>
  )

  return (
    < WrapperHeader className={className}>
        < WrapperImg className={className}>
          <img src ="https://protrain.hs.llnwd.net/e2/sitefiles/10178/Templates/145/schlumberger-logo.png" height="50px"/>
        < /WrapperImg>
    <UlHeader className={className}>
    { numbers }
    </UlHeader>
  </WrapperHeader>
  );
}
