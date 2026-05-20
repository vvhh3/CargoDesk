import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

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
];

export default function Graf () {
    return (
        <div className="w-full h-60">
            {/* контейнер графика */}
            <AreaChart data={data} width="100%" height="100%">

                {/* закрашивание фона */}
                {/* SVG-блок для заранее объявленных эффектов, которые потом можно использовать. */}
                <defs>
                    {/* Градиент (плавный переход цвета), который потом используется как заливка области. */}
                    <linearGradient id="purpleFill" x1="0" y1="0" x2="0" y2="1">
                        {/* Первая точка градиента (верх) */}
                        <stop offset="0%" stopColor="#a855f7" stopOpacity={0.35} />
                        {/* конец градиента */}
                        <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                </defs>

                {/* Фоновые линии (как в Excel графиках) */}
                <CartesianGrid stroke='#1f1f1f' />
                {/* Горизонтальная ось (время, месяцы и т.д.) */}
                <XAxis dataKey="month" stroke="#6b7280" />
                {/* Вертикальная ось (значения) */}
                <YAxis stroke="#6b7280" />

                {/* Окно, которое появляется при наведении */}
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#111',
                        border: "1px solid #2a2a2a",
                        borderRadius: "10px",
                        color: "#fff",
                    }}
                />

                {/* сам график */}
                <Area
                    type="monotone" // тип кривой. Другие варианты: linear, step
                    dataKey="value" // откуда брать данные (value)
                    stroke="#a855f7"
                    strokeWidth={2}
                    fill="url(#purpleFill)" //использует градиент из <defs>
                />
            </AreaChart>
        </div>
    )
}
