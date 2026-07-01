'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Market data
const MARKETS = [
  { symbol: 'WIF', name: 'dogwifhat', price: 2.847, change: 12.4, volume: 847000000, funding: 0.0124 },
  { symbol: 'BONK', name: 'Bonk', price: 0.00002847, change: -5.2, volume: 234000000, funding: -0.0087 },
  { symbol: 'POPCAT', name: 'Popcat', price: 0.847, change: 8.7, volume: 124000000, funding: 0.0056 },
  { symbol: 'MEW', name: 'cat in a dogs world', price: 0.00847, change: 24.5, volume: 98000000, funding: 0.0234 },
  { symbol: 'BOME', name: 'BOOK OF MEME', price: 0.00984, change: -2.1, volume: 76000000, funding: -0.0012 },
  { symbol: 'MYRO', name: 'Myro', price: 0.1247, change: 15.8, volume: 45000000, funding: 0.0089 },
  { symbol: 'SLERF', name: 'SLERF', price: 0.2847, change: -8.4, volume: 32000000, funding: -0.0145 },
  { symbol: 'PONKE', name: 'PONKE', price: 0.4521, change: 6.2, volume: 28000000, funding: 0.0034 },
];

// Mini chart component
function MiniChart({ positive }: { positive: boolean }) {
  const [points, setPoints] = useState<number[]>([]);
  
  useEffect(() => {
    const data = Array(20).fill(0).map((_, i) => {
      const trend = positive ? i * 0.5 : -i * 0.3;
      return 50 + trend + (Math.random() - 0.5) * 20;
    });
    setPoints(data);
  }, [positive]);

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * 5} ${100 - p}`).join(' ');

  return (
    <svg viewBox="0 0 100 100" className="w-16 h-8" preserveAspectRatio="none">
      <path d={pathD} fill="none" stroke={positive ? '#00ff88' : '#ff4444'} strokeWidth="2" />
    </svg>
  );
}

// Order book component
function OrderBook() {
  const asks = [
    { price: 2.892, size: 12847, total: 37142 },
    { price: 2.887, size: 8421, total: 24295 },
    { price: 2.882, size: 5874, total: 15874 },
    { price: 2.877, size: 4521, total: 10000 },
    { price: 2.872, size: 2847, total: 5479 },
    { price: 2.867, size: 1584, total: 2632 },
    { price: 2.862, size: 1048, total: 1048 },
  ];
  
  const bids = [
    { price: 2.847, size: 15421, total: 15421 },
    { price: 2.842, size: 8745, total: 24166 },
    { price: 2.837, size: 6521, total: 30687 },
    { price: 2.832, size: 4874, total: 35561 },
    { price: 2.827, size: 3521, total: 39082 },
    { price: 2.822, size: 2147, total: 41229 },
    { price: 2.817, size: 1874, total: 43103 },
  ];

  const maxTotal = Math.max(...asks.map(a => a.total), ...bids.map(b => b.total));

  return (
    <div className="text-xs font-mono">
      <div className="grid grid-cols-3 text-[#666] mb-2 px-2">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Total</span>
      </div>
      <div className="space-y-[2px]">
        {asks.reverse().map((ask, i) => (
          <div key={i} className="grid grid-cols-3 px-2 py-[2px] relative">
            <div className="absolute right-0 top-0 bottom-0 bg-[#ff4444]/10" style={{ width: `${(ask.total / maxTotal) * 100}%` }} />
            <span className="text-[#ff4444] relative z-10">{ask.price.toFixed(3)}</span>
            <span className="text-right relative z-10">{ask.size.toLocaleString()}</span>
            <span className="text-right text-[#666] relative z-10">{ask.total.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="text-center py-2 text-lg font-semibold text-white">
        2.847 <span className="text-[#00ff88] text-xs ml-1">+12.4%</span>
      </div>
      <div className="space-y-[2px]">
        {bids.map((bid, i) => (
          <div key={i} className="grid grid-cols-3 px-2 py-[2px] relative">
            <div className="absolute left-0 top-0 bottom-0 bg-[#00ff88]/10" style={{ width: `${(bid.total / maxTotal) * 100}%` }} />
            <span className="text-[#00ff88] relative z-10">{bid.price.toFixed(3)}</span>
            <span className="text-right relative z-10">{bid.size.toLocaleString()}</span>
            <span className="text-right text-[#666] relative z-10">{bid.total.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Trading panel
function TradingPanel() {
  const [side, setSide] = useState<'long' | 'short'>('long');
  const [leverage, setLeverage] = useState(10);
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [amount, setAmount] = useState('');

  return (
    <div className="space-y-4">
      {/* Side toggle */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-[#0a0a0a] rounded-lg">
        <button
          onClick={() => setSide('long')}
          className={`py-3 rounded-md font-semibold transition ${
            side === 'long' ? 'bg-[#00ff88] text-black' : 'text-[#666] hover:text-white'
          }`}
        >
          Long
        </button>
        <button
          onClick={() => setSide('short')}
          className={`py-3 rounded-md font-semibold transition ${
            side === 'short' ? 'bg-[#ff4444] text-white' : 'text-[#666] hover:text-white'
          }`}
        >
          Short
        </button>
      </div>

      {/* Order type */}
      <div className="flex gap-4 text-sm">
        <button
          onClick={() => setOrderType('market')}
          className={orderType === 'market' ? 'text-white' : 'text-[#666]'}
        >
          Market
        </button>
        <button
          onClick={() => setOrderType('limit')}
          className={orderType === 'limit' ? 'text-white' : 'text-[#666]'}
        >
          Limit
        </button>
      </div>

      {/* Amount input */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#666]">Amount</span>
          <span className="text-[#666]">Available: 1,000 USDC</span>
        </div>
        <div className="relative">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-4 py-3 text-lg font-mono focus:outline-none focus:border-[#5eead4]"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666]">USDC</span>
        </div>
      </div>

      {/* Quick amounts */}
      <div className="grid grid-cols-4 gap-2">
        {['25%', '50%', '75%', '100%'].map(pct => (
          <button key={pct} className="py-2 bg-[#0a0a0a] rounded text-sm text-[#666] hover:text-white hover:bg-[#1a1a1a] transition">
            {pct}
          </button>
        ))}
      </div>

      {/* Leverage slider */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#666]">Leverage</span>
          <span className="text-[#5eead4] font-mono">{leverage}x</span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          value={leverage}
          onChange={(e) => setLeverage(Number(e.target.value))}
          className="w-full accent-[#5eead4]"
        />
        <div className="flex justify-between text-xs text-[#666] mt-1">
          <span>1x</span>
          <span>10x</span>
          <span>25x</span>
          <span>50x</span>
        </div>
      </div>

      {/* Order summary */}
      <div className="bg-[#0a0a0a] rounded-lg p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#666]">Entry Price</span>
          <span className="font-mono">$2.847</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#666]">Liquidation Price</span>
          <span className="font-mono text-[#ff4444]">$2.421</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#666]">Fees</span>
          <span className="font-mono">0.05%</span>
        </div>
      </div>

      {/* Submit button */}
      <button className={`w-full py-4 rounded-lg font-semibold text-lg transition ${
        side === 'long' 
          ? 'bg-[#00ff88] text-black hover:bg-[#00ff88]/90' 
          : 'bg-[#ff4444] text-white hover:bg-[#ff4444]/90'
      }`}>
        {side === 'long' ? 'Long' : 'Short'} WIF-PERP
      </button>
    </div>
  );
}

// Chart placeholder
function ChartArea() {
  return (
    <div className="h-full bg-[#0a0a0a] rounded-lg flex items-center justify-center relative overflow-hidden">
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-[#333]" style={{ top: `${i * 10}%` }} />
        ))}
        {[...Array(10)].map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-[#333]" style={{ left: `${i * 10}%` }} />
        ))}
      </div>
      
      {/* Fake candlesticks */}
      <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[...Array(30)].map((_, i) => {
          const x = (i / 30) * 100;
          const height = 10 + Math.random() * 30;
          const y = 30 + Math.random() * 30;
          const isGreen = Math.random() > 0.4;
          return (
            <g key={i}>
              <line x1={x + 1} y1={y - 5} x2={x + 1} y2={y + height + 5} stroke={isGreen ? '#00ff88' : '#ff4444'} strokeWidth="0.3" />
              <rect x={x} y={y} width="2" height={height} fill={isGreen ? '#00ff88' : '#ff4444'} />
            </g>
          );
        })}
      </svg>
      
      <div className="relative z-10 text-center">
        <div className="text-6xl font-bold text-white mb-2">$2.847</div>
        <div className="text-2xl text-[#00ff88]">+12.4%</div>
      </div>
    </div>
  );
}

// Risk modal
function RiskModal({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl max-w-lg w-full p-8 slide-up">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="FABLELIQUID" width={80} height={80} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Risk Disclosure</h2>
        <div className="text-[#888] text-sm space-y-4 mb-8">
          <p>Fableliquid is experimental software. Trading perpetual futures involves substantial risk of loss including loss of your entire deposit.</p>
          <p>By continuing you confirm:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>You are not a US person as defined by applicable law</li>
            <li>You are legally permitted to use this service in your jurisdiction</li>
            <li>You understand smart contracts may contain bugs</li>
            <li>You understand the oracle may fail or be manipulated</li>
            <li>You accept all risks associated with experimental DeFi software</li>
          </ul>
          <p className="font-semibold text-white">This is not financial advice.</p>
        </div>
        <button
          onClick={onAccept}
          className="w-full py-4 bg-[#5eead4] text-black font-semibold rounded-xl hover:bg-[#5eead4]/90 transition"
        >
          I Understand, Continue
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [showRisk, setShowRisk] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState(MARKETS[0]);
  const [markets, setMarkets] = useState(MARKETS);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(prev => prev.map(m => ({
        ...m,
        price: m.price * (1 + (Math.random() - 0.5) * 0.01),
        change: m.change + (Math.random() - 0.5) * 0.5,
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (showRisk) {
    return <RiskModal onAccept={() => setShowRisk(false)} />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-[#1a1a1a]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="FABLELIQUID" width={32} height={32} />
              <span className="text-xl font-bold tracking-tight">FABLELIQUID</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="text-white">Trade</a>
              <a href="#" className="text-[#666] hover:text-white">Portfolio</a>
              <a href="#" className="text-[#666] hover:text-white">Leaderboard</a>
              <a href="#" className="text-[#666] hover:text-white">Docs</a>
            </nav>
          </div>
          <button className="px-5 py-2 bg-[#5eead4] text-black font-semibold rounded-lg hover:bg-[#5eead4]/90 transition pulse-glow">
            Connect Wallet
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-57px)] overflow-hidden">
        {/* Markets sidebar */}
        <aside className="w-72 border-r border-[#1a1a1a] overflow-y-auto">
          <div className="p-4">
            <input
              type="text"
              placeholder="Search markets..."
              className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#5eead4]"
            />
          </div>
          <div className="text-xs text-[#666] px-4 pb-2 flex justify-between">
            <span>Market</span>
            <span>Price / 24h</span>
          </div>
          {markets.map(market => (
            <button
              key={market.symbol}
              onClick={() => setSelectedMarket(market)}
              className={`w-full px-4 py-3 flex items-center justify-between hover:bg-[#0a0a0a] transition ${
                selectedMarket.symbol === market.symbol ? 'bg-[#0a0a0a] border-l-2 border-[#5eead4]' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xs font-bold">
                  {market.symbol.slice(0, 2)}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{market.symbol}-PERP</div>
                  <div className="text-xs text-[#666]">{market.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm">${market.price < 0.01 ? market.price.toFixed(8) : market.price.toFixed(3)}</div>
                <div className={`text-xs ${market.change >= 0 ? 'text-[#00ff88]' : 'text-[#ff4444]'}`}>
                  {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)}%
                </div>
              </div>
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Market info bar */}
          <div className="border-b border-[#1a1a1a] px-6 py-3 flex items-center gap-8">
            <div>
              <div className="text-2xl font-bold">{selectedMarket.symbol}-PERP</div>
              <div className="text-sm text-[#666]">{selectedMarket.name}</div>
            </div>
            <div>
              <div className="text-sm text-[#666]">Mark Price</div>
              <div className="font-mono text-lg">${selectedMarket.price < 0.01 ? selectedMarket.price.toFixed(8) : selectedMarket.price.toFixed(3)}</div>
            </div>
            <div>
              <div className="text-sm text-[#666]">24h Change</div>
              <div className={`font-mono text-lg ${selectedMarket.change >= 0 ? 'text-[#00ff88]' : 'text-[#ff4444]'}`}>
                {selectedMarket.change >= 0 ? '+' : ''}{selectedMarket.change.toFixed(2)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-[#666]">24h Volume</div>
              <div className="font-mono text-lg">${(selectedMarket.volume / 1000000).toFixed(1)}M</div>
            </div>
            <div>
              <div className="text-sm text-[#666]">Funding Rate</div>
              <div className={`font-mono text-lg ${selectedMarket.funding >= 0 ? 'text-[#00ff88]' : 'text-[#ff4444]'}`}>
                {selectedMarket.funding >= 0 ? '+' : ''}{(selectedMarket.funding * 100).toFixed(4)}%
              </div>
            </div>
          </div>

          {/* Chart and trading */}
          <div className="flex-1 flex overflow-hidden">
            {/* Chart and positions */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Chart */}
              <div className="h-[350px] p-4">
                <ChartArea />
              </div>
              
              {/* Positions / Recent trades */}
              <div className="flex-1 border-t border-[#1a1a1a] p-4 overflow-y-auto">
                <div className="flex gap-6 text-sm mb-4">
                  <button className="text-white font-semibold">Positions (0)</button>
                  <button className="text-[#666]">Open Orders (0)</button>
                  <button className="text-[#666]">Trade History</button>
                </div>
                <div className="text-center py-12 text-[#666]">
                  <div className="text-4xl mb-2">📊</div>
                  <p>No open positions</p>
                  <p className="text-sm mt-1">Connect wallet to start trading</p>
                </div>
              </div>
            </div>

            {/* Order book and trading panel */}
            <div className="w-96 border-l border-[#1a1a1a] flex flex-col overflow-y-auto">
              {/* Order book */}
              <div className="p-4 border-b border-[#1a1a1a]">
                <div className="text-sm font-semibold mb-4">Order Book</div>
                <OrderBook />
              </div>

              {/* Trading panel */}
              <div className="p-4">
                <TradingPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
