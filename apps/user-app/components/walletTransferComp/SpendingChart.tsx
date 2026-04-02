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
                <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                    <p className="text-xs font-semibold text-muted-foreground">{payload[0].payload.day}</p>
                    <p className="text-sm font-bold text-primary">${payload[0].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div >
            <h3 className="text-base font-semibold text-foreground mb-2">Balance Trend</h3>
            <p className="text-sm text-muted-foreground mb-6">Last 7 days</p>

            <ResponsiveContainer width="100%" height={70}>
                <LineChart data={balanceData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <defs>
                        <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.01} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis
                        dataKey="day"
                        stroke="var(--color-muted-foreground)"
                        style={{ fontSize: '10px', fontWeight: 500 }}
                    />
                    <YAxis
                        stroke="var(--color-muted-foreground)"
                        style={{ fontSize: '10px' }}
                        domain={['dataMin - 1000', 'dataMax + 1000']}
                    />
                    <Tooltip content={<CustomBalanceTooltip />} cursor={{ stroke: 'var(--color-border)' }} />
                    <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="var(--color-primary)"
                        strokeWidth={1}
                        dot={{ fill: 'var(--color-primary)', r: 4, strokeWidth: 2, stroke: 'var(--color-card)' }}
                        activeDot={{ r: 3 }}
                        isAnimationActive={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
