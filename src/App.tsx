import React from 'react';
import './App.css';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './paginas/home/Home';
import ListaCategorias from './components/categorias/listarCategorias/listaCategoria';
import FormularioCategoria from './components/categorias/formCategoria/formularioCategoria';
import DeletarCategoria from './components/categorias/deletarCategoria/deletarCategoria';


function App() {
  return (
    <>
   
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route path="/editarCategoria/:id" element={<FormularioCategoria/>}></Route>
              <Route path="/cadastroCategoria" element={<FormularioCategoria/>}></Route>
              <Route path="/deletarCategoria/:id" element={<DeletarCategoria/>}></Route>
            
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
  
    </>
  );
}
export default App;