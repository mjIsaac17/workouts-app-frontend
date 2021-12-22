import { Alert, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { userSetCurrent, userStartDeleting } from "../../actions/user.action";
import { componentsModal } from "../../helpers/componentsModal";
import { ConfirmDelete } from "../ui/ConfirmDelete";
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

  const handleOpenDeleteModal = (user) => {
    dispatch(userSetCurrent(user));
    dispatch(setModal(true, "Delete user", componentsModal.userDelete));
  };

  const handleCloseModal = () => {
    dispatch(setModal());
  };

  const handleDelete = () => {
    dispatch(userStartDeleting(currentUser.id));
    handleCloseModal();
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" marginY={3}>
        Manage users
      </Typography>
      <UserList
        handleEdit={handleEditClick}
        handleDelete={handleOpenDeleteModal}
      />
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
      {componentName === componentsModal.userDelete && (
        <Modal>
          <ConfirmDelete
            handleCancel={handleCloseModal}
            handleDelete={handleDelete}
          >
            <Alert severity="warning">
              Are you sure you want to delete the user{" "}
              <b>
                {currentUser.name} {currentUser.lastname}
              </b>{" "}
              and all its associated data (workouts)?
            </Alert>
          </ConfirmDelete>
        </Modal>
      )}
    </>
  );
};

export default UserScreen;
