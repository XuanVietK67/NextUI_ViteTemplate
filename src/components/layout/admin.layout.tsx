import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import DefaultLayout from "@/layouts/default";
import React from "react";
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    MailOutlined,
    ShopOutlined,
    TeamOutlined,
    TruckFilled,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { AiFillAliwangwang } from "react-icons/ai";
import { PiStudentThin } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { useNavigate } from "react-router";
import { Link } from "@nextui-org/react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row h-screen w-screen">
            <div className="h-100% bg-slate-700 w-1/6">
                <div className="font-bold text-lg h-12 pl-4 flex fle-row gap-3 items-center border-b-1 border-neutral-600">
                    <AiFillAliwangwang color={"white"} size={30} />
                    <Link href="/home" className="text-white">
                        Xuan Viet
                    </Link>
                </div>


                <div className="flex flex-row items-center p-3 gap-3 text-white">
                    <PiStudentThin />
                    <Link href={"dashboard/student/viewall"} className="text-slate-50">Student Table</Link>
                </div>


                <div className="flex flex-row items-center p-3 gap-3 text-white">
                    <GiTeacher />
                    <Link href={"dashboard/teacher/viewall"} className="text-slate-50">Teacher Table</Link>
                </div>
            </div>

            <div className="flex flex-col w-5/6">
                <div className="h-12">
                    {/* xuanviet */}
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
