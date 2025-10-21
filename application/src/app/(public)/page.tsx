import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '@/components/public/HeroSection/HeroSection';
import ApplicationPreview from '@/components/public/ApplicationPreview/ApplicationPreview';
import FeatureCards from '@/components/public/FeatureCards/FeatureCards';
import CTASection from '@/components/public/CTASection/CTASection';

/**
 * Home page component
 */
const Home = () => {
  return (
    <Box component="main">
      <HeroSection />
      <ApplicationPreview />
      <FeatureCards />
      <CTASection />
    </Box>
  );
};

export default Home;
