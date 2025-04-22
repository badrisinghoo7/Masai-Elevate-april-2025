import React from 'react';
import useFetch from '../hooks/useFetch';

const ServerChecker = () => {
  const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/todos/1');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Fetched Data:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
};

export default ServerChecker;
