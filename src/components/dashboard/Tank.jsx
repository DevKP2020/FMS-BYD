/* eslint-disable no-unsafe-optional-chaining */
import { useMemo } from 'react';
import useSWR from 'swr';
import moment from 'moment';
import Fetcher from '../../libs/Fetcher';
import { FaTruck } from 'react-icons/fa';
import { LuTriangleAlert } from "react-icons/lu";
import { Popover, Transition } from '@headlessui/react'
import { useFloating, offset, flip, shift, autoUpdate, FloatingPortal } from '@floating-ui/react';

const FuelLevelDisplay = ({
    productHeight = 50,
    productVolume,
    fuelColor,
    waterLevel = 0,
    waterColor,
    status = 'Online'
}) => {
    return (
        <div className="relative w-32 h-32 my-2 border-2 border-black rounded-full overflow-hidden">
        
            {/* Fuel */}
            <div
                className={`${fuelColor} absolute bottom-0 w-full transition-all duration-500 wave-animation`}
                style={{
                    height: `${productHeight}%`
                }}
            />

            {/* Water */}
            <div
                className={`${waterColor} absolute bottom-0 w-full opacity-60 wave-animation`}
                style={{
                    height: `${waterLevel}%`,
                }}
            />

            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">
                {status == 'Offline' ? 'OFFLINE' : `${productVolume?.toFixed(1)}L`}
            </div>
        </div>
    );
};

