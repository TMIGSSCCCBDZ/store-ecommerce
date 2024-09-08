import { NavBar } from "./_components/navbar"

const StoreLayout = ({children}:{children: React.ReactNode}) => {

    return (
        <div>
            <NavBar />

            {children}
        </div>
    )
}

export default StoreLayout