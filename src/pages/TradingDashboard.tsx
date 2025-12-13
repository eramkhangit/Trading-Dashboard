import  { useState, useEffect } from 'react';
import {  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Generate mock trading data
const generatePriceData = () => {
  const data = [];
  let price = 45000;
  for (let i = 0; i < 50; i++) {
    price += (Math.random() - 0.5) * 1000;
    data.push({
      time: `${i}h`,
      price: Math.round(price),
      volume: Math.round(Math.random() * 1000000)
    });
  }
  return data;
};

const generateCandlestickData = () => {
  const data = [];
  let price = 45000;
  for (let i = 0; i < 20; i++) {
    const open = price;
    const close = price + (Math.random() - 0.5) * 2000;
    const high = Math.max(open, close) + Math.random() * 500;
    const low = Math.min(open, close) - Math.random() * 500;
    data.push({
      time: `${i}:00`,
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close),
      volume: Math.round(Math.random() * 1000000)
    });
    price = close;
  }
  return data;
};

const TradingDashboard = () => {
  const [priceData, setPriceData] = useState(generatePriceData());
  const [candlestickData, setCandlestickData] = useState(generateCandlestickData());
  const [selectedAsset, setSelectedAsset] = useState('BTC/USD');
  const [timeframe, setTimeframe] = useState('1H');

  const assets = [
    { name: 'BTC/USD', price: 45234.56, change: 2.34, changePercent: 5.45 },
    { name: 'ETH/USD', price: 2845.23, change: -12.45, changePercent: -0.44 },
    { name: 'SOL/USD', price: 98.76, change: 3.21, changePercent: 3.36 },
    { name: 'AAPL', price: 182.45, change: 1.23, changePercent: 0.68 }
  ];

  const stats = [
    { label: 'Portfolio Value', value: '$124,563.45', change: '+2.34%', positive: true, icon: DollarSign },
    { label: '24h Volume', value: '$45.2M', change: '+12.5%', positive: true, icon: Activity },
    { label: 'Total Trades', value: '1,245', change: '+8.2%', positive: true, icon: BarChart3 },
    { label: 'Win Rate', value: '68.5%', change: '-1.2%', positive: false, icon: TrendingUp }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg">
          <p className="text-gray-300 text-sm">{payload[0].payload.time}</p>
          <p className="text-green-400 font-semibold">${payload[0].value?.toLocaleString()}</p>
          {payload[0].payload.volume && (
            <p className="text-gray-400 text-xs">Vol: {(payload[0].payload.volume / 1000000).toFixed(2)}M</p>
          )}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPriceData(prev => {
        const newData = [...prev];
        const lastPrice = newData[newData.length - 1].price;
        const newPrice = lastPrice + (Math.random() - 0.5) * 500;
        newData.push({
          time: `${newData.length}h`,
          price: Math.round(newPrice),
          volume: Math.round(Math.random() * 1000000)
        });
        return newData.slice(-50);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Trading Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Real-time market analytics</p>
          </div>
          <div className="flex gap-3">
            {['1H', '4H', '1D', '1W'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-5 hover:bg-gray-800/70 transition-all">
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-gray-700/50 rounded-lg">
                  <stat.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">{selectedAsset}</h2>
              <p className="text-gray-400 text-sm">Price Chart</p>
            </div>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {assets.map((asset) => (
                <option key={asset.name} value={asset.name}>{asset.name}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={priceData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="price" stroke="#3b82f6" fill="url(#colorPrice)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volume Chart */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">Trading Volume</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={candlestickData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="volume" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Asset Performance */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">Market Overview</h3>
            <div className="space-y-4">
              {assets.map((asset) => (
                <div key={asset.name} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all cursor-pointer">
                  <div>
                    <div className="font-semibold">{asset.name}</div>
                    <div className="text-gray-400 text-sm">${asset.price.toLocaleString()}</div>
                  </div>
                  <div className={`flex items-center gap-2 ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {asset.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <div className="text-right">
                      <div className="font-semibold">{asset.change >= 0 ? '+' : ''}{asset.change}</div>
                      <div className="text-sm">{asset.changePercent >= 0 ? '+' : ''}{asset.changePercent}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingDashboard;