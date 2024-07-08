// import React, { useState } from "react";
// import "./Income.css";
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import { useEffect } from "react";

// const Income = () => {
//   const [incomeText, setIncomeText] = useState("");
//   const [incomeCost, setIncomeCost] = useState("");
//   const [incomeDate, setIncomeDate] = useState(""); 
//   const [incomes, setIncomes] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/incomes/getincomes")
//       .then((res) => {
//         console.log(res.data);
//         setIncomes(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const handleAddIncome = () => {
//     let inpObj = { incomeText, incomeCost, incomeDate };
//     const Url = "http://localhost:4000/incomes/createincome";
//     axios
//       .post(Url, inpObj)
//       .then((res) => {
//         if (res.status === 200) {
//           alert("Income added");
//            window.location.reload();
//         } else {
//           Promise.reject();
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     if (incomeText && incomeCost && incomeDate) {
//       const newIncome = {
//         id: Date.now(),
//         text: incomeText,
//         cost: parseFloat(incomeCost),
//         date: incomeDate,
//       };

//       setIncomes([...incomes, newIncome]);
//       setIncomeText("");
//       setIncomeCost("");
//       setIncomeDate("");
//     } else {
//       alert("Please fill out all fields.");
//     }
//   };

//   // const handleDeleteIncome = (incomeId) => {
//   //   const updatedIncomes = incomes.filter((income) => income.id !== incomeId);
//   //   setIncomes(updatedIncomes);
//   // };

//   const handleDeleteIncome = (id) => {
//     axios
//       .delete("http://localhost:4000/income/deleteincome/" + id)
//       .then((res) => {
//         console.log(res.data);
//         if (res.status === 200) {
//           alert("user deleted successfully");
//           window.location.reload();
//         } else {
//           Promise.reject();
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const calculateTotalIncome = () => {
//     return incomes.reduce((total, income) => total + income.cost, 0).toFixed(2);
//   };

//   const display = (data) => {
//     return data.map((income) => {
//       return (
//         <tr>
//           <td className="Inc-td">{income.incomeText}</td>
//           <td className="Inc-td cost">&#8377;{income.incomeCost}</td>
//           <td className="Inc-td">{income.incomeDate}</td>
//           <td className="Inc-td">
//             <button
//               onClick={() => handleDeleteIncome(income._id)}
//               className="Exp-button"
//             >
//               Delete
//             </button>
//           </td>
//         </tr>
//       );
//     });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="Income lenght">
//         <div className="div">
//           <div className="class">
//             <h1 className="cat-heading">Income</h1>
//             <button>
//               <Link className="links" to="/home">
//                 Go back to Home
//               </Link>
//             </button>
//           </div>
//           <h3>Total Income is: &#8377;{calculateTotalIncome()}</h3>
//           <div className="inc-details">
//             <div className="Income-inputs">
//               <input
//                 className="Ex-Txtinput"
//                 type="text"
//                 placeholder="Income text"
//                 value={incomeText}
//                 onChange={(e) => setIncomeText(e.target.value)}
//               />
//               <input
//                 type="number"
//                 placeholder="Cost"
//                 value={incomeCost}
//                 onChange={(e) => setIncomeCost(e.target.value)}
//               />
//               <input
//                 type="date"
//                 placeholder="Date"
//                 style={{ width: "18px" }}
//                 value={incomeDate}
//                 onChange={(e) => setIncomeDate(e.target.value)}
//               />
//               <button onClick={handleAddIncome}>Add Income</button>
//             </div>
//             <table className="Inc-table">
//               <thead>
//                 <tr className="Inc-tr">
//                   <th className="Inc-th">Income</th>
//                   <th className="Inc-th">&#8377;Cost</th>
//                   <th className="Inc-th">Date</th>
//                   <th className="Inc-th">Action</th>
//                 </tr>
//               </thead>
//               <tbody>{display(incomes)}</tbody>
//             </table>
//           </div>
//         </div>
//         <div className="Income-image"></div>
//       </div>
//     </>
//   );
// };

// export default Income;


// // {Expenditures.map((Expenditure) => (
// //                 <tr className="Ex-tr" key={Expenditure.id}>
// //                   <td className="Ex-td">{Expenditure.text}</td>
// //                   <td className="Ex-td">&#8377;{Expenditure.cost}</td>
// //                   <td className="Ex-td">{Expenditure.date}</td>
// //                   <td className="Ex-td">
// //                     <button
// //                       className="Exp-button"
// //                       onClick={() => handleDeleteExpenditure(Expenditure.id)}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}





import React, { useState } from "react";
import "./Income.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useEffect } from "react";

const Income = () => {
  const [incomeText, setIncomeText] = useState("");
  const [incomeCost, setIncomeCost] = useState("");
  const [incomeDate, setIncomeDate] = useState(""); 
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/income/getincomes")
      .then((res) => {
        console.log(res.data);
        setIncomes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddIncome = () => {
    let inpObj = {IncomeText: incomeText, IncomeCost:incomeCost, IncomeDate:incomeDate };
    const Url = "http://localhost:4000/income/createincome";
    axios
      .post(Url, inpObj)
      .then((res) => {
        if (res.status === 200) {
          alert("Income added");
           window.location.reload();
           setIncomes([...incomes, res.data]);
        } else {
          Promise.reject();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteIncome = (id) => {
    axios
      .delete("http://localhost:4000/income/deleteincome/" + id)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          alert("Income deleted successfully");
          window.location.reload();
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateTotalIncome = () => {
    let totalIncome=0;
    incomes.forEach((income)=>{
      totalIncome= totalIncome + income.IncomeCost;
    })
    return totalIncome;
  };

  const display = (data) => {
    return data.map((income) => {
      return (
        <tr>
          <td className="Inc-td">{income.IncomeText}</td>
          <td className="Inc-td cost">&#8377;{income.IncomeCost}</td>
          <td className="Inc-td">{income.IncomeDate}</td>
          <td className="Inc-td">
            <button
              onClick={() => handleDeleteIncome(income._id)}
              className="Exp-button"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <Navbar />
      <div className="Income lenght">
        <div className="div">
          <div className="class">
            <h1 className="cat-heading">Income</h1>
            <button>
              <Link className="links" to="/home">
                Go back to Home
              </Link>
            </button>
          </div>
          <h3>Total Income is: &#8377;{calculateTotalIncome()}</h3>
          <div className="inc-details">
            <div className="Income-inputs">
              <input
                className="Ex-Txtinput"
                type="text"
                placeholder="Income text"
                value={incomeText}
                onChange={(e) => setIncomeText(e.target.value)}
              />
              <input
                type="number"
                placeholder="Cost"
                value={incomeCost}
                onChange={(e) => setIncomeCost(e.target.value)}
              />
              <input
                type="date"
                placeholder="Date"
                style={{ width: "18px" }}
                value={incomeDate}
                onChange={(e) => setIncomeDate(e.target.value)}
              />
              <button onClick={handleAddIncome}>Add Income</button>
            </div>
            <table className="Inc-table">
              <thead>
                <tr className="Inc-tr">
                  <th className="Inc-th">Income</th>
                  <th className="Inc-th">&#8377;Cost</th>
                  <th className="Inc-th">Date</th>
                  <th className="Inc-th">Action</th>
                </tr>
              </thead>
              <tbody>{display(incomes)}</tbody>
            </table>
          </div>
        </div>
        <div className="Income-image"></div>
      </div>
    </>
  );
};

export default Income;


// {Expenditures.map((Expenditure) => (
//                 <tr className="Ex-tr" key={Expenditure.id}>
//                   <td className="Ex-td">{Expenditure.text}</td>
//                   <td className="Ex-td">&#8377;{Expenditure.cost}</td>
//                   <td className="Ex-td">{Expenditure.date}</td>
//                   <td className="Ex-td">
//                     <button
//                       className="Exp-button"
//                       onClick={() => handleDeleteExpenditure(Expenditure.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}