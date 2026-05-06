import { useState } from 'react'
import { Botao } from '../Botao'

const labelClassName = 'mb-2 block text-sm font-medium text-slate-700'
const inputClassName =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center text-2xl tracking-[0.5em] font-bold text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#8a4d94] focus:ring-4 focus:ring-fuchsia-100'

export const VerificacaoEmail = ({ email, aoConfirmar, aoReenviar, aoVoltar, enviando }) => {
  const [codigo, setCodigo] = useState('')

  const aoSalvar = (e) => {
    e.preventDefault()
    if (codigo.length !== 6) {
      alert('Digite os 6 dígitos do código.')
      return
    }
    aoConfirmar(codigo)
  }

  return (
    <section className="h-full">
      <form
        onSubmit={aoSalvar}
        className="flex h-full flex-col justify-center rounded-[28px] bg-white/80 p-6 shadow-[0_24px_70px_-50px_rgba(68,18,74,0.45)] ring-1 ring-slate-200/80 backdrop-blur sm:p-8 lg:min-h-[560px] lg:p-10"
      >
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6b2e74]/70">
            Verificação
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Confirme seu email
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enviamos um código de 6 dígitos para{' '}
            <span className="font-semibold text-[#5a1f62]">{email}</span>.
            Ele expira em 15 minutos.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className={labelClassName}>Código de verificação</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className={inputClassName}
              required
            />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Botao type="submit" className="botao-padrao" disabled={enviando}>
            {enviando ? 'Verificando...' : 'Confirmar'}
          </Botao>

          <p className="text-center text-sm text-slate-500">
            Não recebeu?{' '}
            <button
              type="button"
              onClick={aoReenviar}
              disabled={enviando}
              className="font-semibold text-[#5a1f62] underline-offset-4 transition hover:underline disabled:opacity-50"
            >
              Reenviar código
            </button>
          </p>

          <p className="text-center text-sm text-slate-500">
            <button
              type="button"
              onClick={aoVoltar}
              className="font-semibold text-[#5a1f62] underline-offset-4 transition hover:underline"
            >
              Voltar
            </button>
          </p>
        </div>
      </form>
    </section>
  )
}