import PropTypes from 'prop-types';

ShoppingCartItem.propTypes = {
    id: PropTypes.number.isRequired,
    itemName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    setCartCount: PropTypes.func.isRequired,
    delCart: PropTypes.func.isRequired,
}

function ShoppingCartItem({id, itemName, description, price, count, setCartCount, delCart}) {
    return (
        <tr>
            <td><button type="button" className="btn btn-sm" onClick={()=>delCart(id)}>x</button></td>
            <td>{itemName}</td>
            <td><small>{description}</small></td>
            <td>
                <select className="form-select" value={count} onChange={(e) => 
                    setCartCount(id, e.target.value)
                }>
                {/* 選項值超過5時，會變動選項值 */}
                {[...Array(10).keys()].map((item) => {
                    if (count < 5)
                        return (<option value={item + 1} key={item}>{item + 1}</option>)
                    else
                        return (<option value={item + count - 4} key={item}>{item + count - 4}</option>)
                })}
                </select>
            </td>
            <td>{price}</td>
            <td>{price * count}</td>
        </tr>
    )
}

export default ShoppingCartItem