'use client';

import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Alert,
    Stack,
    Paper,
    Link as MuiLink,
} from '@mui/material';
import axiosInstance from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await axiosInstance.post('/auth/login', formData);

            const { message } = response.data;
            setMessage({ type: 'success', text: message || 'Login successful' });

            setTimeout(() => {
                router.push('/dashboard'); // adjust as needed
            }, 1500);
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Login failed';
            setMessage({ type: 'error', text: Array.isArray(msg) ? msg.join(', ') : msg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={3}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        {message && <Alert severity={message.type}>{message.text}</Alert>}

                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>

                        <Typography variant="body2" align="center">
                            Don’t have an account?{' '}
                            <MuiLink href="/register" underline="hover">
                                Register here
                            </MuiLink>
                        </Typography>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}
