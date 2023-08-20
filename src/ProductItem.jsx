import PropTypes from 'prop-types';

ProductItem.propTypes = {
    id: PropTypes.number.isRequired,
    itemName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    setCart: PropTypes.func.isRequired
}

function ProductItem({id, itemName, price, description, setCart}) {
    return (
        <a id={id} href="#" className="list-group-item list-group-item-action"
            onClick={() => setCart({
                id: id,
                itemName: itemName,
                price: price,
                description: description,
                count: 1,
                subtotal: price
            })}
        >
            <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{itemName}</h5>
            <small>${price}</small>
            </div>
            <p className="mb-1">{description}</p>
        </a >
    )
}

export default ProductItem