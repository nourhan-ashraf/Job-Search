import React, { createContext , useState} from "react";

const DarkModeContext = createContext();

function DarkModeProvider(props){
  const [darkMode, setDarkMode] = useState(false)
  const toggleModes = () => {
    setDarkMode(!darkMode)
  }
  return (
    <div>
      <DarkModeContext.Provider value={{darkMode, toggleModes}}>
        {props.children}
      </DarkModeContext.Provider>
    </div>
  )
}
export { DarkModeContext, DarkModeProvider }