import moment from "moment";

const FuelLevelDisplay = ({
    productHeight,
    productColor,
    waterLevel = 0,
    waterColor,
    status = 'Online'
}) => {
    return (
        <div className="w-full relative mx-6 bg-tertiary border-2 border-black h-1/3 rounded-full overflow-hidden">
            {/* Fuel Level */}
            <div
            className={`${productColor} wave-animation`}
            style={{ height: `${productHeight}%`, backgroundColor: productColor }} // Set background color
            />
            {/* Water Level */}
            <div
            className={`${waterColor} wave-animation `}
            style={{ height: `${waterLevel}%`, backgroundColor: waterColor }} // Set background color
            />
            <div className="font-bold text-xl absolute top-0 left-0 right-0 flex items-center justify-center h-full">
                {status === 'Offline' ? 'OFFLINE' : `${parseFloat(productHeight).toFixed(2)}%`}
            </div>
        </div>
    );
};

export default function TankDetail({ tank, setDataDelivery, setOpenModalDelivery, setOpenModalTankDetail }) {

    const productColor = tank?.productHeight <= 10 ? 'bg-red-500' : 'bg-green-500';
    const waterColor = 'bg-blue-500';
    const tankFillingPercentage = tank?.capacity ? ((tank?.productVolume / tank?.capacity) * 100).toFixed(2) : 0;

    const status = getTankStatus(tank?.Alarms)

    const handleTankDelivery = (tank) => {
        setDataDelivery(tank)
        setOpenModalDelivery(true)
        setOpenModalTankDetail(false)
    }

    function getTankStatus(alarms = []) {
        if (!alarms || alarms.length == 0) {
            return {
                text: 'Status Offline',
                color: 'grey'
            }
        }

        if (alarms.some(a => [4, 5].includes(a))) {
            return {
                text: 'Status Danger',
                color: 'red'
            }
        }

        if (alarms.some(a => [2, 3].includes(a))) {
            return {
                text: 'Status Warning',
                color: 'yellow'
            }
        }

        return {
            text: 'Status Normal',
            color: 'green'
        }
    }
    
    return (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-4 w-full max-w-6xl h-full md:h-auto" style={{ maxHeight: "90vh" }}>
                <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t-xl bg-dark">
                        <h3 className="text-3xl font-semibold text-white">
                            Tank Details
                        </h3>
                        <button
                            className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setOpenModalTankDetail(false)}
                        >
                        x
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row w-full h-auto gap-6 p-4 bg-grey rounded-b-xl">
                        <div className="flex flex-col items-center justify-start w-full md:w-1/3 h-auto p-6 gap-20 bg-gray-100 rounded-lg shadow-md">
                            <div className="flex flex-row items-center gap-2 justify-start w-full">
                                <div className="flex flex-col items-center justify-center w-10 h-24 bg-dark rounded-lg p-1 gap-1">
                                    {/* RED */}
                                    <div className={`w-6 h-6 rounded-full ${
                                        status.color == 'red' ? 'bg-red-500' : 'bg-gray-300'
                                    }`}></div>

                                    {/* YELLOW */}
                                    <div className={`w-6 h-6 rounded-full ${
                                        status.color == 'yellow' ? 'bg-yellow-400' : 'bg-gray-300'
                                    }`}></div>

                                    {/* GREEN */}
                                    <div className={`w-6 h-6 rounded-full ${
                                        status.color == 'green' ? 'bg-green-500' : 'bg-gray-300'
                                    }`}></div>
                                </div>
                                <span className="font-bold text-lg">{status.text}</span>
                            </div>
                            <FuelLevelDisplay
                                productHeight={tankFillingPercentage}
                                productVolume={tank?.productVolume}
                                productColor={productColor}
                                waterLevel={tank?.waterLevel}
                                waterColor={waterColor}
                                // status={tank?.status}
                            />
                            <div className="flex flex-row w-full h-12 gap-2">
                                <button
                                    type='button'
                                    className={`flex w-full justify-center items-center rounded-md bg-orange-500 px-3 py-1 text-md text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                                    // onClick={onClick}
                                    >
                                    {'Measurenment'}
                                </button>
                                <button
                                    type='button'
                                    className={`flex w-full justify-center items-center rounded-md bg-blue-500 px-3 py-1 text-md text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                                    onClick={() => handleTankDelivery(tank)}
                                    >
                                    {'Delivery'}
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Tank Details Table */}
                        <div className="flex flex-col w-full md:w-2/3 bg-white shadow-md rounded-lg p-6 gap-6">
                            <div className="flex flex-row w-full h-2/3 gap-6">
                            <table className="w-1/2 border-collapse border-2 border-black">
                                <tbody>
                                    <tr className="text-white bg-dark">
                                        <td className="px-4 py-2 font-semibold capitalize">Tank Status</td>
                                        <td className="px-4 py-2 text-right"></td>
                                    </tr>
                                    <tr className="bg-white border-b-2 border-black">
                                        <td className="px-4 py-2 font-semibold capitalize">Product Vol</td>
                                        <td className="px-4 py-2 text-right">{(tank?.productVolume ?? 0).toFixed(2)} Litres</td>
                                    </tr>
                                    <tr className="bg-white border-b-2 border-black">
                                        <td className="px-4 py-2 font-semibold capitalize">Product Level</td>
                                        <td className="px-4 py-2 text-right">{tank?.productHeight} mm</td>
                                    </tr>
                                    <tr className="bg-white border-b-2 border-black">
                                        <td className="px-4 py-2 font-semibold capitalize">Ullage</td>
                                        <td className="px-4 py-2 text-right">{(tank?.productUllage ?? 0).toFixed(2)} Litres</td>
                                    </tr>
                                    <tr className="bg-white border-b-2 border-black">
                                        <td className="px-4 py-2 font-semibold capitalize">Capacity</td>
                                        <td className="px-4 py-2 text-right">{(tank?.capacity ?? 0).toFixed(2)} Litres</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="w-1/2 border-collapse border-2 border-black">
                                <tbody>
                                    <tr className="px-4 py-2 font-semibold capitalize text-white bg-dark">
                                        <td className="px-4 py-3 w-full font-semibold capitalize">Tank Information</td>
                                        <td className="px-4 py-3"></td>
                                    </tr>
                                    <tr className="bg-white border-b-2 border-black">
                                        <td className="px-4 py-2 font-semibold capitalize">Tank No</td>
                                        <td className="px-4 py-2 text-right">{tank?.probeNumber ?? '0'}</td>
                                    </tr>
                                    <tr className="bg-white border-b-2 border-black">
                                        <td className="px-4 py-2 font-semibold capitalize">Tank Name</td>
                                        <td className="px-4 py-2 text-right">{tank?.tankName ?? 'Undefined'}</td>
                                    </tr>
                                    <tr className="bg-white border-b-2 border-black">
                                        <td className="px-4 py-2 font-semibold capitalize">Product</td>
                                        <td className="px-4 py-2 text-right">{tank?.productName ?? 'Unknown'}</td>
                                    </tr>
                                    <tr className="bg-white border-b-2 border-black">
                                        <td className="px-4 py-2 font-semibold capitalize">Last Update</td>
                                        <td className="px-4 py-2 text-right">{moment(tank?.lastUpdate).format('YYYY-MM-DDTHH:mm:ss')}</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            <div className="flex flex-row w-full h-1/3 gap-6">
                                <table className="w-1/2 border-collapse border-2 border-black">
                                    <tbody>
                                        <tr className="text-white bg-dark">
                                            <td className="px-4 py-2 font-semibold capitalize">Water</td>
                                            <td className="px-4 py-2"></td>
                                        </tr>
                                        <tr className="bg-white border-b-2 border-black">
                                            <td className="px-4 py-2 font-semibold capitalize">Water Vol</td>
                                            <td className="px-4 py-2 text-right">{(tank?.waterVolume ?? 0).toFixed(2)} Litres</td>
                                        </tr>
                                        <tr className="bg-white border-b-2 border-black">
                                            <td className="px-4 py-2 font-semibold capitalize">Water Level</td>
                                            <td className="px-4 py-2 text-right">{tank?.waterHeight ?? 0} mm</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="w-1/2 border-collapse border-2 border-black">
                                    <tbody>
                                        <tr className="text-white bg-dark">
                                            <td className="px-4 py-2 font-semibold capitalize">Temperature</td>
                                            <td className="px-4 py-2"></td>
                                        </tr>
                                        <tr className="bg-white border-b-2 border-black">
                                            <td className="px-4 py-2 font-semibold capitalize">Current</td>
                                            <td className="px-4 py-2 text-right">{(tank?.temperature ?? 0).toFixed(1)}°C</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="opacity-50 fixed z-40"></div>
        </>
    )
}