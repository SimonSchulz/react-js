import { Link } from 'react-router-dom'

export default function ProductsList({ products }) {
    return products.map((p) => (
        <Link key={p.id} to={`/products/${p.id}`} className="card">
            <img src={p.thumbnail} alt={p.title} />
            <div className="card-content">
                <h3>{p.title}</h3>
                <p>${p.price}</p>
            </div>
        </Link>
    ))
}