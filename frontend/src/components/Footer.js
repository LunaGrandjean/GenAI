import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

// Primary color used for the footer background
const redMain = "#b31b1b";

// Styled internal navigation links (React Router)
const StyledLink = styled(RouterLink)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  textAlign: "center",
  "&:hover": {
    textDecoration: "underline",
    color: "#ffe2e2", // Lighter color on hover
  },
}));

// Styled external links (<a> tags)
const ExternalLink = styled("a")(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  textAlign: "center",
  "&:hover": {
    textDecoration: "underline",
    color: "#ffe2e2",
  },
}));

// Footer component
export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: "auto", // Push footer to bottom
        width: "100%", 
        bgcolor: redMain, // Background color
        color: "white", 
        py: 4 // Padding Y (top and bottom)
      }}
    >
      <Container maxWidth="lg">
        {/* Layout of Footer: Responsive Stack */}
        <Stack
          direction={{ xs: "column", sm: "row" }} // Column on small screens, row on medium+
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
          textAlign="center"
        >
          {/* Section: Quick Links */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <Stack spacing={0.5} alignItems="center">
              <StyledLink to="/">Home</StyledLink>
              <StyledLink to="/HowItWorks">How It Works</StyledLink>
              <StyledLink to="/About">About Us</StyledLink>
            </Stack>
          </Box>

          {/* Section: Account */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>Account</Typography>
            <Stack spacing={0.5} alignItems="center">
              <StyledLink to="/Login">Login</StyledLink>
              <StyledLink to="/Login">Register</StyledLink>
            </Stack>
          </Box>

          {/* Section: Contact and Social Media */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>Connect With Us</Typography>
            <Stack direction="row" spacing={1} justifyContent="center" mt={1}>
              {/* Social media buttons linking to Griffith College pages */}
              <IconButton size="small" sx={{ color: "white" }} component={ExternalLink} href="https://www.facebook.com/GriffithCollegeDublin/" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton size="small" sx={{ color: "white" }} component={ExternalLink} href="https://x.com/griffithcollege" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton size="small" sx={{ color: "white" }} component={ExternalLink} href="https://www.instagram.com/griffithcollege/" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton size="small" sx={{ color: "white" }} component={ExternalLink} href="https://www.youtube.com/@griffithcollege" target="_blank">
                <YouTube />
              </IconButton>
            </Stack>
            {/* Email Contact */}
            <Typography mt={2} variant="body2">
              Email: <ExternalLink href="mailto:international@griffith.ie">international@griffith.ie</ExternalLink>
            </Typography>
            {/* Copyright */}
            <Typography mt={1} variant="body2">
              &copy; 2025 Griffith AI. All rights reserved.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
