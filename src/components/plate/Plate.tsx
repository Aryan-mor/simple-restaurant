import React, {useEffect, useState} from "react";
import {plate} from "../../common/type";
import {convertToUSD} from "../../common/priceUtils";
import {Button, Form} from "react-bootstrap";
import {useBasketContext} from "../../context/Basket";


type addBasketButtonProps = {
    code: string
}

const AddBasketButton = ({code}: addBasketButtonProps) => {
    const {basket, onAdd, onRemove} = useBasketContext()
    const [showCountSelector, setShowCountSelector] = useState(basket[code] > 0)

    function handleClick() {
        setShowCountSelector(true)
        onAdd(code, 1)
    }

    function handleCountChange(e: React.FormEvent<HTMLSelectElement>) {
        if (!e?.currentTarget) {
            return
        }
        if (e?.currentTarget.value === "Remove") {
            setShowCountSelector(false)
            onRemove(code)
            return;
        }
        onAdd(code, Number(e.currentTarget.value))
    }

    useEffect(() => {
        // Reset Button type when basket reset
        if (basket[code] >= 1)
            return
        setShowCountSelector(false)
    }, [basket, code])


    if (showCountSelector)
        return (
            <div className="d-flex mt-2 align-items-center">
                <span className="pe-2">Count:</span>
                <Form.Select value={basket[code]} onChange={handleCountChange}
                             aria-label="Default select example">
                    <option>Remove</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </Form.Select>
            </div>
        )

    return (
        <Button className="align-self-end" onClick={handleClick}>
            Add to basket
        </Button>
    )
}

type propType = {
    plate: plate
}


const Plate = ({plate}: propType) => {

    const {img, name, code, description, price} = plate

    return (
        <div className="rounded flex-row card d-flex h-100 p-2">
            <div className="d-flex col-4 me-4 align-items-center">
                <img className="w-100 rounded" alt={name} src={img}/>
            </div>
            <div className="h-100 flex-fill d-flex flex-column justify-content-between ">
                <div>
                    <h3 className="h4">{name}</h3>
                    {
                        description &&
                        <p>
                            {description}
                        </p>
                    }
                    <span className="h5 text-success">{convertToUSD(price)}</span>
                </div>
                <div className="d-flex col-8 align-self-end justify-content-end">
                    <AddBasketButton code={code}/>
                </div>
            </div>
        </div>
    )
}


export default Plate;
