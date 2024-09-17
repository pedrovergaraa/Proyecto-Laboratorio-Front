import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../../services/themeContext/theme.context";
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

const ToggleTheme = ({ className }) => {
    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <Button className={`theme-toggle-button ${className}`} onClick={toggleTheme}>
            {theme === "light" ? (
                <ModeNightOutlinedIcon />
            ) : (
                <WbSunnyOutlinedIcon />
            )}
        </Button>
    );
};

export default ToggleTheme;
