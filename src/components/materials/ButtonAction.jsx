import { Fragment } from 'react'
import { TiBusinessCard } from "react-icons/ti";
import { IoMdRefresh } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";


const ButtonAction = ({ setOpenModalCard }) => {

    const handleCard = () => {
        setOpenModalCard(true)
    }

    const refreshPage = () => {
        try {
            window.location.reload(true)
        } catch {
            alert("Failed to update data. Please try again.");
        }
    }

    return (
        <>

        <div className="relative">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex items-center w-full justify-center rounded-md bg-violet-500 hover:bg-violet-600 px-4 pb-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                        Options
                        <FaChevronDown
                            className="-mr-1 ml-2 text-white"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${ active ? 'bg-violet-500 text-white' : 'bg-white text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => handleCard()}
                                    >
                                        <TiBusinessCard className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Card
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${ active ? 'bg-violet-500 text-white' : 'bg-white text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={refreshPage}
                                    >
                                        <IoMdRefresh className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Refresh
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>

        </>
    )
}

export default ButtonAction