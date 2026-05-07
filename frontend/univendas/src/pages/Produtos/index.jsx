import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx';
import { CardProduto } from '../../componentes/CardProduto/index.jsx';
import { Botao } from '../../componentes/Botao/index.jsx';
import { NavBar } from '../../componentes/NavBar/index.jsx';
import { FundoDecorado } from '../../componentes/FundoDecorado/index.jsx';
import { useProdutosBusca } from '../../hooks/useProdutosBusca.js';
import { AreaBusca } from '../../componentes/AreaBusca/index.jsx';
import './Produtos.css';

const FILTROS_INICIAIS = {
    name: '',
    category: '',
    priceGreater: '',
    priceLess: '',
    page: 0,
    size: 10,
};

export const Produtos = () => {
    const [filtros, setFiltros] = useState(FILTROS_INICIAIS);
    const [campoBusca, setCampoBusca] = useState('');

    const filtrosNormalizados = useMemo(() => ({
        ...filtros,
        priceGreater: filtros.priceGreater === '' ? '' : Number(filtros.priceGreater),
        priceLess: filtros.priceLess === '' ? '' : Number(filtros.priceLess),
    }), [filtros]);

    const { content, totalPages, loading, erro } = useProdutosBusca(filtrosNormalizados);

    const aoDigitarNome = (valor) => setCampoBusca(valor);
    const limparFiltros = () => setFiltros(FILTROS_INICIAIS);
    const trocarPagina = (novaPagina) => setFiltros((f) => ({ ...f, page: novaPagina }));
    const pesquisarPorNome = (e) => {
        e.preventDefault();
        setFiltros({
            ...FILTROS_INICIAIS,
            name: campoBusca,
        });
    };

    const temFiltrosAtivos =
        filtros.name || filtros.category || filtros.priceGreater !== '' || filtros.priceLess !== '';

    return (
        <>
            <NavBar />
            <FundoDecorado>
                <AreaBusca
                    label={'Busque'}
                    aoDigitar={aoDigitarNome}
                    placeholder={'Nome do produto'}
                    valor={campoBusca}
                    pesquisa={pesquisarPorNome}
                    filtros={filtros}
                    aoAlterar={setFiltros}
                    aoLimpar={limparFiltros}
                />

                <div className='lista-produtos'>
                    <h2>
                        {temFiltrosAtivos
                            ? `Resultados${filtros.name ? ` para "${filtros.name}"` : ''}`
                            : 'Produtos à venda'}
                    </h2>

                    {loading ? (
                        <p>Carregando produtos...</p>
                    ) : erro ? (
                        <p>Erro ao carregar produtos.</p>
                    ) : content.length > 0 ? (
                        content.map((produto) => (
                            <Link
                                to={`/produto/${produto.id}`}
                                key={produto.id}
                                style={{ textDecoration: 'none' }}
                            >
                                <CardProduto
                                    nome={produto.name}
                                    descricao={produto.description}
                                    imagens={produto.images}
                                />
                            </Link>
                        ))
                    ) : (
                        <p>
                            {temFiltrosAtivos
                                ? 'Nenhum item encontrado para os filtros selecionados.'
                                : 'Nenhum produto cadastrado.'}
                        </p>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className='paginacao-produtos' style={{ display: 'flex', justifyContent: 'center', gap: '12px', margin: '12px' }}>
                        <Botao
                            className='botao-padrao'
                            onClick={() => trocarPagina(filtros.page - 1)}
                            disabled={filtros.page === 0}
                        >
                            Anterior
                        </Botao>
                        <span style={{ alignSelf: 'center' }}>
                            Página {filtros.page + 1} de {totalPages}
                        </span>
                        <Botao
                            className='botao-padrao'
                            onClick={() => trocarPagina(filtros.page + 1)}
                            disabled={filtros.page + 1 >= totalPages}
                        >
                            Próxima
                        </Botao>
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
                    <Link to='/cadastro-produto'>
                        <Botao className='botao-padrao'>Cadastrar Produto</Botao>
                    </Link>
                    <Link to='/usuarios'>
                        <Botao className='botao-padrao'>Ver Usuários</Botao>
                    </Link>
                </div>
            </FundoDecorado>
            <BarraRodape />
        </>
    );
};
