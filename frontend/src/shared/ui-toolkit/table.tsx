import React from 'react';

interface TableRow {
    x: number;
    y: number;
    r: number;
    result: boolean;
    timestamp: string;
}

interface TableProps {
    data: TableRow[];
}

const ResultTable: React.FC<TableProps> = ({ data }) => {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                <tr>
                    <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>X</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Y</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>R</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Result</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Timestamp</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{row.x}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{row.y}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{row.r}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{row.result ? 'True' : 'False'}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{row.timestamp}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultTable;