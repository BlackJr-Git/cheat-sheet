"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToolType, getToolsType, getCategoryType } from "@/types";
import { BellAlertIcon, BellSlashIcon } from "@heroicons/react/24/outline";
import { read } from "fs";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const notifications = [
  {
    id: 1,
    title: "Your account has been suspended.",
    description: "Please contact support.",
    icon: BellAlertIcon,
    href: "#",
    status: "suspended",
    date: "4d ago",
    datetime: "2022-01-01",
    read: false,
  },
  {
    id: 2,
    title: "You received a new notification.",
    description: "Please contact support.",
    icon: BellAlertIcon,
    href: "#",
    status: "new",
    date: "4d ago",
    datetime: "2022-01-01",
    read: false,
  },
  {
    id: 3,
    title: "Your account has been suspended.",
    description: "Please contact support.",
    icon: BellSlashIcon,
    href: "#",
    status: "suspended",
    date: "4d ago",
    datetime: "2022-01-01",
    read: true,
  },
  {
    id: 4,
    title: "Your account has been suspended.",
    description: "Please contact support.",
    icon: BellAlertIcon,
    href: "#",
    status: "suspended",
    date: "4d ago",
    datetime: "2022-01-01",
    read: false,
  },
  {
    id: 5,
    title: "Your account has been suspended.",
    description: "Please contact support.",
    icon: BellAlertIcon,
    href: "#",
    status: "suspended",
    date: "4d ago",
    datetime: "2022-01-01",
    read: false,
  },
];

export default function Page() {
  const [data, setData] = useState({} as getToolsType);
  const [categoriesData, setCategoriesData] = useState({} as getCategoryType);

  useEffect(() => {
    async function getTools() {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/tools?number=1&pages=1&orderby=asc`
        );
        setData(data);
        return data.tools;
      } catch (error) {
        console.log(error);
        return {};
      }
    }
    getTools();
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/category?number=12&pages=1`
        );
        setCategoriesData(data);
        return data.tools;
      } catch (error) {
        console.log(error);
        return {};
      }
    }
    getCategories();
  }, []);

  return (
    <div className="w-full bg-slate-100 h-[70vh] rounded-2xl p-4 flex gap-4">
      <div className="w-3/4">
        <div className="flex gap-4">
          <div className="w-1/3 bg-violet-500 rounded-xl p-4 text-white">
            <p className="font-semibold text-xl">Total Tools</p>
            <p className="text-2xl">{data?.totalTools}</p>
          </div>
          <div className="w-1/3 bg-violet-500 rounded-xl p-4 text-white">
            <p className="font-semibold text-xl">Total Categories</p>
            <p className="text-2xl">{categoriesData?.totalCategories}</p>
          </div>
          <div className="w-1/3 bg-violet-500 rounded-xl p-4 text-white">
            <p className="font-semibold text-xl">Total Site visited</p>
            <p className="text-2xl">{categoriesData?.totalCategories}</p>
          </div>
        </div>
      </div>

      <div className="bg-white w-1/4 rounded-2xl p-4 flex flex-col">
        <h2 className="font-semibold text-xl flex items-center gap-2 mb-8 border-b border-slate-200 px-4 py-2">
          <BellAlertIcon className="w-6 h-6" /> Notifications
        </h2>

        <div className="overflow-y-scroll scrollbar-hide">
          {notifications ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-center gap-4 p-4 border-b ${
                  notification.read ? "text-slate-400" : "text-green-500"
                } border-slate-200 hover:bg-violet-100 rounded-lg cursor-pointer`}
              >
                <div className="w-1/12">
                  <notification.icon className="w-6 h-6" />
                </div>
                <div className="w-11/12">
                  <p className="font-semibold">{notification.title}</p>
                  {/* <p className="text-slate-500">{notification.description}</p> */}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center grow">
              <p className="text-slate-500 flex items-center gap-2">
                {" "}
                <BellSlashIcon className="w-6 h-6" /> No notifications
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
