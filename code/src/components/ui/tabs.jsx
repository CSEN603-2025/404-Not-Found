import React, { useState } from 'react';

export const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

export const TabList = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="tab-list">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

export const TabTrigger = ({ value, children, activeTab, setActiveTab }) => {
  return (
    <button
      className={`tab-trigger ${activeTab === value ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

export const TabContent = ({ value, children, activeTab }) => {
  return activeTab === value ? <div className="tab-content">{children}</div> : null;
};