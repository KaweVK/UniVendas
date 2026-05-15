import { FundoDecorado } from "../../componentes/FundoDecorado/index.jsx";
import { NavBar } from "../../componentes/NavBar/index.jsx";
import { BarraRodape } from "../../componentes/BarraRodape/index.jsx";
import { useDashboard } from "../../hooks/useDashboard";
import { GraficoBarras } from "../../componentes/GraficoBarra";
import { GraficoPizza } from "../../componentes/GraficoPizza";
import { GraficoLinha } from "../../componentes/GraficoLinha";
import { useAuth } from "../../contexts/AuthContext";

export function Dashboard() {
    const { porCategoria, qtdRegistros, loading } = useDashboard();
    const { usuario } = useAuth();

    if (loading) return <p>Carregando...</p>;

    const totalReceita = porCategoria
        .reduce((acc, d) => acc + Number(d.totalReceita), 0)
        .toFixed(2);

    return (
        <>
            <NavBar />
            <FundoDecorado>
                <div style={{ padding: "2rem" }}>
                    <h1>Dashboard de Vendas</h1>

                    {/* Cards de KPI */}
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                        <div className="kpi-card">
                            <span>Total de Categorias: </span>
                            <strong>{porCategoria.length}</strong>
                        </div>
                        <div className="kpi-card">
                            <span>Receita Total: </span>
                            <strong>R$ {totalReceita}</strong>
                        </div>
                    </div>

                    {/* Gráficos */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <GraficoBarras dados={porCategoria} titulo="Produtos Anunciados por Categoria" />
                        <GraficoPizza dados={porCategoria} titulo="Receita por Categoria" />
                        <div style={{ gridColumn: "1 / -1" }}>
                            <GraficoLinha dados={qtdRegistros} titulo="Quantidade de Registros por Mês" />
                        </div>
                    </div>
                </div>
            </FundoDecorado>
            <BarraRodape />
        </>
    );
}