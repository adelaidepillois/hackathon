import styles from './game.module.css'
import '../globals.css'

export default async function Page() {
    const username = "Username";
    return (
        <div className={`${styles['bg-custom-gradient']} ${styles['min-h-screen']}`}>
            <div className="absolute left-[86px] top-[40px] w-[172px] h-[40px] bg-white text-[#2162DD] opacity-100 rounded-[1000px] flex items-center justify-center shadow font-neue">
                {username}
            </div>
        </div>
    )
}