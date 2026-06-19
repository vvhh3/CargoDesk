import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Star,
} from "lucide-react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: 'Jan', revenue: 45000, orders: 320, profit: 12000 },
  { month: 'Feb', revenue: 52000, orders: 380, profit: 15000 },
  { month: 'Mar', revenue: 48000, orders: 350, profit: 13500 },
  { month: 'Apr', revenue: 61000, orders: 420, profit: 18000 },
  { month: 'May', revenue: 55000, orders: 390, profit: 16500 },
  { month: 'Jun', revenue: 67000, orders: 460, profit: 20000 },
  { month: 'Jul', revenue: 72000, orders: 510, profit: 22500 },
  { month: 'Aug', revenue: 68000, orders: 480, profit: 21000 },
  { month: 'Sep', revenue: 78000, orders: 550, profit: 24000 },
  { month: 'Oct', revenue: 85000, orders: 600, profit: 27000 },
  { month: 'Nov', revenue: 82000, orders: 580, profit: 26000 },
  { month: 'Dec', revenue: 92000, orders: 650, profit: 30000 },
];

const categoryData = [
  { name: 'Electronics', value: 45, color: '#7C3AED' },
  { name: 'Fashion', value: 25, color: '#3B82F6' },
  { name: 'Home & Garden', value: 15, color: '#22C55E' },
  { name: 'Sports', value: 10, color: '#F59E0B' },
  { name: 'Other', value: 5, color: '#EF4444' },
];

const managerPerformance = [
  { name: 'Sarah Johnson', orders: 145, rating: 4.9, revenue: 285000, avatar: 'SJ' },
  { name: 'Michael Chen', orders: 132, rating: 4.8, revenue: 268000, avatar: 'MC' },
  { name: 'Emma Wilson', orders: 128, rating: 4.7, revenue: 255000, avatar: 'EW' },
  { name: 'James Brown', orders: 115, rating: 4.6, revenue: 242000, avatar: 'JB' },
  { name: 'Lisa Garcia', orders: 108, rating: 4.5, revenue: 230000, avatar: 'LG' },
];

