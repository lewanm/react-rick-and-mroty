import React from "react";
import { Pagination, Stack } from "@mui/material";
import "./styles.css";

type PaginationProps = {
  totalPost: number;
  postPerPage: number;
  prevPage: (event: React.MouseEvent<HTMLButtonElement>) => void;
  nextPage: (event: React.MouseEvent<HTMLButtonElement>) => void;
  paginate: (page: number) => void;
};

export default function Pagination1(props: PaginationProps) {
  const { totalPost, postPerPage, prevPage, nextPage, paginate } = props;
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Stack spacing={2}>
      <Pagination count={10} shape="rounded" />
    </Stack>
  );
}
