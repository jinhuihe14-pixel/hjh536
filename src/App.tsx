import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Panel from './components/Panel';
import KpiCard from './components/KpiCard';
import RevenueTrendChart from './components/RevenueTrendChart';
import RoomTypeChart from './components/RoomTypeChart';
import ChannelChart from './components/ChannelChart';
import CustomerChart from './components/CustomerChart';
import ChurnChart from './components/ChurnChart';
import CostChart from './components/CostChart';
import StoreRanking from './components/StoreRanking';
import AlertList from './components/AlertList';
import StoreMap from './components/StoreMap';
import StoreDetailModal from './components/StoreDetailModal';
import NavTabs, { TabKey } from './components/NavTabs';
import MemberBenefitPage from './components/MemberBenefitPage';
import ChannelPricePage from './components/ChannelPricePage';
import EnergyAnalysisPage from './components/EnergyAnalysisPage';
import ReportCenterPage from './components/ReportCenterPage';
import PermissionPage from './components/PermissionPage';
import { mockDashboardData } from './data/mockData';
import { StoreInfo, StoreProfit } from './data/types';

function DashboardView() {
  const data = mockDashboardData;
  const [selectedStore, setSelectedStore] = useState<StoreInfo | null>(null);

  const formatRevenue = (val: number) => {
    if (val >= 10000) {
      return (val / 10000).toFixed(1) + '万';
    }
    return val.toLocaleString();
  };

  const handleStoreClick = (store: StoreInfo | StoreProfit) => {
    if ('city' in store) {
      setSelectedStore(store);
    } else {
      const fullStore = data.stores.find(s => s.name === store.name);
      if (fullStore) {
        setSelectedStore(fullStore);
      }
    }
  };

  return (
    <>
      <div className="dashboard-body">
        <div className="dashboard-left">
          <Panel title="收益管理" subtitle="近30天趋势">
            <div className="chart-container">
              <RevenueTrendChart data={data.revenueTrend} />
            </div>
          </Panel>

          <Panel title="房型分析">
            <div className="chart-container">
              <RoomTypeChart data={data.roomTypes} />
            </div>
          </Panel>

          <Panel title="渠道分析" subtitle="全渠道营收占比">
            <div className="chart-container">
              <ChannelChart data={data.channels} />
            </div>
          </Panel>
        </div>

        <div className="dashboard-center">
          <div className="kpi-row">
            <KpiCard
              title="平均出租率"
              value={data.kpi.occupancy.toFixed(1)}
              unit="%"
              trend={data.kpi.occupancyYoY}
              colorScheme="blue"
            />
            <KpiCard
              title="平均房价 ADR"
              value={data.kpi.adr.toFixed(0)}
              unit="元"
              trend={data.kpi.adrYoY}
              colorScheme="green"
            />
            <KpiCard
              title="每间可售房收入 RevPAR"
              value={data.kpi.revpar.toFixed(0)}
              unit="元"
              trend={data.kpi.revparYoY}
              colorScheme="orange"
            />
            <KpiCard
              title="本月总营收"
              value={formatRevenue(data.kpi.revenue)}
              unit="元"
              trend={data.kpi.revenueYoY}
              colorScheme="purple"
            />
            <KpiCard
              title="总成本"
              value={formatRevenue(data.kpi.cost)}
              unit="元"
              trend={data.kpi.costYoY}
              colorScheme="red"
            />
            <KpiCard
              title="净利润"
              value={formatRevenue(data.kpi.profit)}
              unit="元"
              trend={data.kpi.profitYoY}
              colorScheme="green"
            />
          </div>

          <div className="center-main">
            <Panel title="全国门店分布" className="map-panel">
              <StoreMap stores={data.stores} onStoreClick={handleStoreClick} />
            </Panel>

            <div className="center-bottom">
              <Panel title="门店利润率排名" className="ranking-panel">
                <StoreRanking data={data.storeProfits} onStoreClick={handleStoreClick} />
              </Panel>
              <Panel title="成本构成分析" className="cost-panel">
                <div className="chart-container">
                  <CostChart data={data.costBreakdown} />
                </div>
              </Panel>
            </div>
          </div>
        </div>

        <div className="dashboard-right">
          <Panel title="客群画像">
            <div className="chart-container customer-chart">
              <CustomerChart
                segments={data.customerSegments}
                consumptionLevels={data.consumptionLevels}
              />
            </div>
          </Panel>

          <Panel title="会员流失分析">
            <div className="chart-container">
              <ChurnChart data={data.churnData} />
            </div>
          </Panel>

          <Panel title="智能预警" subtitle="实时监控">
            <div className="alert-container">
              <AlertList data={data.alerts} />
            </div>
          </Panel>
        </div>
      </div>

      <StoreDetailModal store={selectedStore} onClose={() => setSelectedStore(null)} />
    </>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const data = mockDashboardData;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'member':
        return <MemberBenefitPage data={data.memberBenefit} />;
      case 'price':
        return <ChannelPricePage data={data.channelPrice} />;
      case 'energy':
        return <EnergyAnalysisPage data={data.energyAnalysis} />;
      case 'report':
        return (
          <div className="page-wrapper">
            <ReportCenterPage
              templates={data.reportTemplates}
              scheduledReports={data.scheduledReports}
            />
          </div>
        );
      case 'permission':
        return (
          <div className="page-wrapper">
            <PermissionPage roles={data.userRoles} />
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}

export default App;
