import React, {useState} from 'react';

const BuyModal = () => {

    const [show, setShow] = useState(false)

    return (
        <div className="modal-wrapper">
            <div className="modal">
                <h1>Покупка билета</h1>
                <h3>Билет куплен</h3>
            </div>
        </div>
    );
};

export default BuyModal;