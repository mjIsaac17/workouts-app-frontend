import { Search } from "@mui/icons-material";
import { Alert, Typography, TextField, InputAdornment } from "@mui/material";
import { useState } from "react";
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
  // console.log("Render <UserScreen />");
  const dispatch = useDispatch();

  const { componentName } = useSelector((state) => state.modal);
  const { currentUser } = useSelector((state) => state.user);

  const [filterWord, setFilterWord] = useState("");

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

  const handleSearch = (e) => {
    // Avoid getting error with RegEx because of the '\' escape character
    const search = e.target.value.replace(/\\/g, "\\\\");
    setFilterWord(search);
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" marginY={3}>
        Manage users
      </Typography>
      <div className="flex-box" style={{ justifyContent: "center" }}>
        <TextField
          size="small"
          label="Search"
          onChange={handleSearch}
          placeholder="Filter"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <UserList
        filterWord={filterWord}
        handleEdit={handleEditClick}
        handleDelete={handleOpenDeleteModal}
      />
      <FabAdd onClickFunction={handleFabClick} tooltipText="Add new user" />
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
