import { createSlice } from '@reduxjs/toolkit'
import { TOPIC_STATUS } from '@prisma/client';
import type { RootState } from '@/redux/hooks'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TopicInput {
  id: string;
  title: string;
  url: string;
  category?: string;
  categoryId?: string;
  firstAnalogy?: string;
  slug: string;
  status: TOPIC_STATUS;
  hasReference?: boolean;
  reference?: string;
}

export interface AnalogyInput {
  description: string;
  topicId: string;
  hasReference?: boolean;
  reference: string;
}

export interface InitialState {
  inputType: "Topic" | "Analogy";
  topicInput: TopicInput;
  analogyInput: AnalogyInput;
}

const initialTopicState: TopicInput = {
  id: "",
  title: "",
  url: "",
  category: "",
  categoryId: "",
  firstAnalogy: "",
  slug: "",
  status: "PENDING",
  hasReference: false,
  reference: "",
};

const initialAnalogyState: AnalogyInput = {
  description: "",
  topicId: "",
  hasReference: false,
  reference: "",
};

const initialState: InitialState = {
  inputType: "Topic",
  topicInput: initialTopicState,
  analogyInput: initialAnalogyState,
};

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInputType: (state, action: PayloadAction<"Topic" | "Analogy">) => {
      state.inputType = action.payload;
    },
    setTopicInput: (state, action: PayloadAction<TopicInput>) => {
      state.topicInput = action.payload;
    },
    setTopicId: (state, action: PayloadAction<string>) => {
      state.topicInput.id = action.payload;
    },
    setTopicTitle: (state, action: PayloadAction<string>) => {
      state.topicInput.title = action.payload;
    },
    setTopicUrl: (state, action: PayloadAction<string>) => {
      state.topicInput.url = action.payload;
    },
    setTopicCategory: (state, action: PayloadAction<string>) => {
      state.topicInput.category = action.payload;
    },
    setTopicFirstAnalogy: (state, action: PayloadAction<string>) => {
      state.topicInput.firstAnalogy = action.payload;
    },
    setTopicSlug: (state, action: PayloadAction<string>) => {
      state.topicInput.slug = action.payload;
    },
    setTopicStatus: (state, action: PayloadAction<TOPIC_STATUS>) => {
      state.topicInput.status = action.payload;
    },
    setTopicHasReference: (state, action: PayloadAction<boolean>) => {
      state.topicInput.hasReference = action.payload;
    },
    setTopicReference: (state, action: PayloadAction<string>) => {
      state.topicInput.reference = action.payload;
    },
    setAnalogyInput: (state, action: PayloadAction<AnalogyInput>) => {
      state.analogyInput = action.payload;
    },
    setAnalogyDescription: (state, action: PayloadAction<string>) => {
      state.analogyInput.description = action.payload;
    },
    setAnalogyTopicId: (state, action: PayloadAction<string>) => {
      state.analogyInput.topicId = action.payload;
    },
    setAnalogyHasReference: (state, action: PayloadAction<boolean>) => {
      state.analogyInput.hasReference = action.payload
    },
    setAnalogyReference: (state, action: PayloadAction<string>) => {
      state.analogyInput.reference = action.payload;
    }
  }
})

export const { setInputType, setTopicInput, setTopicId, setTopicTitle, setTopicUrl, setTopicCategory, setTopicHasReference, setTopicReference, setTopicFirstAnalogy, setTopicSlug, setTopicStatus, setAnalogyInput, setAnalogyDescription, setAnalogyTopicId, setAnalogyHasReference, setAnalogyReference } = inputSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectInput = (state: RootState) => state.input

export default inputSlice.reducer

