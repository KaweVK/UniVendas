import { Banner } from "../../componentes/Banner/index.jsx"
import { BarraRodape } from "../../componentes/BarraRodape/index.jsx"
import { FormularioLogin } from "../../componentes/FormularioLogin/index.jsx"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext.jsx"

export const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const realizarLogin = async (dados) => {
        try {
            await login(dados.email, dados.senha);
            navigate('/produtos');
        } catch (erro) {
            alert('Email ou senha incorretos!');
        }
    }

    return (
        <>
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

                <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
                    <div className="grid overflow-hidden rounded-[32px] border border-white/60 bg-white/55 shadow-[0_32px_90px_-34px_rgba(62,16,68,0.45)] backdrop-blur-xl lg:grid-cols-[1.08fr_0.92fr]">
                        <Banner />

                        <div className="p-4 sm:p-6 lg:p-8">
                            <FormularioLogin
                                aoFazerLogin={realizarLogin}
                                href={"/auth/cadastro-usuario"}
                            />
                        </div>
                    </div>
                </section>
            </main>
            <BarraRodape />
        </>
    )
}
