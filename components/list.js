import {ThemeContext} from "../context/theme";

export default function List({theme, children}) {
  return (
    <ul>
      <ThemeContext.Provider value={theme}>
        {children}
      </ThemeContext.Provider>
    </ul>
  )
}