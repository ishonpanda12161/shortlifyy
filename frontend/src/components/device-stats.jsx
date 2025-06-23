/* eslint-disable react/prop-types */
import {PieChart, Pie, Cell, ResponsiveContainer} from "recharts";
const COLORS = ["#FCD34D", "#F59E0B", "#D97706", "#B45309", "#92400E", "#78350F"];


export default function App({stats}) {
  const deviceCount = stats.reduce((acc, item) => {
    if (!acc[item.device]) {
      acc[item.device] = 0;
    }
    acc[item.device]++;
    return acc;
  }, {});

  const result = Object.keys(deviceCount).map((device) => ({
    device,
    count: deviceCount[device],
  }));

  return (
    <div style={{width: "100%", height: 400}}>
      <ResponsiveContainer>
        <PieChart width={800} height={500}>
          <Pie
            data={result}
            dataKey="count"
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="70%"
            outerRadius={140}
            innerRadius={0}
            labelLine={false}
            label={({device, percent}) =>
              `${device}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {result.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#ffffff"
                strokeWidth={2}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
