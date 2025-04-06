import { Box } from "@mui/material"
import { ReactNode } from "react"



const HighlightText = (props: { children: ReactNode }) => {
  return <Box component='span' sx={{ backgroundColor: 'conquiYellow.main', borderRadius: 10, }}>
    {props.children}
  </Box>

}

export default HighlightText;