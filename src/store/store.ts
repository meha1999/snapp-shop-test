import { configureStore } from '@reduxjs/toolkit';

import taskReducer from 'store/slices/taskSlice';

export default configureStore({
  reducer: {
    task: taskReducer,
  },
});