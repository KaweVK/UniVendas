import { useEffect, useState } from 'react'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { CardProduto } from '../../componentes/CardProduto/index.jsx'
import { Link } from 'react-router-dom'
import './Produtos.css'
import { Botao } from '../../componentes/Botao/index.jsx'
import api from '../../services/api.js'
import { NavBar } from '../../componentes/NavBar/index.jsx'
import { CampoBusca } from '../../componentes/CampoBusca/index.jsx'
import { FundoDecorado } from '../../componentes/FundoDecorado/index.jsx'
import { ENDPOINTS } from '../../services/endpoints.js'

export const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtosBusca, setProdutosBusca] = useState([]);
    const [busca, setBusca] = useState('');
    const [palavraBuscada, setPalavraBuscada] = useState('');
    const [buscou, setBuscou] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarProdutos = async () => {
            try {
                const resposta = await api.get(ENDPOINTS.PRODUTOS_TODOS);
                setProdutos(resposta.data.content);
            } catch (error) {
                console.error("Erro ao buscar produtos", error);
            } finally {
                setLoading(false);
            }
        }
        buscarProdutos();
    }, []);

    const aoPesquisar = async (evento) => {
        evento.preventDefault();

        if (busca === '') {
            setProdutosBusca([]);
            setBuscou(false);
            return;
        }

        try {
            const resposta = await api.get(`${ENDPOINTS.PRODUTOS_BUSCA}?name=${encodeURIComponent(busca)}`);
            setProdutosBusca(resposta.data.content);
            setBuscou(true);
            setPalavraBuscada(busca);
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
            setProdutosBusca([]);
        }
    }

    const aoDigitar = (valor) => {
        setBusca(valor);
        if (valor === '') {
            setProdutosBusca([]);
            setBuscou(false);
        }
    }

    const listaAtiva = buscou ? produtosBusca : produtos;

    return (
        <>
            <NavBar />
            <FundoDecorado>
                <CampoBusca
                    label={'Busque'}
                    aoDigitar={aoDigitar}
                    placeholder={'Nome do produto'}
                    valor={busca}
                    pesquisa={aoPesquisar}
                />
                <div className='lista-produtos'>
                    <h2>{buscou ? `Resultado para "${palavraBuscada}"` : 'Produtos à venda'}</h2>

                    {loading ? (
                        <p>Carregando produtos...</p>
                    ) : listaAtiva.length > 0 ? (
                        listaAtiva.map(produto => (
                            <Link to={`/produto/${produto.id}`} key={produto.id} style={{ textDecoration: 'none' }}>
                                <CardProduto
                                    nome={produto.name}
                                    descricao={produto.description}
                                    imagens={produto.images}
                                />
                            </Link>
                        ))
                    ) : (
                        <p>{buscou ? 'Nenhum item encontrado na busca.' : 'Nenhum produto cadastrado.'}</p>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
                    <Link to='/cadastro-produto'>
                        <Botao className="botao-padrao">Cadastrar Produto</Botao>
                    </Link>
                    <Link to='/usuarios'>
                        <Botao className="botao-padrao">Ver Usuários</Botao>
                    </Link>
                </div>
            </FundoDecorado>
            <BarraRodape />
        </>
    )
}
