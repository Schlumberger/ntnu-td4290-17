import React from "react";
import { UlHeader } from "./elements";
import { LiHeader } from "./elements";

export default function Header({ children, className }) {
  const numbers = ['Home', 'Data', 'Storage', 'About us'].map((number) =>
    <LiHeader>{number}</LiHeader>
  )

  return (
    <UlHeader className={className}>
    { numbers }
    </UlHeader>
  );
}
