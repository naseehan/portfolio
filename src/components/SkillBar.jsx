import React from 'react';

const SkillBar = ({ skill, percentage }) => {
  return (
    <div className="skill-item">
      <div className="skill-info">
        <label>{skill}</label>
        <span>{percentage}%</span>
      </div>
      <div className="progress">
        <div 
          className="bar" 
          style={{ width: `${percentage}%`, transition: 'width 1s ease-in-out' }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
