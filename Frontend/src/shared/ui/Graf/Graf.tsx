import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

const data = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 60 },
  { month: "May", value: 55 },
  { month: "Jun", value: 68 },
  { month: "Jul", value: 72 },
  { month: "Aug", value: 69 },
  { month: "Sep", value: 78 },
  { month: "Oct", value: 85 },
  { month: "Nov", value: 82 },
  { month: "Dec", value: 92 },
]

export function Graf() {
  return (
    <div className="w-full h-60">
      <AreaChart data={data} width="100%" height="100%">
        <defs>
          <linearGradient id="purpleFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#1f1f1f" />
        <XAxis dataKey="month" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#111",
            border: "1px solid #2a2a2a",
            borderRadius: "10px",
            color: "#fff",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#a855f7"
          strokeWidth={2}
          fill="url(#purpleFill)"
        />
      </AreaChart>
    </div>
  )
}
