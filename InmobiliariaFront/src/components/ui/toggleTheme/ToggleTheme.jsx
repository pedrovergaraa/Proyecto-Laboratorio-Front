import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../../services/themeContext/theme.context";
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

const ToggleTheme = ({ className, isAuthPage }) => {
    const { toggleTheme, theme } = useContext(ThemeContext);

    // Establece las clases adicionales de tema
    const navbarThemeClass = theme === "light" ? "navbar-light" : "navbar-dark";
    const navLinkThemeClass = theme === "light" ? "navLink-light" : "navLink-dark";

    // Estilos en línea para el fondo
    const backgroundStyle = {
        backgroundImage: isAuthPage ? "none" : (theme === "light" 
            ? "url('/src/assets/images/pexels-lkloeppel-466685.jpg')" 
            : "url('/src/assets/images/WhatsApp Image 2024-09-19 at 18.32.27.jpeg')"),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: 0.8,
        transition: "background 0.3s ease"
    };

    return (
        <div style={backgroundStyle}>
            {/* Mantén la estructura original del navbar */}
            <nav className={`navbar ${navbarThemeClass}`}>
                
            </nav>

            <Button className={`theme-toggle-button ${className}`} onClick={toggleTheme}>
                {theme === "light" ? (
                    <ModeNightOutlinedIcon />
                ) : (
                    <WbSunnyOutlinedIcon />
                )}
            </Button>
        </div>
    );
};

export default ToggleTheme;
