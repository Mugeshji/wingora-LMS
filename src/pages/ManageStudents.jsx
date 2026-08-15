import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Key, 
  User, 
  Info,
  ShieldCheck,
  Search
} from 'lucide-react';

export default function ManageStudents({ studentsList, onAddStudent, onDeleteStudent }) {
  const [newUserID, setNewUserID] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const formattedID = newUserID.trim().toUpperCase();
    const formattedPass = newPassword.trim();

    if (!formattedID || !formattedPass) {
      return setErrorMsg('Please fill in both UserID and Password.');
    }

    if (formattedID === 'ADMIN') {
      return setErrorMsg('UserID cannot be admin.');
    }

    if (formattedPass.length < 4) {
      return setErrorMsg('Password must be at least 4 characters long.');
    }

    // Check if duplicate UserID exists
    const duplicate = studentsList.find(s => s.userID.toUpperCase() === formattedID);
    if (duplicate) {
      return setErrorMsg(`Student with UserID ${formattedID} already exists!`);
    }

    onAddStudent({ userID: formattedID, password: formattedPass });
    setNewUserID('');
    setNewPassword('');
    setSuccessMsg(`Student ${formattedID} registered successfully!`);
  };

  const filteredStudents = studentsList.filter(s => 
    s.userID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-students-container">
      {/* Page Header */}
      <div className="manage-header glass-panel p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Student Account Management</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Admin Portal: View registered credentials, add student profiles manually, or delete old student accounts.
            </p>
          </div>
        </div>
      </div>

      <div className="manage-layout-grid grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Add Student Form */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 flex flex-col gap-5">
            <h3 className="text-base font-bold flex items-center gap-2 border-b border-[hsl(var(--card-border)/0.4)] pb-3">
              <UserPlus size={18} className="text-primary" />
              <span>Register Student</span>
            </h3>

            {errorMsg && (
              <div className="text-xs p-3 rounded-lg border border-red/20 bg-red/5 text-red flex items-start gap-2">
                <Info size={14} className="flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="text-xs p-3 rounded-lg border border-green/20 bg-green/5 text-green flex items-start gap-2">
                <ShieldCheck size={14} className="flex-shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleAdd} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground uppercase tracking-wider font-semibold">Student UserID</label>
                <div className="relative flex items-center">
                  <User size={14} className="absolute left-3 text-muted-foreground" />
                  <input 
                    type="text" 
                    value={newUserID}
                    onChange={(e) => setNewUserID(e.target.value)}
                    placeholder="e.g. TC0002"
                    className="glass-input w-full pl-9 py-2"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-muted-foreground uppercase tracking-wider font-semibold">Login Password</label>
                <div className="relative flex items-center">
                  <Key size={14} className="absolute left-3 text-muted-foreground" />
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="e.g. Pass123"
                    className="glass-input w-full pl-9 py-2"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full justify-center py-2 mt-2">
                <span>Create Student Account</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Card: Table / Accounts List */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[hsl(var(--card-border)/0.4)] pb-3">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Users size={18} className="text-primary" />
                <span>Registered Students ({studentsList.length})</span>
              </h3>
              
              <div className="relative flex items-center w-full sm:w-64">
                <Search size={14} className="absolute left-3 text-muted-foreground" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search UserID..."
                  className="glass-input w-full pl-9 py-1.5 text-xs"
                />
              </div>
            </div>

            <div className="table-responsive max-h-[450px] overflow-y-auto pr-1">
              <table className="student-table w-full text-left text-xs">
                <thead>
                  <tr className="text-muted-foreground uppercase border-b border-[hsl(var(--card-border)/0.4)]">
                    <th className="py-2.5 px-3">Student UserID</th>
                    <th className="py-2.5 px-3">Password (Plaintext)</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-8 text-muted-foreground">
                        No students found. Add one on the left panel!
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => (
                      <tr key={student.userID} className="border-b border-[hsl(var(--card-border)/0.2)] hover:bg-[hsl(var(--secondary)/0.1)]">
                        <td className="py-3 px-3 font-bold">{student.userID}</td>
                        <td className="py-3 px-3 font-mono text-muted-foreground">{student.password}</td>
                        <td className="py-3 px-3 text-right">
                          {student.userID === 'TC0001' || student.userID === 'TC0002' ? (
                            <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded bg-secondary">Predefined</span>
                          ) : (
                            <button 
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete student account ${student.userID}?`)) {
                                  onDeleteStudent(student.userID);
                                }
                              }}
                              className="text-red hover:bg-red/10 p-1.5 rounded transition"
                              title="Delete Student Account"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .student-table {
          width: 100%;
          border-collapse: collapse;
        }

        .student-table th {
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .student-table td, .student-table th {
          padding: 0.75rem 0.5rem;
        }
      `}</style>
    </div>
  );
}
