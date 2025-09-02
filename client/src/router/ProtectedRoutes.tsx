import { UserContext } from "@/common/context/UserProvider"
import type { Role, User } from "@/types/User"
import { useContext, useState } from "react"
import { useNavigate, Outlet } from "react-router-dom"

const ProtectedRoutes = ({ roles }: { roles: Role[] }) => {
    const user = useContext(UserContext)?.user
    if (!user) {
        return <div> unauthorized entry</div>
    }
    if (!roles) {
        return <Outlet />
    }
    return (
        <div>
            {roles.includes(user.role as Role) ? <Outlet /> : <div> unauthorized entry</div>}
        </div>
    )
}

export default ProtectedRoutes