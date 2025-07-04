import {
    useColorMode,
    useColorModeValue,
    IconButton,
    Tooltip,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ColorModeSwitcher = (props) => {
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue("dark", "light");
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    return (
        <Tooltip label={`Switch to ${text} mode`} hasArrow>
            <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={2}
                onClick={toggleColorMode}
                icon={<SwitchIcon />}
                {...props}
            />
        </Tooltip>
    );
};
