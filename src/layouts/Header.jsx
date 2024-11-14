import React from 'react'

const Header = () => {
    return (
        <div>
            <header className="flex justify-between items-center mb-6 gap-6">


                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold">Welcome, Mireille</h1>
                    <p className="text-xs text-gray-600">Track and manage tickets for all your subscribers with one click.</p>
                </div>


                <div className="flex items-center gap-4">
                    <button className="bg-black text-white px-4 py-2 rounded-md">Create</button>
                </div>


                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="To research"
                            className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                        <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>


                    <button className="relative p-2">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>


                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">

                        <div className="w-full h-full bg-gray-300"></div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;