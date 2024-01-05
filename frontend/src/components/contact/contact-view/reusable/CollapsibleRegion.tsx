import React, { useState } from 'react';

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
