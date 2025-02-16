// Observer pattern class
class Observer {
    update(phoneNumber) {
        throw new Error("update() method must be implemented");
    }
}

class PhoneNumberOperationLogger extends Observer {
    update(phoneNumber) {
        console.log("Phone number dialed: " + phoneNumber); 
    }
}

class DialingMessageLogger extends Observer {
    update(phoneNumber) {
        console.log("Now Dialing " + phoneNumber); 
    }
}

// class Telephone 
class Telephone {
    constructor() {
        this.phoneNumbers = new Set();
        this.observers = [];
    }

    addPhoneNumber(phoneNumber) {
        this.phoneNumbers.add(phoneNumber);
    }

    removePhoneNumber(phoneNumber) {
        this.phoneNumbers.delete(phoneNumber);
    }

    dialPhoneNumber(phoneNumber) {
        if (this.phoneNumbers.has(phoneNumber)) {
            console.log("Dialing " + phoneNumber + "..."); 

            this.notifyObservers(phoneNumber);
        } else {
            console.log("Phone number " + phoneNumber + " not found."); 
        }
    }

    addObserver(observer) {
        if (!(observer instanceof Observer)) {
            throw new Error("Added observer is not a valid Observer object.");
        }
        this.observers.push(observer);
    }

    removeObserver(observer) {
        // to remove observer
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers(phoneNumber) {
        for (let i = 0; i < this.observers.length; i++) { 
            const observer = this.observers[i];
            observer.update(phoneNumber);
        }
    }
}

//  for example
const telephone = new Telephone();
const logger1 = new PhoneNumberOperationLogger();
const logger2 = new DialingMessageLogger();

telephone.addObserver(logger1);
telephone.addObserver(logger2);

telephone.addPhoneNumber("23470313135");
telephone.addPhoneNumber("1234567890");

telephone.dialPhoneNumber("23470313135");
telephone.dialPhoneNumber("1234567890");
telephone.dialPhoneNumber("9999669988");

telephone.removePhoneNumber("23470313135");
telephone.dialPhoneNumber("23470313135");

telephone.removeObserver(logger1);
telephone.dialPhoneNumber("1234567890");



//  for the DOM interaction 
const phoneNumberInput = document.getElementById("phoneNumberInput");
const addPhoneNumberButton = document.getElementById("addPhoneNumberButton");
const removePhoneNumberButton = document.getElementById("removePhoneNumberButton");
const dialPhoneNumberInput = document.getElementById("dialPhoneNumberInput");
const dialPhoneNumberButton = document.getElementById("dialPhoneNumberButton");
const outputDiv = document.getElementById("output");

addPhoneNumberButton.addEventListener("click", function() {
    const phoneNumber = phoneNumberInput.value;
    telephone.addPhoneNumber(phoneNumber);
    phoneNumberInput.value = "";
});

removePhoneNumberButton.addEventListener("click", function() {
    const phoneNumber = phoneNumberInput.value;
    telephone.removePhoneNumber(phoneNumber);
    phoneNumberInput.value = "";
});

dialPhoneNumberButton.addEventListener("click", function() {
    const phoneNumber = dialPhoneNumberInput.value;
    telephone.dialPhoneNumber(phoneNumber);
    dialPhoneNumberInput.value = "";
});

//  update methods 
PhoneNumberOperationLogger.prototype.update = function(phoneNumber) {
    outputDiv.innerHTML = outputDiv.innerHTML + "<p>Phone number dialed: " + phoneNumber + "</p>";
};

DialingMessageLogger.prototype.update = function(phoneNumber) {
    outputDiv.innerHTML = outputDiv.innerHTML + "<p>Now Dialing " + phoneNumber + "</p>";
};

