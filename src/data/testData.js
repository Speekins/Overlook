let testCustomers = [
  {
    "id": 1,
    "name": "Leatha Ullrich"
  },
  {
    "id": 2,
    "name": "Rocio Schuster"
  },
  {
    "id": 3,
    "name": "Kelvin Schiller"
  },
  {
    "id": 4,
    "name": "Kennedi Emard"
  },
  {
    "id": 5,
    "name": "Rhiannon Little"
  },
  {
    "id": 6,
    "name": "Fleta Schuppe"
  },
  {
    "id": 7,
    "name": "Dell Rath"
  },
  {
    "id": 8,
    "name": "Era Hand"
  },
  {
    "id": 9,
    "name": "Faustino Quitzon"
  },
  {
    "id": 10,
    "name": "Tony Armstrong"
  }
]

let testRooms = [
  {
    "number": 1,
    "roomType": "residential suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 358.4
  },
  {
    "number": 2,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 477.38
  },
  {
    "number": 3,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 491.14
  },
  {
    "number": 4,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 429.44
  },
  {
    "number": 5,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 340.17
  },
  {
    "number": 6,
    "roomType": "junior suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 397.02
  },
  {
    "number": 7,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 231.46
  },
  {
    "number": 8,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 261.26
  },
  {
    "number": 9,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 200.39
  },
  {
    "number": 10,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 1,
    "costPerNight": 497.64
  }
]

let testBookings = [
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 1,
    "date": "2022/12/22",
    "roomNumber": 5,
    "amount": 340.17
  },
  {
    "id": "5fwrgu4i7k55hl6t5",
    "userID": 43,
    "date": "2022/01/24",
    "roomNumber": 24,
    "amount": 327.24
  },
  {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 1,
    "date": "2022/01/10",
    "roomNumber": 2,
    "amount": 477.38
  },
  {
    "id": "5fwrgu4i7k55hl6t7",
    "userID": 20,
    "date": "2022/02/16",
    "roomNumber": 7,
    "amount": 1
  },
  {
    "id": "5fwrgu4i7k55hl6t8",
    "userID": 1,
    "date": "2022/02/05",
    "roomNumber": 4,
    "amount": 429.44
  },
  {
    "id": "5fwrgu4i7k55hl6t9",
    "userID": 38,
    "date": "2023/12/14",
    "roomNumber": 14,
    "amount": 1
  },
  {
    "id": "5fwrgu4i7k55hl6ta",
    "userID": 25,
    "date": "2022/01/11",
    "roomNumber": 9,
    "amount": 1
  },
  {
    "id": "5fwrgu4i7k55hl6tb",
    "userID": 49,
    "date": "2022/02/06",
    "roomNumber": 5,
    "amount": 1
  },
  {
    "id": "5fwrgu4i7k55hl6tc",
    "userID": 1,
    "date": "2023/11/30",
    "roomNumber": 7,
    "amount": 231.46
  },
  {
    "id": "5fwrgu4i7k55hl6td",
    "userID": 27,
    "date": "2022/01/31",
    "roomNumber": 20,
    "amount": 1
  }
]

let customerBookings = [
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 1,
    "date": "2022/12/22",
    "roomNumber": 5,
    "amount": 340.17
  },
  {
    "id": "5fwrgu4i7k55hl6tc",
    "userID": 1,
    "date": "2023/11/30",
    "roomNumber": 7,
    "amount": 231.46
  }
]

let oldBookings = [
  {
    "id": "5fwrgu4i7k55hl6t8",
    "userID": 1,
    "date": "2022/02/05",
    "roomNumber": 4,
    "amount": 429.44
  },
  {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 1,
    "date": "2022/01/10",
    "roomNumber": 2,
    "amount": 477.38
  }
]

let noneAvailable = [
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 10,
    "date": "2022/12/22",
    "roomNumber": 1
  },
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 17,
    "date": "2022/12/22",
    "roomNumber": 2
  },
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 13,
    "date": "2022/12/22",
    "roomNumber": 3
  },
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 12,
    "date": "2022/12/22",
    "roomNumber": 4
  }
]

let filteredByDate = [
  {
    "number": 1,
    "roomType": "residential suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 358.4
  },
  {
    "number": 2,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 477.38
  },
  {
    "number": 3,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 491.14
  },
  {
    "number": 4,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 429.44
  },
  {
    "number": 5,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 340.17
  },
  {
    "number": 6,
    "roomType": "junior suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 397.02
  },
  {
    "number": 8,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 261.26
  },
  {
    "number": 9,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 200.39
  },
  {
    "number": 10,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 1,
    "costPerNight": 497.64
  }
]

let juniorSuites = [
  {
    "number": 6,
    "roomType": "junior suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 397.02
  },
  {
    "number": 8,
    "roomType": "junior suite",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 261.26
  }
]

let newTestBooking = {
  "id": "5fwrgu4i7k55hl8eg",
  "userID": 1,
  "date": "2023/06/28",
  "roomNumber": 7,
  "amount": 231.46
}

let sortedBookings = [{
  "id": "5fwrgu4i7k55hl6t6",
  "userID": 1,
  "date": "2022/01/10",
  "roomNumber": 2,
  "amount": 477.38
},
{
  "id": "5fwrgu4i7k55hl6ta",
  "userID": 25,
  "date": "2022/01/11",
  "roomNumber": 9,
  "amount": 1
},
{
  "id": "5fwrgu4i7k55hl6t5",
  "userID": 43,
  "date": "2022/01/24",
  "roomNumber": 24,
  "amount": 327.24
},
{
  "id": "5fwrgu4i7k55hl6td",
  "userID": 27,
  "date": "2022/01/31",
  "roomNumber": 20,
  "amount": 1
},
{
  "id": "5fwrgu4i7k55hl6t8",
  "userID": 1,
  "date": "2022/02/05",
  "roomNumber": 4,
  "amount": 429.44
},
{
  "id": "5fwrgu4i7k55hl6tb",
  "userID": 49,
  "date": "2022/02/06",
  "roomNumber": 5,
  "amount": 1
},
{
  "id": "5fwrgu4i7k55hl6t7",
  "userID": 20,
  "date": "2022/02/16",
  "roomNumber": 7,
  "amount": 1
},
{
  "id": "5fwrgu4i7k55hl6sz",
  "userID": 1,
  "date": "2022/12/22",
  "roomNumber": 5,
  "amount": 340.17
},
{
  "id": "5fwrgu4i7k55hl6tc",
  "userID": 1,
  "date": "2023/11/30",
  "roomNumber": 7,
  "amount": 231.46
},
{
  "id": "5fwrgu4i7k55hl6t9",
  "userID": 38,
  "date": "2023/12/14",
  "roomNumber": 14,
  "amount": 1
}]

module.exports = {
  testCustomers,
  testRooms,
  testBookings,
  customerBookings,
  oldBookings,
  noneAvailable,
  filteredByDate,
  juniorSuites,
  newTestBooking,
  sortedBookings
}