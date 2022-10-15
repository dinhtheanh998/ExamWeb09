const btnToggle = document.querySelector(".header__toggle");
const sideBar = document.querySelector(".sidebar");
const btnAddEmployee = document.querySelector(".btn-add-employ");
const popupAddEmploye = document.querySelector(".pop__up");
const formEmployee = document.querySelector(".form__employee");
const btnClose = formEmployee.querySelector(".btn__close");
const overlay = document.querySelector(".popup__overlay");
const btnAddSave = document.querySelector(".btn-add-save");
const contextMenuIcon = document.querySelectorAll(".context__icon");
const contextMenu = document.querySelectorAll(".context__menu");

const headerCheckbox = document.querySelector(
  "th.headcol .custom__checkbox input"
);
const allCheckBox = document.querySelectorAll(".custom__checkbox input");

// drop down
let dropDown = document.querySelectorAll(".dropdown");
let dropDownItem = document.querySelectorAll(".dropdown-item");
let dropDownLabel = document.querySelector(".dropdown-label");
// togghle sidebar

function toggleSidebar() {
  sideBar.classList.toggle("sidebar--shink");
}

function showPopup() {
  popupAddEmploye.classList.add("pop__up--show");
  overlay.classList.add("active");
}

function closePopup() {
  popupAddEmploye.classList.remove("pop__up--show");
}
// remove all active context menu
function remoActiveContextMenu() {
  contextMenu.forEach((item) => {
    item.style.display = "none";
    item.closest("td.lastcol").style.zIndex = 0;
  });
}
// close drop down
function closeDropDown(e) {
  if (
    !e.target.classList.contains("dropdown") &&
    !e.target.closest(".dropdown")
  ) {
    dropDown.forEach((item) => {
      item.classList.remove("show-options");
    });
  }
}

btnToggle.addEventListener("click", toggleSidebar);

// open close popup
btnAddEmployee.addEventListener("click", showPopup);
// close popup
btnClose.addEventListener("click", closePopup);

// close popup when click outside
overlay.addEventListener("click", closePopup);

document.addEventListener("keydown", function (e) {
  if (document.activeElement === btnAddSave) {
    e.preventDefault();
  }
});
// Drop down
const addClassShowOption = (e) => {
  if (e.target.closest(".dropdown")) {
    e.target.closest(".dropdown").classList.add("show-options");
  }
};
const removeClassShowOption = (e) => {
  if (e.target.closest(".dropdown")) {
    e.target.closest(".dropdown").classList.remove("show-options");
  }
};
dropDown.forEach((item) => {
  item.addEventListener("click", addClassShowOption);
});

dropDownItem.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.stopPropagation();
    let item = e.target.closest(".dropdown-item");
    if (item) dropDownLabel.innerHTML = item.dataset.value;
    removeClassShowOption(e);
  });
});

document.addEventListener("click", function (e) {
  closeDropDown(e);
  if (e.target.closest(".context__icon")) {
    let wrap = e.target.closest("td.lastcol");
    if (wrap.querySelector(".context__menu").style.display === "block") {
      console.log("Hien roi");
      wrap.querySelector(".context__menu").style.display = "none";
    } else {
      remoActiveContextMenu();
      let coord = e.target.getBoundingClientRect();
      wrap.style.zIndex = 3;
      wrap.querySelector(".context__menu").style.top =
        coord.top + coord.height + "px";
      wrap.querySelector(".context__menu").style.right = 64 + "px";
      wrap.querySelector(".context__menu").style.position = "fixed";
      wrap.querySelector(".context__menu").style.display = "block";
    }
  }

  if (
    (!e.target.closest(".context__menu") &&
      !e.target.closest(".context__icon")) ||
    e.target.closest(".context__menu__item")
  ) {
    remoActiveContextMenu();
  }
});

headerCheckbox.addEventListener("change", function (e) {
  headerCheckbox.checked = !headerCheckbox.checked
  allCheckBox.forEach((item) => {
    item.checked = !item.checked;
  });
});

// $(".btn-add-employ").click(function () {
//   $(".pop__up").css('display', 'flex');
//   $(".popup__overlay").css('display', 'block');
// })
