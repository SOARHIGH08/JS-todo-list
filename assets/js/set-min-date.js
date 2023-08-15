//set current date as minimum date on the date picker 
let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");
let minDate = `${year}-${month}-${day}`;

export {minDate};
