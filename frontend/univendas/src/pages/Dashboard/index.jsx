import { FundoDecorado } from "../../componentes/FundoDecorado/index.jsx";
import { NavBar } from "../../componentes/NavBar/index.jsx";
import { BarraRodape } from "../../componentes/BarraRodape/index.jsx";
import { useDashboard } from "../../hooks/useDashboard";
import { GraficoBarras } from "../../componentes/GraficoBarra";
import { GraficoPizza } from "../../componentes/GraficoPizza";
import { GraficoLinha } from "../../componentes/GraficoLinha";
import { GraficoStacked } from "../../componentes/GraficoStacked";
import { useAuth } from "../../contexts/AuthContext";
import { BarChart2, BarChart3, PieChart, LineChart } from "lucide-react";

export function Dashboard() {
    const { porCategoria, qtdRegistros, porVendedor, loading } = useDashboard();
    const { usuario } = useAuth();

    if (loading) return <p>Carregando...</p>;

    const totalReceita = porCategoria
        .reduce((acc, d) => acc + Number(d.totalReceita), 0)
        .toFixed(2);

    return (
        <>
            <NavBar />
            <FundoDecorado>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard de Vendas</h1>

                    {/* Cards de KPI */}
                    <div className="flex gap-4 mb-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col gap-1">
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Total de Categorias</span>
                            <strong className="text-2xl font-bold text-gray-800">{porCategoria.length}</strong>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col gap-1">
                            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Receita Total</span>
                            <strong className="text-2xl font-bold text-emerald-700">R$ {totalReceita}</strong>
                        </div>
                    </div>

                    {/* Gráficos */}
                    <div className="grid grid-cols-2 gap-4">

                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <BarChart2 className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-500">
                                    Produtos Anunciados por Categoria
                                </span>
                            </div>
                            <GraficoBarras dados={porCategoria} />
                        </div>

                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <PieChart className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-500">
                                    Receita por Categoria
                                </span>
                            </div>
                            <GraficoPizza dados={porCategoria} />
                        </div>

                        <div className="col-span-1 bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <BarChart3 className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-500">
                                    Qtd. Produtos por Vendedor
                                </span>
                            </div>
                            <GraficoStacked dados={porVendedor} />
                        </div>

                        <div className="col-span-2 bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <LineChart className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-500">
                                    Quantidade de Registros por Mês
                                </span>
                            </div>
                            <GraficoLinha dados={qtdRegistros} />
                        </div>
                    </div>
                </div>
            </FundoDecorado>
            <BarraRodape />
        </>
    );
}