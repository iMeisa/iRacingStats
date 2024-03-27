import {RenderHeaderCellProps} from "react-data-grid";
import React, {createContext, useContext} from "react";


const FilterContext = createContext<Filter | undefined>(undefined);

export default function FilterRenderer<R>({ tabIndex, column, children }: RenderHeaderCellProps<R> & {
    children: (args: { tabIndex: number; filters: Filter }) => React.ReactElement;
}) {
    const filters = useContext(FilterContext)!;
    return (
        <>
            <div>{column.name}</div>
            <div>{children({ tabIndex, filters })}</div>
            {/*{filters.enabled && <div>{children({ tabIndex, filters })}</div>}*/}
        </>
    );
}
