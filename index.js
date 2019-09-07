// Your code here

function createEmployeeRecord(array) {
        return {
            firstName: array[0],
            familyName: array[1],
            title: array[2],
            payPerHour: array[3],
            timeInEvents: [],
            timeOutEvents: []
        }
}

function createEmployees(employees) {
    return employees.map(employee => {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employee, timeIn) {
    let getHour = parseInt(timeIn.split(" ")[1])
    let getDate = timeIn.split(" ")[0]
    employee.timeInEvents.push({
        hour: getHour,
        type: "TimeIn",
        date: getDate
    })
    return employee
}

function createTimeOutEvent(employee, timeOut) {
    let [date, hour] = timeOut.split(" ")
    employee.timeOutEvents.push({
        hour: parseInt(hour),
        date: date,
        type: "TimeOut"
    })
    return employee
}

function hoursWorkedOnDate(employee, day) {
    let timeIn = employee.timeInEvents.find(timeInEvent => {
        return timeInEvent.date == day
    })
    let timeOut = employee.timeOutEvents.find(timeOutEvent => {
        return timeOutEvent.date == day
    })
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, day) {
    return hoursWorkedOnDate(employee, day) * employee.payPerHour
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(employee => {
        return employee.date
    })

    let amtToPay = dates.reduce((accumulator, day) => {
        return accumulator + wagesEarnedOnDate(employee, day)
    }, 0)

    return amtToPay
}

function calculatePayroll(employees) {
    let payRoll = employees.reduce((accumulator, employee) => {
       return accumulator + allWagesFor(employee)
    }, 0)
    return payRoll
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(employee => {
        return createEmployeeRecord(employee)
    })
    
}

function findEmployeebyFirstName(employees, firstName) {
    return employees.find(employee => {
        return employee.firstName == firstName
    })
}