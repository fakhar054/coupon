import React from 'react';
import './StatsSection.css'; 
import { FaTag, FaPiggyBank, FaClipboardCheck } from 'react-icons/fa';
 
const iconMapping = {
  "fab fa-500px": FaTag, 
  "fab fa-piggy-bank": FaPiggyBank,
  "fab fa-clipboard-check": FaClipboardCheck,
};

const StatCard = ({ icon, title, text }) => { 
  const IconComponent = iconMapping[icon] || FaTag;   

  return (
    <div className="stat-card">
      <i className={icon} /><i/>
      <h2 className="title">{title}</h2>
      <p className="text">{text}</p>
    </div>
  );
};

const StatsSection = ({ data }) => {


  return (
    <div className="stats-section">
      {data.map((item) => (
        <StatCard
          key={item.id}
          icon={item.icon}
          title={item.title}
          text={item.description}
        />
      ))}
    </div>
  );
};

export default StatsSection;
