import React from "react";

import { Divider } from "@mui/material";

import { Header } from "./Header";
import { StyledCard, StyledCardHeader } from "./styles";

type Props = {
  title: string;
  totalItems: number;
  children: React.ReactNode;
};

export function Card({ title, totalItems, children }: Props) {
  return (
    <StyledCard>
      <StyledCardHeader
        title={<Header title={title} totalItems={totalItems} />}
      />

      <Divider />

      {children}
    </StyledCard>
  );
}
