import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, setSelectedUserId } from '../store/usersSlice';
import { fetchTasks } from '../store/tasksSlice';
import { RootState, AppDispatch } from '../store';
import { User } from '../models/User';

export default function HeaderBar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users, selectedUserId } = useSelector((state: RootState) => state.users);
  const [selectedTaskId, setSelectedTaskId] = useState('');
const { tasks } = useSelector((state: RootState) => state.tasks);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(e.target.value);
    dispatch(setSelectedUserId(userId));
    dispatch(fetchTasks(userId));
    navigate('/'); 
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const taskId = e.target.value;
    setSelectedTaskId(taskId);
    if (taskId) {
      navigate(`/edit/${taskId}`);
    }
  };

  return (
    <div style={{ direction: 'rtl', padding: '10px', borderBottom: '1px solid #ccc' }}>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label>בחר משתמש:</label>
        <select value={selectedUserId ?? ''} onChange={handleUserChange}>
          <option value="">-- בחר --</option>
          {users.map((u: User) => (
            <option key={u.id} value={u.id}>{u.fullName}</option>
          ))}
        </select>

        <label>ערוך משימה:</label>
<select value={selectedTaskId} onChange={handleTaskChange}>
  <option value="">-- בחר --</option>
  {tasks.map((task) => (
    <option key={task.id} value={task.id}>
      {task.taskType} - #{task.id}
    </option>
  ))}
</select>

        <button onClick={() => navigate('/create')}>
          צור משימה
        </button>
      </div>
    </div>
  );
}
