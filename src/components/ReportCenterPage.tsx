import React, { useState } from 'react';
import './ReportCenterPage.css';
import Panel from './Panel';
import { ReportTemplate, ScheduledReport } from '../data/types';

interface ReportCenterPageProps {
  templates: ReportTemplate[];
  scheduledReports: ScheduledReport[];
}

const ReportCenterPage: React.FC<ReportCenterPageProps> = ({ templates, scheduledReports }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(templates[0] || null);
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>([]);

  const handleTemplateClick = (template: ReportTemplate) => {
    setSelectedTemplate(template);
  };

  const handleTemplateSelect = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTemplateIds(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTemplateIds.length === templates.length) {
      setSelectedTemplateIds([]);
    } else {
      setSelectedTemplateIds(templates.map(t => t.id));
    }
  };

  const getFrequencyLabel = (freq: string) => {
    switch (freq) {
      case 'daily': return '每日';
      case 'weekly': return '每周';
      case 'monthly': return '每月';
      default: return freq;
    }
  };

  const getStatusLabel = (status: string) => {
    return status === 'active' ? '运行中' : '已暂停';
  };

  const filteredScheduledReports = selectedTemplate
    ? scheduledReports.filter(sr => sr.templateId === selectedTemplate.id)
    : scheduledReports;

  return (
    <div className="report-center-page">
      <div className="action-bar">
        <div className="action-bar-left">
          <button className="btn btn-primary">
            <span className="btn-icon">+</span>
            新建模板
          </button>
          <button className="btn btn-secondary">
            <span className="btn-icon">📤</span>
            批量导出
          </button>
          <button className="btn btn-secondary">
            <span className="btn-icon">⏰</span>
            定时推送
          </button>
        </div>
        <div className="action-bar-right">
          <button className="btn btn-icon-only" title="刷新">
            🔄
          </button>
          <button className="btn btn-icon-only" title="搜索">
            🔍
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="left-panel">
          <Panel title="报表模板" subtitle={`共 ${templates.length} 个`}>
            <div className="template-list-header">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={selectedTemplateIds.length === templates.length && templates.length > 0}
                  onChange={handleSelectAll}
                />
                <span className="checkbox-custom" />
                <span className="select-all-text">全选</span>
              </label>
            </div>
            <div className="template-list">
              {templates.map(template => (
                <div
                  key={template.id}
                  className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                  onClick={() => handleTemplateClick(template)}
                >
                  <div className="template-card-header">
                    <div className="template-checkbox" onClick={(e) => handleTemplateSelect(template.id, e)}>
                      <label className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={selectedTemplateIds.includes(template.id)}
                          onChange={() => {}}
                        />
                        <span className="checkbox-custom" />
                      </label>
                    </div>
                    <span className={`template-tag ${template.isSystem ? 'tag-system' : 'tag-custom'}`}>
                      {template.isSystem ? '系统' : '自定义'}
                    </span>
                  </div>
                  <div className="template-name">{template.name}</div>
                  <div className="template-meta">
                    <span className="meta-item">
                      <span className="meta-label">分类：</span>
                      <span className="meta-value">{template.category}</span>
                    </span>
                    <span className="meta-item">
                      <span className="meta-label">创建者：</span>
                      <span className="meta-value">{template.creator}</span>
                    </span>
                  </div>
                  <div className="template-actions">
                    <button className="action-btn" title="查看详情">查看</button>
                    <button className="action-btn" title="编辑">编辑</button>
                    <button className="action-btn action-btn-danger" title="删除">删除</button>
                    <button className="action-btn action-btn-primary" title="导出">导出</button>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="right-panel">
          <Panel title="模板详情" subtitle={selectedTemplate ? selectedTemplate.name : '请选择模板'}>
            {selectedTemplate ? (
              <div className="template-detail">
                <div className="detail-section">
                  <div className="detail-title">基本信息</div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">模板名称</span>
                      <span className="detail-value">{selectedTemplate.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">分类</span>
                      <span className="detail-value">{selectedTemplate.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">创建者</span>
                      <span className="detail-value">{selectedTemplate.creator}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">创建时间</span>
                      <span className="detail-value">{selectedTemplate.createTime}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">类型</span>
                      <span className={`template-tag ${selectedTemplate.isSystem ? 'tag-system' : 'tag-custom'}`}>
                        {selectedTemplate.isSystem ? '系统模板' : '自定义模板'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <div className="detail-title">指标维度</div>
                  <div className="detail-metrics">
                    <div className="metrics-block">
                      <div className="metrics-label">指标 ({selectedTemplate.metrics.length})</div>
                      <div className="metrics-tags">
                        {selectedTemplate.metrics.map((metric, idx) => (
                          <span key={idx} className="metric-tag metric-tag-blue">{metric}</span>
                        ))}
                      </div>
                    </div>
                    <div className="metrics-block">
                      <div className="metrics-label">维度 ({selectedTemplate.dimensions.length})</div>
                      <div className="metrics-tags">
                        {selectedTemplate.dimensions.map((dim, idx) => (
                          <span key={idx} className="metric-tag metric-tag-green">{dim}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <div className="detail-title">模板描述</div>
                  <div className="detail-description">{selectedTemplate.description}</div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <div className="empty-text">请从左侧选择一个报表模板查看详情</div>
              </div>
            )}
          </Panel>

          <Panel
            title="定时推送任务"
            subtitle={`共 ${filteredScheduledReports.length} 个任务`}
          >
            <div className="scheduled-header">
              <div className="scheduled-actions">
                <button className="btn btn-primary btn-sm">
                  <span className="btn-icon">+</span>
                  新建任务
                </button>
                <button className="btn btn-secondary btn-sm">
                  <span className="btn-icon">✏️</span>
                  编辑任务
                </button>
              </div>
            </div>
            <div className="scheduled-table-container">
              <table className="scheduled-table">
                <thead>
                  <tr>
                    <th>模板名称</th>
                    <th>频率</th>
                    <th>发送时间</th>
                    <th>收件人</th>
                    <th>格式</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScheduledReports.length > 0 ? (
                    filteredScheduledReports.map(report => (
                      <tr key={report.id}>
                        <td className="col-template">{report.templateName}</td>
                        <td className="col-frequency">{getFrequencyLabel(report.frequency)}</td>
                        <td className="col-time">{report.sendTime}</td>
                        <td className="col-recipients">
                          <div className="recipients-list">
                            {report.recipients.slice(0, 2).map((r, idx) => (
                              <span key={idx} className="recipient-tag">{r}</span>
                            ))}
                            {report.recipients.length > 2 && (
                              <span className="recipient-more">+{report.recipients.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="col-formats">
                          <div className="formats-list">
                            {report.formats.map((f, idx) => (
                              <span key={idx} className="format-tag">{f}</span>
                            ))}
                          </div>
                        </td>
                        <td className="col-status">
                          <span className={`status-badge status-${report.status}`}>
                            <span className="status-dot" />
                            {getStatusLabel(report.status)}
                          </span>
                        </td>
                        <td className="col-actions">
                          <button className="table-action-btn">编辑</button>
                          <button className="table-action-btn table-action-btn-danger">删除</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="empty-table-cell">
                        <div className="empty-state">
                          <div className="empty-icon">📭</div>
                          <div className="empty-text">暂无定时推送任务</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default ReportCenterPage;