export default function Tank({ tank, setDataTankDetail, setOpenModalTankDetail }) {

    const startDate = (moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'))
    const endDate = (moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'))

    const fuelColor = tank.productHeight <= 10 ? 'bg-red-500' : 'bg-green-500';
    const waterColor = 'bg-blue-500';
    const tankFillingPercentage = tank?.capacity ? ((tank?.productVolume / tank?.capacity) * 100).toFixed(2) : 0.00;

    const API = import.meta.env.VITE_PUBLIC_API_FUELPOS;

    const { data: dataDelivery } = useSWR(`${API}/delivery/range?tankId=${tank?.probeNumber}&start=${startDate}&end=${endDate}`, Fetcher)

    const filteredDelivery = useMemo(() => {
        if (!dataDelivery?.data) return []

        return dataDelivery?.data?.filter(data => {
            const deliveryDate = moment(data?.startValues?.dateTime)
            const deliveryFilter = deliveryDate?.isBetween(startDate, endDate, null, '[]')

            return deliveryFilter
        }).sort((a, b) => moment(b?.startValues?.dateTime).valueOf() - moment(a?.startValues?.dateTime.valueOf())).slice(0, 10)
    }, [dataDelivery, startDate, endDate])

    const latestDelivery = filteredDelivery?.[0]
    const calculatedHeight = latestDelivery?.endValues?.productHeight - latestDelivery?.startValues?.productHeight;
    const calculatedTempt = (latestDelivery?.startValues?.temperature + latestDelivery?.endValues?.temperature) / 2

    const { refs, floatingStyles } = useFloating({
        placement: 'bottom-end',
        middleware: [
            offset(8),
            flip(),
            shift({ padding: 8 }),
        ],
        whileElementsMounted: autoUpdate,
    })

    const alarmMap = {
        2: 'Low product alarm registered!',
        3: 'High product alarm registered!',
        4: 'Critical low product alarm registered!',
        5: 'Critical high product alarm registered!',
    };

    const filteredAlarm = tank?.Alarms?.map(a => ({
        alarm: a,
        value: alarmMap[a]
    })) || [];
    
    const handleTankDetail = (tank) => {
        setDataTankDetail(tank)
        setOpenModalTankDetail(true)
    }

    function getAlarmClass(tank) {
        const alarms = tank?.Alarms || []

        if (alarms.length === 0) return null

        if (alarms.some(a => a === 4 || a === 5)) {
            return 'size-7 text-red-600 hover:text-red-700 animate-blink'
        }

        if (alarms.some(a => a === 2 || a === 3)) {
            return 'size-7 text-yellow-600 hover:text-yellow-700'
        }

        return null
    }

    function getAlarmBg(tank) {
        const alarms = tank?.Alarms || []

        if (alarms.length === 0) return ''

        if (alarms.some(a => a === 3 || a === 4)) {
            return 'p-2 w-full font-bold text-white bg-red-500 rounded-t'
        }

        if (alarms.some(a => a === 1 || a === 2)) {
            return 'p-2 w-full font-bold text-white bg-yellow-500 rounded-t'
        }

        return ''
    }

    return (
        <>
            <div className="w-full h-auto bg-white rounded-md shadow-md border-2 border-black text-black" >
                <div className="flex items-center justify-between p-2 bg-black">
                    {tank?.Alarms?.length > 0 && ( 
                    <Popover className="relative flex items-center">
                    {({ open }) => (
                        <>
                        {/* BUTTON */}
                        <Popover.Button className="focus:outline-none p-0 bg-black border-none">
                            <LuTriangleAlert className={getAlarmClass(tank)} />
                        </Popover.Button>

                        {/* TRANSITION */}
                        <Transition
                            show={open}
                            enter="transition duration-200 ease-out"
                            enterFrom="opacity-0 translate-y-2 scale-95"
                            enterTo="opacity-100 translate-y-0 scale-100"
                            leave="transition duration-150 ease-in"
                            leaveFrom="opacity-100 translate-y-0 scale-100"
                            leaveTo="opacity-0 translate-y-2 scale-95"
                        >
                            <Popover.Panel className="absolute left-0 top-full mt-3 w-64 z-50">
                            {/* Arrow */}
                            <div className="absolute -top-2 left-4 h-4 w-4 rotate-45 bg-red-500 border-l-2 border-t-2 border-black" />

                            <div className="border-2 border-black rounded-md bg-white shadow-xl">
                                <div className={getAlarmBg(tank)}>
                                    Alarm!
                                </div>

                                <hr />

                                <ul className="list-decimal space-y-1 p-2 ml-3 font-semibold text-sm text-black">
                                    {filteredAlarm.map(item => (
                                        <li key={item.alarm}>{item.value}</li>
                                    ))}
                                </ul>
                            </div>
                            </Popover.Panel>
                        </Transition>
                        </>
                    )}
                    </Popover>
                    )}
                    
                    <span className="flex items-center justify-center text-white text-xl font-semibold bg-accent py-0.5 rounded-full">
                        Tank {tank?.probeNumber || 'Undefined'}
                    </span>

                    <Popover className="relative flex items-center">
                    {({ open }) => (
                        <>
                        {/* BUTTON */}
                        <Popover.Button className="focus:outline-none p-0 bg-black border-none" ref={refs.setReference}>
                            <p className="text-2xl font-semibold cursor-pointer">
                                {tank?.isDelivery ? <FaTruck className="text-green-500 hover:text-green-600" /> : <FaTruck className="text-red-500 hover:text-red-600" />}
                            </p>
                        </Popover.Button>

                        {/* TRANSITION */}
                        <FloatingPortal>
                            <Transition
                                show={open}
                                enter="transition duration-200 ease-out"
                                enterFrom="opacity-0 translate-y-2 scale-95"
                                enterTo="opacity-100 translate-y-0 scale-100"
                                leave="transition duration-150 ease-in"
                                leaveFrom="opacity-100 translate-y-0 scale-100"
                                leaveTo="opacity-0 translate-y-2 scale-95"
                            >
                                    <Popover.Panel className="w-64 z-[9999]" ref={refs.setFloating} style={floatingStyles}>
                                    {/* Arrow */}
                                        <div className="absolute -top-2 right-4 h-4 w-4 rotate-45 bg-blue-500 border-l-2 border-t-2 border-black" />

                                        <div className="border-2 border-black rounded-md bg-white shadow-xl">
                                            <div className='p-2 w-full font-bold text-white bg-blue-500 rounded-t'>
                                                Last in-tank delivery:
                                            </div>

                                            <hr />

                                            {latestDelivery ? (
                                                <>
                                                    <div className="p-2 text-sm text-black">
                                                        <p className="font-semibold mb-1">Measurement on start:</p>
                                                        <ul className="list-disc ml-4 space-y-1">
                                                            <li>
                                                                <span className="font-medium">Date:</span> {latestDelivery?.startValues?.dateTime}
                                                            </li>
                                                            <li>
                                                                <span className="font-medium">Product Height:</span> {(latestDelivery?.startValues?.productHeight).toFixed(2)} mm
                                                            </li>
                                                            <li>
                                                                <span className="font-medium">Product Volume:</span> {(latestDelivery?.startValues?.productVolume).toFixed(2)} L
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="p-2 text-sm text-black">
                                                        <p className="font-semibold mb-1">Measurement on end:</p>
                                                        <ul className="list-disc ml-4 space-y-1">
                                                            <li>
                                                                <span className="font-medium">Date:</span> {latestDelivery?.endValues?.dateTime}
                                                            </li>
                                                            <li>
                                                                <span className="font-medium">Product Height:</span> {(latestDelivery?.endValues?.productHeight).toFixed(2)} mm
                                                            </li>
                                                            <li>
                                                                <span className="font-medium">Product Volume:</span> {(latestDelivery?.endValues?.productVolume).toFixed(2)} L
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="p-2 text-sm text-black">
                                                        <p className="font-semibold mb-1">Delivery Absolute Values:</p>
                                                        <ul className="list-disc ml-4 space-y-1">
                                                            <li>
                                                                <span className="font-medium">Calculated Height:</span> {(calculatedHeight).toFixed(2)} mm
                                                            </li>
                                                            <li>
                                                                <span className="font-medium">Calculated Volume:</span> {(latestDelivery?.absoluteValues?.probeCalculationVolume).toFixed(2)} L
                                                            </li>
                                                            <li>
                                                                <span className="font-medium">Calculated Volume:</span> {(calculatedTempt).toFixed(2)}°C
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </>
                                            ) : (
                                                <p className="p-3 text-sm text-gray-500 italic">
                                                    No delivery found in selected range
                                                </p>
                                            )}

                                        </div>
                                    </Popover.Panel>
                            </Transition>
                        </FloatingPortal>
                        </>
                    )}
                    </Popover>
                </div>

                <div className="flex justify-center items-center border-t-2 border-black cursor-pointer hover:bg-slate-200" onClick={() => handleTankDetail(tank)}>
                    <FuelLevelDisplay
                        productHeight={tankFillingPercentage}
                        productVolume={tank?.productVolume}
                        fuelColor={fuelColor}
                        waterLevel={tank?.waterLevel}
                        waterColor={waterColor}
                        status={tank?.status}
                    />
                </div>
            </div>
        </>
    );
}

