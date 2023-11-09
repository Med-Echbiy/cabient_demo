"use client";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { nanoid } from "nanoid";

const menuItems = [
  { id: 1, label: "Appointments", icon: BsFillCalendarWeekFill, link: "/" },
  { id: 2, label: "Clients", icon: AiOutlineUser, link: "/clients" },
  { id: 3, label: "Statics", icon: IoStatsChartSharp, link: "/reports" },
  { id: 4, label: "Doctors", icon: FaUserDoctor, link: "/doctors" },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(true);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === window.location.pathname),
    []
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-blue-950 text-white flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu: {
    id?: any;
    label?: string;
    link?: string;
  }) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu && activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              Logo
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <RxHamburgerMenu size={26} />
            </button>
          )}
        </div>
        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes} key={nanoid(10)}>
                <Link href={menu.link}>
                  <p className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: "2.5rem" }}>
                      <Icon size={26} />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
