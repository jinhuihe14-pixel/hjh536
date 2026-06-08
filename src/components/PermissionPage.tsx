import React, { useState, useEffect } from 'react';
import './PermissionPage.css';
import Panel from './Panel';
import { UserRole } from '../data/types';

interface PermissionPageProps {
  roles: UserRole[];
}

interface PermissionGroup {
  name: string;
  icon: string;
  permissions: string[];
}

const permissionGroups: PermissionGroup[] = [
  {
    name: '数据查看',
    icon: '📊',
    permissions: ['数据查看', '门店数据', '财务数据', '成本数据', '会员数据'],
  },
  {
    name: '数据导出',
    icon: '📥',
    permissions: ['数据导出', '批量导出', '自定义导出'],
  },
  {
    name: '报表管理',
    icon: '📈',
    permissions: ['报表管理', '自定义报表', '报表模板', '定时报表'],
  },
  {
    name: '系统设置',
    icon: '⚙️',
    permissions: ['系统设置', '参数配置', '字典管理', '日志查看'],
  },
  {
    name: '用户管理',
    icon: '👥',
    permissions: ['用户管理', '权限配置', '角色管理', '部门管理'],
  },
];

const roleColorMap: Record<string, { primary: string; light: string; bg: string }> = {
  admin: { primary: '#b388ff', light: 'rgba(179, 136, 255, 0.3)', bg: 'rgba(179, 136, 255, 0.1)' },
  operation_director: { primary: '#00c8ff', light: 'rgba(0, 200, 255, 0.3)', bg: 'rgba(0, 200, 255, 0.1)' },
  finance_manager: { primary: '#00e676', light: 'rgba(0, 230, 118, 0.3)', bg: 'rgba(0, 230, 118, 0.1)' },
  store_manager: { primary: '#ffb300', light: 'rgba(255, 179, 0, 0.3)', bg: 'rgba(255, 179, 0, 0.1)' },
  data_analyst: { primary: '#ff80ab', light: 'rgba(255, 128, 171, 0.3)', bg: 'rgba(255, 128, 171, 0.1)' },
  readonly: { primary: '#90a4ae', light: 'rgba(144, 164, 174, 0.3)', bg: 'rgba(144, 164, 174, 0.1)' },
};

const getRoleColor = (code: string) => {
  return roleColorMap[code] || roleColorMap.readonly;
};

