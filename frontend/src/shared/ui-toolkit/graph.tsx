import React, {useState} from 'react';
import {useTheme} from "next-themes";
import {Button} from "@/shared/ui-toolkit/button";
import {useTokenRotation} from "@/app/utilities/providers/auth-provider/useTokenRotation";
import {checkCoordinates} from "@/app/utilities/providers/auth-provider/api-layer";

interface GraphProps {
    R: number;
    points: Point[];
    setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
}

interface Point {
    x: number;
    y: number;
    r: number;
    hit: boolean;
    timestamp?: string;
}

const Graph: React.FC<GraphProps> = ({R, setPoints, points}) => {
    const handleCanvasClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (((event.clientX - rect.left) / rect.width) * 12 - 6);
        const y = -(((event.clientY - rect.top) / rect.height) * 12 - 6);
        setPoints(prevPoints => [...prevPoints, {
            x: x,
            y: -y,
            r: R,
            hit: isPointInGraph(x,-y,R),
            timestamp: new Date().toLocaleString()
        }]);
        console.log(`Point clicked: (x: ${x.toFixed(2)}, y: ${y.toFixed(2)}, R: ${R})`);
    };

    const {theme} = useTheme();
    const fontColor = theme === 'light' ? 'black' : 'white';
    const backgroundColor = theme === 'light'
        ? 'rgba(255, 255, 255, 0.8)'
        : 'rgba(10, 10, 10, 0.8)';
    const {hitColor, missColor} = theme === 'light' ? {hitColor: 'green', missColor: 'red'} : {
        hitColor: 'green',
        missColor: 'red'
    };
    const graphColor = theme === 'light' ? 'gray' : 'gray';

    return (
        <svg width="500" height="500" viewBox="-6 -6 12 12" xmlns="http://www.w3.org/2000/svg" className="mx-auto"
             style={{
                 backgroundColor: backgroundColor,
                 color: backgroundColor,
             }}
             onClick={handleCanvasClick}>

            {points.map((point, index) => (
                <circle key={index} cx={point.x} cy={point.y} r="0.1" fill={point.hit ? hitColor : missColor}/>
            ))}

            <line x1="-5" y1="0" x2="5" y2="0" stroke={fontColor} strokeWidth="0.08"/>
            <line x1="0" y1="5" x2="0" y2="-5" stroke={fontColor} strokeWidth="0.08"/>

            <polygon points="5,0 4.85,-0.15 4.85,0.15" fill={fontColor}/>
            <polygon points="0,-5 -0.15,-4.85 0.15,-4.85" fill={fontColor}/>

            <line x1={-R} y1="-0.1" x2={-R} y2="0.1" stroke="black" strokeWidth="0.05"/>
            <line x1={-R / 2} y1="-0.1" x2={-R / 2} y2="0.1" stroke="black" strokeWidth="0.05"/>
            <line x1={R} y1="-0.1" x2={R} y2="0.1" stroke="black" strokeWidth="0.05"/>
            <line x1={R / 2} y1="-0.1" x2={R / 2} y2="0.1" stroke="black" strokeWidth="0.05"/>

            <line x1={-5} y1="-0.1" x2={-5} y2="0.1" stroke="black" strokeWidth="0.05"/>
            <line x1={5} y1="-0.1" x2={5} y2="0.1" stroke="black" strokeWidth="0.05"/>
            <line x1="-0.1" y1={-5} x2="0.1" y2={-5} stroke="black" strokeWidth="0.05"/>
            <line x1="-0.1" y1={5} x2="0.1" y2={5} stroke="black" strokeWidth="0.05"/>

            <line x1="-0.1" y1={-R} x2="0.1" y2={-R} stroke="black" strokeWidth="0.05"/>
            <line x1="-0.1" y1={-R / 2} x2="0.1" y2={-R / 2} stroke="black" strokeWidth="0.05"/>
            <line x1="-0.1" y1={R} x2="0.1" y2={R} stroke="black" strokeWidth="0.05"/>
            <line x1="-0.1" y1={R / 2} x2="0.1" y2={R / 2} stroke="black" strokeWidth="0.1"/>

            <text x="5.35" y="0.1" fontSize="0.4" textAnchor="middle" fill={fontColor}>X</text>
            <text x="0" y="-5.3" fontSize="0.4" textAnchor="middle" fill={fontColor}>Y</text>

            <text x={-R} y="0.5" fontSize="0.4" textAnchor="middle" fill={fontColor}>-{R}</text>
            <text x={-R / 2} y="0.5" fontSize="0.4" textAnchor="middle" fill={fontColor}>-{R / 2}</text>
            <text x={R} y="0.5" fontSize="0.4" textAnchor="middle" fill={fontColor}>{R}</text>
            <text x={R / 2} y="0.5" fontSize="0.4" textAnchor="middle" fill={fontColor}>{R / 2}</text>

            <text x={5} y="0.5" fontSize="0.4" textAnchor="middle" fill={fontColor}>5</text>
            <text x="0.4" y={-5 + 0.1} fontSize="0.4" textAnchor="middle" fill={fontColor}>5</text>
            <text x={-5} y="0.5" fontSize="0.4" textAnchor="middle" fill={fontColor}>-5</text>
            <text x="0.4" y={5 + 0.1} fontSize="0.4" textAnchor="middle" fill={fontColor}>-5</text>

            <text x="0.4" y={-R + 0.1} fontSize="0.4" textAnchor="middle" fill={fontColor}>{R}</text>
            <text x="0.3" y={-R / 2 + 0.1} fontSize="0.4" textAnchor="right" fill={fontColor}>{R / 2}</text>
            <text x="0.3" y={R / 2 + 0.1} fontSize="0.4" textAnchor="right" fill={fontColor}>-{R / 2}</text>
            <text x="0.4" y={R + 0.1} fontSize="0.4" textAnchor="middle" fill={fontColor}>-{R}</text>

            <path
                d={`
                  M 0 ${R} 
                  L ${-R / 2} ${R} 
                  L ${-R / 2} 0 
                  L 0 0 
                  Z
                  M 0 0
                  L ${-R / 2} 0
                  L 0 ${-R / 2}
                  Z
                  M 0 ${-R / 2}
                  A ${R / 2} ${R / 2} 0 0 1 ${R / 2} 0
                  L 0 0
                  Z
                  `}
                fill={graphColor}
                opacity={0.5}
            />
        </svg>
    );
};

