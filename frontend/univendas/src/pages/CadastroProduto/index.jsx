import { FormularioCadastroProduto } from '../../componentes/FormularioCadastroProduto/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { NavBar } from '../../componentes/NavBar/index.jsx';
import { CATEGORIAS, DISPONIBILIDADE } from '../../constants/categorias.js';
import { criarProduto, atualizarProduto } from '../../services/produtosService.js';
import { extrairErro } from '../../utils/extrairErro.js';

export const CadastroProduto = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const produtoParaEditar = location.state?.produtoParaEditar;

  const salvarProduto = async (produtoDoFormulario) => {
    try {
      if (produtoParaEditar) {
        await atualizarProduto(produtoParaEditar.id, produtoDoFormulario);
        alert('Produto atualizado com sucesso!');
      } else {
        await criarProduto(produtoDoFormulario);
        alert('Produto cadastrado com sucesso!');
      }
      navigate('/produtos');
    } catch (error) {
      alert(extrairErro(error, 'Erro ao salvar produto.'));
    }
  }

  return (
    <>
      <NavBar />
      <main className="relative isolate overflow-hidden bg-[#f7eff8]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(107,46,116,0.14),transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute left-[8%] top-24 h-64 w-64 rounded-full bg-fuchsia-200/60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute right-[6%] top-1/3 h-72 w-72 rounded-full bg-violet-200/60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/80 blur-3xl"
        />

        <section className="relative mx-auto flex min-h-screen w-full items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/60 bg-white/55 p-6 shadow-[0_32px_90px_-34px_rgba(62,16,68,0.45)] backdrop-blur-xl sm:p-8 lg:p-10">
            <FormularioCadastroProduto
              aoCadastrarProduto={salvarProduto}
              categorias={CATEGORIAS}
              disponivel={DISPONIBILIDADE}
              produtoEdicao={produtoParaEditar}
            />
          </div>
        </section>
      </main>
      <BarraRodape />
    </>
  )
}
