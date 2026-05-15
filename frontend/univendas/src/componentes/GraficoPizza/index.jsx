import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { formatarCategoria } from "../../utils/formatter";

const CORES = ["#5a165eff", "#7d3bf6ff", "#e3b5fdff", "#7e3232ff", "#f3c6f9ff", "#f896d5ff", "#10b7e4ff", "#f97316"];

export function GraficoPizza({ dados, titulo }) {
    const formatados = dados.map((d) => ({
        name: formatarCategoria(d.categoria),
        value: Number(d.totalReceita),
    }));

    return (
        <div className="card">
            <h3>{titulo}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={formatados}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {formatados.map((_, i) => (
                            <Cell key={i} fill={CORES[i % CORES.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(v) => `R$ ${Number(v).toFixed(2)}`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
