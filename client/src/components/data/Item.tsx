import {Paper, styled} from "@mui/material";

export const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: 'inherit',
    padding: '1rem 2rem 1rem 2rem',
    lineHeight: '60px',
}));
