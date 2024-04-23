import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DebounceSortComponent = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://jsonplaceholder.typicode.com/comments');
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Function to debounce sorting
    const debounceSort = (arr, searchTerm, delay) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const sorted = arr.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                           .sort((a, b) => a.name.localeCompare(b.name));
          resolve(sorted);
        }, delay);
      });
    };

    // Call debounceSort function whenever searchTerm changes
    const delay = 300; // Adjust the delay time as needed
    let debounceTimer;
    if (searchTerm !== '') {
      debounceTimer = setTimeout(async () => {
        const sorted = await debounceSort(data, searchTerm, delay);
        setSortedData(sorted);
      }, delay);
    } else {
      setSortedData([...data]); // If search term is empty, reset sorting
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm, data]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {sortedData.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <ul>
        {sortedData.map((item, index) => (
          <li key={index}>{item.body}</li>
        ))}
      </ul>
      <ul>
        {sortedData.map((item, index) => (
          <li key={index}>{item.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default DebounceSortComponent;
