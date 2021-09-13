// import * as BiIcons from "react-icons/bi";
//import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as FcIcons from "react-icons/fc";
import * as FaIcons from "react-icons/fa";
// import * as VscIcons from "react-icons/vsc";
import * as GiIcons from "react-icons/gi";

export const SidebarData = [
  {
    title: "Tổng Quan",
    path: "/",
    icon: <FaIcons.FaTasks />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpen: <RiIcons.RiArrowUpSFill />,
    disable: false,
    // subNav: [
    //   {
    //     title: "Dashboard",
    //     path: "/",
    //   },
    //   {
    //     title: "Analytics",
    //     path: "/analytics",
    //   },
    // ],
  },
  {
    title: "Cửa Hàng",
    path: "/merchant",
    icon: <IoIcons.IoMdHome />,
    disable: false,
  },
  {
    title: "Đơn Đặt Hàng",
    path: "/merchant-order",
    icon: <FaIcons.FaMoneyBillWave />,
    disable: false,
  },
  {
    title: "Món Ăn",
    path: "/food",
    icon: <IoIcons.IoMdRestaurant />,
    disable: false,
  },
  {
    title: "Thực Đơn",
    path: "/menu",
    icon: <GiIcons.GiBookmark />,
    disable: false,
  },
  {
    title: "Attributes",
    path: "/merchant-attribute",
    icon: <BsIcons.BsTagFill />,
  },
  {
    title: "Toppings",
    path: "/merchant-topping",
    icon: <IoIcons.IoIosIceCream />,
    disable: false,
  },

  {
    title: "Phản Hồi",
    path: "/merchant-feedback",
    icon: <FcIcons.FcFeedback />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpen: <RiIcons.RiArrowUpSFill />,
    disable: false,
  },
];
