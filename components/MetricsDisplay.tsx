import React from 'react';
import { AnalysisResult } from '../types';

interface Props {
  analysis: AnalysisResult;
  compact?: boolean;
}

const MetricsDisplay: React.FC<Props> = ({ analysis, compact = false }) => {
  const { metrics, cashFlow, score } = analysis;

  const scoreColors = {
    Excellent: 'bg-green-100 text-green-800 border-green-200',
    Good: 'bg-blue-100 text-blue-800 border-blue-200',
    Fair: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Poor: 'bg-red-100 text-red-800 border-red-200',
  };

  const getMetricColor = (val: number, goodThreshold: number, badThreshold: number) => {
    if (val >= goodThreshold) return 'text-green-600';
    if (val >= badThreshold) return 'text-yellow-600';
    return 'text-red-500';
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  
  const formatPercent = (val: number) => `${val.toFixed(2)}%`;

  if (compact) {
    return (
      <div className="grid grid-cols-3 gap-2 text-center mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Cash Flow</p>
          <p className={`font-bold ${getMetricColor(cashFlow.monthly, 200, 0)}`}>
            {formatCurrency(cashFlow.monthly)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">CoC Return</p>
          <p className={`font-bold ${getMetricColor(metrics.cashOnCash, 8, 4)}`}>
            {formatPercent(metrics.cashOnCash)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Cap Rate</p>
          <p className={`font-bold ${getMetricColor(metrics.capRate, 6, 4)}`}>
            {formatPercent(metrics.capRate)}
          </p>
        </div>
      </div>
    );
  }

  // Full detailed view
  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between p-4 rounded-lg border ${scoreColors[score]}`}>
        <div>
          <span className="font-bold text-lg">Investment Rating</span>
        </div>
        <div className="text-2xl font-extrabold tracking-tight">{score}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Monthly Cash Flow</p>
          <p className={`text-xl font-bold ${getMetricColor(cashFlow.monthly, 200, 0)}`}>
            {formatCurrency(cashFlow.monthly)}
          </p>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Cash-on-Cash</p>
          <p className={`text-xl font-bold ${getMetricColor(metrics.cashOnCash, 10, 5)}`}>
            {formatPercent(metrics.cashOnCash)}
          </p>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Cap Rate</p>
          <p className={`text-xl font-bold ${getMetricColor(metrics.capRate, 7, 4)}`}>
            {formatPercent(metrics.capRate)}
          </p>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Cash Needed</p>
          <p className="text-xl font-bold text-gray-800">
            {formatCurrency(metrics.totalCashNeeded)}
          </p>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-700">Projections (ROI)</h3>
        </div>
        <div className="grid grid-cols-3 divide-x divide-gray-100">
          <div className="p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">1 Year</p>
            <p className="font-semibold text-brand-600">{formatPercent(analysis.projections.year1TotalROI)}</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">5 Year</p>
            <p className="font-semibold text-brand-600">{formatPercent(analysis.projections.year5TotalROI)}</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">10 Year</p>
            <p className="font-semibold text-brand-600">{formatPercent(analysis.projections.year10TotalROI)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;