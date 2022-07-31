import type { User } from '@/common/types';

interface Props {
  user: User;
  index: number;
}

const UserRow = ({ user, index }: Props) => {
  return (
    <tr key={user.id}>
      <td>
        <div className="font-bold">{index}</div>
      </td>
      <td>
        <div className="font-bold">{user.id}</div>
      </td>
      <td>
        <div className="font-bold">{user.firstName}</div>
      </td>
      <td>
        <div className="font-bold">{user.middleName}</div>
      </td>
      <td>
        <div className="font-bold">{user.lastName}</div>
      </td>
      <td>
        <div className="font-bold">
          {user.address.street && <p>Street: {user.address.street}</p>}
          {user.address.building && <p>Building: {user.address.building}</p>}
          {user.address.city && <span>{user.address.city}, </span>}
          {user.address.state && <span>{user.address.state}</span>}
          {user.address.zipcode && <span> {user.address.zipcode}</span>}
          {user.address.country && <p>Country: {user.address.country}</p>}
        </div>
      </td>
      <td>
        <div className="font-bold">{user.phone}</div>
      </td>
    </tr>
  );
};
export default UserRow;
