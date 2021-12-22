import { Save } from "@mui/icons-material";
import {
  Stack,
  Button,
  TextField,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";
import {
  startAddingUser,
  userStartGettingRoles,
} from "../../actions/user.action";

const initialFormError = {
  name: null,
  lastname: null,
  email: null,
  password: null,
};

const AddUserForm = ({ user }) => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.user);
  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get("name").trim(),
      lastname: formData.get("lastname").trim(),
      email: formData.get("email").trim(),
      role: formData.get("role"),
      password: formData.get("password").trim(),
      confirmPassword: formData.get("confirmPassword").trim(),
    };

    if (isFormValid(userData)) {
      delete userData.confirmPassword;
      dispatch(startAddingUser(userData));
      dispatch(setModal());
    }
  };

  const isFormValid = (userData) => {
    let errorFlag = false;

    if (userData.name === "") {
      setFormError({ ...formError, name: "Invalid user name" });
      errorFlag = true;
    }

    if (userData.lastname === "") {
      setFormError({ ...formError, lastname: "Invalid last name" });
      errorFlag = true;
    }

    if (userData.email === "") {
      setFormError({ ...formError, email: "Invalid email" });
      errorFlag = true;
    }

    if (userData.password === "") {
      setFormError({ ...formError, password: "Invalid password" });
      errorFlag = true;
    } else if (userData.password !== userData.confirmPassword) {
      setFormError({ ...formError, confirmPassword: "Passwords must match" });
      errorFlag = true;
    }

    if (errorFlag) return false; //invalid form

    //Form is valid
    setFormError(initialFormError);
    return true;
  };
  const [formError, setFormError] = useState(initialFormError);

  useEffect(() => {
    if (!roles) {
      console.log("Effect load roles");
      dispatch(userStartGettingRoles());
    }
  }, [dispatch, roles]);

  return (
    <Grid
      component="form"
      container
      spacing={2}
      onSubmit={handleSubmit}
      sx={{ marginTop: "0.5rem" }}
    >
      <Grid item xs={12} sm={6}>
        <TextField
          defaultValue={user ? user.name : ""}
          error={!!formError.userName}
          fullWidth
          helperText={formError.userName ? formError.userName : ""}
          label="User name"
          name="name"
          required
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          defaultValue={user ? user.lastname : ""}
          error={!!formError.lastname}
          fullWidth
          helperText={formError.lastname ? formError.lastname : ""}
          label="Last name"
          name="lastname"
          required
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          defaultValue={user ? user.email : ""}
          error={!!formError.email}
          fullWidth
          helperText={formError.email ? formError.email : ""}
          label="Email"
          name="email"
          required
          size="small"
          type="email"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Role *</InputLabel>
          {roles && (
            <Select
              required
              size="small"
              defaultValue={user ? user.role_id : 0}
              name="role"
              label="Role *"
            >
              <MenuItem value={0}>Select role</MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.role}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          error={!!formError.password}
          fullWidth
          helperText={formError.password ? formError.password : ""}
          label="Password"
          name="password"
          required
          size="small"
          type="password"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          error={!!formError.confirmPassword}
          fullWidth
          helperText={
            formError.confirmPassword ? formError.confirmPassword : ""
          }
          label="Confirm password"
          name="confirmPassword"
          required
          size="small"
          type="password"
        />
      </Grid>
      <Grid item xs={12} sx={{ marginTop: "2rem" }}>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="contained"
            color="info"
            onClick={() => dispatch(setModal(false))}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            endIcon={<Save />}
            color="success"
            type="submit"
          >
            Save
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AddUserForm;
