import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '@/features/EditorSection/editorSlice';
import inputReducer from '@/features/EditorSection/inputSlice';



export const store = configureStore({
  reducer: {
    editor: editorReducer,
    input: inputReducer,

  }
})