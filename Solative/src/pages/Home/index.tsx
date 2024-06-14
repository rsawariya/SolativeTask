import SearchBox from "../../components/feature/SearchBox/SearchBox"
import Table from "../../components/feature/Table"
import Paginator from "../../components/feature/Paginator"
import "./index.css"

const Home = () => {
    return <div className="home">
        <SearchBox />
        <Table />
        <Paginator />
    </div>
}

export default Home