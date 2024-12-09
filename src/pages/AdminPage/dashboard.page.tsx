import AdminLayout from "@/components/layout/admin.layout"
import { useAuthStore } from "@/store/AuthStore"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const DashboardPage = () => {
    const { user, access_Token } = useAuthStore()
    const navigate = useNavigate()
    useEffect(() => {
        if (!access_Token) {
            navigate('/login')
        }
    })
    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    )
}

export default DashboardPage