import { Save } from "@mui/icons-material";
import {
  Stack,
  Button,
  TextField,
  Grid,
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";
import {
  startAddingUser,
  startUpdatingUser,
  userStartGettingRoles,
} from "../../actions/user.action";

const initialFormError = {
  name: null,
  lastname: null,
  email: null,
  role_id: null,
  password: null,
  confirmPassword: null,
};

const AddUserForm = ({ user }) => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.user);
  const [formError, setFormError] = useState(initialFormError);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get("name").trim(),
      lastname: formData.get("lastname").trim(),
      email: formData.get("email").trim(),
      role_id: formData.get("role_id"),
    };
    if (!user) {
      userData.password = formData.get("password");
      userData.confirmPassword = formData.get("confirmPassword");
    }

    if (isFormValid(userData)) {
      if (!user) {
        delete userData.confirmPassword;
        dispatch(startAddingUser(userData));
      } else {
        dispatch(startUpdatingUser({ ...userData, id: user.id }));
      }
      dispatch(setModal());
    }
  };

  const isFormValid = (userData) => {
    let errorFlag = false;
    const errors = { ...initialFormError };

    if (userData.name === "") {
      errors.name = "Invalid user name";
      errorFlag = true;
    }

    if (userData.lastname === "") {
      errors.lastname = "Invalid last name";
      errorFlag = true;
    }

    if (userData.email === "") {
      errors.email = "Invalid email";
      errorFlag = true;
    }

    if (userData.role_id === "0") {
      errors.role_id = "Select a valid role";
      errorFlag = true;
    }

    // Add password if it is a new user
    if (!user) {
      if (userData.password === "") {
        errors.password = "Invalid password";
        errorFlag = true;
      } else if (userData.password !== userData.confirmPassword) {
        errors.confirmPassword = "Passwords must match";
        errorFlag = true;
      }
    }

    setFormError(errors);

    if (errorFlag) return false; //invalid form

    //Form is valid
    return true;
  };

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
          defaultValue={user?.name}
          error={!!formError.userName}
          fullWidth
          helperText={formError.userName}
          label="User name"
          name="name"
          required
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          defaultValue={user?.lastname}
          error={!!formError.lastname}
          fullWidth
          helperText={formError.lastname}
          label="Last name"
          name="lastname"
          required
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          defaultValue={user?.email}
          error={!!formError.email}
          fullWidth
          helperText={formError.email}
          label="Email"
          name="email"
          required
          size="small"
          type="email"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth error={!!formError.role_id}>
          <InputLabel>Role *</InputLabel>
          {roles && (
            <Select
              required
              size="small"
              defaultValue={user ? user.role_id : 0}
              name="role_id"
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
          <FormHelperText>{formError.role_id}</FormHelperText>
        </FormControl>
      </Grid>
      {!user && (
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              error={!!formError.password}
              fullWidth
              helperText={formError.password}
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
              helperText={formError.confirmPassword}
              label="Confirm password"
              name="confirmPassword"
              required
              size="small"
              type="password"
            />
          </Grid>
        </>
      )}
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
