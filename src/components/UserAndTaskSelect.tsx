import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, setSelectedUserId } from '../store/usersSlice';
import { fetchTasks } from '../store/tasksSlice';
import { RootState, AppDispatch } from '../store';
import { User } from '../models/User';
import { createTask } from '../api/tasksApi';


export default function UserAndTaskSelect() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { users, selectedUserId } = useSelector((state: RootState) => state.users);
  const [selectedTask, setSelectedTask] = useState<number | undefined>();
  const [newTaskType, setNewTaskType] = useState<string>(''); // חדש
  const [newTaskUserId, setNewTaskUserId] = useState<number | undefined>(); // חדש

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(e.target.value);
    dispatch(setSelectedUserId(userId));
    dispatch(fetchTasks(userId));
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const taskId = Number(e.target.value);
    setSelectedTask(taskId);
    if (taskId) {
      navigate(`/edit/${taskId}`);
    }
  };

  const handleCreateTask = async () => {
  if (!newTaskType || !newTaskUserId) {
    alert('בחר סוג משימה ומשתמש');
    return;
  }

  try {
    const response = await createTask(newTaskType, newTaskUserId);
    const taskId = response.id;

    alert('משימה נוצרה בהצלחה!');
    navigate(`/edit/${taskId}`);
  } catch (error) {
    alert('שגיאה ביצירת משימה');
  }
};


  return (
    <div style={{ direction: 'rtl', marginBottom: '30px' }}>
      <div>
        <label>בחר משתמש: </label>
        <select onChange={handleUserChange} value={selectedUserId ?? ''}>
          <option value="">-- בחר --</option>
          {users.map((u: User) => (
            <option key={u.id} value={u.id}>
              {u.fullName}
            </option>
          ))}
        </select>

        <label style={{ marginRight: '20px' }}>ערוך משימה: </label>
        <select onChange={handleTaskChange}>
          <option value="">-- בחר --</option>
          <option value="1002">#1002 - Procurement</option>
          <option value="1004">#1004 - Development</option>
          <option value="1005">#1005 - Procurement</option>
        </select>
      </div>

      <hr />

      <div>
        <h3>יצירת משימה חדשה</h3>
        <label>סוג משימה: </label>
        <select onChange={(e) => setNewTaskType(e.target.value)}>
          <option value="">-- בחר --</option>
          <option value="Procurement">רכש</option>
          <option value="Development">פיתוח</option>
        </select>

        <label style={{ marginRight: '15px' }}>משתמש מוקצה: </label>
        <select onChange={(e) => setNewTaskUserId(Number(e.target.value))}>
          <option value="">-- בחר משתמש --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.fullName} ({u.id})
            </option>
          ))}
        </select>

        <button style={{ marginRight: '15px' }} onClick={handleCreateTask}>
          צור
        </button>
      </div>
    </div>
  );
}