const GraphWithInput: React.FC = () => {
    const [R, setR] = useState(5);
    const [X, setX] = useState(0);
    const [Y, setY] = useState(0);
    const [points, setPoints] = useState<Point[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 10;
    const totalPages = Math.ceil(points.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = points.slice(startIndex, startIndex + rowsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleSend = () => {
        setPoints(prevPoints => [...prevPoints, {x: X, y: Y, r: R, hit: isPointInGraph(X,Y,R), timestamp: new Date().toLocaleString()}]);
    };

    const { accessToken } = useTokenRotation();

    return (
        <div>
            <div className="flex flex-row items-start gap-4">
                <div className="flex flex-col items-start gap-4">
                    {/* Slider for X */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">X:</label>
                        <input
                            type="range"
                            min="-2"
                            max="2"
                            step="0.5"
                            value={X}
                            onChange={(e) => setX(parseFloat(e.target.value))}
                            className="w-48 transition-all duration-300 ease-in-out"
                        />
                        <span className="text-sm text-gray-500">{X.toFixed(1)}</span>
                    </div>
                    <div className="relative w-48 h-4 mb-4 ml-5">
                        <div className="absolute w-full h-0.5 bg-gray-400 top-1/2 transform -translate-y-1/2"></div>
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className="absolute w-0.5 h-3 bg-gray-500"
                                style={{left: `${(i / 4) * 100}%`}}
                            />
                        ))}
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={`label-${i}`}
                                className="absolute text-xs text-gray-500"
                                style={{left: `${(i / 4) * 100}%`, transform: 'translateX(-50%)', top: '1rem'}}
                            >
            {i - 2}
        </span>
                        ))}
                    </div>

                    {/* Slider for Y */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Y:</label>
                        <input
                            type="range"
                            min="-5"
                            max="5"
                            step="1"
                            value={Y}
                            onChange={(e) => setY(parseFloat(e.target.value))}
                            className="w-48 transition-all duration-300 ease-in-out"
                        />
                        <span className="text-sm text-gray-500">{Y.toFixed(1)}</span>
                    </div>
                    <div className="relative w-48 h-4 mb-4 ml-5">
                        <div className="absolute w-full h-0.5 bg-gray-400 top-1/2 transform -translate-y-1/2"></div>
                        {[...Array(11)].map((_, i) => (
                            <span
                                key={i}
                                className="absolute w-0.5 h-3 bg-gray-500"
                                style={{left: `${(i / 10) * 100}%`}}
                            />
                        ))}
                        {[...Array(11)].map((_, i) => (
                            <span
                                key={`label-${i}`}
                                className="absolute text-xs text-gray-500"
                                style={{left: `${(i / 10) * 100}%`, transform: 'translateX(-50%)', top: '1rem'}}
                            >
            {i - 5}
        </span>
                        ))}
                    </div>

                    {/* Slider for R */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">R:</label>
                        <input
                            type="range"
                            min="2"
                            max="5"
                            step="0.5"
                            value={R}
                            onChange={(e) => setR(parseFloat(e.target.value))}
                            className="w-48 transition-all duration-300 ease-in-out"
                        />
                        <span className="text-sm text-gray-500">{R.toFixed(1)}</span>
                    </div>
                    <div className="relative w-48 h-4 mb-4 ml-5">
                        <div className="absolute w-full h-0.5 bg-gray-400 top-1/2 transform -translate-y-1/2"></div>
                        {[...Array(7)].map((_, i) => (
                            <span
                                key={i}
                                className="absolute w-0.5 h-3 bg-gray-500"
                                style={{left: `${(i / 6) * 100}%`}}
                            />
                        ))}
                        {[2, 2.5, 3, 3.5, 4, 4.5, 5].map((label, i) => (
                            <span
                                key={`label-${i}`}
                                className="absolute text-xs text-gray-500"
                                style={{left: `${(i / 6) * 100}%`, transform: 'translateX(-50%)', top: '1rem'}}
                            >
            {label}
        </span>
                        ))}
                    </div>

                    {/* Send button */}
                    <Button variant='default' className='ml-9 scale-125 mt-5 w-40' type='button' onClick={handleSend}>
                        Calculate!
                    </Button>
                </div>

                <Graph R={R} points={points} setPoints={setPoints}/>
            </div>

            <div style={{overflowX: 'auto'}}>
                <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                    <thead>
                    <tr>
                        <th style={{padding: '8px', borderBottom: '1px solid #ddd'}}>X</th>
                        <th style={{padding: '8px', borderBottom: '1px solid #ddd'}}>Y</th>
                        <th style={{padding: '8px', borderBottom: '1px solid #ddd'}}>R</th>
                        <th style={{padding: '8px', borderBottom: '1px solid #ddd'}}>Result</th>
                        <th style={{padding: '8px', borderBottom: '1px solid #ddd'}}>Timestamp</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((row, index) => (
                        <tr key={index}>
                            <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{row.x}</td>
                            <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{row.y}</td>
                            <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{row.r}</td>
                            <td style={{
                                padding: '8px',
                                borderBottom: '1px solid #ddd'
                            }}>{row.hit ? 'True' : 'False'}</td>
                            <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{row.timestamp}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        style={{padding: '5px 10px', marginRight: '10px'}}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        style={{padding: '5px 10px', marginLeft: '10px'}}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

function isPointInGraph(x: number, y: number, r: number): boolean {
    // Check if the point lies within the rectangle part
    if (x >= -r / 2 && x <= 0 && y <= 0 && y >= -r) {
        return true;
    }

    // Check if the point lies within the triangle part
    if (x >= -r / 2 && x <= 0 && y >= 0 && y <= (x + r / 2)) {
        return true;
    }

    // Check if the point lies within the quarter circle part
    if (x >= 0 && y >= 0 && (x * x + y * y <= (r / 2) * (r / 2))) {
        return true;
    }

    // If none of the conditions are met, the point is outside the shape
    return false;
}


export default GraphWithInput;