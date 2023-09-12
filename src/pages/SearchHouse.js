import React, {useState} from 'react';

const SearchHouse = () => {
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const handleStartDateChange = (event) => {
        const selectedDate = event.target.value;
        if (selectedDate >= today) {
            setStartDate(selectedDate);
            if (endDate <= selectedDate) {
                setEndDate(null);
            }
        }
    };

    const handleEndDateChange = (event) => {
        const selectedDate = event.target.value;
        if (selectedDate >= today) {
            setEndDate(selectedDate);
        }

    };

    return (
        <>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Địa chỉ"/>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder=" Phòng ngủ"/>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="phòng tắm"/>
                    </div>
                    <div className="col">
                        <select name="max-sqft" className="form-control">
                            <option selected value="0" disabled>Giá</option>
                            <option>Dưới 300$</option>
                            <option>Dưới 500$</option>
                            <option>Dưới 1000$</option>
                        </select>
                    </div>
                    <div className="col">
                        <input type="date" onChange={event => handleStartDateChange(event)} min={today}/>
                    </div>
                    <div className="col">
                        <input type="date" onChange={event => handleEndDateChange(event)} min={today}/>
                    </div>
                    <div className="col">
                        <button name="search_price" type="button" className="form-control btn btn-primary">
                            <span>SEARCH HOUSE</span>
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SearchHouse;