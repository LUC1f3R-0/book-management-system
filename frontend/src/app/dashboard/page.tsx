'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, CircularProgress, Alert } from '@mui/material';
import axiosInstance from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
    username: string;
    email: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axiosInstance('/auth/dashboard');
                setUser(response.data.user);
            } catch (err) {
                setError('You are not logged in. Redirecting to login...');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/auth/logout', { email: user?.email }, { withCredentials: true });
            router.push('/login');
        } catch (err) {
            setError('Failed to logout. Try again.');
        }
    };

    if (loading) {
        return (
            <Container sx={{ mt: 10, textAlign: 'center' }}>
                <CircularProgress />
                <Typography mt={2}>Loading your dashboard...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 10 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Welcome, {user?.username}!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Your email: {user?.email}
            </Typography>

            <Box mt={4}>
                <Button variant="contained" color="error" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Container>
    );
}
