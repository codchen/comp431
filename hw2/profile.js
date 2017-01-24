// The following four functions are for validation purposes
function vName(name) {
  if (!name[0].match(/([a-z]|[A-Z])/) || !name.match(/^\w+$/)) {
    return "Invalid display name";
  }
  return "";
}

function vEmail(email) {
  if (!email.match(/^[^@]+@[^@]+$/)) {
    return "Invalid email address";
  }
  return "";
}

function vPhone(phone) {
  if (phone.length !== 10 || !phone.match(/^\d{10}$/)) {
    return "Invalid phone number";
  }
  return "";
}

function vZip(zip) {
  if (zip.length !== 5 || !zip.match(/^\d{5}$/)) {
    return "Invalid zipcode";
  }
  return "";
}

const validation = [vName, vEmail, vPhone, vZip];


// Setter and getter for primary content inside a HTML table cell
function getCell(row, num) {
  if (num === 1) {
    return row.cells[1].childNodes[1].innerHTML;
  } else if (num === 2) {
    return row.cells[2].childNodes[1].childNodes[1].value;
  } else if (num === 3) {
    return row.cells[3].childNodes[1].innerHTML;
  } else {
    return "";
  }
}

function setCell(row, num, val) {
  if (num === 1) {
    row.cells[1].childNodes[1].innerHTML = val;
  } else if (num === 2) {
    row.cells[2].childNodes[1].childNodes[1].value = val;
  } else if (num === 3) {
    row.cells[3].childNodes[1].innerHTML = val;
  }
}

// This function is called upon the loading of profile.html
// It sets textareas' event handlers which generate prompts and validation
// messages and validates user input.
// It also sets the click handler of the submit button, which updates the
// page accordingly.
// Note that the submit button will not be enabled unless at least one input
// is validated.
function onLoadHandler() {
  var updatebtn = document.getElementById("updatebtn");
  var table = document.getElementById("table");
  var rowsList = Array.prototype.slice.call(table.rows);
  var changed = [];
  var validated = [];
  rowsList.forEach(function(row, i) {
    let ta = row.cells[2].childNodes[1].childNodes[1];
    ta.value = ta.innerHTML;
    ta.oninput = function() {
      changed[i] = ta.value !== "";
      if (changed[i]) {
        if (i > 3) {
          if (!changed[4] || !changed[5] || getCell(rowsList[4], 2) !==
            getCell(rowsList[5], 2)) {
            validated[4] = validated[5] = false;
            setCell(rowsList[4], 3, "Password not match");
          } else {
            validated[4] = validated[5] = true;
            setCell(rowsList[4], 3, "");
          }
        } else {
          setCell(row, 3, validation[i](ta.value));
          validated[i] = getCell(row, 3) === "";
        }
      } else {
        changed[i] = validated[i] = false;
        setCell(row, 3, "");
        if (i > 3) {
          if (changed[4] || changed[5]) {
            validated[4] = validated[5] = false;
            setCell(rowsList[4], 3, "Password not match");
          } else {
            setCell(rowsList[4], 3, "");
          }
        }
      }
      updatebtn.disabled = !(validated.reduce((t,c)=>(t || c)) &&
        validated.every((v,i)=>(v ? changed[i] : !changed[i])));
    }
    ta.onclick = function() {
      if (!changed[i]) {
        ta.value = "";
        ta.oninput();
      }
    };
    ta.onblur = function() {
      if (!changed[i]) {
        ta.value = "Click to enter a new one";
      }
    }
  });
  updatebtn.onclick = function() {
    rowsList.forEach(function(row, i) {
      if (changed[i]) {
        setCell(row, 3, "From " + getCell(row, 1) + " to " + getCell(row, 2));
        setCell(row, 1, getCell(row, 2));
        changed[i] = validated[i] = false;
        setCell(row, 2, "Click to enter a new one");
      } else {
        setCell(row, 3, "");
      }
    });
    updatebtn.disabled = true;
  };
}