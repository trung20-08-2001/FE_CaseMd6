import React, { useState } from 'react';

function Test() {
    const [isDivOpen, setIsDivOpen] = useState(false);

    const toggleDiv = () => {
        setIsDivOpen(!isDivOpen);
    };

    return (
        <div className="container">
            <div className="fixed-button">
                <button className="btn btn-primary" onClick={toggleDiv}>
                    {isDivOpen ? 'Ẩn Thẻ' : 'Hiện Thẻ'}
                </button>
            </div>

            {isDivOpen && (
                <div className="fixed-div">
                    <p>Nội dung thẻ div nằm ở đây.</p>
                </div>
            )}
        </div>
    );
}

export default Test;
