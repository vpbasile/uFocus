import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function IndexPage() {
    return (<Box>
        <Link to={"groupedCategory"}>Grouped By Category</Link>
    </Box>)
}