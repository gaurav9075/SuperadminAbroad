// ContinentalsCourses.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const continents = [
  'Asia', 'Africa', 'Europe',
  'North America', 'South America',
  'Australia', 'Antarctica'
];

export const countriesByContinent = {
  Asia: ['India', 'China', 'Japan'],
  Africa: ['Nigeria', 'Egypt', 'South Africa'],
  Europe: ['Germany', 'France', 'UK'],
  'North America': ['USA', 'Canada', 'Mexico'],
  'South America': ['Brazil', 'Argentina', 'Chile'],
  Australia: ['Australia'],
  Antarctica: ['Research Stations']
};

export const highPayingCourses = [
  'Data Science',
  'AI & Machine Learning',
  'Cybersecurity',
  'Software Engineering',
  'Cloud Computing',
  'Blockchain',
  'Product Management'
];

// Optional: Sidebar components for Navbar or reuse

export const ContinentalsSidebar = ({ onSelectContinent }) => (
  <div className="dropdown-sidebar">
    {continents.map(continent => (
      <button
        key={continent}
        className="sidebar-item"
        onClick={() => onSelectContinent(continent)}
      >
        {continent}
      </button>
    ))}
  </div>
);

export const CoursesSidebar = ({ onClose }) => (
  <div className="dropdown-sidebar">
    {highPayingCourses.map(course => (
      <Link
        key={course}
        to={`/courses/${course.toLowerCase().replace(/ /g, '-')}`}
        className="sidebar-item"
        onClick={onClose}
      >
        {course}
      </Link>
    ))}
  </div>
);
