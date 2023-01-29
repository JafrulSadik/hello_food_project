import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsBagCheck } from "react-icons/bs";
import { MdOutlineTask } from "react-icons/md";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

export const sidebarItems = [
  {
    title: "Home",
    icon: <AiOutlineHome />,
    path: "/admin",
  },
  {
    title: "Products",
    icon: <BsBagCheck />,
    path: "/admin/products",
  },
  {
    title: "Users",
    icon: <AiOutlineUser />,
    path: "/admin/users",
  },
  {
    title: "Orders",
    icon: <MdOutlineTask />,
    path: "/admin/orders",
  },
  {
    title: "Categories",
    icon: <BiCategory />,
    path: "/admin/categories",
  },
  {
    title: "Sliders",
    icon: <TfiLayoutSliderAlt />,
    path: "/admin/sliders",
  },
];
