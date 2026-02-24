import { Fragment, useState } from 'react';
import useSWR from 'swr'
import Fetcher from './libs/Fetcher'
import { Dialog, Transition } from '@headlessui/react';
// import useWebSocket from "./hooks/useWebSocket";
// import { requestProbeMeasurement } from "./ws/request";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import ModalCard from './components/modal/Card'

export default function App() {
  const [openModalCard, setOpenModalCard] = useState(false)

  const API = import.meta.env.VITE_PUBLIC_API_FUELPOS;

  const { data: dataPumps } = useSWR(`${API}/sitemonitoring/pumps`, Fetcher, { refreshInterval: 1000 }),
        { data: dataTanks } = useSWR(`${API}/sitemonitoring/tanks`, Fetcher, { refreshInterval: 3000 }),
        { data: dataIndicator } = useSWR(`${API}/sitemonitoring/indicator`, Fetcher, { refreshInterval: 5000 })

  return (
    <>

    <Navbar setOpenModalCard={setOpenModalCard} />
    <main className="min-h-screen flex flex-col">

      <div className="flex-1">
        <Dashboard pumps={dataPumps?.data ?? []} tanks={dataTanks?.data ?? []} indicators={dataIndicator?.data ?? []} />
      </div>

    </main>
    <Footer />


    <Transition show={openModalCard} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpenModalCard}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark opacity-50" />
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
              <ModalCard
                setOpenModalCard={setOpenModalCard}
              />
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>

    </>
  );
}
