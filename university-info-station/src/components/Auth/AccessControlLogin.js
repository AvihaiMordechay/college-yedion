import React from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>

            <Link color="inherit" href="https://www.jce.ac.il/">
                אתר המכללה
            </Link>{' '}
            {'Copyright © '}
            {new Date().getFullYear()}

        </Typography>
    );
}

const defaultTheme = createTheme();

const AccessConrolSignIn = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.get('email'), data.get('password'));
            const userUid = userCredential.user.uid;
            if (userUid === process.env.REACT_APP_FIREABE_U1_ID) {
                console.log("seccsed");
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        התחבר למנהל הרשאות
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Box sx={{ direction: 'ltr', textAlign: 'left' }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
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
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    שכחתי סיסמה?
                                </Link>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export { AccessConrolSignIn };