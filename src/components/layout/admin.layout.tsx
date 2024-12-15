import React from "react";
import { AiFillAliwangwang } from "react-icons/ai";
import { Avatar, Input, Link } from "@nextui-org/react";
import { CiSettings } from "react-icons/ci";
import {
    MdOutlineContactSupport,
    MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FaUserCog } from "react-icons/fa";
import { useAuthStore } from "@/store/AuthStore";
import { useLocation, useParams } from "react-router-dom";
import { SearchIcon } from "@/components/layout/icons";
import { BiSolidBellRing } from "react-icons/bi";
import { TbSwitchVertical } from "react-icons/tb";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, access_Token } = useAuthStore();
    const location = useLocation();

    console.log("check user: ", user)
    console.log("check user: ", user)
    return (
        <div className="flex flex-row h-screen w-screen overflow-x-hidden">
            <div className="h-screen bg-sidebar flex flex-col justify-between fixed z-10">
                <div className="h-100% bg-sidebar w-1/8">
                    <div className="font-bold text-lg h-12 pl-4 flex fle-row gap-3 items-center border-b-1 border-special-gray">
                        <AiFillAliwangwang color={"white"} size={30} />
                        <Link href="/home" className="text-white">
                            Xuan Viet
                        </Link>
                    </div>

                    <div
                        className={`flex flex-row items-center p-2 gap-3 text-title  mx-2 my-2 ${location.pathname == "/dashboard/teacher/viewall" ? "bg-active rounded-md" : ""}`}
                    >
                        <MdOutlineProductionQuantityLimits />
                        <Link href={"dashboard/teacher/viewall"} className="text-title">
                            {
                                user?.role == "admin" ? "Teacher Table" : "All Test"
                            }
                        </Link>
                    </div>

                    <div
                        className={`flex flex-row items-center p-2 gap-3 text-title mx-2 my-2 ${location.pathname == "/dashboard/student/viewall" ? "bg-active  rounded-md" : ""}`}
                    >
                        <FaRegUser />
                        <Link href={"dashboard/student/viewall"} className="text-title">
                            Student Table
                        </Link>
                    </div>
                </div>

                <div className="mb-5 flex flex-col gap-3">
                    <div className="flex flex-col gap-1 text-title pb-3 border-b-1 border-special-gray">
                        <div className="flex flex-row gap-3 items-center ml-3 text-md">
                            <CiSettings />
                            <p>Setting</p>
                        </div>
                        <div className="flex flex-row gap-3 items-center ml-3 text-md">
                            <FaUserCog />
                            <p>User Management</p>
                        </div>
                        <div className="flex flex-row gap-3 items-center ml-3 text-md">
                            <MdOutlineContactSupport />
                            <p>Help and support</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-2 justify-between">
                        <div className="flex flex-row items-center ml-3 gap-2">
                            <Avatar src={user?.image} size="md" />
                            <div className="flex flex-col">
                                <p className="text-sm text-slate-50	">{user?.username}</p>
                                <p className="text-green-100 text-sm">{user?.role}</p>
                            </div>
                        </div>

                        <TbSwitchVertical color={"white"} className="mr-5" />
                    </div>
                </div>
            </div>
            <div className="h-screen w-1/7"></div>
            <div className="flex flex-col w-10/12 gap-1">
                <div className="h-8 bg-background flex flex-row justify-between items-center font-semibold">
                    <p className="ml-3">Clients</p>
                    <div className="flex w-1/4 h-4/5 flex-row gap-3">
                        <div className="flex flex-row w-full items-center justify-center">
                            <Input
                                placeholder="search..."
                                size="sm"
                                classNames={{
                                    label: "text-white",
                                    // input: ["bg-white"],
                                    base: "bg-white",
                                    inputWrapper: "bg-white",
                                }}
                                // className="bg-white"
                                startContent={
                                    <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                                }
                            />
                        </div>
                        <div className="flex flex-col justify-center mr-3 p-2 bg-white rounded-md">
                            <BiSolidBellRing size={20} className="text-ring" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3 border-b-1 pb-3 border-special-gray">
                    <div className="flex flex-col ml-3 mt-1">
                        <div className="flex flex-row items-center gap-1 font-bold">
                            <FaRegUser />
                            <p>5</p>
                        </div>
                        <div className="font-normal">New clients(this week)</div>
                    </div>
                    <div className="flex flex-col ml-3 mt-1">
                        <div className="flex flex-row items-center gap-1 font-bold">
                            <FaRegUser />
                            <p>12</p>
                        </div>
                        <div className="font-normal">New clients(this month)</div>
                    </div>
                </div>
                <div className="">{children}</div>
            </div>
        </div>
    );
}
