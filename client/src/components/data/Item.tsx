import {Paper, styled} from "@mui/material";

export const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: 'inherit',
    padding: '1em 2em 1em 2em',
    lineHeight: '60px',
}));
