import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";
import { componentsModal } from "../../helpers/componentsModal";
import FabAdd from "../ui/FabAdd";
import { Modal } from "../ui/Modal";
import AddUserForm from "./AddUserForm";
import UserList from "./UserList";

const UserScreen = () => {
  console.log("Render <UserScreen />");
  const dispatch = useDispatch();

  const { componentName } = useSelector((state) => state.modal);

  const handleFabClick = () => {
    dispatch(setModal(true, "Add user", componentsModal.usersAdd));
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" marginY={3}>
        Manage users
      </Typography>
      <UserList />
      <FabAdd onClickFunction={handleFabClick} />
      {componentName === componentsModal.usersAdd && (
        <Modal>
          <AddUserForm />
        </Modal>
      )}
    </>
  );
};

export default UserScreen;
