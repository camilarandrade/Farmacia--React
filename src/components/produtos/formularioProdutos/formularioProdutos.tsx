import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Produto from '../../../models/Produto';
import Tema from '../../../models/Categoria';
import { buscar, atualizar, cadastrar } from '../../../service/Service';
import Categoria from '../../../models/Categoria';

function FormularioProduto() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: '',
    descricao: '',
  });

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: '',
    descricao: '',
    quantidade: 0,
    laboratorio: '',
    preco: 0,
    foto: '',
    categoria: null,
  });

  async function buscarProdutoPorId(id: string) {
    await buscar(`/produtos/${id}`, setProduto, {
      headers: {
      },
    });
  }

  async function buscarCategoriaPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria, {
      headers: {
      },
    });
  }

  async function buscarCategorias() {
    await buscar('/categorias', setCategoria, {
      headers: {
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarProdutoPorId(id)
    }
  }, [id])

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) {
      buscarCategoriaPorId(id);
      console.log(categoria);

    }
  }, [id]);

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    });
  }, [categoria]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
    });
  }

  function retornar() {
    navigate('/produtos');
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ produto });

  try {
    if (id !== undefined) {
      await atualizar(`/produtos/${id}`, produto, setProduto, { headers: {} });
      alert('Produto atualizado com sucesso');
    } else {
      await cadastrar(`/produtos`, produto, setProduto, { headers: {} });
      alert('Produto cadastrado com sucesso');
    }
    retornar();
  } catch (error: any) {
    alert('Erro ao processar o produto');
    retornar();
  }
}
  const carregandoCategoria = categoria.nome === '';

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

      <form onSubmit={gerarNovoProduto} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome do Produto</label>
          <input
            value={produto.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Nome"
            name="nome"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Descrição do Produto</label>
          <input
            value={produto.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Descrição"
            name="descricao"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Categoria do produto</p>
          <select name="categoria" id="categoria" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}>
            <option value="" selected disabled>Selecione uma Categoria</option>
            {categorias.map((categoria) => (
              <>
                <option value={categoria.id} >{categoria.descricao}</option>
              </>
            ))}
          </select>
        </div>
        <button disabled={carregandoCategoria} type='submit' className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2'>
          {carregandoCategoria ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}
    
export default FormularioProduto;