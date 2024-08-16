import React from 'react';
import './Home.css';
import ListaCategoria from '../../components/categorias/listarCategorias/listaCategoria';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className="flex justify-center">
        <div className='container grid grid-cols-2 text-gray-700'>
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className='text-5xl font-bold'>Seja bem vinde!</h2>
            <p className='text-xl'>Aqui você consegue visualizar as categorias da farmácia</p>

            <div className="flex justify-around gap-4">

            <Link to='/categorias' className='hover:underline'> <button className='rounded bg-white text-blue-800 py-2 px-4'>Ver categorias</button></Link>
            </div>
          </div>

          <div className="flex justify-center ">
          </div>
        </div>
      </div>
      <ListaCategoria />

    </>
  );
}

export default Home;