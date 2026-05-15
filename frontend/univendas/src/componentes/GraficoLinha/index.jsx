import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { formatarCategoria } from "../../utils/formatter.js";

const CORES = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const nomeMes = (n) => MESES[(Number(n) - 1)] ?? n;

function pivotarDados(dados) {
    const porMes = {};
    const categorias = new Set();

    for (const { mesRegistro, categoria, totalItens } of dados) {
        if (!porMes[mesRegistro]) porMes[mesRegistro] = { mes: mesRegistro };
        porMes[mesRegistro][categoria] = Number(totalItens);
        categorias.add(categoria);
    }

    const linhas = Object.values(porMes).sort((a, b) => a.mes - b.mes);
    return { linhas, categorias: [...categorias] };
}

export function GraficoLinha({ dados, titulo }) {
    const { linhas, categorias } = pivotarDados(dados ?? []);

    return (
        <div className="card">
            <h3>{titulo}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={linhas} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" tickFormatter={nomeMes} />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                        labelFormatter={nomeMes}
                        formatter={(value, name) => [value, formatarCategoria(name)]}
                    />
                    <Legend formatter={formatarCategoria} />
                    {categorias.map((cat, i) => (
                        <Line
                            key={cat}
                            type="monotone"
                            dataKey={cat}
                            stroke={CORES[i % CORES.length]}
                            dot={{ r: 4 }}
                            activeDot={{ r: 7 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
