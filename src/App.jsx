import { useEffect, useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ProductItem from './productItem';
import ShoppingCartItem from './ShoppingCartItem';
import OrderItem from './OrderItem';

function App() {
    const dataList = [
        {
            "id": 1,
            "name": "珍珠奶茶",
            "description": "香濃奶茶搭配QQ珍珠",
            "price": 50
        },
        {
            "id": 2,
            "name": "冬瓜檸檬",
            "description": "清新冬瓜配上新鮮檸檬",
            "price": 45
        },
        {
            "id": 3,
            "name": "翡翠檸檬",
            "description": "綠茶與檸檬的完美結合",
            "price": 55
        },
        {
            "id": 4,
            "name": "四季春茶",
            "description": "香醇四季春茶，回甘無比",
            "price": 45
        },
        {
            "id": 5,
            "name": "阿薩姆奶茶",
            "description": "阿薩姆紅茶搭配香醇鮮奶",
            "price": 50
        },
        {
            "id": 6,
            "name": "檸檬冰茶",
            "description": "檸檬與冰茶的清新組合",
            "price": 45
        },
        {
            "id": 7,
            "name": "芒果綠茶",
            "description": "芒果與綠茶的獨特風味",
            "price": 55
        },
        {
            "id": 8,
            "name": "抹茶拿鐵",
            "description": "抹茶與鮮奶的絕配",
            "price": 60
        }
    ]

    const [carts, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [order, setOrder] = useState({});
    const [memo, setMemo] = useState('');
    // 加一樣產品到購物車
    const handleAddCart = (addData) => {
        let isNew = true;
        const newCarts = carts.map((data) => {
            if (data.id === addData.id) {
                isNew = false;
                return { ...data,
                    count: data.count + 1,
                    subtotal: addData.price * (data.count + 1)
                }
            }
            return data
        })

        isNew ? setCart([...carts, {...addData, count: 1, subtotal: addData.price}]) : setCart(newCarts);
    }

    // 設定購物車數量
    const setCartCount = (id, value) => {
        const newCarts = carts.map((data) => {
            if (data.id === id) {
                return { ...data,
                    count: Number(value),
                    subtotal: data.price * Number(value)
                }
            }
            return data
        })
        setCart(newCarts);
    }

    // 刪除購物車某項商品
    const delCart = (id) => {
        const newCarts = carts.filter((data) => { return data.id !== id })
        setCart(newCarts);
    }

    useEffect(()=>{
        const totalPrice = carts.reduce((pre, next) => {
            return pre + next.subtotal
        }, 0)
        setTotalPrice(totalPrice);
    }, [carts])

    return (
        <div id="root">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="list-group">
                            {dataList.map(data => (
                                <ProductItem key={data.id} id={data.id} itemName={data.name} price={data.price} description={data.description} setCart={handleAddCart} />
                            ))}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" width="50">操作</th>
                                    <th scope="col">品項</th>
                                    <th scope="col">描述</th>
                                    <th scope="col" width="90">數量</th>
                                    <th scope="col">單價</th>
                                    <th scope="col">小計</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {carts.map(data => (
                                    <ShoppingCartItem key={data.id} id={data.id} itemName={data.itemName} price={data.price} description={data.description} count={data.count} setCartCount={setCartCount} delCart={delCart} />
                                ))} 
                            </tbody>
                        </table>
                        {(carts.length > 0) ? (
                            <div>
                                <div className="text-end mb-3">
                                    <h5>總計: <span>${totalPrice}</span></h5>
                                </div>
                                <textarea
                                    className="form-control mb-3"
                                    rows="3"
                                    placeholder="備註"
                                    onChange={(e) => {
                                        setMemo(e.target.value)
                                    }}>
                                </textarea>
                                <div className="text-end">
                                    <button className="btn btn-primary" onClick={()=>{
                                        setOrder({
                                            id: new Date().getTime(),
                                            carts,
                                            totalPrice,
                                            memo
                                        })
                                        setCart([])
                                        setMemo('')
                                    }}>送出</button>
                                </div>
                            </div>
                        ) : (<div className="alert alert-primary text-center" role="alert">請選擇商品</div>)}
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-8"> {
                        order.id ? (
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">
                                        <h5>訂單</h5>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">品項</th>
                                                    <th scope="col">數量</th>
                                                    <th scope="col">小計</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.carts.map(data => (
                                                    <OrderItem key={data.id} itemName={data.itemName} count={data.count} subtotal={data.count * data.price} />
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="text-end">備註: <span>{order.memo}</span></div>
                                        <div className="text-end">
                                            <h5>總計: <span>${order.totalPrice}</span></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (<div className="alert alert-dark text-center" role="alert">尚未建立訂單</div>)
                    } </div>
                </div>
            </div>
        </div>
    )
}

export default App
