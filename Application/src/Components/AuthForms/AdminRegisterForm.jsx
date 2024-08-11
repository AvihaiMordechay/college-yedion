import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import validator from "validator";
import zxcvbn from "zxcvbn";
import { db, functions } from "firebase";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText"; // Import FormHelperText

const AdminRegisterForm = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [passwordStrength, setPasswordStrength] = React.useState(0);
  const [gender, setGender] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const validate = (data) => {
    const newErrors = {};

    if (!data.get("firstName") || /\d/.test(data.get("firstName"))) {
      newErrors.firstName = "שם פרטי לא תקין";
    }

    if (!data.get("lastName") || /\d/.test(data.get("lastName"))) {
      newErrors.lastName = "שם משפחה לא תקין";
    }

    if (!data.get("personalId") || !/^\d+$/.test(data.get("personalId"))) {
      newErrors.personalId = "תעודת זהות לא תקינה";
    }

    if (!gender) {
      newErrors.gender = "אנא בחר מגדר";
    }

    if (!validator.isEmail(data.get("email"))) {
      newErrors.email = "אימייל לא תקין";
    }

    if (!validator.isMobilePhone(data.get("phone"), "he-IL")) {
      newErrors.phone = "טלפון לא תקין";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "הסיסמאות אינן תואמות";
    }

    if (zxcvbn(password).score < 2) {
      newErrors.password = "הסיסמה חלשה מדי";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setSnackbarMessage("אנא המתן...");
    setSnackbarSeverity("info");
    setOpenSnackbar(true);

    const newErrors = validate(data);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setOpenSnackbar(false);
      return;
    } else {
      // אם אין שגיאות, המשך עם תהליך ההוספה של המשתמש
      setErrors({});
      const adminStructure = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        gender,
        email: data.get("email"),
        phone: data.get("phone"),
        roles: ["admin-lvl-1"], // TODO: HANDLE IT AND DEFINE WHAT THE LEVEL TO START WITH.
      };

      try {
        const addAdminUserAuth = httpsCallable(functions, "addAdminUserAuth");
        const user = await addAdminUserAuth({
          personalId: data.get("personalId"), // שולח את ה-ID האישי
          email: data.get("email"),
          password: data.get("password"),
        });
        // Create a document for the user in the 'Admins' collection using personalId as the document ID
        const userDocRef = doc(db, "Admins", data.get("personalId"));
        await setDoc(userDocRef, adminStructure);

        // Create an empty 'Messages' collection for the user
        const messagesCollectionRef = collection(userDocRef, "Messages");

        const incomingMessagesRef = doc(messagesCollectionRef, "incoming");

        const incomingMessagesCollectionRef = collection(
          incomingMessagesRef,
          "incomingMessages"
        );

        const incomingWelcomeMesseageRef = doc(
          incomingMessagesCollectionRef,
          "welcomeMessage"
        );
        await setDoc(incomingWelcomeMesseageRef, {
          content: "Welcome incoming message",
        });

        const outcomingMessagesRef = doc(messagesCollectionRef, "outcoming");

        const outcomingMessagesCollectionRef = collection(
          outcomingMessagesRef,
          "outcomingMessages"
        );

        const outcomingWelcomeMessageDocRef = doc(
          outcomingMessagesCollectionRef,
          "welcomeMessage"
        );
        await setDoc(outcomingWelcomeMessageDocRef, {
          content: "Welcome outcoming message",
        });

        setPassword("");
        setConfirmPassword("");
        setGender("");
        setPasswordStrength(0);
        setErrors({});

        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("personalId").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
        document.getElementById("phone").value = "";

        setSnackbarMessage("המשתמש נוצר בהצלחה");
        setSnackbarSeverity("success");
      } catch (error) {
        console.log(error.code);
        if (error.code === "functions/already-exists") {
          if (error.message.includes("email-already-exists")) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "האימייל כבר קיים במערכת",
            }));
          } else if (error.message.includes("uid-already-exists")) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              personalId: "תעודת זהות כבר קיימת במערכת",
            }));
          }
        } else if (error.code === "permission-denied") {
          setSnackbarMessage("אין לך הרשאה להוסיף משתמש זה");
          setSnackbarSeverity("error");
        } else {
          console.error("Error creating user:", error.message);
          setSnackbarMessage("שגיאה בהוספה, אנא נסה שנית מאוחר יותר");
          setSnackbarSeverity("error");
        }
        handleSnackbarClose();
      }
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(zxcvbn(newPassword).score);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ direction: "ltr", textAlign: "left" }}>
      <Typography component="h1" variant="h5" align="center">
        הוספת מנהל אתר
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="שם פרטי"
              autoFocus
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={{ direction: "ltr", textAlign: "left" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="שם משפחה"
              name="lastName"
              autoComplete="family-name"
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={{ direction: "ltr", textAlign: "left" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="personalId"
              label="תעודת זהות"
              name="personalId"
              autoComplete="off"
              error={!!errors.personalId}
              helperText={errors.personalId}
              sx={{ direction: "ltr", textAlign: "left" }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required error={!!errors.gender}>
              <InputLabel id="gender-label">מגדר</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={gender}
                label="מגדר"
                onChange={handleGenderChange}
              >
                <MenuItem value="male">זכר</MenuItem>
                <MenuItem value="female">נקבה</MenuItem>
              </Select>
              <FormHelperText>{errors.gender}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="אימייל"
              name="email"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email}
              sx={{ direction: "ltr", textAlign: "left" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="סיסמה"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ direction: "ltr", textAlign: "left" }}
            />
            {password && (
              <Typography variant="body2">
                חוזק סיסמה:{" "}
                {
                  ["חלשה מאוד", "חלשה", "בינונית", "חזקה", "חזקה מאוד"][
                    passwordStrength
                  ]
                }
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="אמת סיסמה"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              onChange={handleConfirmPasswordChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{ direction: "ltr", textAlign: "left" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phone"
              label="טלפון"
              name="phone"
              autoComplete="tel"
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{ direction: "ltr", textAlign: "left" }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              הוסף מנהל
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={snackbarSeverity === "info" ? null : 3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export { AdminRegisterForm };
