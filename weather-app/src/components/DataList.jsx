import React from 'react';

const DataList = ({ data }) => {
  return (
    <table className="data-list">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temperature</th>
          <th>Moon Rise</th>
          <th>Moon Set</th>
          <th>Moon Phase</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.temperature}°F</td>
            <td>{item.moonRise}</td>
            <td>{item.moonSet}</td>
            <td>{item.moonPhase}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataList;
