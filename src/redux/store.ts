import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '@/components/EditorForm/editorSlice';


export const store = configureStore({
  reducer: {
    editor: editorReducer

  }
})