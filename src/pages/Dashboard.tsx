import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../store/tasksSlice';
import { RootState, AppDispatch } from '../store';
import { changeTaskStatus, closeTask } from '../api/tasksApi';
import { Task } from '../models/Task';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const selectedUserId = useSelector((state: RootState) => state.users.selectedUserId);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchTasks(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  const handleChangeStatus = async (taskId: number, nextStatus: number) => {
  try {
    await changeTaskStatus(taskId, nextStatus, selectedUserId!);
    dispatch(fetchTasks(selectedUserId!));
  } catch {
    alert('שגיאה בעדכון סטטוס');
  }
};

  const handleCloseTask = async (taskId: number) => {
  try {
    await closeTask(taskId);
    dispatch(fetchTasks(selectedUserId!));
  } catch {
    alert('שגיאה בסגירת המשימה');
  }
};
const canCloseTask = (task: Task) => {
  if (task.taskType === 'Procurement') {
    return task.status === 4 &&
      task.procurementData?.offer1 &&
      task.procurementData?.offer2 &&
      task.procurementData?.receipt;
  }

  if (task.taskType === 'Development') {
    return task.status === 4 &&
      task.developmentData?.specification &&
      task.developmentData?.branchName &&
      task.developmentData?.version;
  }

  return false;
};

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 1: return 'טיוטה';
      case 2: return 'הצעות התקבלו';
      case 3: return 'השלמת רכישה';
      case 4: return 'מאושר';
      default: return 'לא ידוע';
    }
  };

  if (!selectedUserId) return <p>אנא בחר משתמש להצגת משימות</p>;
  if (loading) return <p>טוען משימות...</p>;
  if (error) return <p>שגיאה: {error}</p>;

  return (
    <div dir="rtl">
      <h2>רשימת משימות</h2>
      <table border={1} cellPadding={10} style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>סוג</th>
            <th>סטטוס</th>
            <th>סגור?</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.taskType}</td>
              <td>{getStatusLabel(task.status)}</td>
              <td>{task.isClosed ? 'כן' : 'לא'}</td>
              <td>
                <button
                  onClick={() => handleChangeStatus(task.id, task.status - 1)}
                  disabled={task.status <= 1}
                >
                  ← חזור
                </button>

                <button
                  onClick={() => handleChangeStatus(task.id, task.status + 1)}
                  disabled={task.isClosed || task.status >= 4}
                  style={{ marginRight: '10px' }}
                >
                  התקדם →
                </button>

                {!task.isClosed && canCloseTask(task) && (
  <button onClick={() => handleCloseTask(task.id)}>סגור משימה</button>
)}
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
