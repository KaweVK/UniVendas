import './BarraRodape.css'

export const BarraRodape = () => {
    return (<footer className="rodape">
        <section>
            <ul>
                <li>
                    <a href="https://www.linkedin.com/in/victorkawe/" target="_blank" rel="noreferrer">
                        <img src="/imagens/Logos/linkedin.png" alt="Linkedin logo" />
                    </a>
                </li>
                <li>
                    <a href="https://github.com/KaweVK" target="_blank" rel="noreferrer">
                        <img src="/imagens/Logos/github.png" alt="Linkedin logo" />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/kawevk" target="_blank" rel="noreferrer">
                        <img src="/imagens/Logos/instagram.png" alt="instagram logo" />
                    </a>
                </li>
            </ul>
        </section>
        <section>
            <img src="/imagens/Logos/univendas.png" alt="" />
        </section>
        <section>
            <p>
                Desenvolvido por <br /> Victor Kawê. <br/>
            </p>
        </section>
    </footer>
    )
}