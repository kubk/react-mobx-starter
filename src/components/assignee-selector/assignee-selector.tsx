import { User } from "../../api/api";

type Props = {
  value: string | number;
  onChange: (value: { currentTarget: { value: string } }) => void;
  users: User[];
};

export function AssigneeSelector({ onChange, users, value }: Props) {
  return (
    <select value={value} onChange={onChange}>
      <option value="">No assignee</option>
      {users.map((user, i) => (
        <option key={i} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}
