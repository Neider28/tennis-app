import { useCallback, useEffect, useState } from "react";
import { UserData } from "@/interfaces/user";
import { useMyContext } from "@/context/MainContext";
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@nextui-org/react";
import { stateUserColorMap } from "@/utils/statusColorMap";
import { EyeIcon } from "@/icons/EyeIcon";
import { EditIcon } from "@/icons/EditIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import { GetUsers } from "@/services/User";
import { getTokenCookie } from "@/utils/cookie.util";
import UserDetail from "./UserDetail";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function TableUser() {
  const [idUser, setIdUser] = useState<number>(0);
  const [userDetail, setUserDetail] = useState<UserData | undefined>();
  const {
    users,
    setUsers,
    toggleUserDetail,
    setToggleUserDetail,
    toggleEditUser,
    setToggleEditUser,
    toggleDeleteUser,
    setToggleDeleteUser,
  } = useMyContext();

  const columns = [
    {name: "NAME", uid: "name"},
    {name: "ROLE", uid: "role"},
    {name: "STATE", uid: "state"},
    {name: "ACTIONS", uid: "actions"},
  ];

  const renderCell = useCallback((user: UserData, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof UserData];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: user.profileImage}}
            description={user.email}
            name={`${user.firstName} ${user.lastName}`}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm uppercase">{user.role}</p>
          </div>
        );
      case "state":
        return (
          <Chip className="capitalize" color={stateUserColorMap[user.state]} size="sm" variant="flat">
            {user.state}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => {handleDetail(user)}}>
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => {handleEdit(user.id)}}>
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => {handleDelete(user.id)}}>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const handleDetail = (user: UserData) => {
    setToggleUserDetail(!toggleUserDetail)
    setUserDetail(user);
  };

  const handleEdit = (id: number) => {
    setIdUser(id);
    setToggleEditUser(!toggleEditUser);
  };

  const handleDelete = (id: number) => {
    setIdUser(id);
    setToggleDeleteUser(!toggleDeleteUser)
  };

  useEffect(() => {
    try {
      const getDataUsers = async (token: string) => {
        const data = await GetUsers(token);

        setUsers(data);
      };

      const token = getTokenCookie();

      if(token) {
        getDataUsers(token);
      }
    } catch (error) {
      toast.error('There was an error, please try again');
    }
  }, []);

  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users} emptyContent={"No users"}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <UserDetail isActive={toggleUserDetail} user={userDetail}  />
      <EditUser isActive={toggleEditUser} id={idUser} />
      <DeleteUser isActive={toggleDeleteUser} id={idUser} />
      <ToastContainer theme="dark" autoClose={5000} />
    </>
  );
};
