pragma solidity ^0.4.18; //solidity version

contract Owned {
    address owner; //stores the ethereum address of the sender
	
    function Owned() public {
        owner = msg.sender; 
    }
    
    modifier onlyOwner { //adding a condition to the function
       require(msg.sender == owner);
       _;
   }
}

contract WorkerAttendance is Owned { //class AttendanceSheet is inheriting from class Owned

    struct Worker {
        uint age;
        string fName;
        string lName;
        uint attendanceValue;
        address recipient;
    }
    
    mapping (uint => Worker) workerList; //to store key-value pair, where key=stu id, value=stu details
    uint[] public workerIdList;
    
    event workerCreationEvent(
       string fName,
       string lName,
       uint age
    );
    
	//fn to create a new student
    function createWorker(uint _workerId, uint _age, string _fName, string _lName,address _recipient) onlyOwner public {
        var worker = workerList[_workerId];        
        worker.age = _age;
        worker.fName = _fName;
        worker.lName = _lName;
        worker.attendanceValue = 0;
        worker.recipient = _recipient;
        workerIdList.push(_workerId) -1;
        workerCreationEvent(_fName, _lName, _age);
    }
    
    function incrementAttendance(uint _workerId) onlyOwner public payable{
        workerList[_workerId].attendanceValue = workerList[_workerId].attendanceValue+1;
        workerList[_workerId].recipient.transfer(10);

    }
    
    function getParticularWorker(uint _workerId) public view returns (string, string, uint, uint,address) {
        return (workerList[_workerId].fName, workerList[_workerId].lName, workerList[_workerId].age, workerList[_workerId].attendanceValue,workerList[_workerId].recipient);
    }

    function countWorkers() view public returns (uint) {
        return workerIdList.length;
    }    
}