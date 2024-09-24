import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Products } from "../../libs/types";

export const fetchProducts = createAsyncThunk(
  "api/v1/products",
  async ({ offset, limit }: { offset: number; limit: number }) => {
    const response = await axios<Products[]>(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
    );

    return response.data;
  }
);
