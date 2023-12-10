import { useState } from 'react';
import { CameraMode, GraphCanvas } from 'reagraph';

function NetworkPage() {

    const [cameraMode, setCameraMode] = useState<CameraMode>("rotate")

    const n = [
        {
            id: 'n-1',
            label: '1'
        },
        {
            id: 'n-2',
            label: '2'
        },
        {
            id: 'n-3',
            label: '3'
        },
        {
            id: 'n-4',
            label: '4'
        }
    ]

    const e = [
        {
            id: '1->2',
            source: 'n-1',
            target: 'n-2',
            label: 'Edge 1-2'
        }
    ]

    return (
        <div>
            <h1>Network</h1>
            <p>This is the Network page</p>
            <button onClick={() => {setCameraMode("rotate")}}>Rotate</button>
            <button onClick={() => {setCameraMode("pan")}}>Pan</button>

            <div style={{ position: "fixed", width: '75%', height: '75%', border: '2px solid red'}}>
                <GraphCanvas nodes={n} 
                edges={e} 
                layoutType="forceDirected3d" 
                cameraMode={cameraMode} 
                draggable={true}
                edgeArrowPosition="none"
                />
            </div>
        </div>
    );
}

export default NetworkPage;