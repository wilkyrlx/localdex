import { useState } from 'react';
import { CameraMode, GraphCanvas, LayoutTypes } from 'reagraph';
import generateNetworkEdges from '../../util/contactNetwork/generateEdges';
import dataManager from '../../util/DataManager';
import generateNetworkNodes from '../../util/contactNetwork/generateNodes';

function NetworkPage() {

    const [layoutType, setLayoutType] = useState<LayoutTypes>("forceDirected3d")
    const [cameraMode, setCameraMode] = useState<CameraMode>("rotate")

    // TODO: filter better for performance
    const edges = generateNetworkEdges(dataManager.readContacts())
    const nodes = generateNetworkNodes(dataManager.readContacts()).slice(0, 50)

    function toggle3D() {
        if (layoutType === "forceDirected3d") {
            setLayoutType("forceDirected2d")
        } else {
            setLayoutType("forceDirected3d")
        }
    }

    function toggleCameraMode() {
        if (cameraMode === "rotate") {
            setCameraMode("pan")
        } else {
            setCameraMode("rotate")
        }
    }

    return (
        <div>
            <h1>Network</h1>
            <p>This is the Network page</p>
            <button onClick={toggleCameraMode}>Toggle Camera: {cameraMode}</button>
            <button onClick={toggle3D}>Toggle 3D: {layoutType}</button>

            <div style={{ position: "fixed", width: '75%', height: '75%', border: '2px solid red'}}>
                <GraphCanvas nodes={nodes} 
                edges={edges} 
                layoutType={layoutType} 
                cameraMode={cameraMode} 
                draggable={true}
                edgeArrowPosition="none"
                labelType='nodes'
                />
            </div>
        </div>
    );
}

export default NetworkPage;