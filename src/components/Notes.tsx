import { ChatIcon } from "@chakra-ui/icons";
import { Box, Icon, Kbd, List, ListItem } from "@chakra-ui/react";
import { nanoid } from "nanoid";


export default function Notes() {
    const notesList = [
        <>When an element is made dragggable, you can no longer highlight the text within that element unless you hold down<Kbd>alt</Kbd>.</>,
        <>No detail panel - each task is a string and may have subtasks. </>,
        <>Recursion will be complicated.  </>,
        <>I'd like to do something about the way Chakra handles lists with icons.  You can't use stylePosition for some reason.  I think I'll need to override the css/emotion</>,
        <>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis earum placeat quis necessitatibus inventore a ab consequuntur magni quas nam consequatur, nisi, minima fugit, delectus veritatis velit. Reiciendis, aut dolores!</>
    ]
    return (<Box>
        <List spacing={3} stylePosition={'inside'}>{notesList.map(eachNote => <ListItem key={nanoid()}><Icon as={ChatIcon} /> {eachNote}</ListItem>)}</List>
    </Box>)
}