import PumpError from '../../assets/images/pumps/nozzle-pertamax-turbo-not_responding.png';
import PumpIdle from '../../assets/images/pumps/nozzle-pertamax-turbo-idle.png';
import PumpNotAllowed from '../../assets/images/pumps/nozzle-pertamax-turbo-not_allowed.png';
import PumpCalling from '../../assets/images/pumps/nozzle-pertamax-turbo-calling.png';
import PumpAuth from '../../assets/images/pumps/nozzle-pertamax-turbo-authorising.png';
import PumpCompleted from '../../assets/images/pumps/nozzle-pertamax-turbo-completed.png';
import PumpDelivering from '../../assets/images/pumps/nozzle-pertamax-turbo-delivering.png';
import PumpDeliveFinish from '../../assets/images/pumps/nozzle-pertamax-turbo-delivery_finished.png';
import PumpDelivePaused from '../../assets/images/pumps/nozzle-pertamax-turbo-delivering_locked.png';
import PumpUndefinedError from '../../assets/images/pumps/nozzle-pertamax-turbo-undefinederror.png';
import PumpLocked from '../../assets/images/pumps/nozzle-pertamax-turbo-blocked.png';

export default function Pump({ width = 86, height = 86, num, pump }) {

    // function cardColor(pump) {
    //     const validState = !["LOCKED", "IDLE", "ERROR", "NOT-ALLOWED"].includes(pump.state);

    //     if (pump.state == "OFFLINE") {
    //         return "px-4 py-4 hover:bg-red-500 cursor-pointer border-2 border-black rounded-xl shadow-lg h-auto";
    //     } else if(validState) {
    //         return "px-4 py-4 hover:bg-green-500 cursor-pointer border-2 border-black rounded-xl shadow-lg h-auto";
    //     }

    //     return "px-4 py-4 bg-white hover:bg-slate-200 cursor-pointer border-2 border-black rounded-xl shadow-lg h-auto";
    // }

    // function pumpActive(pump){
    //     return !["LOCKED", "IDLE", "ERROR", "NOT-ALLOWED", "OFFLINE"].includes(pump.state) ? "mb-2 flex justify-center" : "mb-2 flex justify-center";
    // }

    function getState(pump) {
        let nozzleImage;

        switch (pump?.state) {
            case 'AUTHORISING':
            case 'AUTHORISED':
                nozzleImage = PumpAuth;
                break;
            case 'LOCKED':
                nozzleImage = PumpLocked;
                break;
            case 'FUELLING':
                nozzleImage = PumpDelivering;
                break;
            case 'DELIVERY-FINISHED':
                nozzleImage = PumpDeliveFinish;
                break;
            case 'CANCELLED':
                nozzleImage = PumpCalling;
                break;
            case 'COMPLETED':
                nozzleImage = PumpCompleted;
                break;
            case 'NOT-ALLOWED':
                nozzleImage = PumpNotAllowed;
                break;
            case 'IDLE':
                nozzleImage = PumpIdle;
                break;
            case 'ERROR':
            case 'OFFLINE':
                nozzleImage = PumpError;
                break;
            case 'PAUSE':
                nozzleImage = PumpDelivePaused;
                break;
            default:
                nozzleImage = PumpUndefinedError;
        }
        return nozzleImage;
    }

    return (
        <>
        <div className={'px-4 py-4 bg-white hover:bg-slate-200 cursor-pointer border-2 border-black rounded-xl shadow-lg h-auto'}>
            <div className="w-auto mb-2">
                <p className="p-1 md:text-xl sm:text-sm rounded-lg border-2 border-gray-500 bg-black text-white">
                    <span className='ml-2 mr-5'> {num ?? '0'} </span>
                    <span className='mr-2'>Pump {pump?.ids ?? 'Undefined'} </span>
                </p>
            </div>
            <div className={'mb-2 flex justify-center relative'}>
                <div className={`${pump?.state == 'FUELLING' ? 'animate-pulse' : ''}`}>
                    <img
                        src={getState(pump)}
                        alt={`Pump-${pump?.state ?? 'undefined'}`}
                        className={`object-contain ${pump?.state == 'FUELLING' ? 'animate-bounce' : ''}`}
                        style={{ width, height }}
                    />
                </div>
                {pump?.state == "FUELLING" ? 
                    <p className='text-4xl font-bold animate-none absolute top-1/2 left-1/2 -translate-x-1/2'> {parseFloat(pump?.volumes).toFixed(2)} </p>
                : ''}
            </div>
            <div className="rounded-lg border-2 border-gray-500 bg-black text-white">
                <div className="text-xl bg-black text-white text-center border-1 rounded-lg shadow-lg">
                    <p className="hover:text-orange-500">
                        {(pump?.lastTotalVolumes ?? 0).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}
