import { useState } from "react";
// material-ui
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { auth, db } from "firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "context/UserContext";
// third-party
import * as Yup from "yup";
import { Formik } from "formik";
// project imports
import AnimateButton from "components/extended/AnimateButton";
// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// ============================|| FIREBASE - LOGIN ||============================ //
const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSignIn = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const userUid = userCredential.user.uid;
      const getUserFromCollection = async (collectionName) => {
        const docRef = doc(db, collectionName, userUid);
        const docSnap = await getDoc(docRef);
        return docSnap;
      };
      let userData = null;
      if (values.role === "Students") {
        const student = await getUserFromCollection("Students");
        if (student.exists()) {
          userData = student.data();
        }
      } else if (values.role === "Staff") {
        const staff = await getUserFromCollection("Staff");
        if (staff.exists()) {
          userData = staff.data();
        }
      } else if (values.role === "Admins") {
        const admin = await getUserFromCollection("Admins");
        if (admin.exists()) {
          userData = admin.data();
        }
      }
      if (userData) {
        setUser(userData);
        navigate(`/${values.role.toLowerCase()}/${userData.personalId}`);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          role: "",
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          role: Yup.string().required("שדה חובה"),
          email: Yup.string()
            .email("אימייל לא חוקי")
            .max(255)
            .required("שדה חובה"),
          password: Yup.string().max(255).required("שדה חובה"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleSignIn(values);
          setSubmitting(false);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.role && errors.role)}
              sx={{
                mb: 2,
                ...theme.typography.customInput,
                direction: "ltr",
                textAlign: "left",
              }}
            >
              <InputLabel id="role-select-label" sx={{ mt: -0.7 }}>
                תפקיד
              </InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={values.role}
                name="role"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Role"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      direction: "rtl",
                      textAlign: "right",
                    },
                  },
                }}
                sx={{
                  "& .MuiSelect-select": {
                    textAlign: "right",
                  },
                }}
              >
                <MenuItem value="Students">סטודנט</MenuItem>
                <MenuItem value="Staff">איש סגל</MenuItem>
                <MenuItem value="Admins">ניהול</MenuItem>
              </Select>
              {touched.role && errors.role && (
                <FormHelperText error>{errors.role}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{
                ...theme.typography.customInput,
                direction: "ltr",
                textAlign: "left",
              }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                אימייל
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{
                ...theme.typography.customInput,
                direction: "ltr",
                textAlign: "left",
              }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                סיסמה
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                שכחתי סיסמה
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  התחבר
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};
export default AuthLogin;
