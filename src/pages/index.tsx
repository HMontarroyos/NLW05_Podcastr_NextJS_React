import {GetStaticProps} from "next";
import Image from "next/image";
import Head from 'next/head';
import Link from "next/link";
import { api } from "../Services/api";
import {format, parseISO} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { convertDurationToTimeString } from "../Utils/convertDurationToTimeString";

import styles from "../styles/home.module.scss";
import {usePlayer } from "../Contexts/PlayerContext";


type Episode = {
    id:string;
    title:string;
    thumbnail: string;
    members:string;
    duration:number;
    durationAtString: string;
    url: string;
    publishedAt: string;
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}


export default function Home({latestEpisodes, allEpisodes}: HomeProps) {
    //MODELO SPA PARA CHAMAR API
/*     useEffect(() => {
        fetch('http://localhost:3333/episodes')
        .then(response => response.json())
        .then(data => console.log(data))
    }, []) */

    const {playList} =  usePlayer()
    const episodeList = [... latestEpisodes, ...allEpisodes];



    return (
        <div className={styles.homepage}>
           <Head>
               <title>Home | Podcastr</title>
           </Head>
           <section className={styles.latestEpisodes}>
               <h2>Últimos lançamentos</h2>
               <ul>
                {latestEpisodes.map((episode, index) =>{
                    return(
                        <li key={episode.id}>
                            <Image width={192} height={192} src={episode.thumbnail} alt={episode.title} objectFit="cover"/>
                            <div className={styles.episodeDetails}>
                            <Link href={`/episodes/${episode.id}`}>
                                <a>{episode.title}</a>
                            </Link>
                                <p>{episode.members}</p>
                                <span>{episode.publishedAt}</span>
                                <span>{episode.durationAtString}</span>
                            </div>

                            <button type="button" onClick={()=> playList(episodeList, index)}>
                                <img src="/play-green.svg" alt="Tocar episodio"/>
                            </button>
                            
                        </li>
                    )
                })}
               </ul>
           </section>
            <section className={styles.allEpisodes}>
                <h2>Todos episódios</h2>
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Podcast</th>
                            <th>Integrantes</th>
                            <th>Data</th>
                            <th>Duração</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allEpisodes.map((episode, index)=>{
                            return(
                                <tr key={episode.id}>
                                    <td style={{width: 72}}>
                                        <Image
                                            width={128}
                                            height={128}
                                            src={episode.thumbnail}
                                            alt={episode.title}
                                            objectFit="cover"
                                            />
                                    </td>
                                    <td>
                                    <Link href={`/episodes/${episode.id}`}>
                                    <a>{episode.title}</a>
                                    </Link>
                                    </td>
                                    <td>{episode.members}</td>
                                    <td style={{width: 100}}>{episode.publishedAt}</td>
                                    <td>{episode.durationAtString}</td>
                                    <td>
                                        <button type="button" onClick={()=> playList(episodeList, index + latestEpisodes.length)}>
                                            <img src="/play-green.svg" alt="Tocar episódio"/>
                                        </button>
                                    </td>   
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>

        </div>
    );
}

//DENTRO DO NEXT ESSA FUNÇÃO E EXECUTADA ANTES DE TUDO 
 //MODELO SSR PARA CHAMAR API - getServerSideProps()
// MODELO SSG PARA CHAMAR API - getStaticProps()
 export const getStaticProps: GetStaticProps = async () => {
    //'episodes?_limit=12&sort=published_at&_order=desc'
    const {data} = await api.get('episodes',{
        params:{
            _limit: 12,
            _sort: 'published_at',
            _order: 'desc'
        }
    })

    const episodes = data.map(episode => {
        return {
            id:episode.id,
            title:episode.title,
            thumbnail:episode.thumbnail,
            members:episode.members,
            publishedAt:format(parseISO(episode.published_at), 'd MMM yy',{locale: ptBR}),
            duration: Number(episode.file.duration),
            durationAtString: convertDurationToTimeString(Number(episode.file.duration)),
            url: episode.file.url,
        }
    })

    const latestEpisodes = episodes.slice(0,2);
    const allEpisodes = episodes.slice(2, episodes.length);

    return {
        props: {
            latestEpisodes,
            allEpisodes,
        },
        revalidate: 60 * 60 * 8,
    }

}