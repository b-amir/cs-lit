import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/hooks'

interface EditorState {
  entity: "analogy" | "topic" | null;
  shown: boolean;
  purpose: "Create" | "Edit" | null;
}

const initialState: EditorState = {
  entity: null,
  shown: false,
  purpose: null,
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setEntity: (state, action: PayloadAction<"analogy" | "topic" | null>) => {
      state.entity = action.payload
    },

    setShown: (state, action: PayloadAction<boolean>) => {
      state.shown = action.payload
    },

    setPurpose: (state, action: PayloadAction<"Create" | "Edit" | null>) => {
      state.purpose = action.payload
    },
  },
})

export const { setEntity, setShown, setPurpose } = editorSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectEditor = (state: RootState) => state.editor

export default editorSlice.reducer

