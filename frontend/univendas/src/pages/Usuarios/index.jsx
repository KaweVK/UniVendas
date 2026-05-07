import { useEffect, useState } from 'react'
import { Botao } from '../../componentes/Botao/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { CardUsuario } from '../../componentes/CardUsuario/index.jsx'
import { Link } from 'react-router-dom'
import api from '../../services/api.js'
import './Usuarios.css'
import { FundoDecorado } from '../../componentes/FundoDecorado/index.jsx'
import { NavBar } from '../../componentes/NavBar/index.jsx'
import { ENDPOINTS } from '../../services/endpoints.js'

export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const buscarUsuarios = async () => {
            try {
                const resposta = await api.get(ENDPOINTS.USUARIOS_BUSCA);
                setUsuarios(resposta.data.content || []);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                setUsuarios([])
            }
        }
        buscarUsuarios();
    }, []);

    return (
        <>
            <NavBar />
            <FundoDecorado>
            <div className='lista-usuarios'>
                <h2>Usuários Cadastrados</h2>
                {usuarios.length > 0 ? (
                    usuarios.map(usuario => (
                        <Link to={`/usuario/${usuario.id}`} key={usuario.id} style={{ textDecoration: 'none' }}>
                            <CardUsuario
                                nome={usuario.name}
                                email={usuario.email}
                                cidade={usuario.city}
                                img={usuario.image}
                            />
                        </Link>
                    ))
                ) : (
                    <p>Nenhum usuário encontrado.</p>
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
                <Link to='/cadastro-produto'>
                    <Botao className="botao-padrao">Cadastrar Produto</Botao>
                </Link>
                <Link to='/produtos'>
                    <Botao className="botao-padrao">Ver Produtos</Botao>
                </Link>
            </div>
            </FundoDecorado>
            <BarraRodape />
        </>
    )
}