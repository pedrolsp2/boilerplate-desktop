import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
    return (
        <div className="w-full h-screen">
            <Outlet />
        </div>
    )
}

export default PublicLayout
