import {
  btnShinkSidebar,
  btnShowSidebar,
  sideBar,
  btnAddEmployee,
  popupAddEmploye,
  btnClosePopup,
  overlayPopup,
  btnAddSave,
  contextMenuIcon,
  contextMenu,
  maNV,
  sideBarItem,
  headerCheckbox,
  allCheckBox,
  customRadio,
  dropdownDepartment,
  listMenuItem,
  menuItems,
  allRowTable,
} from "./selector-element.js";


//-----------------------------------------------------------------------------------------
// drop down
let dropDown = document.querySelectorAll(".dropdown");
let dropDownItem = document.querySelectorAll(".dropdown-item");
const tableHtml = document.querySelector(".wrap-table table");
// let dropDownLabel = document.querySelector(".dropdown-label");

window.onload =async  function () {
  await loadData();
  initEvent();
};
function initEvent() {
  try {
    
    btnShinkSidebar.addEventListener("click", shinkSidebar);
    // open close popup
    btnAddEmployee.addEventListener("click", showPopup);
    // close popup
    btnClosePopup.addEventListener("click", closePopup);
    const a = document.querySelectorAll(".context__icon");
    console.log("selector:",a);
    // close popup when click outside
    overlayPopup.addEventListener("click", closePopup);

    // tab trong form
    btnAddSave.addEventListener("blur", loopTabindexInPopup);

    contextMenuIcon.forEach((item) => {
      item.addEventListener("click", showContextMenu);
    });
    

    document.addEventListener("click", handleClickOutside);

    headerCheckbox.addEventListener("change", checkAllCheckBoxInTable);

    dropDown.forEach((item) => {
      item.addEventListener("click", addClassShowOption);
    });
    btnShowSidebar.addEventListener("click", growSidebar);
  } catch (error) {
    console.log(error);
  }
}

/**
 * checked input in table
 * Author: dtAnh (18/10/2022)
 */
allCheckBox.forEach((item) => {
  item.addEventListener("change", function (e) {
    // Checked input
    checkInputChecked(item);
    // if checkbox not checked => header checkbox not checked
    if (!item.checked) {
      headerCheckbox.checked = false;
    }
    // if all checkbox checked => header checkbox checked
    if (Array.from(allCheckBox).every((item) => item.checked == true)) {
      headerCheckbox.checked = true;
    }
  });
});

/**
 *  check input checked
 * @params {element in Dom} item
 * Author: dtAnh (18/10/2022)
 */

function checkInputChecked(item) {
  if (item.checked) {
    item.closest("tr").classList.add("checked");
  } else {
    item.closest("tr").classList.remove("checked");
  }
}

/**
 * shink sidebar
 * Author: dtAnh (18/10/2022)
 */
function shinkSidebar() {
  sideBar.classList.add("sidebar--shink");
  btnShinkSidebar.classList.add("hidden");
}

/**
 *  grow sidebar
 * Author: dtAnh (18/10/2022)
 */
function growSidebar() {
  sideBar.classList.remove("sidebar--shink");
  btnShinkSidebar.classList.remove("hidden");
}

/**
 * Hiển thị popup thông tin nhân viên
 * Author: dtAnh (18/10/2022)
 */
function showPopup() {
  // loading.classList.add("active");
  setTimeout(function () {
    popupAddEmploye.classList.add("pop__up--show");
    overlayPopup.classList.add("active");
    // loading.classList.remove("active");
    maNV.focus();
  }, 0);
}
/**
 * Ẩn popup thông tin nhân viên
 * Author: dtAnh (18/10/2022)
 */
function closePopup() {
  popupAddEmploye.classList.remove("pop__up--show");
}

/**
 * Hide dropDown when click outside
 * @param {*} e
 * Author: dtAnh (18/10/2022)
 */
function closeDropDown() {
  dropDown.forEach((item) => {
    item.classList.remove("show-options");
  });
}

/**
 * Lặp tabindex trong form
 * Author: dtAnh (18/10/2022)
 */
function loopTabindexInPopup(e) {
  maNV.focus();
}

/**
 * Show drop down
 * @param {*} e
 * Author: dtAnh (18/10/2022)
 */
const addClassShowOption = (e) => {
  if (e.target.closest(".dropdown")) {
    if (e.target.closest(".dropdown").classList.contains("show-options")) {
      removeClassShowOption(e);
    } else {
      e.target.closest(".dropdown").classList.add("show-options");
    }
  }
};
/**
 * Hide drop down
 * @param {*} e
 * Author: dtAnh (18/10/2022)
 */
// Hide dropdown
const removeClassShowOption = (e) => {
  if (e.target.closest(".dropdown")) {
    e.target.closest(".dropdown").classList.remove("show-options");
  }
};
/**
 * Select item in dropdown
 * Author: dtAnh (18/10/2022)
 */
dropDownItem.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.stopPropagation();
    let item = e.target.closest(".dropdown-item");
    let label = item.closest(".dropdown").querySelector(".dropdown-label");
    if (item) label.value = item.dataset.value;
    removeClassShowOption(e);
  });
});

/**
 * Check all checkbox in table
 * Author: dtAnh (18/10/2022)
 */
function checkAllCheckBoxInTable(e) {
  if (headerCheckbox.checked) {
    allCheckBox.forEach((item) => {
      item.checked = true;
      checkInputChecked(item);
    });
  } else {
    allCheckBox.forEach((item) => {
      item.checked = false;
      checkInputChecked(item);
    });
  }
}

