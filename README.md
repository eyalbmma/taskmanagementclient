# TaskManagement.Client

צד הקליינט של מערכת לניהול משימות — בנוי ב־React + TypeScript עם Redux Toolkit.

המערכת מתקשרת עם API שנכתב ב־ASP.NET Core לצורך יצירת משימות, ניהול תהליכים, סגירה ושליפה לפי משתמש.

---

## התקנה והרצה

### 1. דרישות מוקדמות

- Node.js (מומלץ גרסה 18+)
- npm או yarn
- ה־API פעיל בכתובת `https://localhost:7099`

---

### 2. התקנת תלויות

```bash
npm install
```

---

### 3. הרצת הקליינט

```bash
npm start
```

המערכת תעלה בדפדפן בכתובת:  
http://localhost:3000

---

## תצורת axiosInstance

הפרויקט כולל קובץ `axiosInstance.ts` המוגדר כך:

```ts
const axiosInstance = axios.create({
  baseURL: 'https://localhost:7099',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

---

## מבנה הפרויקט

```
src/
├── api/                ← קריאות API מרוכזות
│   ├── tasksApi.ts
│   └── usersApi.ts
├── components/         ← קומפוננטות תצוגה
│   ├── Dashboard.tsx
│   ├── EditTaskPage.tsx
│   └── UserAndTaskSelect.tsx
├── models/             ← ממשקים (interfaces)
├── pages/              ← עמודים ראשיים
├── store/              ← Redux Slices
│   ├── usersSlice.ts
│   └── tasksSlice.ts
├── App.tsx
└── index.tsx
```

---

## תכונות עיקריות

- הצגת רשימת משימות לפי משתמש נבחר
- יצירת משימה חדשה לפי סוג (Development / Procurement)
- התקדמות ושלבים אחורה לפי לוגיקת תהליך
- סגירת משימה לפי תנאים (בדיקות שדות)
- שימוש ב־Redux לניהול מצב גלובלי
- axiosInstance + services לפיצול קריאות

---

## חיבור לשרת

- ודא ששרת ה־API (ב־.NET Core) רץ על `https://localhost:7099`
- ניתן לשנות את ה־baseURL בקובץ `src/api/axiosInstance.ts` במידת הצורך

---

## בדיקות

- ניתן לבדוק את פעולות ה־client ידנית מול השרת
- בדיקות טופס, מעבר שלבים, הצגה לפי משתמש ו־DevTools ל־Redux

---

## הערות

- הקוד בנוי לפי עקרונות SRP והפרדת שכבות (API, State, UI)
- ניתן להרחיב לסוגי משימות נוספים דרך Redux ו־services
- מומלץ להפעיל יחד עם TaskManagement.API

