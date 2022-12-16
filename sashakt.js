function ClearFields() {
  document.getElementById("idAttendance").value = "";
  document.getElementById("amt").value = "";
  document.getElementById("idDetails").value = "";
  document.getElementById("balanceidDetails").value = "";
}

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

  web3.eth.defaultAccount = web3.eth.accounts[0];

  var attendanceContract = web3.eth.contract([
    {
      constant: true,
      inputs: [],
      name: "getBalance",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_workerId",
          type: "uint256",
        },
      ],
      name: "checkacctBalance",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      name: "workerIdList",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_workerId",
          type: "uint256",
        },
        {
          name: "_age",
          type: "uint256",
        },
        {
          name: "_fName",
          type: "string",
        },
        {
          name: "_lName",
          type: "string",
        },
        {
          name: "_recipient",
          type: "address",
        },
      ],
      name: "createWorker",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_workerId",
          type: "uint256",
        },
      ],
      name: "getParticularWorker",
      outputs: [
        {
          name: "",
          type: "string",
        },
        {
          name: "",
          type: "string",
        },
        {
          name: "",
          type: "uint256",
        },
        {
          name: "",
          type: "uint256",
        },
        {
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "countWorkers",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_workerId",
          type: "uint256",
        },
        {
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "incrementAttendance",
      outputs: [],
      payable: true,
      stateMutability: "payable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "fName",
          type: "string",
        },
        {
          indexed: false,
          name: "lName",
          type: "string",
        },
        {
          indexed: false,
          name: "age",
          type: "uint256",
        },
      ],
      name: "workerCreationEvent",
      type: "event",
    },
  ]);

  var AttendanceManagement = attendanceContract.at(
    "0x3e742444E890943126371C73645311A0348DCaEb"
  );
  console.log(AttendanceManagement);

  //Mark Attendance
  $("#btnIncAttnd").click(function () {
    AttendanceManagement.incrementAttendance($("#idAttendance").val(), 50);
    AttendanceManagement.getParticularWorker(
      $("#idAttendance").val(),
      function (error, result) {
        if (!error) {
          $("#attendance").html(
            "Attendance Marked Successfully. Your Payment has been processed."
          );
          console.log(result);
          ClearFields();
        } else {
          console.error(error);
        }
      }
    );
  });
  //View Worker Details
  $("#btnDetails").click(function () {
    AttendanceManagement.getParticularWorker(
      $("#idDetails").val(),
      function (error, result) {
        if (!error) {
          $("#stdDetails").html(
            "Worker Name: " +
              result[0] +
              " " +
              result[1] +
              "<br />" +
              "Worker Age: " +
              result[2] +
              "<br />" +
              "Attendance : " +
              result[3]
          );

          console.log(result);
          ClearFields();
        } else console.error(error);
      }
    );
  });

  //View Account Balance
  $("#balanceButt").click(function () {
    AttendanceManagement.checkacctBalance(
      $("#balanceidDetails").val(),
      function (error, result) {
        if (!error) {
          $("#accDet").html("Balance: " + result);
          console.log(result);
          ClearFields();
        } else console.error(error);
      }
    );
  });

  //Count Workers
  $("#btnCount").click(function () {
    AttendanceManagement.countWorkers(function (error, result) {
      if (!error) {
        $("#stdCount").html("There are currently " + result + " workers");

        console.log(result);
      } else console.error(error);
    });
  });
}
