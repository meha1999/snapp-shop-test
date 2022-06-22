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
    console.log(state.task.isActive);
    const response = await apiInstance.get("/tasks", {
      params: {
        done: state.task.isActive ? !state.task.isActive : undefined,
        _page: state.task.pagination.page,
        _limit: state.task.pagination.limit,
      },
    });
    return response.data;
  }
);

export const addTask: any = createAsyncThunk(
  "tasks/add",
  async (task: string, { dispatch }) => {
    const response = await apiInstance.post("/tasks", {
      title: task,
      done: false,
    });
    await dispatch(fetchTasks());
    return response.data;
  }
);

export const updateTaskStatus: any = createAsyncThunk(
  "tasks/updateStatus",
  async (data: any, { dispatch }) => {
    const response = await apiInstance.patch(`/tasks/${data.id}`, {
      done: data.done,
    });
    await dispatch(fetchTasks());
    return response.data;
  }
);

export const updateTask: any = createAsyncThunk(
  "tasks/update",
  async (data: any, { dispatch }) => {
    const response = await apiInstance.patch(`/tasks/${data.id}`, {
      title: data.task,
    });
    await dispatch(fetchTasks());
    return response.data;
  }
);

export const deleteTask: any = createAsyncThunk(
  "tasks/delete",
  async (data: { id: number; multiDelete: boolean }, { dispatch }) => {
    const response = await apiInstance.delete(`/tasks/${data.id}`);
    !data.multiDelete && (await dispatch(fetchTasks()));
    return response.data;
  }
);

const initialState = {
  data: [],
  loading: false,
  error: false,
  hasMore: true,
  isActive: false,
  pagination: {
    page: 1,
    limit: 15,
  },
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setPage: (state: any, action: PayloadAction<typeof initialState>) => {
      state.pagination.page = action.payload;
    },
    setPageSize: (state: any, action: PayloadAction<typeof initialState>) => {
      console.log(action.payload, "fffff");
      state.pagination.limit = action.payload;
    },
    setIsActive: (state: any, action: PayloadAction<typeof initialState>) => {
      state.isActive = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action: any) => {
        if (action.payload.length < state.pagination.limit) {
          state.hasMore = false;
        }

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
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Selectors
export const getTasks = (state: { task: any }) => state.task;

// Reducers and actions
export const { setPage, setPageSize, setIsActive } = taskSlice.actions;

export default taskSlice.reducer;
