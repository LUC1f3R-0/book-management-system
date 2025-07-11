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

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
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
            const response = await axiosInstance.post('/auth/register', formData);
            const { message } = response.data;

            setMessage({ type: 'success', text: message || 'Registered successfully' });
            setFormData({ username: '', email: '', password: '' });

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Registration failed';
            setMessage({ type: 'error', text: Array.isArray(msg) ? msg.join(', ') : msg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Stack spacing={3}>
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
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
                            helperText="Must contain uppercase, lowercase, number, and special character"
                        />

                        {message && (
                            <Alert severity={message.type}>
                                {message.text}
                                {message.type === 'success' && (
                                    <>
                                        {' '}
                                        — <MuiLink href="/login" underline="hover" sx={{ color: 'inherit' }}>Login Now</MuiLink>
                                    </>
                                )}
                            </Alert>
                        )}

                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}
