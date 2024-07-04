import React, { useState, useEffect } from 'react';
import HealthAnalytics from './HealthAnalytics';

const HealthTracker = () => {
  const [healthData, setHealthData] = useState(() => {
    const storedData = localStorage.getItem('healthData');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [date, setDate] = useState('');
  const [steps, setSteps] = useState('');
  const [calories, setCalories] = useState('');
  const [sleep, setSleep] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    localStorage.setItem('healthData', JSON.stringify(healthData));
  }, [healthData]);

  const handleAddData = () => {
    if (!date || !steps || !calories || !sleep) return;

    const newData = { id: Date.now(), date, steps: parseInt(steps), calories: parseInt(calories), sleep: parseFloat(sleep) };
    setHealthData([...healthData, newData]);
    setDate('');
    setSteps('');
    setCalories('');
    setSleep('');
  };

  const handleEditData = (data) => {
    setEditing(true);
    setCurrentData(data);
    setDate(data.date);
    setSteps(data.steps);
    setCalories(data.calories);
    setSleep(data.sleep);
  };

  const handleUpdateData = () => {
    const updatedData = healthData.map((data) =>
      data.id === currentData.id ? { ...data, date, steps: parseInt(steps), calories: parseInt(calories), sleep: parseFloat(sleep) } : data
    );
    setHealthData(updatedData);
    setEditing(false);
    setCurrentData(null);
    setDate('');
    setSteps('');
    setCalories('');
    setSleep('');
  };

  const handleDeleteData = (id) => {
    const filteredData = healthData.filter((data) => data.id !== id);
    setHealthData(filteredData);
  };

  return (
    <div className="health-tracker">
      <h1>Health Tracker</h1>
      <div>
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <input
          type="number"
          placeholder="Sleep (hours)"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
        />
        {editing ? (
          <button onClick={handleUpdateData}>Update Data</button>
        ) : (
          <button onClick={handleAddData}>Add Data</button>
        )}
      </div>
      <div>
        <h2>Health Data</h2>
        <ul>
          {healthData.map((data) => (
            <li key={data.id}>
              {data.date}: {data.steps} steps, {data.calories} calories, {data.sleep} hours sleep
              <button onClick={() => handleEditData(data)}>Edit</button>
              <button onClick={() => handleDeleteData(data.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <HealthAnalytics healthData={healthData} />
    </div>
  );
};

export default HealthTracker;
