import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    PencilSquareIcon,
    TrashIcon,
    ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { Botao } from '../../componentes/Botao/index.jsx';
import { DetalheUsuario } from '../../componentes/DetalheUsuario/index.jsx';
import './Usuario.css';
import { FundoDecorado } from '../../componentes/FundoDecorado/index.jsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useUsuario } from '../../hooks/useUsuario.js';
import { excluirUsuario as excluirUsuarioServico } from '../../services/usuariosService.js';
import { extrairErro } from '../../utils/extrairErro.js';

export const Usuario = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { usuario: usuarioLogado, logout } = useAuth();

    const { usuario, carregando, erro } = useUsuario(id);

    const eDono = !!usuarioLogado && String(usuarioLogado.id) === String(id);

    useEffect(() => {
        if (erro) {
            alert('Erro ao carregar perfil.');
            navigate('/usuarios');
        }
    }, [erro, navigate]);

    const excluirUsuario = async () => {
        if (!eDono) {
            alert('Você não pode excluir outro usuário!');
            return;
        }
        if (!window.confirm(`Tem certeza que deseja excluir o usuário ${usuario.name}?`)) return;
        try {
            await excluirUsuarioServico(id);
            alert('Sua conta foi excluída. Você será desconectado.');
            await logout();
        } catch (e) {
            alert(extrairErro(e, 'Erro ao excluir usuário. Verifique permissões.'));
        }
    };

    const verificarEdicao = () => {
        if (!eDono) {
            alert('Você não pode editar outro usuário!');
            return;
        }
        navigate('/auth/cadastro-usuario', { state: { usuarioParaEditar: usuario } });
    };

    if (carregando || !usuario) {
        return (
            <FundoDecorado>
                <div className="rounded-[32px] border border-white/60 bg-white/75 p-10 text-center shadow-[0_32px_90px_-34px_rgba(62,16,68,0.45)] backdrop-blur-xl">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6b2e74]/70">
                        Usuário
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                        Carregando dados do usuário...
                    </h2>
                </div>
            </FundoDecorado>
        );
    }

    return (
        <FundoDecorado>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <Link
                    to="/usuarios"
                    className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-[#4c1454] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <ArrowLeftIcon className="size-4" />
                    Voltar
                </Link>
                {eDono ? (
                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                        Este perfil é seu
                    </span>
                ) : null}
            </div>
            <DetalheUsuario
                nome={usuario.name}
                email={usuario.email}
                telefone={usuario.phoneNumber}
                cidade={usuario.city}
                img={usuario.image || '/imagens/Logos/avatar.webp'}
                eDono={eDono}
                acoes={
                    <>
                        {eDono ? (
                            <Botao type="button" onClick={verificarEdicao} className="botao-padrao">
                                <PencilSquareIcon className="size-5" />
                                Editar perfil
                            </Botao>
                        ) : null}

                        {eDono ? (
                            <Botao type="button" onClick={excluirUsuario} className="botao-excluir">
                                <TrashIcon className="size-5" />
                                Excluir conta
                            </Botao>
                        ) : null}
                    </>
                }
            />
        </FundoDecorado>
    );
};
