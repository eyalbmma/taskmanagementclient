import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskById, saveProcurementData, saveDevelopmentData } from '../api/tasksApi';
import { Task } from '../models/Task';

export default function EditTaskPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
  if (taskId) {
    getTaskById(Number(taskId))
      .then((res) => setTask(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }
}, [taskId]);

  const handleInputChange = (field: string, value: string) => {
    if (!task) return;
    if (task.taskType === 'Procurement' && task.procurementData) {
      setTask({
        ...task,
        procurementData: {
          ...task.procurementData,
          [field]: value,
        },
      });
    }
    if (task.taskType === 'Development' && task.developmentData) {
      setTask({
        ...task,
        developmentData: {
          ...task.developmentData,
          [field]: value,
        },
      });
    }
  };

  
  const handleSave = async () => {
  if (!task) return;
  setSaving(true);
  setMessage(null);
  setError(null);

  try {
    if (task.taskType === 'Procurement' && task.procurementData) {
      await saveProcurementData(task.id, task.procurementData);
    } else if (task.taskType === 'Development' && task.developmentData) {
      await saveDevelopmentData(task.id, task.developmentData);
    }

    setMessage('השינויים נשמרו בהצלחה!');
  } catch (err: any) {
    setError(err.message || 'שגיאה בשמירה');
  } finally {
    setSaving(false);
  }
};



  if (loading) return <p>טוען משימה...</p>;
  if (error) return <p style={{ color: 'red' }}>שגיאה: {error}</p>;
  if (!task) return <p>משימה לא נמצאה</p>;

  return (
    <div dir="rtl" style={{ padding: '20px' }}>
      <h2>עריכת משימה #{task.id}</h2>
      <p><strong>סוג:</strong> {task.taskType}</p>

      {task.taskType === 'Procurement' && task.procurementData && (
        <>
          <h3>פרטי רכש:</h3>
          <label>הצעה 1: </label>
          <input
            value={task.procurementData.offer1 || ''}
            onChange={(e) => handleInputChange('offer1', e.target.value)}
          /><br />
          <label>הצעה 2: </label>
          <input
            value={task.procurementData.offer2 || ''}
            onChange={(e) => handleInputChange('offer2', e.target.value)}
          /><br />
          <label>קבלה: </label>
          <input
            value={task.procurementData.receipt || ''}
            onChange={(e) => handleInputChange('receipt', e.target.value)}
          /><br />
        </>
      )}

      {task.taskType === 'Development' && task.developmentData && (
        <>
          <h3>פרטי פיתוח:</h3>
          <label>מפרט: </label>
          <input
            value={task.developmentData.specification || ''}
            onChange={(e) => handleInputChange('specification', e.target.value)}
          /><br />
          <label>סניף: </label>
          <input
            value={task.developmentData.branchName || ''}
            onChange={(e) => handleInputChange('branchName', e.target.value)}
          /><br />
          <label>גרסה: </label>
          <input
            value={task.developmentData.version || ''}
            onChange={(e) => handleInputChange('version', e.target.value)}
          /><br />
        </>
      )}

      <button onClick={handleSave} disabled={saving}>
        {saving ? 'שומר...' : 'שמור'}
      </button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}
