import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuditEntry } from '../../types/AuditEntry';

interface AuditState {
  logs: AuditEntry[];
}

const initialState: AuditState = {
  logs: [],
};

const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    addAuditEntry: (state, action: PayloadAction<AuditEntry>) => {
      // Agregamos la nueva auditoría al inicio del arreglo
      state.logs.unshift(action.payload);
    },
  },
});

export const { addAuditEntry } = auditSlice.actions;
export default auditSlice.reducer;