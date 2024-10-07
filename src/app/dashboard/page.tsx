"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToolType, getToolsType } from "@/types";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function page() {
  const [data, setData] = useState({} as getToolsType);

  useEffect(() => {
    async function getTools() {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/tools?number=1&pages=1&orderby=asc`
        );
        setData(data);
        console.log(data);
        return data.tools;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    getTools();
  }, []);

  return (
    <div className="w-full bg-blue-500 h-[70vh] rounded-2xl p-4">
      <div className="flex gap-4">
        <div className="w-1/3 bg-green-500 rounded-xl p-4">
          <p className="font-semibold text-xl">Total Tools</p>
          <p className="text-2xl">{data?.totalTools}</p>
        </div>
        <div className="w-1/3 bg-green-500 rounded-xl p-4">
          <p className="font-semibold text-xl">Total Categories</p>
          <p className="text-2xl">107</p>
        </div>
      </div>
    </div>
  );
}
