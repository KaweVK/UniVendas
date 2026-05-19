import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { formatarCategoria } from "../../utils/formatter";

export function GraficoBarras({ dados, titulo }) {
    return (
        <div className="card">
            <h3>{titulo}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dados}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoria" tickFormatter={formatarCategoria} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalItens" name="Quantidade Total" fill="#47104A" />
                    <Bar dataKey="disponiveis" name="Quantidade Disponível" fill="#104a31ff" />
                    <Bar dataKey="indisponiveis" name="Quantidade Indisponível" fill="#4a2e10ff" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}