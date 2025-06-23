/* eslint-disable react/prop-types */
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  export default function Location({stats = []}) {
    const cityCount = stats.reduce((acc, item) => {
      if (acc[item.city]) {
        acc[item.city] += 1;
      } else {
        acc[item.city] = 1;
      }
      return acc;
    }, {});
  
    const cities = Object.entries(cityCount).map(([city, count]) => ({
      city,
      count,
    }));
  
    return (
      <div style={{width: "100%", height: 300}}>
        <ResponsiveContainer>
          <AreaChart 
            width={700} 
            height={300} 
            data={cities.slice(0, 100)}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip labelStyle={{color: "green"}} />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="#82ca9d" 
              fill="url(#colorCount)"
              fillOpacity={1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
  