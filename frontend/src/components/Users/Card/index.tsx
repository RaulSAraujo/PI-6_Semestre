import React from "react";

import { Divider } from "@mui/material";

import { Header } from "./Header";
import { StyledCard, StyledCardHeader } from "./styles";

type Props = {
  totalItems: number;
  children: React.ReactNode;
};

export function Card({ totalItems, children }: Props) {
  return (
    <StyledCard>
      <StyledCardHeader title={<Header totalItems={totalItems} />} />

      <Divider />

      {children}
    </StyledCard>
  );
}
