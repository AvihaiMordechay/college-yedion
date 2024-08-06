import React from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>

            <Link color="inherit" href="https://www.jce.ac.il/">
                אתר המכללה
            </Link>{' '}

        </Typography>
    );
}

const defaultTheme = createTheme();

const SignIn = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = React.useState('');

    const SelectType = () => {

        const handleChange = (event) => {
            setUserType(event.target.value);
        };

        return (
            <Box >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">התחבר בתור</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userType}
                        label="התחבר בתור"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Students"}>סטודנט</MenuItem>
                        <MenuItem value={"Staff"}>איש סגל</MenuItem>
                        <MenuItem value={"Admins"}>תחזוקה</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('email').length === 0 || data.get('password') === 0 || userType === '') {
            console.log("אנא מלא את כל השדות");
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.get('email'), data.get('password'));
            const userUid = userCredential.user.uid;
            const getUserFromCollection = async (collectionName) => {
                const docRef = doc(db, collectionName, userUid);
                const docSnap = await getDoc(docRef);
                return docSnap;
            };


            if (userType === "Students") {
                const student = await getUserFromCollection('Students');
                if (student.exists()) {
                    navigate(`/students/${student.data().personalId}`);
                }
            } else if (userType === "Staff") {
                const staff = await getUserFromCollection('Staff');
                if (staff.exists()) {
                    navigate(`/staff/${staff.data().personalId}`);
                }
            }
            else if (userType === "Admins") {
                const admin = await getUserFromCollection('Admins');
                if (admin.exists()) {
                    navigate(`/admins/${admin.data().personalId}`);
                }
            }
        }
        catch (err) {
            console.log("שגיאה בהתחברות", err);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url("/static/images/templates/templates-images/sign-in-side-bg.png")',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'left',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            כניסה למכללה
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Box sx={{ direction: 'ltr', textAlign: 'left' }}>
                                <SelectType />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="אימייל"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="סיסמה"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                התחבר
                            </Button>
                            <Grid container>
                                <Grid item xs sx={{ direction: 'rtl' }}>
                                    <Link href="#" variant="body2">
                                        שכחתי סיסמה
                                    </Link>
                                </Grid>

                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export { SignIn };