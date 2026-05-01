import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { FormularioCadastroUsuario } from '../../componentes/FormularioCadastroUsuario/index.jsx'
import { Banner } from '../../componentes/Banner/index.jsx'
import api from '../../services/api.js'
import { useNavigate, useLocation } from 'react-router-dom'
import { FundoDecorado } from '../../componentes/FundoDecorado/index.jsx'
import { ENDPOINTS } from '../../services/endpoints.js'

export const CadastroUsuario = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const usuarioParaEditar = location.state?.usuarioParaEditar;

  const gerenciarUsuario = async (dadosFormulario) => {
    try {
      const formData = new FormData();
      formData.append('name', dadosFormulario.nome);
      formData.append('email', dadosFormulario.email);
      formData.append('password', dadosFormulario.senha);
      formData.append('phoneNumber', dadosFormulario.numero);
      formData.append('city', dadosFormulario.cidade);

      if (dadosFormulario.imagem instanceof File) {
        formData.append('image', dadosFormulario.imagem);
      }

      if (usuarioParaEditar) {
        await api.put(ENDPOINTS.USUARIO_ID(usuarioParaEditar.id), formData);
        alert("Dados atualizados com sucesso!");
        navigate(`/usuario/${usuarioParaEditar.id}`);
      } else {
        await api.post(ENDPOINTS.USUARIO, formData);
        alert("Usuário cadastrado com sucesso! Faça login.");
        navigate('/auth/login');
      }

    } catch (error) {
      console.error("Erro:", error);
      if (error.response?.data?.fields) {
        const erros = error.response.data.fields.map(e => `${e.field}: ${e.error}`).join("\n");
        alert(`Erro de validação:\n${erros}`);
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Erro ao salvar usuário. Verifique os dados.");
      }
    }
  }

  return (
    <>
      <FundoDecorado>
        <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid overflow-hidden rounded-[32px] border border-white/60 bg-white/55 shadow-[0_32px_90px_-34px_rgba(62,16,68,0.45)] backdrop-blur-xl lg:grid-cols-[1.08fr_0.92fr]">
            <Banner />

            <div className="p-4 sm:p-6 lg:p-8">
              <FormularioCadastroUsuario
                aoCadastrarUsuario={gerenciarUsuario}
                href={usuarioParaEditar ? `/usuario/${usuarioParaEditar.id}` : "/auth/login"}
                usuarioEdicao={usuarioParaEditar}
              />
            </div>
          </div>
        </section>
      </FundoDecorado>
      <BarraRodape />
    </>
  )
}
