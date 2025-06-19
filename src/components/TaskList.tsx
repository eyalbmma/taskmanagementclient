import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { Task } from '../models/Task';
import { changeTaskStatus } from '../api/tasksApi';
import { fetchTasks } from '../store/tasksSlice';

export default function TaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { selectedUserId } = useSelector((state: RootState) => state.users);

  const handleStatusChange = async (taskId: number, nextStatus: number) => {
  try {
    await changeTaskStatus(taskId, nextStatus, selectedUserId!);
    dispatch(fetchTasks(selectedUserId!));
  } catch {
    alert('שגיאה בעדכון סטטוס');
  }
};
  if (!selectedUserId) return null;

  return (
    <div dir="rtl" style={{ marginTop: '20px' }}>
      <h3>משימות מוקצות למשתמש</h3>
      <table border={1} cellPadding={10} style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>סוג</th>
            <th>סטטוס</th>
            <th>סגורה?</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: Task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.taskType}</td>
              <td>{task.status}</td>
              <td>{task.isClosed ? 'כן' : 'לא'}</td>
              <td>
                <button
                  disabled={task.status <= 1}
                  onClick={() => handleStatusChange(task.id, task.status - 1)}
                >
                  ← חזור
                </button>
                <button
                  disabled={task.isClosed}
                  onClick={() => handleStatusChange(task.id, task.status + 1)}
                  style={{ marginRight: '10px' }}
                >
                  התקדם →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
