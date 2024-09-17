import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../../../services/themeContext/theme.context";
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';

const ToggleTheme = ({ className }) => {
    const { toggleTheme, theme } = useContext(ThemeContext);
    return (
        <Button className={className} onClick={toggleTheme} startIcon={<ModeNightOutlinedIcon/>}>  <ModeNightOutlinedIcon style={{ marginRight: '8px', color:"black"}} />
            {theme === "light"} {theme === "light"}</Button>
            // {theme === "light" ? "oscuro" : "claro"} {theme === "light" ? "oscuro" : "claro"}</Button>
        );
};

export default ToggleTheme;