import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '@/features/EditorSection/editorSlice';


export const store = configureStore({
  reducer: {
    editor: editorReducer

  }
})