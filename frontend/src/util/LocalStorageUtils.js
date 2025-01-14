export const loadState = () => {
   try {
     const serializedState = localStorage.getItem('reduxState');
     if (serializedState === null) return undefined; // No saved state, return undefined
     return JSON.parse(serializedState); // Parse and return saved state
   } catch (e) {
     console.error('Error loading state:', e);
     return undefined;
   }
 };
 
 export const saveState = (state) => {
   try {
     const serializedState = JSON.stringify(state);
     localStorage.setItem('reduxState', serializedState);
   } catch (e) {
     console.error('Error saving state:', e);
   }
 };
 