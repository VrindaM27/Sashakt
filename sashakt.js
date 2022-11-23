if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

  web3.eth.defaultAccount = web3.eth.accounts[0];

  var attendanceContract = web3.eth.contract([
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
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getWorkers",
      outputs: [
        {
          name: "",
          type: "uint256[]",
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
      ],
      name: "incrementAttendance",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
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
    "0x7Ec3B7dbf8BF8CfA85e068AB9A1ebd5dA1d54030"
  );
  console.log(AttendanceManagement);

  $("#button").click(function () {
    AttendanceManagement.createWorker(
      $("#id").val(),
      $("#age").val(),
      $("#fname").val(),
      $("#lname").val()
    );
  });

  //For Incrementing Attendance
  $("#btnIncAttnd").click(function () {
    AttendanceManagement.incrementAttendance($("#idAttendance").val());
    AttendanceManagement.getParticularWorker(
      $("#idAttendance").val(),
      function (error, result) {
        if (!error) {
          $("#attendance").html("Attendance Marked Successfully. Thank You!");

          console.log(result);
        } else console.error(error);
      }
    );
  });
  //For getting student details
  $("#btnDetails").click(function () {
    AttendanceManagement.getParticularWorker(
      $("#idDetails").val(),
      function (error, result) {
        if (!error) {
          $("#stdDetails").html(
            "Name: " +
              result[0] +
              " " +
              result[1] +
              "<br />" +
              "Age: " +
              result[2] +
              "<br />" +
              "Days Present : " +
              result[3]
          );

          console.log(result);
        } else console.error(error);
      }
    );
  });

  //For getting Student Count
  $("#btnCount").click(function () {
    AttendanceManagement.countWorkers(function (error, result) {
      if (!error) {
        $("#stdCount").html("There are currently " + result + " workers");

        console.log(result);
      } else console.error(error);
    });
  });
}