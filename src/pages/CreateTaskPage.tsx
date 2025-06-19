import NewTaskForm from '../components/NewTaskForm';

export default function CreateTaskPage() {
  return (
    <div style={{ direction: 'rtl', padding: '20px' }}>
      <h2>יצירת משימה חדשה</h2>
      <NewTaskForm />
    </div>
  );
}
