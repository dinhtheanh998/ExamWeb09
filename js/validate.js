const btn = document.querySelector(".btn-save-add");
const inputRequired = document.querySelectorAll(".input-required");
const inputBirthDate = document.querySelectorAll(".input-date");
const inputRequiredNumber = document.querySelectorAll(".input-required-number");
const formEmployee = document.querySelector(".form__employee");
btn.addEventListener("click", submitForm);
function submitForm(e) {
  e.preventDefault();
  const isValid = validateForm();
  if (isValid) {
    // submit form
    const dataArr = [...new FormData(formEmployee)];
    let data = Object.fromEntries(dataArr);
    data = {
      ...data,
      EmployeeCode: data.maNV,
      DateOfBirth: new Date(data.DateOfBirth).toJSON(),
      DepartmentId: "142cb08f-7c31-21fa-8e90-67245e8b283e",
    }
    console.log(data);
    axios.post("https://amis.manhnv.net/api/v1/Employees", data).then((res) => {
      if(res.status === 201) {
        alert("Thêm nhân viên thành công");        
      }      
    }).catch((err) => {
      console.log(err);
    })
  }
}

function validateForm() {
  let isValid = true;
  inputRequired.forEach((item) => {
    if (!validateRequired(item)) {
      isValid = false;
    }
  });
  inputBirthDate.forEach((item) => {
    if (!validateDate(item)) {
      isValid = false;
    }
  });
  inputRequiredNumber.forEach((item) => {
    if (!validateRequiredNumber(item)) {
      isValid = false;
    }
  });
  return isValid;
}

function validateRequired(field) {
  if (field.value.trim() === "") {
    field.classList.add("error");
    field.nextElementSibling.innerHTML = "Vui lòng nhập trường này";
    return false;
  } else {
    field.classList.remove("error");
    return true;
  }
}

function validateDate(field) {
  if (field.value > new Date().toISOString().split("T")[0]) {
    field.classList.add("error");
    field.nextElementSibling.innerHTML = "Ngày sinh không hợp lệ";
    return false;
  }
  return true
}

function validateRequiredNumber(field) {
  let regex = new RegExp(/^[0-9]{0,10}$/);
  if (!validateRequired(field)) {
    return false;
  } else if (!regex.test(field.value)) {
    field.classList.add("error");
    field.nextElementSibling.innerHTML = "Vui lòng nhập số và nhỏ hơn 10 ký tự";
    return false;
  } else {
    field.classList.remove("error");
    return true;
  }
}
