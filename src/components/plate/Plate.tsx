import React, {useEffect, useState} from "react";
import {plate} from "../../common/type";
import {convertToUSD} from "../../common/priceUtils";
import {Button} from "react-bootstrap";
import {useBasketContext} from "../../context/Basket";


type addBasketButtonProps = {
    code: string,
    plate: plate
}

const AddBasketButton = ({code, plate}: addBasketButtonProps) => {
    const {max} = plate
    const {basket, onAdd, onRemove} = useBasketContext()
    const count = basket[code]
    const [showCountSelector, setShowCountSelector] = useState(count > 0)

    function handleClick() {
        setShowCountSelector(true)
        onAdd(code, 1)
    }

    function handleCountChange(count: number) {
        if (count > max)
            return;
        if (count === 0) {
            setShowCountSelector(false)
            onRemove(code)
            return;
        }
        onAdd(code, Number(count))
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
                <div className="btn-group add-select" role="group" style={{height: 45}}>
                    <button
                        type="button"
                        data-cy="decrease-count"
                        className={`btn btn-orange`}
                        onClick={() => handleCountChange(count - 1)}>
                        <i
                            className={`text-white fa-solid ${count === 1 ? 'fa-trash' : 'fa-minus'}`}/>
                    </button>
                    <div
                        data-cy="count"
                        className="btn btn-light pe-none d-flex flex-column p-0 d-flex align-items-center justify-content-center"
                        style={{minWidth: 50}}>
                        {count}
                        {count + 1 > max &&
                            <small style={{fontSize: '0.5em'}}>
                                MAX
                            </small>
                        }
                    </div>
                    <button
                        type="button"
                        data-cy="increase-count"
                        className="btn btn-green"
                        disabled={(count + 1) > max}
                        onClick={() => handleCountChange(count + 1)}>
                        <i
                            className="text-white fa-solid fa-plus"/>
                    </button>
                </div>
            </div>
        )

    return (
        <Button className="add-btn btn-green align-self-end mt-2" onClick={handleClick} style={{height: 45}}>
            Add
        </Button>
    )
}

type propType = {
    plate: plate
}


const Plate = ({plate}: propType) => {

    const {img, name, code, description, price} = plate

    return (
        <div className="plate rounded flex-row card d-flex h-100 p-3">
            <div className="d-flex col-3 col-lg-4 pe-4  align-items-center">
                <img className="w-100 rounded" alt={name} src={img}/>
            </div>
            <div className="h-100 flex-fill d-flex flex-column  justify-content-between ">
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
                    <AddBasketButton code={code} plate={plate}/>
                </div>
            </div>
        </div>
    )
}


export default Plate;
