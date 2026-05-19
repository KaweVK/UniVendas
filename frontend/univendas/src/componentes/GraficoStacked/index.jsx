import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function GraficoStacked({ dados }) {

  const formatar = (nome) => {
    const nomeSeparado = nome?.split(" ");
    if (nomeSeparado.length >= 2) {
      return nomeSeparado[0] + " " + nomeSeparado[1];
    }
    return nome;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart responsive data={dados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nome" tickFormatter={formatar} />
        <YAxis dataKey="total" />
        <Tooltip />
        <Legend name='Produto' />
        <Bar dataKey="disponivel" name="Qtd. Disponivel" stackId="b" fill="#7d3bf6ff" />
        <Bar dataKey="indisponivel" name="Qtd. Indisponivel" stackId="b" fill="#e3b5fdff" />
      </BarChart>
    </ResponsiveContainer>
  );
}