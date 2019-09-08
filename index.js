let createEmployeeRecord = function(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployees = function(arraysArray) {
    return arraysArray.map(function(array){
        return createEmployeeRecord(array)
    })
}

let createTimeInEvent = function(employee, timeIn) {
    let [date, hour] = timeIn.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, timeOut) {
    let [date, hour] = timeOut.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, dateWorked) {
    let timeIn = employee.timeInEvents.find(function(event) {
        return event.date === dateWorked
    })
    let timeOut = employee.timeOutEvents.find(function(event) {
        return event.date === dateWorked
    })
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateWorked) {
    let hours = hoursWorkedOnDate(employee, dateWorked)
    return hours * employee.payPerHour
    
}

let allWagesFor = function(employee){
    let dates = employee.timeInEvents.map(function(event){
        return event.date
    })
    let wages = dates.reduce(function(total, date){
        return total + wagesEarnedOnDate(employee, date)
    }, 0)
    return wages
}

let calculatePayroll = function(employees) {
    return employees.reduce(function(total, employee){
        return total + allWagesFor(employee)      
    }, 0)
}

let createEmployeeRecords = function(csvData){
    return csvData.map(function(employeeData){
        return createEmployeeRecord(employeeData)
    })
}

let findEmployeebyFirstName = function(employees, name){
    return employees.find(function(employee){
        return employee.firstName == name
    })
}











