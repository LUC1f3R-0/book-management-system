'use client'

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, AppBar, Toolbar, Grid, Card, CardContent, Chip, useScrollTrigger, Slide, Fade, Paper, IconButton, Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { ArrowForward, Star, FlashOn, Security, Language, KeyboardArrowDown } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
}));

const AnimatedBlob = styled(Box)(({ theme, delay = 0 }) => ({
  position: 'absolute',
  width: '320px',
  height: '320px',
  borderRadius: '50%',
  filter: 'blur(40px)',
  opacity: 0.7,
  animation: `pulse 4s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  '@keyframes pulse': {
    '0%, 100%': { opacity: 0.7, transform: 'scale(1)' },
    '50%': { opacity: 0.9, transform: 'scale(1.1)' },
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
  color: 'white',
  borderRadius: '12px',
  padding: '12px 32px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)',
    transform: 'scale(1.05)',
    boxShadow: '0 15px 35px rgba(37, 99, 235, 0.4)',
  },
}));

const GlassCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'highlighted',
})(({ theme, highlighted = false }) => ({
  background: highlighted
    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  backdropFilter: 'blur(10px)',
  border: highlighted ? '2px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
    transform: 'scale(1.05)',
  },
}));


const GlassAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'scrolled',
})(({ theme, scrolled }) => ({
  background: scrolled
    ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%)'
    : 'transparent',
  backdropFilter: scrolled ? 'blur(10px)' : 'none',
  boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
  transition: 'all 0.3s ease',
}));


function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const scrollTrigger = useScrollTrigger({ threshold: 50 });
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FlashOn sx={{ fontSize: 40 }} />,
      title: "Lightning Fast",
      desc: "Optimized performance for the modern web"
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: "Secure by Design",
      desc: "Enterprise-grade security built in"
    },
    {
      icon: <Language sx={{ fontSize: 40 }} />,
      title: "Global Scale",
      desc: "Deploy worldwide with ease"
    }
  ];

  // const ()=>{console.log(login)} = () => {
  //   console.log('Navigating to /login');
  //   alert('In a real Next.js app, this would navigate to /login');
  // };

  // const () => { router.push('/register') } = () => {
  //   console.log('Navigating to /register');
  //   alert('In a real Next.js app, this would navigate to /register');
  // };

  return (
    <GradientBackground>
      {/* Animated background elements */}
      <AnimatedBlob
        sx={{
          top: -160,
          right: -160,
          background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
        }}
      />
      <AnimatedBlob
        sx={{
          bottom: -160,
          left: -160,
          background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
        }}
        delay={1}
      />
      <AnimatedBlob
        sx={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)'
        }}
        delay={2}
      />

      {/* Header */}
      <GlassAppBar position="fixed" scrolled={isScrolled} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <GradientText variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              NextApp
            </GradientText>

            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => { router.push('/login') }}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  '&:hover': { color: '#60a5fa' }
                }}
              >
                Login
              </Button>
              <GradientButton onClick={() => { router.push('/register') }}>
                Get Started
              </GradientButton>
            </Stack>
          </Toolbar>
        </Container>
      </GlassAppBar>

      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ pt: 16, pb: 10 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Fade in timeout={1000}>
            <Box sx={{ mb: 4 }}>
              <Chip
                icon={<Star sx={{ color: '#fbbf24' }} />}
                label="Join 10,000+ developers building the future"
                sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 3,
                  fontSize: '0.9rem',
                  padding: '8px 16px',
                  height: 'auto',
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '5rem' },
                  fontWeight: 'bold',
                  mb: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.1
                }}
              >
                Build Amazing
                <br />
                <GradientText component="span" variant="inherit">
                  Web Experiences
                </GradientText>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 4,
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                The next generation platform for creating scalable, secure, and lightning-fast web applications.
              </Typography>
            </Box>
          </Fade>

          <Fade in timeout={1500}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'center', mb: 8 }}
            >
              <GradientButton
                onClick={() => { router.push('/register') }}
                endIcon={<ArrowForward />}
                size="large"
              >
                Start Building Free
              </GradientButton>

              <Button
                onClick={() => { router.push('/login') }}
                size="large"
                sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                  },
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Fade>

          {/* Stats */}
          <Fade in timeout={2000}>
            <Grid container spacing={4} sx={{ maxWidth: '800px', mx: 'auto' }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
                    10K+
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Active Users
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
                    99.9%
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Uptime
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
                    50+
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Countries
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Fade>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Why Choose NextApp?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Everything you need to build modern web applications, all in one platform.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <GlassCard highlighted={currentFeature === index}>
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      color: currentFeature === index ? '#a855f7' : '#60a5fa',
                      mb: 2,
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: 'white'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.6
                    }}
                  >
                    {feature.desc}
                  </Typography>
                </CardContent>
              </GlassCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Paper
          sx={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            p: 6,
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 4
            }}
          >
            Join thousands of developers building the future with NextApp.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'center' }}
          >
            <GradientButton
              onClick={() => { router.push('/register') }}
              endIcon={<ArrowForward />}
              size="large"
            >
              Create Account
            </GradientButton>
            <Button
              onClick={() => { router.push('/login') }}
              size="large"
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                borderRadius: '12px',
                padding: '12px 32px',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                },
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 6, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Container maxWidth="xl">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <GradientText variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              NextApp
            </GradientText>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              © 2024 NextApp. All rights reserved.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </GradientBackground>
  );
}