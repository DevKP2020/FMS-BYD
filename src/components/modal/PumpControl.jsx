import Pause from '../../assets/images/pause.png';
import Stop from '../../assets/images/stop.png';
import Lock from '../../assets/images/lock.png';
import Unlock from '../../assets/images/unlock.png';
import { TbAutomation } from "react-icons/tb";
import { PiLockKeyFill } from "react-icons/pi";
import { PiLockKeyOpenFill } from "react-icons/pi";


export default function PumpControl({ setOpenModalPumpControl }) {

    return (

    <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative p-4 w-auto max-w-6xl h-full md:h-auto" style={{ maxHeight: "90vh" }}>
                <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t-xl bg-dark">
                        <h3 className="text-3xl font-semibold text-white">
                            Pump Control
                        </h3>
                        <button
                            className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setOpenModalPumpControl(false)}
                        >
                            x
                        </button>
                    </div>
                    <div className="w-full h-full p-4 bg-grey rounded-b-xl">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex flex-row justify-center items-center w-full h-full px-10 space-x-5">
                                <div className="flex justify-center items-center bg-gray-200 border-4 border-primary w-40 h-36 rounded-lg cursor-pointer">
                                    <TbAutomation size={100} className='object-contain' />
                                    {/* <img
                                        src={Pause}
                                        alt="icon pause"
                                        className="object-contain"
                                        width={100}
                                        height={100}
                                    /> */}
                                </div>
                                <div className="flex justify-center items-center bg-gray-200 border-4 border-primary w-40 h-36 rounded-lg cursor-pointer">
                                    {/* <img
                                        src={Lock}
                                        alt="icon lock"
                                        className="object-contain"
                                        width={100}
                                        height={100}
                                    /> */}
                                    {/* <img
                                        src={Unlock}
                                        alt="icon unlock"
                                        className="object-contain"
                                        width={100}
                                        height={100}
                                    /> */}
                                    <PiLockKeyFill size={100} className='object-contain' />
                                </div>
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