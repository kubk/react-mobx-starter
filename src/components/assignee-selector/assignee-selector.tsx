import React from 'react';
import { User } from '../../api/task-api';
import { observer } from 'mobx-react-lite';

type Props = {
  value: string | number;
  onSelect: (userId: string | null) => void;
  users: User[];
};

export const AssigneeSelector = observer(({ onSelect, users, value }: Props) => {
  return (
    <select
      value={value}
      onChange={e => {
        const userId = e.target.value || null;
        onSelect(userId);
      }}
    >
      <option value="">No assignee</option>
      {users.map((user, i) => (
        <option key={i} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
});
