import React, { createContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

function DarkModeProvider(props) {

  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode === 'dark';
  })

  const toggleModes = () => {
    setDarkMode('light')
  }
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div>
      <DarkModeContext.Provider value={{ darkMode, toggleModes }}>
        {props.children}
      </DarkModeContext.Provider>
    </div>
  )
}
export { DarkModeContext, DarkModeProvider }