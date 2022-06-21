import {
  createSlice,
  Draft,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import apiInstance from "../../api/serverConfig";

export const fetchTasks: any = createAsyncThunk(
  "tasks",
  async (arg, { getState }) => {
    const state: any = getState();
    const response = await apiInstance.get("/tasks", {
      params: {
        _page: state.task.pagination.page,
        _limit: state.task.pagination.limit,
      },
    });
    return response.data;
  }
);

export const addTask: any = createAsyncThunk(
  "tasks/add",
  async (arg, { getState }) => {
    const response = await apiInstance.post("/tasks", {
      title: "gjgjgj",
      done: true,
    });
    return response.data;
  }
);

export const updateTaskStatus: any = createAsyncThunk(
  "tasks/updateStatus",
  async (data: any, { getState }) => {
    const response = await apiInstance.patch(`/tasks/${data.id}`, {
      done: data.done,
    });
    return response.data;
  }
);

export const deleteTask: any = createAsyncThunk(
  "tasks/updateStatus",
  async (id: number, { getState }) => {
    const state: any = getState();
    console.log(id,'ggggggg')
    const response = await apiInstance.delete(`/tasks/${id}`);
    return response.data;
  }
);

const initialState = {
  data: [],
  loading: false,
  error: false,
  pagination: {
    page: 1,
    limit: 50,
  },
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setPage: (state: any, action: PayloadAction<typeof initialState>) => {
      state.pagination.page = action.payload.pagination.page;
    },
    setPageSize: (state: any, action: PayloadAction<typeof initialState>) => {
      state.pagination.limit = action.payload.pagination.limit;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action: any) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(addTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTaskStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTaskStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTaskStatus.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Selectors
export const getTasks = (state: { task: any }) => state.task;

// Reducers and actions
export const { setPage, setPageSize } = taskSlice.actions;

export default taskSlice.reducer;