const stats = [
  {
    label: 'Total Revenue',
    value: '$892K',
    change: '+18.2%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-[#22C55E] to-[#16A34A]',
    chartData: [45, 52, 48, 61, 55, 67, 72, 68, 78, 85, 82, 92],
  },
  {
    label: 'Total Orders',
    value: '5,690',
    change: '+12.5%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'from-[#7C3AED] to-[#8B5CF6]',
    chartData: [320, 380, 350, 420, 390, 460, 510, 480, 550, 600, 580, 650],
  },
  {
    label: 'Active Users',
    value: '2,847',
    change: '+8.7%',
    trend: 'up',
    icon: Users,
    color: 'from-[#3B82F6] to-[#2563EB]',
    chartData: [180, 195, 188, 210, 205, 225, 240, 235, 255, 270, 265, 285],
  },
  {
    label: 'Avg. Order Value',
    value: '$157',
    change: '-2.3%',
    trend: 'down',
    icon: TrendingUp,
    color: 'from-[#F59E0B] to-[#D97706]',
    chartData: [165, 158, 162, 155, 160, 157, 152, 159, 156, 154, 158, 157],
  },
];

const recentActivity = [
  { action: 'New order #ORD-2890 placed', user: 'John Doe', amount: '$1,299', time: '2 min ago' },
  { action: 'Payment received', user: 'Sarah Johnson', amount: '$2,499', time: '5 min ago' },
  { action: 'Order #ORD-2889 delivered', user: 'Mike Brown', amount: '$599', time: '8 min ago' },
  { action: 'New user registered', user: 'Emma Davis', amount: '-', time: '12 min ago' },
  { action: 'Refund processed', user: 'Lisa Wilson', amount: '$349', time: '15 min ago' },
];
const  DashboardAdmin = () => {
  return (
    <div className="flex h-screen bg-[#09090B] text-white overflow-hidden">

      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="flex-1 overflow-y-auto p-8">
          {/* Top Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="relative group">
                <div className={`absolute -inset-0.5 bg-linear-to-r ${stat.color} rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                <div className="relative p-6 rounded-2xl bg-[#111113] border border-white/10 backdrop-blur-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      <span className="text-xs font-medium">{stat.change}</span>
                    </div>
                  </div>

                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-zinc-400 mb-4">{stat.label}</div>

                  {/* Mini Chart */}
                  <div className="h-12 flex items-end gap-1">
                    {stat.chartData.map((value, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t bg-linear-to-t ${stat.color} opacity-60`}
                        style={{ height: `${(value / Math.max(...stat.chartData)) * 100}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="col-span-2 p-6 rounded-2xl bg-[#111113] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Revenue Overview</h3>
                  <p className="text-sm text-zinc-400">Monthly revenue and profit trends</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] text-sm">
                    Revenue
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-zinc-400">
                    Profit
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-zinc-400">
                    Orders
                  </button>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#71717a" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181B',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="profit" stroke="#22C55E" strokeWidth={2} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="p-6 rounded-2xl bg-[#111113] border border-white/10 backdrop-blur-xl">
              <h3 className="text-lg font-semibold mb-1">Category Distribution</h3>
              <p className="text-sm text-zinc-400 mb-6">Orders by category</p>

              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181B',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-2 mt-6">
                {categoryData.map((category, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="text-sm text-zinc-300">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Manager Performance */}
            <div className="col-span-2 p-6 rounded-2xl bg-[#111113] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Top Performing Managers</h3>
                  <p className="text-sm text-zinc-400">Based on orders and revenue</p>
                </div>
                <button className="text-sm text-[#7C3AED] hover:text-[#8B5CF6] transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {managerPerformance.map((manager, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-1 text-zinc-500 font-medium min-w-6">
                      {i === 0 && <span className="text-xl">🥇</span>}
                      {i === 1 && <span className="text-xl">🥈</span>}
                      {i === 2 && <span className="text-xl">🥉</span>}
                      {i > 2 && <span className="text-sm">#{i + 1}</span>}
                    </div>

                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#7C3AED] to-[#3B82F6] flex items-center justify-center">
                      <span className="text-sm font-semibold">{manager.avatar}</span>
                    </div>

                    <div className="flex-1">
                      <div className="font-medium mb-1">{manager.name}</div>
                      <div className="flex items-center gap-1 text-xs text-zinc-400">
                        <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                        <span>{manager.rating}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-medium text-zinc-400 mb-1">Revenue</div>
                      <div className="font-semibold">${(manager.revenue / 1000).toFixed(0)}K</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-medium text-zinc-400 mb-1">Orders</div>
                      <div className="font-semibold">{manager.orders}</div>
                    </div>

                    <div className="w-24 h-12">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={Array.from({ length: 7 }, (_) => ({ value: Math.random() * 50 + 50 }))}>
                          <Line type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-2xl bg-[#111113] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Live Activity</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div>
                  <span className="text-xs text-zinc-400">Live</span>
                </div>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-[#7C3AED] mt-2 shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white mb-1">{activity.action}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-500">{activity.user}</span>
                        {activity.amount !== '-' && (
                          <span className="text-xs font-medium text-[#22C55E]">{activity.amount}</span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-600">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm text-zinc-400 hover:text-white">
                View All Activity
              </button>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: 'Conversion Rate', value: '3.2%', icon: TrendingUp, change: '+0.5%', trend: 'up' },
              { label: 'Avg. Response Time', value: '2.4h', icon: Clock, change: '-15%', trend: 'up' },
              { label: 'Customer Satisfaction', value: '4.8', icon: Star, change: '+0.2', trend: 'up' },
              { label: 'Pending Orders', value: '127', icon: Package, change: '+12', trend: 'up' },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#111113] border border-white/10 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#22C55E]">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashboardAdmin