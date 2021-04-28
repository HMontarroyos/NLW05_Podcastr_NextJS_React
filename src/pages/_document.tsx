import Document, {Html, Head, Main, NextScript} from "next/document";

export default class MyDocument extends Document {
    render(){
        return(
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500&family=Roboto+Condensed&display=swap" rel="stylesheet"/>
                    <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
                
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}

//TODO: Deixar Responsivo o Projeto
//TODO: Transformar o Projeto em um PWA Utilizando next-pwa
//TODO: Tema Dark - https://github.com/getomni/omni
// TODO: Usar o Eletron - Para transformar essa Aplicação em uma Aplicação para Instalar no Desktop e rodar local instalada na Maquina do Usuario
