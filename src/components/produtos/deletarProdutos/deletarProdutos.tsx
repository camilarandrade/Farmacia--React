import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Produto from '../../../models/Produto';
import { buscar, deletar } from '../../../service/Service';

function DeletarProduto() {
    const [produto, setProduto] = useState<Produto>({} as Produto);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: {},
            });
        } catch (error: any) {
            alert('Erro ao buscar produto: ' + error.message);
        }
    }

    useEffect(() => {
        if (id) {
            buscarPorId(id);
        } else {
            alert('ID do produto não fornecido');
            navigate('/produtos');
        }
    }, [id, navigate]);

    async function deletarProduto() {
        try {
            await deletar(`/produtos/${id}`, {
                headers: {},
            });
            alert('Produto apagado com sucesso');
            navigate('/produtos');
        } catch (error: any) {
            alert('Erro ao apagar o produto: ' + error.message);
        }
    }

    function retornar() {
        navigate('/produtos');
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Produto</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o produto a seguir?
            </p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Produto
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>
                    {produto.descricao || 'Descrição não disponível'}
                </p>
                <div className="flex">
                    <button
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center'
                        onClick={deletarProduto}
                    >
                        Sim
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletarProduto;
