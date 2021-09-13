// import * as BiIcons from "react-icons/bi";
//import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";
// import * as FcIcons from "react-icons/fc";
import * as FaIcons from "react-icons/fa";
// import * as VscIcons from "react-icons/vsc";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <FaIcons.FaTasks />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpen: <RiIcons.RiArrowUpSFill />,
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
    title: "Task",
    path: "/workview",
    icon: <IoIcons.IoMdPersonAdd />,
  },
  {
    title: "Debt",
    path: "/debt",
    icon: <GiIcons.GiPayMoney />,
  },
  {
    title: "Merchant",
    path: "/merchant",
    icon: <IoIcons.IoMdRestaurant />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpen: <RiIcons.RiArrowUpSFill />,
    subNav: [
      // {
      //   title: "Search",
      //   path: "/merchant-search",
      //   icon: <FcIcons.FcSearch />,
      // },
      // {
      //   title: "Feedback",
      //   path: "/merchant-review",
      //   icon: <VscIcons.VscOpenPreview />,
      // },
    ],
  },
  {
    title: "Employee",
    path: "/employee",
    icon: <IoIcons.IoMdPersonAdd />,
  },
  {
    title: "Banner",
    path: "/banner",
    icon: <BsIcons.BsCardImage />,
  },
  {
    title: "Boo Merchant Map",
    path: "/location",
    icon: <RiIcons.RiRoadMapFill />,
  },
];
