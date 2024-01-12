import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector, GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import useIsMobile from "../../hooks/useIsMobile.ts";

export default function StatsGridToolbar() {
    const isMobile = useIsMobile()
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            {isMobile ?
                <></> :
                <GridToolbarExport/>
            }
        </GridToolbarContainer>
    );
}
