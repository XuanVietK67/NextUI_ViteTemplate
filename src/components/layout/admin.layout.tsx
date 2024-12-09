import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import DefaultLayout from "@/layouts/default";
import { Link } from "@nextui-org/link";
import React from "react";
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    MailOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { AiFillAliwangwang } from "react-icons/ai";
import { PiStudentThin } from "react-icons/pi";

// const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
    {
        key: "grp",
        label: (
            <div className="font-bold text-lg flex fle-row gap-3 items-center">
                <AiFillAliwangwang className="text-title" />
                <Link href="/home" className="text-title">
                    Xuan Viet
                </Link>
            </div>
        ),
        type: "group",
        children: [
            {
                key: "dashboard",
                label: <Link href={"dashboard"}>Dashboard</Link>,
                icon: <AppstoreOutlined />,
            },
            {
                key: "product",
                label: <Link href={"dashboard/product/viewall"}>Product Table</Link>,
                icon: <MdProductionQuantityLimits size={20} />,
            },
            {
                key: "user",
                label: <Link href={"dashboard/user/viewall"}>User Table</Link>,
                icon: <FaRegUser size={20} />,
            },
        ],
    },
];

const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    background: "#001529",
};

const itemss: MenuProps["items"] = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // <Layout hasSider>
        //     <Sider style={siderStyle} collapsed={false} defaultCollapsed={false} className="bg-title">
        //         <div className="demo-logo-vertical" />
        //         <Menu
        //             theme="dark"
        //             mode="inline"
        //             defaultSelectedKeys={["dashboard"]}
        //             items={items}
        //         />
        //     </Sider>
        //     <Layout style={{ marginInlineStart: 200 }}>
        //         <Header style={{ padding: 0, background: "white" }} />
        //         <Content style={{ overflow: "initial", background: "white" }}>
        //             {children}
        //         </Content>
        //     </Layout>
        // </Layout>
        <div className="flex flex-row h-screen w-full">
            <div className="h-100% bg-slate-700 w-56">
                <div className="font-bold text-lg flex fle-row gap-3 items-center p-3">
                    <AiFillAliwangwang color={"white"} size={30} />
                    <Link href="/home" className="text-white">
                        Xuan Viet
                    </Link>
                </div>

                <hr className="bg-gray-700"/>

                <div className="flex flex-row items-center p-3 gap-3 text-white">
                    <PiStudentThin />
                    <Link href={"dashboard/product/viewall"} className="text-slate-50">Student Table</Link>
                </div>


                <div className="flex flex-row items-center p-3 gap-3 text-white">
                    <PiStudentThin />
                    <Link href={"dashboard/product/viewall"} className="text-slate-50">Teacher Table</Link>
                </div>
            </div>

            <div>

            </div>
        </div>
    );
}
