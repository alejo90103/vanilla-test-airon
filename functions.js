window.addEventListener("load", (event) => {
  var list = [
    {
      id: randomId("item"),
      name: "Item 1",
      checked: false
    },
    {
      id: randomId("item"),
      name: "Item 2",
      checked: false
    },
    {
      id: randomId("item"),
      name: "Item 3",
      checked: false
    },
    {
      id: randomId("item"),
      name: "Item 4",
      checked: false
    }
  ];
  var lastItemRemove = [];
  var addBtn = document.getElementById("add-button");
  var rollbackBtn = document.getElementById("rollback-button");
  var deleteBtn = document.getElementById("delete-button");

  function randomId(prefix) {
    return `${prefix}-${Math.random().toString(16).slice(-4)}`;
  }

  function load() {
    var elList = document.getElementById("list");
    while (elList.firstChild) {
      elList.removeChild(elList.firstChild);
    }
    var lis = "";
    list.map((e, i) => {
      lis += `
              <li id="${e.id}" class="list-group-item px-2 m-0 mt-1 border-0" data-index="${i}">
                <p class="m-0 py-1">${e.name}</p>
              </li>
            `;
    });
    elList.insertAdjacentHTML('beforeend', lis);
    attachEvents();
  }

  function attachEvents() {
    const elements = document.querySelectorAll('.list-group-item');
    elements.forEach(element => {
      element.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.classList.contains('form-check-label')) {
          e.target.classList.remove('form-check-label');
        } else {
          e.target.classList.add('form-check-label');
        }
        var index = this.getAttribute("data-index");
        list[index].checked = !list[index].checked;
      });
      element.addEventListener('dblclick', function (e) {
        e.preventDefault();
        if (e.target.classList.contains('form-check-label')) {
          e.target.classList.remove('form-check-label');
        } else {
          e.target.classList.add('form-check-label');
        }
        var id = this.getAttribute("id");
        document.getElementById(id).remove();
        lastItemRemove = list;
        list = list.filter((e, i) => {
          return e.id != id;
        });
      });
    });
  }

  addBtn.addEventListener('click', function (e) {
    var newItem = document.getElementById("new-item").value;
    if (newItem != "") {
      var id = randomId("item");
      list = [
        ...list,
        {
          id,
          name: newItem,
          checked: false
        }
      ];
      document.getElementById("cancel-button").click();
      load();
    } else {
      alert("Type some text");
    }
  });

  rollbackBtn.addEventListener('click', function (e) {
    if (lastItemRemove.length > 0) {
      list = lastItemRemove.map((e) => ({ ...e, checked: false }));
      lastItemRemove = [];
      load();
    }
  });

  deleteBtn.addEventListener('click', function (e) {
    var del = list.some((e) => {
      return e["checked"] === true;
    })
    if (del) {
      lastItemRemove = list;
      list = list.filter((e, i) => {
        return !e.checked;
      });
      load();
    } else {
      alert("Select an item");
    }
  });

  load();
});
