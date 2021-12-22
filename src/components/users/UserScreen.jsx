import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { userSetCurrent } from "../../actions/user.action";
import { componentsModal } from "../../helpers/componentsModal";
import FabAdd from "../ui/FabAdd";
import { Modal } from "../ui/Modal";
import AddUserForm from "./AddUserForm";
import UserList from "./UserList";

const UserScreen = () => {
  console.log("Render <UserScreen />");
  const dispatch = useDispatch();

  const { componentName } = useSelector((state) => state.modal);
  const { currentUser } = useSelector((state) => state.user);

  const handleFabClick = () => {
    dispatch(setModal(true, "Add user", componentsModal.userAdd));
  };

  const handleEditClick = (user) => {
    dispatch(userSetCurrent(user));
    dispatch(setModal(true, "Edit user", componentsModal.userEdit));
  };

  const handleDeleteClick = (user) => {
    dispatch(userSetCurrent(user));
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" marginY={3}>
        Manage users
      </Typography>
      <UserList handleEdit={handleEditClick} handleDelete={handleDeleteClick} />
      <FabAdd onClickFunction={handleFabClick} />
      {componentName === componentsModal.userAdd && (
        <Modal>
          <AddUserForm />
        </Modal>
      )}
      {componentName === componentsModal.userEdit && (
        <Modal>
          <AddUserForm user={currentUser} />
        </Modal>
      )}
    </>
  );
};

export default UserScreen;
