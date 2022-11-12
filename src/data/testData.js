let testCustomerData = [
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

let testRoomData = [
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

let testBookingData = [
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 1,
    "date": "2022/12/22",
    "roomNumber": 5
  },
  {
    "id": "5fwrgu4i7k55hl6t5",
    "userID": 4,
    "date": "2022/01/24",
    "roomNumber": 8
  },
  {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 1,
    "date": "2022/01/10",
    "roomNumber": 2
  },
  {
    "id": "5fwrgu4i7k55hl6t7",
    "userID": 10,
    "date": "2022/02/16",
    "roomNumber": 7
  },
  {
    "id": "5fwrgu4i7k55hl6t8",
    "userID": 1,
    "date": "2022/02/05",
    "roomNumber": 4
  },
  {
    "id": "5fwrgu4i7k55hl6t9",
    "userID": 8,
    "date": "2023/12/14",
    "roomNumber": 3
  },
  {
    "id": "5fwrgu4i7k55hl6ta",
    "userID": 5,
    "date": "2022/01/11",
    "roomNumber": 9
  },
  {
    "id": "5fwrgu4i7k55hl6tb",
    "userID": 6,
    "date": "2022/02/06",
    "roomNumber": 6
  },
  {
    "id": "5fwrgu4i7k55hl6tc",
    "userID": 1,
    "date": "2023/11/30",
    "roomNumber": 7
  },
  {
    "id": "5fwrgu4i7k55hl6td",
    "userID": 7,
    "date": "2022/01/31",
    "roomNumber": 10
  }
]

let testBookings = [
  {
    amount: 477.38,
    date: "2022/01/10",
    id: "5fwrgu4i7k55hl6t6",
    roomNumber: 2,
    userID: 1
  },
  {
    amount: 200.39,
    date: "2022/01/11",
    id: "5fwrgu4i7k55hl6ta",
    roomNumber: 9,
    userID: 5
  },
  {
    amount: 261.26,
    date: "2022/01/24",
    id: "5fwrgu4i7k55hl6t5",
    roomNumber: 8,
    userID: 4
  },
  {
    amount: 497.64,
    date: "2022/01/31",
    id: "5fwrgu4i7k55hl6td",
    roomNumber: 10,
    userID: 7
  },
  {
    amount: 429.44,
    date: "2022/02/05",
    id: "5fwrgu4i7k55hl6t8",
    roomNumber: 4,
    userID: 1
  },
  {
    amount: 397.02,
    date: "2022/02/06",
    id: "5fwrgu4i7k55hl6tb",
    roomNumber: 6,
    userID: 6
  },
  {
    amount: 231.46,
    date: "2022/02/16",
    id: "5fwrgu4i7k55hl6t7",
    roomNumber: 7,
    userID: 10
  },
  {
    amount: 340.17,
    date: "2022/12/22",
    id: "5fwrgu4i7k55hl6sz",
    roomNumber: 5,
    userID: 1
  },
  {
    amount: 231.46,
    date: "2023/11/30",
    id: "5fwrgu4i7k55hl6tc",
    roomNumber: 7,
    userID: 1
  },
  {
    amount: 491.14,
    date: "2023/12/14",
    id: "5fwrgu4i7k55hl6t9",
    roomNumber: 3,
    userID: 8
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
  },
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 12,
    "date": "2022/12/22",
    "roomNumber": 5
  },
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 12,
    "date": "2022/12/22",
    "roomNumber": 6
  },
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 12,
    "date": "2022/12/22",
    "roomNumber": 7
  },
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 12,
    "date": "2022/12/22",
    "roomNumber": 8
  },
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 12,
    "date": "2022/12/22",
    "roomNumber": 9
  },
  {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 12,
    "date": "2022/12/22",
    "roomNumber": 10
  },
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

module.exports = {
  testCustomerData,
  testRoomData,
  testBookingData,
  testBookings,
  customerBookings,
  oldBookings,
  noneAvailable,
  filteredByDate,
  juniorSuites,
  newTestBooking,
}