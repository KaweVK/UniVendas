// src/components/GraficoBarras.jsx
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
                    <Bar dataKey="totalItens" name="Quantidade" fill="#47104A" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}