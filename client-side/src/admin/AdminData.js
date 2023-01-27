import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { BsBagCheck } from 'react-icons/bs'
import { MdOutlineTask } from 'react-icons/md'
import { BiCategory } from 'react-icons/bi'
import { TfiLayoutSliderAlt } from 'react-icons/tfi'

export const sidebarItems = [
    {
        title: 'Home',
        icon: <AiOutlineHome />,
        path: '/admin'
    },
    {
        title: 'Products',
        icon: <BsBagCheck />,
        path: '/admin/products'
    },
    {
        title: 'Users',
        icon: <AiOutlineUser />,
        path: '/admin/users'
    },
    {
        title: 'Orders',
        icon: <MdOutlineTask />,
        path: '/admin/orders'
    },
    {
        title: 'Category',
        icon: <BiCategory />,
        path: '/admin/category'
    },
    {
        title: 'Slider',
        icon: <TfiLayoutSliderAlt />,
        path: '/admin/slider'
    },
]