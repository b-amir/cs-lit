import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '@/components/EditorSection/editorSlice';


export const store = configureStore({
  reducer: {
    editor: editorReducer

  }
})