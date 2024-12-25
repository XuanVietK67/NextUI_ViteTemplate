import DefaultLayout from "@/layouts/default";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";


export default function IndexPage() {


  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}





