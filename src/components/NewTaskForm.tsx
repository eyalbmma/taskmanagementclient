import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { User } from '../models/User';
import { createTask } from '../api/tasksApi';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../store/tasksSlice';
export default function NewTaskForm() {
  const dispatch = useDispatch<AppDispatch>(); // ✅ זה מה שחסר
    const { users } = useSelector((state: RootState) => state.users);
  const [taskType, setTaskType] = useState('');
  const [userId, setUserId] = useState<number | undefined>();
  const navigate = useNavigate();

  const handleCreate = async () => {
  if (!taskType || !userId) {
    alert('יש לבחור סוג משימה ומשתמש');
    return;
  }

  try {
    const res = await createTask(taskType, userId);

    alert('משימה נוצרה בהצלחה!');
    dispatch(fetchTasks(userId));
    navigate(`/edit/${res.id}`);
  } catch (err) {
    alert('שגיאה ביצירת משימה');
  }
};



  return (
    <div style={{ direction: 'rtl', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '500px' }}>
      <h3>פרטי משימה חדשה</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>סוג משימה:</label>
        <select value={taskType} onChange={(e) => setTaskType(e.target.value)} style={{ width: '100%' }}>
          <option value="">-- בחר --</option>
          <option value="Procurement">רכש</option>
          <option value="Development">פיתוח</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>משתמש מוקצה:</label>
        <select value={userId ?? ''} onChange={(e) => setUserId(Number(e.target.value))} style={{ width: '100%' }}>
          <option value="">-- בחר משתמש --</option>
          {users.map((u: User) => (
            <option key={u.id} value={u.id}>
              {u.fullName} ({u.id})
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleCreate} style={{ padding: '8px 16px' }}>צור</button>
    </div>
  );
}
