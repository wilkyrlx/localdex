import { GraphCanvas } from 'reagraph';

function NetworkPage() {

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
            <div style={{ position: "fixed", width: '75%', height: '75%', border: '2px solid red'}}>
                <GraphCanvas nodes={n} edges={e} layoutType="forceDirected3d" cameraMode="rotate" draggable={true}/>
            </div>
        </div>
    );
}

export default NetworkPage;