const PermissionPage: React.FC<PermissionPageProps> = ({ roles }) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPermissions, setEditingPermissions] = useState<string[]>([]);

  const selectedRole = roles.find(r => r.id === selectedRoleId) || null;

  useEffect(() => {
    if (roles.length > 0 && !selectedRoleId) {
      setSelectedRoleId(roles[0].id);
    }
  }, [roles, selectedRoleId]);

  useEffect(() => {
    if (selectedRole) {
      setEditingPermissions([...selectedRole.permissions]);
      setIsEditing(false);
    }
  }, [selectedRole]);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRoleId(roleId);
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (selectedRole) {
      setEditingPermissions([...selectedRole.permissions]);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    if (selectedRole) {
      setEditingPermissions([...selectedRole.permissions]);
      setIsEditing(false);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('保存权限:', editingPermissions);
  };

  const handlePermissionToggle = (permission: string) => {
    if (!isEditing) return;
    setEditingPermissions(prev => {
      if (prev.includes(permission)) {
        return prev.filter(p => p !== permission);
      } else {
        return [...prev, permission];
      }
    });
  };

  const handleGroupToggle = (group: PermissionGroup) => {
    if (!isEditing) return;
    const allSelected = group.permissions.every(p => editingPermissions.includes(p));
    if (allSelected) {
      setEditingPermissions(prev => prev.filter(p => !group.permissions.includes(p)));
    } else {
      setEditingPermissions(prev => {
        const newPerms = [...prev];
        group.permissions.forEach(p => {
          if (!newPerms.includes(p)) {
            newPerms.push(p);
          }
        });
        return newPerms;
      });
    }
  };

  const getGroupSelectStatus = (group: PermissionGroup): 'all' | 'some' | 'none' => {
    const perms = isEditing ? editingPermissions : (selectedRole?.permissions || []);
    const selectedCount = group.permissions.filter(p => perms.includes(p)).length;
    if (selectedCount === 0) return 'none';
    if (selectedCount === group.permissions.length) return 'all';
    return 'some';
  };

  const isPermissionSelected = (permission: string): boolean => {
    const perms = isEditing ? editingPermissions : (selectedRole?.permissions || []);
    return perms.includes(permission);
  };

  return (
    <div className="permission-page">
      <div className="page-header">
        <div className="page-title">
          <span className="title-icon" />
          <span className="title-text">权限管理</span>
          <span className="title-sub">Permission Management</span>
        </div>
        <div className="page-desc">
          管理酒店集团各角色的系统权限，支持按模块灵活配置访问权限
        </div>
      </div>

      <div className="main-content">
        <div className="left-panel">
          <Panel title="角色列表" subtitle={`共${roles.length}个角色`}>
            <div className="role-list">
              {roles.map(role => {
                const color = getRoleColor(role.code);
                const isSelected = role.id === selectedRoleId;
                const isAnalyst = role.code === 'data_analyst';
                return (
                  <div
                    key={role.id}
                    className={`role-card ${isSelected ? 'selected' : ''} ${isAnalyst ? 'analyst-role' : ''}`}
                    style={{
                      '--role-primary': color.primary,
                      '--role-light': color.light,
                      '--role-bg': color.bg,
                    } as React.CSSProperties}
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    {isAnalyst && (
                      <div className="analyst-badge">
                        <span className="badge-icon">⭐</span>
                        <span className="badge-text">专属角色</span>
                      </div>
                    )}
                    <div className="role-card-header">
                      <div className="role-avatar" style={{ backgroundColor: color.bg, color: color.primary }}>
                        {role.name.charAt(0)}
                      </div>
                      <div className="role-info">
                        <div className="role-name">{role.name}</div>
                        <div className="role-code">{role.code}</div>
                      </div>
                    </div>
                    <div className="role-card-body">
                      <div className="role-description">{role.description}</div>
                    </div>
                    <div className="role-card-footer">
                      <div className="role-stats">
                        <span className="stat-item">
                          <span className="stat-value" style={{ color: color.primary }}>{role.userCount}</span>
                          <span className="stat-label">用户数</span>
                        </span>
                        <span className="stat-divider" />
                        <span className="stat-item">
                          <span className="stat-value" style={{ color: color.primary }}>{role.permissions.length}</span>
                          <span className="stat-label">权限项</span>
                        </span>
                      </div>
                      <div className="role-action">
                        <span className="action-text">查看权限</span>
                        <span className="action-arrow">→</span>
                      </div>
                    </div>
                    {isSelected && <div className="selected-indicator" />}
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        <div className="right-panel">
          {selectedRole ? (
            <>
              <Panel title="角色详情" subtitle={selectedRole.name}>
                <div className="role-detail">
                  <div className="detail-header">
                    <div
                      className="detail-avatar"
                      style={{
                        backgroundColor: getRoleColor(selectedRole.code).bg,
                        color: getRoleColor(selectedRole.code).primary,
                        boxShadow: `0 0 20px ${getRoleColor(selectedRole.code).light}`,
                      }}
                    >
                      {selectedRole.name.charAt(0)}
                    </div>
                    <div className="detail-info">
                      <div className="detail-name">{selectedRole.name}</div>
                      <div className="detail-code">编码：{selectedRole.code}</div>
                      <div className="detail-desc">{selectedRole.description}</div>
                    </div>
                    <div className="detail-stats">
                      <div className="detail-stat-item">
                        <span className="detail-stat-value" style={{ color: getRoleColor(selectedRole.code).primary }}>
                          {selectedRole.userCount}
                        </span>
                        <span className="detail-stat-label">在用用户</span>
                      </div>
                      <div className="detail-stat-item">
                        <span className="detail-stat-value" style={{ color: getRoleColor(selectedRole.code).primary }}>
                          {selectedRole.permissions.length}
                        </span>
                        <span className="detail-stat-label">权限数量</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>

              <Panel title="权限配置" subtitle={isEditing ? '编辑中' : '只读模式'} className="permission-panel">
                <div className="permission-config">
                  <div className="permission-toolbar">
                    <div className="toolbar-info">
                      <span className="permission-count">
                        已选权限：<strong style={{ color: getRoleColor(selectedRole.code).primary }}>
                          {isEditing ? editingPermissions.length : selectedRole.permissions.length}
                        </strong> 项
                      </span>
                    </div>
                    <div className="toolbar-actions">
                      {!isEditing ? (
                        <button className="btn btn-edit" onClick={handleEdit}>
                          <span className="btn-icon">✏️</span>
                          编辑权限
                        </button>
                      ) : (
                        <>
                          <button className="btn btn-cancel" onClick={handleCancel}>
                            取消
                          </button>
                          <button className="btn btn-save" onClick={handleSave}>
                            <span className="btn-icon">💾</span>
                            保存
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="permission-groups">
                    {permissionGroups.map((group, groupIndex) => {
                      const status = getGroupSelectStatus(group);
                      return (
                        <div key={groupIndex} className="permission-group">
                          <div
                            className={`group-header ${isEditing ? 'clickable' : ''}`}
                            onClick={() => handleGroupToggle(group)}
                          >
                            <div className="group-title">
                              <span className="custom-checkbox group-checkbox">
                                <input
                                  type="checkbox"
                                  checked={status === 'all'}
                                  ref={input => {
                                    if (input) input.indeterminate = status === 'some';
                                  }}
                                  onChange={() => {}}
                                  disabled={!isEditing}
                                />
                                <span className="checkbox-custom" />
                              </span>
                              <span className="group-icon">{group.icon}</span>
                              <span className="group-name">{group.name}</span>
                              <span className="group-count">
                                ({group.permissions.filter(p =>
                                  (isEditing ? editingPermissions : selectedRole.permissions).includes(p)
                                ).length}/{group.permissions.length})
                              </span>
                            </div>
                          </div>
                          <div className="group-permissions">
                            {group.permissions.map(permission => (
                              <div
                                key={permission}
                                className={`permission-item ${isEditing ? 'clickable' : ''} ${isPermissionSelected(permission) ? 'selected' : ''}`}
                                onClick={() => handlePermissionToggle(permission)}
                              >
                                <span className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={isPermissionSelected(permission)}
                                    onChange={() => {}}
                                    disabled={!isEditing}
                                  />
                                  <span className="checkbox-custom" />
                                </span>
                                <span className="permission-name">{permission}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Panel>
            </>
          ) : (
            <Panel title="权限配置">
              <div className="empty-state">
                <div className="empty-icon">🔐</div>
                <div className="empty-text">请从左侧选择一个角色</div>
                <div className="empty-desc">选择角色后可查看和编辑其权限配置</div>
              </div>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
};

export default PermissionPage;
