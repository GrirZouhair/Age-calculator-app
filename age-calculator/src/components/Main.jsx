import "./Main.css";
import Img from "../assets/images/icon-arrow.svg";
import { useState } from "react";

export default function MainPage() {
    const [Days, setDays] = useState("");
    const [Month, setMonth] = useState("");
    const [Year, setYear] = useState("");
    const [Err, setErr] = useState("");
    const [Age, setAge] = useState({ years: 0, months: 0, days: 0 });

    const HandleDays = (e) => {
        setDays(e.target.value);
        setErr("");
    };

    const HandleMonth = (e) => {
        setMonth(e.target.value);
        setErr("");
    };

    const HandleYear = (e) => {
        setYear(e.target.value);
        setErr("");
    };

    const HandleCalculate = () => {
        if (Days && Month && Year) {
            // i 'am just wanna to check if the input is valid !!!
            const isValidDate = (year, month, day) => {
                const lastDayOfMonth = new Date(year, month, 0).getDate();
                return month >= 1 && month <= 12 && day >= 1 && day <= lastDayOfMonth;
            };


            const isValidInput = isValidDate(parseInt(Year, 10), parseInt(Month, 10), parseInt(Days, 10));

            if (isValidInput) {
                const birthDate = new Date(`${Year}-${Month}-${Days}`);
                const currentDate = new Date();

                let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
                let ageMonths = currentDate.getMonth() - birthDate.getMonth();
                let ageDays = currentDate.getDate() - birthDate.getDate();

                if (ageDays < 0) {
                    const lastMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
                    ageDays = lastMonthDays - birthDate.getDate() + currentDate.getDate();
                }

                if (ageMonths < 0) {
                    ageMonths += 12;
                    ageYears--;
                }

                setAge({ years: ageYears, months: ageMonths, days: ageDays });
                setErr("");
            } else {
                setErr("Please provide a valid date.");
            }
        } else {
            setErr("This Field is Required");
        }
    };

    return (
        <>
            <div className="Container">
                <form className="partOne">
                    <section style={{ alignSelf: 'flex-start' }}>
                        <div className="formular">
                            <label className={`${Err ? "error" : ""}`}>DAY</label>
                            <input
                                type="number"
                                placeholder="DD"
                                className={`${Err ? "errorInput" : ""}`}
                                onChange={HandleDays}
                            />
                            <small>{Err}</small>
                        </div>
                        <div className="formular">
                            <label className={`${Err ? "error" : ""}`}>MONTH</label>
                            <input
                                type="number"
                                placeholder="MM"
                                className={`${Err ? "errorInput" : ""}`}
                                onChange={HandleMonth}
                            />
                            <small>{Err}</small>
                        </div>
                        <div className="formular">
                            <label className={`${Err ? "error" : ""}`}>YEAR</label>
                            <input
                                type="number"
                                placeholder="YYYY"
                                className={`${Err ? "errorInput" : ""}`}
                                onChange={HandleYear}
                            />
                            <small>{Err}</small>
                        </div>
                    </section>
                    <div style={{ alignSelf: 'flex-end' }}>
                        <img src={Img} alt="will not show" onClick={HandleCalculate} />
                    </div>
                </form>
                <div className="output">
                    <ul>
                        <li><span>{Age.years === 0 ? '--' : Age.years}</span>years</li>
                        <li><span>{Age.months === 0 ? '--' : Age.months}</span>months</li>
                        <li><span>{Age.days === 0 ? '--' : Age.days}</span>days</li>
                    </ul>
                </div>
            </div>

            <div class="attribution">
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
                Coded by <a href="https://github.com/GrirZouhair">GrirZouhair</a>.
            </div>
        </>
    );
}
