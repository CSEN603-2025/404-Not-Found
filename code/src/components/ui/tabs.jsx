import React, { useState } from 'react';

export const Tabs = ({ defaultValue, children, className, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={className} {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

export const TabList = ({ children, activeTab, setActiveTab, className, ...props }) => {
  return (
    <div className={`flex border-b ${className}`} {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

export const TabTrigger = ({ value, children, activeTab, setActiveTab, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 ${activeTab === value ? 'border-b-2 border-green-500' : ''} ${className}`}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabContent = ({ value, children, activeTab, className, ...props }) => {
  if (activeTab !== value) return null;
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};