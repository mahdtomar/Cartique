import { UserContext } from "@/common/context/UserProvider"
import type { Role, User } from "@/types/User"
import { useContext, useState } from "react"
import { useNavigate, Outlet } from "react-router-dom"

const ProtectedRoutes = ({ roles }: { roles: Role[] }) => {
    const user = useContext(UserContext)?.user

    if (!roles) {
        return <Outlet />
    }
    return (
        <div>
            {roles.includes(user.role) ? <Outlet /> : <div> unauthorized entry</div>}
        </div>
    )
}

export default ProtectedRoutes