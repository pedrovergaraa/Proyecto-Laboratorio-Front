import { ThemeContext } from "../../../context/themeContext/theme.context";
import { Button } from "react-bootstrap";
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { useContext } from "react";

const ToggleTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Button className="theme-toggle-button" onClick={toggleTheme}>
            {theme === "light" ? <ModeNightOutlinedIcon /> : <WbSunnyOutlinedIcon />}
        </Button>
    );
};

export default ToggleTheme;
