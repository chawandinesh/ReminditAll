import React from 'react';
export const MediMaintaaContext = React.createContext(null);
const initialState = [];
export function Context(props) {
  const [state, setState] = React.useState(initialState);
  return (
    <MediMaintaaContext.Provider value={{state, setState}}>
      {props.children}
    </MediMaintaaContext.Provider>
  );
}
