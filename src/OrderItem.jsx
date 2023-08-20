import PropTypes from 'prop-types';

OrderItem.propTypes = {
    itemName: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    subtotal: PropTypes.number.isRequired,
}

function OrderItem({itemName, count, subtotal}) {
    return (
        <tr>
            <td>{itemName}</td>
            <td>{count}</td>
            <td>{subtotal}</td>
        </tr>
    )
}

export default OrderItem