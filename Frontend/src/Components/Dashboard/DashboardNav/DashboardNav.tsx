import { Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  ShoppingCart,
  PlusCircle,
  Bell,
  BarChart3,
  Settings,
  Users,
  LogOut,
} from "lucide-react";
import Logo from "../../Logo/Logo";
import { useStoreAuth } from "../../../Store/AuthStore";
import axios from "axios";
import toast from "react-hot-toast";


export function Sidebar() {
  
  const location = useLocation()
  const navigation = useNavigate()

  const user = useStoreAuth(store => store.user)

  const avatar = user.avatar
  
  const clientLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/client' },
    { icon: ShoppingCart, label: 'Orders', path: '/dashboard/client/orders' },
    { icon: PlusCircle, label: 'New Request', path: '/dashboard/client/create-request' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ]

  const managerLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/manager' },
    { icon: ShoppingCart, label: 'Orders', path: '/dashboard/manager/orders' },
    { icon: Users, label: 'Clients', path: '/dashboard/manager/clients' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ]

  const adminLinks = [
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ]

  const links = user.role === 'admin' ? adminLinks : user.role === 'manager' ? managerLinks : clientLinks

  const logout = async () => {
    try{
      const res =await axios.post("http://localhost:5000/logout",{},{
        withCredentials:true
      })

      toast.success(res.data.message)
      navigation("/")
    }catch(e: any){
      toast.error(e.response.data.message)
    }
  }
  return (
    <div className="fixed top-0 w-64 h-screen bg-[#111113] border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">

        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl duration-500 transition-all ${isActive
                ? 'bg-linear-to-r from-[#7C3AED]/20 to-[#8B5CF6]/20 text-white border border-[#7C3AED]/30'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-2">
          {user.avatar ?
            <div className="w-10 h-10">
              <img src={avatar}
                crossOrigin="anonymous"
                alt="avatar"
                className="rounded-full" />
            </div> 
            :
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#7C3AED] to-[#3B82F6] flex items-center justify-center">
              <span className="text-sm font-semibold">JD</span>
            </div>
          }
          <div className="flex-1">
            <div className="text-sm font-medium text-white">{user.name} {user.lastName}</div>
            <div className="text-xs text-zinc-500">{user.role}</div>
          </div>
        </div>

        <button 
        onClick={logout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
