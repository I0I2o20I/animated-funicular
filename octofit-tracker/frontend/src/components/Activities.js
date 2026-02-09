import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
	fetchActivities();
  }, []);

  const fetchActivities = async () => {
	try {
	  setLoading(true);
	  const response = await fetch('http://localhost:8000/api/activities/');
	  if (!response.ok) {
		throw new Error('Failed to fetch activities');
	  }
	  const data = await response.json();
	  setActivities(data);
	  setError(null);
	} catch (err) {
	  setError(err.message);
	  setActivities([]);
	} finally {
	  setLoading(false);
	}
  };

  if (loading) return <div className="activities-loading">Loading activities...</div>;
  if (error) return <div className="activities-error">Error: {error}</div>;

  return (
	<div className="activities-container">
	  <h2>Activities</h2>
	  <div className="activities-list">
		{activities.length === 0 ? (
		  <p>No activities found. Start logging your workouts!</p>
		) : (
		  activities.map((activity) => (
			<div key={activity.id} className="activity-item">
			  <h3>{activity.name}</h3>
			  <p>Type: {activity.type}</p>
			  <p>Duration: {activity.duration} minutes</p>
			  <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
			</div>
		  ))
		)}
	  </div>
	</div>
  );
};

export default Activities;
