import React from 'react'

export default function AddNew() {
    return (
        <div className="w-full max-w-s flex justify-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" type="text" name="name" id="name">

                        </input>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Apellido
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" type="text" name="lastName" id="lastName">

                        </input>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dni">
                        DNI
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" type="numeric" name="dni" id="dni">

                        </input>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                        Posicion
                    </label>
                    <div className="relative">
                        <select className="block w-auto bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="position">
                            <option>Arquero</option>
                            <option>Defensor</option>
                            <option>Mediocampista</option>
                            <option>Delantero</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center"> 
                    <button className="bg-black hover:text-black hover:bg-white text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}
