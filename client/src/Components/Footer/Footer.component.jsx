import { HStack, Image, Box, Text, Stack } from "@chakra-ui/react";
// import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import twitter from "../../assets/twitter.svg";
import insta from "../../assets/insta.svg";
import linkedin from "../../assets/linkedin.svg";
import medium from "../../assets/medium.svg";

const Footer = () => {
    return (
        <Box borderTop="1px solid #E2E8F0">
            <Stack
                fontSize={["0.8rem", "1rem"]}
                justifyContent="space-between"
                align="center"
                px={24}
                py={4}
                direction={["column", "row"]}
            >
                <HStack className="socials" spacing={5}>
                    <a href="https://twitter.com/parth_sd20_09" target="_blank">
                        <Image src={twitter} boxSize={["20px", "30px"]} />
                    </a>
                    <a href="https://instagram.com/p_t__s_d" target="_blank">
                        <Image src={insta} boxSize={["20px", "30px"]} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/parth-sarathi-dixit/"
                        target="_blank"
                    >
                        <Image src={linkedin} boxSize={["20px", "30px"]} />
                    </a>
                    <a href="https://medium.com/@saarthee" target="_blank">
                        <Image src={medium} boxSize={["20px", "30px"]} />
                    </a>
                </HStack>
                <Text className="footer-text">Design & developed by PSD</Text>
            </Stack>
        </Box>
    );
};

export default Footer;
