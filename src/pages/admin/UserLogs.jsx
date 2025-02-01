import React, { useState, useEffect } from 'react';
import { getUserLogsApi } from '../../api/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSync } from '@fortawesome/free-solid-svg-icons';
import { ROLES } from '../../config/roles';

const UserLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for admin access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== ROLES.ADMIN) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/homepage');
      return;
    }
  }, [navigate]);

  const fetchAllLogs = async () => {
    try {
      setLoading(true);
      console.log('Fetching logs...');
      const response = await getUserLogsApi({});
      console.log('Response:', response);
      
      if (response.data.success) {
        // Only get login-related logs and sort by newest first
        const loginLogs = response.data.logs
          .filter(log => ['login', 'logout', 'failed_login'].includes(log.action))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        console.log('Filtered logs:', loginLogs);
        setLogs(loginLogs);
      } else {
        console.error('Failed to fetch logs:', response.data);
        toast.error('Failed to fetch logs');
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      toast.error('Error fetching logs: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLogs();
  }, []);

  const handleBack = () => {
    navigate('/admin/category');
  };

  const handleRefresh = () => {
    fetchAllLogs();
  };

  // Group logs by user for better visualization
  const groupLogsByUser = (logs) => {
    const userGroups = {};
    logs.forEach(log => {
      if (log.userId) {
        const userId = typeof log.userId === 'object' ? log.userId._id : log.userId;
        if (!userGroups[userId]) {
          userGroups[userId] = {
            user: typeof log.userId === 'object' 
              ? `${log.userId.firstName} ${log.userId.lastName}`
              : 'Unknown User',
            email: typeof log.userId === 'object' ? log.userId.email : '',
            logs: []
          };
        }
        userGroups[userId].logs.push(log);
      }
    });
    console.log('Grouped logs:', userGroups);
    return userGroups;
  };

  const groupedLogs = groupLogsByUser(logs);

  return (
    <div className="admin-container">
      {/* Admin Header */}
      <div className="admin-header">
        <h1>User Login History</h1>
        <p>Track user login and logout activities</p>
      </div>

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button 
            className="btn btn-outline-primary back-button"
            onClick={handleBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Back to Admin Panel
          </button>
          <button 
            className="btn btn-outline-secondary"
            onClick={handleRefresh}
          >
            <FontAwesomeIcon icon={faSync} className="me-2" />
            Refresh Logs
          </button>
        </div>

        {/* Logs Display */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {Object.entries(groupedLogs).length === 0 ? (
              <div className="card">
                <div className="card-body text-center py-4">
                  No login history found. Users haven't logged in yet.
                </div>
              </div>
            ) : (
              Object.entries(groupedLogs).map(([userId, userData]) => (
                <div key={userId} className="card mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0 d-flex justify-content-between align-items-center">
                      <span>
                        <strong>{userData.user}</strong>
                        <small className="text-muted ms-2">({userData.email})</small>
                      </span>
                      <span className="badge bg-primary">
                        {userData.logs.length} Activities
                      </span>
                    </h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Time</th>
                            <th>Action</th>
                            <th>Status</th>
                            <th>IP Address</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData.logs.map(log => (
                            <tr key={log._id}>
                              <td>{new Date(log.timestamp).toLocaleString()}</td>
                              <td>
                                <span className={`badge ${
                                  log.action === 'login' ? 'bg-success' :
                                  log.action === 'logout' ? 'bg-info' :
                                  'bg-warning'
                                }`}>
                                  {log.action}
                                </span>
                              </td>
                              <td>
                                <span className={`badge ${log.status === 'success' ? 'bg-success' : 'bg-danger'}`}>
                                  {log.status}
                                </span>
                              </td>
                              <td>{log.ipAddress}</td>
                              <td>{log.details}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-container {
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .admin-header {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          padding: 2rem 0;
          text-align: center;
          margin-bottom: 2rem;
        }

        .admin-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .admin-header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .back-button {
          padding: 8px 20px;
          border-radius: 50px;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          transform: translateX(-5px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .card {
          border: none;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }

        .table th {
          font-weight: 600;
        }

        .table td {
          vertical-align: middle;
        }

        .badge {
          padding: 8px 12px;
          border-radius: 20px;
          font-weight: 500;
        }

        .text-muted {
          color: #6c757d;
          font-size: 0.875rem;
        }
        
        .card-header {
          background-color: #f8f9fa;
          border-bottom: 1px solid rgba(0,0,0,.125);
        }
        
        .table-light {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default UserLogs; 