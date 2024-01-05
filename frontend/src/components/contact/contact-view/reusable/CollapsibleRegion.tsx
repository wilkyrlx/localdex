import React, { useState } from 'react';

/**
 * Collapsible region component. Animated
 * @param children - the HTML content to be displayed in the collapsible region. Not passed in as a prop, but as a child of the component.
 * @param regionName - the name of the collapsible region. Used to label the button that expands/collapses the region.
 */
function CollapsibleRegion({ children, regionName }: { children: any, regionName: string }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    function toggleCollapse() {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div >
            <hr></hr>
            <button onClick={toggleCollapse}>
                {isCollapsed ? 'Expand' : 'Collapse'} {regionName}
            </button>
            <div className={`collapsible-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
                <div>{children}</div>
            </div>
            <hr></hr>
        </div>
    );
};

export default CollapsibleRegion;
