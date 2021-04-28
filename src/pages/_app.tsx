import { Header } from "../Components/Header";
import { Player } from "../Components/Player";
import "../styles/Global.scss";
import styles from "../styles/app.module.scss";
import { PlayerContexProvider } from "../Contexts/PlayerContext";



function MyApp({ Component, pageProps }) {
    return(  
        <PlayerContexProvider>
            <div className={styles.wrapper}>
                        <main>
                            <Header/>
                            <Component {...pageProps} />;
                        </main>
                        <Player/>
                    </div>
        </PlayerContexProvider>

            
    )}

export default MyApp;
