import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from '@/styles/Home.module.css'

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`)
    const data = await res.json() 
    console.log("res");
    console.log(res);
    console.log("data");
    console.log(data);
    // Pass data to the page via props
    return { props: { data } }
}

const SSR = ({data}) => {
    console.log("data meals");
    console.log(data);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
            <h1 className={styles.title}> 
                SSR 
            </h1>
            {
                data.meals && data.meals.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            data.meals?.map((meal) => (
                                <Link
                                    href={{pathname: `ssr/${meal.idMeal}`}}>
                                    <center>
                                        <div style={{margin: '16px'}} key={meal.idMeal}>
                                            <p>{meal.strMeal}</p>
                                            <img style={{width: '100px', height: '100px'}} src={meal.strMealThumb} alt={meal.strMeal} />
                                            <br/>
                                        </div>
                                    </center>
                                </Link>
                            ))
                        }
                    </div>
                ) : (
                    <p>Loading ...</p>
                )
            }
            </main>
        </div>
    );
};

export default SSR;