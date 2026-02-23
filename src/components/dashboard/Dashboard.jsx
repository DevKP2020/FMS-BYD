import { useState, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'

import Log from "./Log";
import Indicator from "./Indicator";
import Pump from "./Pump";
import Tank from "./Tank";
import Report from "./Report";

import ModalTankDetail from '../modal/TankDetail'
import ModalDelivery from '../modal/Delivery'


export default function Dashboard({ pumps, tanks, indicators }) {
  
  const [ openModalTankDetail, setOpenModalTankDetail ] = useState(false),
        [ openModalDelivery, setOpenModalDelivery ] = useState(false),
        [ dataTankDetail, setDataTankDetail] = useState(null),
        [ dataDelivery, setDataDelivery] = useState(null)

  const TOTAL_PUMPS = pumps?.length || 6;
  const TOTAL_TANKS = tanks?.length || 2;
  const TOTAL_INDICATORS = indicators?.length || 8;

  const pumpsWithFallback = Array.from({ length: TOTAL_PUMPS }, (_, index) => {
    return pumps?.[index] ?? {
      ids: index + 1,
      state: 'OFFLINE',
      volumes: 0,
      lastTotalVolumes: 0
    };
  });

  const tanksWithFallback = Array.from({ length: TOTAL_TANKS }, (_, index) => {
    return tanks?.[index] ?? {
      productHeight: 0,
      productVolume: 0,
      waterLevel: 0,
      waterColor: 0,
      capacity: 0,
      Alarms: [],
      status: 'Offline'
    };
  });

  const indicatorsWithFallback = Array.from({ length: TOTAL_INDICATORS }, (_, index) => {
    return indicators?.[index] ?? {
      description: 'OFFLINE',
      state: false
    };
  });


  return (
    <>
      {/* CONTENT */}
      <div className="grid grid-cols-12 gap-3 h-full">

        {/* LEFT */}
        <div className="col-span-8 py-4 pl-4 grid gap-3 content-start">
          <div id="pump" className='p-3 bg-white border-1 border-gray-400 rounded-xl shadow-lg'>
            <div id="pumps" className="grid grid-cols-6 gap-3 h-full">
              {pumpsWithFallback?.map((pump, index) => (
                <Pump key={pump?.ids} num={index + 1} pump={pump} />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center text-lg">
            <Report />
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-4 py-4 pr-4 grid gap-2 content-start">
          <div id="tank" className='p-2 bg-white border-1 border-gray-400 rounded-xl shadow-lg'>
            <div className="w-full overflow-x-auto scroll-smooth">
              <div className="grid grid-flow-col auto-cols-[49%] gap-2">
                {tanksWithFallback?.map(tank => (
                  <Tank 
                    key={tank?.probeNumber} 
                    tank={tank ?? {}} 
                    setDataTankDetail={setDataTankDetail}
                    setOpenModalTankDetail={setOpenModalTankDetail} 
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center text-lg">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="p-2">
                <div className="grid gap-2">
                  <div className="grid grid-cols-4 gap-2">
                    {indicatorsWithFallback?.map(indicator => (
                      <Indicator key={indicator?.id} indicator={indicator} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full flex items-center justify-center text-lg">
            <Log />
          </div>
        </div>

      </div>

      <Transition show={openModalTankDetail} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpenModalTankDetail}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6">
                <ModalTankDetail
                  tank={dataTankDetail}
                  setOpenModalTankDetail={setOpenModalTankDetail}
                  setDataDelivery={setDataDelivery}
                  setOpenModalDelivery={setOpenModalDelivery}
                />
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>

      <Transition show={openModalDelivery} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpenModalDelivery}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6">
                <ModalDelivery
                  tank={dataDelivery}
                  setOpenModalDelivery={setOpenModalDelivery}
                />
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>


    </>  
  );
}
