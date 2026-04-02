'use client';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const SpendingChart = () => {
    const balanceData = [
        { day: 'Mon', balance: 22000 },
        { day: 'Tue', balance: 23100 },
        { day: 'Wed', balance: 24200 },
        { day: 'Thu', balance: 23800 },
        { day: 'Fri', balance: 24500 },
        { day: 'Sat', balance: 25200 },
        { day: 'Sun', balance: 24580 },
    ];

    const CustomBalanceTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className=" border border-border rounded-lg p-3  bg-white shadow-lg">
                    <p className="text-xs text-muted-foreground">{payload[0].payload.day}</p>
                    <p className="text-xs font-bold text-primary">${payload[0].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div >
            <h3 className="text-base font-semibold text-foreground ">Balance Trend</h3>
            <p className="text-sm text-muted-foreground mb-2">Last 7 days</p>

            <ResponsiveContainer width="100%" height={135} className={"mb-0"}>
                <LineChart data={balanceData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                    <defs>
                        <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#393bfe" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#393bfe" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                        dataKey="day"
                        stroke="#6b7280"
                        style={{ fontSize: '10px', fontWeight: 500 }}
                    />
                    <YAxis
                        stroke="#6b7280"
                        style={{ fontSize: '10px' }}
                        domain={['dataMin - 1000', 'dataMax + 1000']}
                        tickMargin={10}
                        width={40}
                    />
                    <Tooltip content={<CustomBalanceTooltip />} cursor={{ stroke: 'var(--color-border)' }} />
                    <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="#393bfe"
                        strokeWidth={2}
                        fill="url(#balanceGradient)"
                        dot={{ fill: '#393bfe', r: 3, strokeWidth: 2, stroke: '#ffffff' }}
                        activeDot={{ r: 3 }}
                        isAnimationActive={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