/**
 * Add title for side bar item
 * Author: dtAnh (18/10/2022)
 */
sideBarItem.forEach((item) => {
  showTooltipWhenHover(item);
});

/**
 * Khi sidebar thu nhỏ hover menu item hiển thị tooltip
 * Author: dtAnh (18/10/2022)
 */
function showTooltipWhenHover(item) {
  item.addEventListener("mouseenter", function (e) {
    if (sideBar.classList.contains("sidebar--shink")) {
      item.setAttribute("title", item.dataset.title);
    }
    item.addEventListener("mouseleave", function (e) {
      item.removeAttribute("title");
    });
  });
}

/**
 * Hiển thị context menu
 * @param {*} e
 * Author: dtAnh (18/10/2022)
 */
function showContextMenu(e) {
  let wrap = e.target.closest("td.lastcol");
  //  nếu thẻ element có class context__menu trong td có thuộc tính display block thì ẩn đi
  if (wrap.querySelector(".context__menu").style.display === "block") {
    e.target.closest(".context__icon").classList.remove("show");
    wrap.querySelector(".context__menu").style.display = "none";
  } else {
    // ấn context menu và set z-index
    hideContextMenu();
    e.target.closest(".context__icon").classList.add("show");
    wrap.style.zIndex = 3;
    wrap.querySelector(".context__menu").style.display = "block";
  }
}
/**
 * Ẩn context menu
 * Author: dtAnh (18/10/2022)
 */
function hideContextMenu() {
  contextMenuIcon.forEach((item) => {
    item.classList.remove("show");
  });
  contextMenu.forEach((item) => {
    item.style.display = "none";
    item.closest("td.lastcol").style.zIndex = 0;
  });
}
/**
 * handle click outside
 * Author: dtAnh (18/10/2022)
 */
function handleClickOutside(e) {
  if (!e.target.closest(".context__icon")) hideContextMenu(e);
  if (
    !e.target.classList.contains("dropdown") &&
    !e.target.closest(".dropdown")
  ) {
    closeDropDown(e);
  }
}

/**
 * use "Enter" show drop down and "Arrow key" focus item
 * Author: dtAnh (20/10/2022)
 */
let active = 0;
dropdownDepartment.addEventListener("keydown", function (e) {
  console.log(menuItems);
  if (e.keyCode == 40) {
    if (active < menuItems.length - 1) {
      active++;
      menuItems[active].focus();
    }
  } else if (e.keyCode == 38) {
    if (active > 0) {
      active--;
      menuItems[active].focus();
    }
  } else if (e.keyCode == 13) {
    e.stopPropagation();
    dropdownDepartment.classList.add("show-options");
  }
});
/**
 * use "Enter" to select item in dropdown
 * Author: dtAnh (20/10/2022)
 */
menuItems.forEach((item) => {
  item.addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
      e.stopPropagation();
      let label = item.closest(".dropdown").querySelector(".dropdown-label");
      if (item) label.value = item.dataset.value;
      document.querySelector("#dropdown__input__department").focus();
      removeClassShowOption(e);
    }
  });
});
/**
 * use "Enter" checked input radio
 */
customRadio.forEach((item) => {
  item.addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
      e.stopPropagation();
      item.querySelector("input[type='radio']").checked = true;
    }
  });
});

/**
 * double click in table row to open popup
 */

allRowTable.forEach((item) => {
  item.addEventListener("dblclick", function (e) {
    e.stopPropagation();
    showPopup(e);
  });
});

async function callPI() {
  try {
    let res = await fetch("https://amis.manhnv.net/api/v1/Employees");
    if (!res.ok) return;
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function loadData() {
  try {
    const result = await callPI();
    console.log(result);
    const htmls = result.map((item) => {
      return `
    <tr class="table__body">
    <td class="headcol">
      <div>
        <label
          html-for="tableCheck"
          class="checkbox custom__checkbox checkbox_tbody"
        >
          <input type="checkbox" id="tableCheck" hidden />
          <div class="wrap__icon-custom">
            <i class="icofont-check-alt"></i>
          </div>
        </label>
      </div>
    </td>
    <td>${item.EmployeeCode}</td>
    <td>${item.EmployeeName}</td>
    <td>${item.Gender ? "Nữ" : "Nam"}</td>
    <td class="text-center">${item.DateOfBirth || ""}</td>
    <td>125816832</td>
    <td>Nhân viên</td>
    <td>VP01</td>
    <td>Văn Phòng 01</td>
    <td></td>
    <td></td>
    <td></td>
    <td>21510002190948</td>
    <td>BIDV</td>
    <td></td>
    <td>Cổ nhuế - Bắc từ liêm -hà nội</td>
    <td>0961494001</td>
    <td class="text-right">5.000.000</td>
    <td class="lastcol text-center">
      <div class="wrap__context">
        <button class="context__btn-edit">Sửa</button>
        <div class="context__icon"></div>
        <div class="context__menu">
          <div class="context__menu__item">
            <a> Xóa </a>
          </div>
          <div class="context__menu__item">
            <a> Xóa </a>
          </div>
          <div class="context__menu__item">
            <a> Xóa </a>
          </div>
        </div>
      </div>
    </td>
  </tr>
    `;
    })
    .join("");
    tableHtml.insertAdjacentHTML("beforeend", htmls);
    
  } catch (err) {
    console.log(err);
  }
}
