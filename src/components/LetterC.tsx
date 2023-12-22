import { Box } from "@mui/material";

interface iLetterC {
    height: string
    margin?: [string, string]
}

const LetterC = ({ height, margin }: iLetterC) => {
    
    const mb = margin ? margin[0] : '';
    const mr = margin ? margin[1] : "";

    return <Box
        className="letter-c-img"
        sx={{
            height: height,
            marginBottom: mb,
            marginRight: mr,
        
    }}
    ></Box>;
}

export default LetterC

// margin-bottom: -1rem;
//     margin-right: -0.75rem;