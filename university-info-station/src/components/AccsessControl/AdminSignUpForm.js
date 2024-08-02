import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import validator from 'validator';
import zxcvbn from 'zxcvbn';
import { auth } from '../../firebase'; // Adjust the path according to your project structure
import { createUserWithEmailAndPassword } from 'firebase/auth';



const AdminSignUpForm = () => {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const [passwordStrength, setPasswordStrength] = React.useState(0);
    const [showPassword, setShowPassword] = React.useState(false);

    const validate = (data) => {
        const newErrors = {};

        if (!data.get('firstName') || /\d/.test(data.get('firstName'))) {
            newErrors.firstName = 'שם פרטי לא תקין';
        }

        if (!data.get('lastName') || /\d/.test(data.get('lastName'))) {
            newErrors.lastName = 'שם משפחה לא תקין';
        }

        if (!validator.isEmail(data.get('email'))) {
            newErrors.email = 'אימייל לא תקין';
        }

        if (!validator.isMobilePhone(data.get('phone'), 'he-IL')) {
            newErrors.phone = 'טלפון לא תקין';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'הסיסמאות אינן תואמות';
        }

        if (zxcvbn(password).score < 2) {
            newErrors.password = 'הסיסמה חלשה מדי';
        }

        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newErrors = validate(data);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } else {
            setErrors({});
            const adminStructure = {
                id: "",
                firstName: data.get("firstName"),
                lastName: data.get("lasrName"),
                email: data.get('email'),
                phone: data.get('phone')
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, data.get('email'), password);
                adminStructure.id = userCredential.user.uid;

            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: 'האימייל כבר קיים במערכת'
                    }));
                } else {
                    console.error('Error creating user:', error.message);
                    // Handle other errors if needed
                }
            }

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
        <Container maxWidth="sm" >
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
                        />
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
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="סיסמה"
                            type={showPassword ? 'text' : 'password'}
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
                        />
                        {password && (
                            <Typography variant="body2">
                                חוזק סיסמה: {['חלשה מאוד', 'חלשה', 'בינונית', 'חזקה', 'חזקה מאוד'][passwordStrength]}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="confirmPassword"
                            label="אמת סיסמה"
                            type={showPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            autoComplete="new-password"
                            onChange={handleConfirmPasswordChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}

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
        </Container>
    );
};

export { AdminSignUpForm };
