let settingsBtn=document.getElementById("DashBoardTopRightDivImg1");

let itemsInput = document.getElementById("itemsInput");

settingsBtn.addEventListener("click", () => {
    window.location.href="../Pages/Settings.html";
});

let addPageButton=document.querySelector(".DashBoardBottomButton");

let DashboardPage=document.getElementById("DashboardPage");
let addPage=document.getElementById("AddNewButtonMainDiv");

let DashboardPageBack=document.getElementById("pageBack");
let pageToggle=document.getElementById("pageChange");

let AsiderSection2=document.querySelector(".AsiderInnerDiv3");
let AsiderSection1=document.querySelector(".AsiderInnerDiv2");

let addPageForm=document.querySelector(".DashBoardBottomDiv1");
let addPageForm2=document.querySelector(".DashBoardBottomDiv2");

function styleAddPage() {
    addPage.style.flexDirection="column";
    addPage.style.alignItems="Center";
    addPage.style.transform="translateY(100px)";
    addPage.style.gap="20px";
    AsiderSection2.style.borderRight="4px solid #007DFC";
    AsiderSection1.style.borderRight="4px solid black";
        
    addPageForm.style.display="flex";
    addPageForm.style.flexDirection="column";
    addPageForm.style.gap="8px";

    addPageForm2.style.display="flex";
    addPageForm2.style.flexDirection="column";
    addPageForm2.style.gap="8px";
}

pageToggle.addEventListener("click" , () => {
        DashboardPage.style.display="none";
        addPage.style.display="flex";
        styleAddPage();
});

DashboardPageBack.addEventListener("click" , () => {
        DashboardPage.style.display="flex";
        addPage.style.display="none";
        AsiderSection2.style.borderRight="4px solid black";
        AsiderSection1.style.borderRight="4px solid #007DFC";
});

document.addEventListener("click", async (e) => {
  // Match delete icon/button
  const deleteBtn = e.target.closest(".DashBoardBottomInnerDivimg1, #DashBoardBottomInnerDivimg1");
  if (!deleteBtn) return;

  // Find the task container
  const task = deleteBtn.closest(".DashBoardBottomInnerDiv2, #DashBoardBottomInnerDiv2");
  if (!task) {
    console.warn("Delete clicked but no task container found. Check your class/id names.");
    return;
  }

  // Get the task ID from a data attribute
  const taskId = task.dataset.id; // Make sure each task has data-id="1", "2", etc.
  if (!taskId) {
    console.error("Task ID not found. Make sure your task container has data-id attribute.");
    return;
  }

  try {
    // DELETE request to JSON server
    const response = await fetch(`http://localhost:3000/dashboardData/${taskId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Remove from DOM
      task.remove();
      console.log(`Task ${taskId} deleted successfully.`);
    } else {
      console.error("Failed to delete task from server:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
});



function buttonProperity() {
        addPageButton.style.backgroundColor="#1097EB";
        addPageButton.style.opacity="1";
        addPageButton.style.borderStyle="none";
        addPageButton.disabled=false;
}


document.addEventListener("DOMContentLoaded", () => {
    let DashboardPage = document.getElementById("DashboardPage");
    let addPage = document.getElementById("AddNewButtonMainDiv");

    let itemsInput = document.getElementById("itemsInput");
    let imageInput = document.getElementById("imageInput"); 
    let addButton = document.querySelector(".DashBoardBottomButton");

    let editingTaskId = null;

    // ✅ Get userId from local storage
    let userId = localStorage.getItem("userId");
    if (!userId) {
        console.error("User ID not found in local storage!");
        return; // stop script if no userId
    }

    // Edit button click
    document.addEventListener("click", (e) => {
        if (e.target.id === "DashBoardBottomInnerDivimg2") {
            let taskElement = e.target.closest(".DashBoardBottomInnerDiv2");

            editingTaskId = taskElement.dataset.id || null;

            let textValue = taskElement.querySelector("#DashBoardBottomInnerDiv2Text1").textContent;
            let imgValue = taskElement.querySelector(".DashBoardBottomInnerDiv2Innerimg").src;

            if (itemsInput) itemsInput.value = textValue;
            if (imageInput) imageInput.value = imgValue;

            DashboardPage.style.display = "none";
            addPage.style.display = "flex";
            styleAddPage();
            buttonProperity();
        }
    });

    // Add/Update button click
    if (addButton) {
        addButton.addEventListener("click", async () => {
        if(itemsInput.value.length===0)
        {
            alert("Kindly write a title");
            return;
        }
        let base64Image = ""; // default if no image selected

    // Only convert if the user selected a file
        if (imageInput.files && imageInput.files[0]) {
            const file = imageInput.files[0];
            base64Image = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = err => reject(err);
            reader.readAsDataURL(file);
        });
    }
            let taskData = {
                item: itemsInput ? itemsInput.value : "",
                img: base64Image,
                userId: userId,
                status:"ToDo"
            };
            if (editingTaskId) {
                await fetch(`http://localhost:3000/dashboardData/${editingTaskId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(taskData)
                });
            } else {
                await fetch(`http://localhost:3000/dashboardData`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(taskData)
                });
            }

            editingTaskId = null;
            if (itemsInput) itemsInput.value = "";
            if (imageInput) imageInput.value = "";
            DashboardPage.style.display = "flex";
            addPage.style.display = "none";
        });
    }


});


document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId");
    console.log("User ID from localStorage:", userId);

    // Select the inner task list containers only (middle part)
    const todoContainer = document.querySelector(".DashBoardBottomInnerDiv1 .DashboardInnerDivs3");
    const doingContainer = document.querySelector(".DashBoardBottomInnerMainDiv2 .DashboardInnerDivs3");
    const doneContainer = document.querySelector(".DashBoardBottomInnerMainDiv3 .DashboardInnerDivs3");

    if (!todoContainer || !doingContainer || !doneContainer) {
        console.error("❌ One or more task containers not found in DOM.");
        return;
    }

    function createTaskBlock(task) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("DashBoardBottomInnerDiv2");
        taskDiv.dataset.id = task.id;

        taskDiv.innerHTML = `
            <img class="DashBoardBottomInnerDiv2Innerimg" src="${task.img || ''}" alt="task image">
            <p id="DashBoardBottomInnerDiv2Text1">${task.item || ''}</p>
            <div class="DashBoardBottomInnerDiv2imgs">
                <img id="DashBoardBottomInnerDivimg1" src="../asserts/Icons/Group 152.png" alt="img">
                <button id="ProgressButton">⏳</button>
                <button id="DoneButton">✅</button>
                <img id="DashBoardBottomInnerDivimg2" src="../asserts/Icons/Group.png" alt="group">
            </div>
        `;
        return taskDiv;
    }

    async function loadTasks() {
        try {
            const url = userId
                ? `http://localhost:3000/dashboardData?userId=${userId}`
                : `http://localhost:3000/dashboardData`;

            console.log("📡 Fetching tasks from:", url);

            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const tasks = await res.json();
            console.log("✅ Tasks loaded from server:", tasks);

            // Clear only the middle content area (tasks)
            todoContainer.innerHTML = "";
            doingContainer.innerHTML = "";
            doneContainer.innerHTML = "";

            if (!Array.isArray(tasks) || tasks.length === 0) {
                console.warn("⚠ No tasks found for this user.");
                return;
            }

            // Add tasks to the right container
            tasks.forEach(task => {
                const block = createTaskBlock(task);
                switch (task.status.toLowerCase()) {
                    case "todo":
                        todoContainer.appendChild(block);
                        break;
                    case "doing":
                        doingContainer.appendChild(block);
                        break;
                    case "done":
                        doneContainer.appendChild(block);
                        break;
                    default:
                    console.warn(`⚠ Unknown status '${task.status}' for task:`, task);
                }
            });

        } catch (err) {
            console.error("❌ Error loading tasks:", err);
        }
    }

    loadTasks();
});


let imageInput = document.getElementById("imageInput"); 
let editingTaskId = null;
let addButton = document.querySelector(".DashBoardBottomButton");



if(itemsInput.value.trim())
{
    addPageButton.style.backgroundColor="#1097EB";
    addPageButton.style.opacity="1";
    addPageButton.style.borderStyle="none";
    
    addButton.addEventListener("click", async () => {
        if(itemsInput.value.length===0)
        {
            alert("Kindly write a title");
            return;
        }

        let base64Image = ""; // default if no image selected

    // Only convert if the user selected a file
    if (imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        base64Image = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = err => reject(err);
            reader.readAsDataURL(file);
        });
    }
        
        let taskData = {
            item: itemsInput ? itemsInput.value : "",
            img: base64Image,
            userId: userId,
            status:"ToDo"
        };
        if (editingTaskId) {
            await fetch(`http://localhost:3000/dashboardData/${editingTaskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData)
            });
        } 
        else {
            await fetch(`http://localhost:3000/dashboardData`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData)
                });
        }

        editingTaskId = null;
        if (itemsInput) itemsInput.value = "";
        if (imageInput) imageInput.value = "";
        DashboardPage.style.display = "flex";
        addPage.style.display = "none";
    });
}


// Sections
// Get the correct containers for Doing and Done sections
const doingContainer = document.querySelector(".DashBoardBottomInnerMainDiv2 .DashboardInnerDivs3");
const doneContainer = document.querySelector(".DashBoardBottomInnerMainDiv3 .DashboardInnerDivs3");
const todoContainer = document.querySelector(".DashBoardBottomInnerDiv1 .DashboardInnerDivs3");

// Click listener for Progress and Done buttons
document.addEventListener("click", async (e) => {
    if (e.target.id === "ProgressButton") {
        const task = e.target.closest(".DashBoardBottomInnerDiv2");
        const taskId = task.dataset.id;

        // Check current status by seeing which container the task is in
        const currentContainer = task.parentElement;
        
        if (currentContainer === doingContainer) {
            // Task is already in Doing, move back to ToDo
            await fetch(`http://localhost:3000/dashboardData/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "ToDo" })
            });

            // Move task to ToDo section in DOM
            todoContainer.appendChild(task);
        } else {
            // Task is in ToDo or Done, move to Doing
            await fetch(`http://localhost:3000/dashboardData/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Doing" })
            });

            // Move task to Doing section in DOM
            doingContainer.appendChild(task);
        }
    }

    if (e.target.id === "DoneButton") {
        const task = e.target.closest(".DashBoardBottomInnerDiv2");
        const taskId = task.dataset.id;

        // Check current status by seeing which container the task is in
        const currentContainer = task.parentElement;
        
        if (currentContainer === doneContainer) {
            // Task is already in Done, move back to ToDo
            await fetch(`http://localhost:3000/dashboardData/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "ToDo" })
            });

            // Move task to ToDo section in DOM
            todoContainer.appendChild(task);
        } else {
            // Task is in ToDo or Doing, move to Done
            await fetch(`http://localhost:3000/dashboardData/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Done" })
            });

            // Move task to Done section in DOM
            doneContainer.appendChild(task);
        }
    }
});




// Complete Search Bar Implementation
// Complete Search Bar Implementation
const searchBar = document.getElementById("SearchBar");
let allTasks = []; // Store all tasks for searching
let searchContainer = null;
let searchResultsDiv = null;

// Create search results container
function createSearchResultsContainer() {
    if (searchContainer) return { searchContainer, searchResultsDiv };
    
    searchContainer = document.createElement("div");
    searchContainer.id = "searchResultsContainer";
    searchContainer.style.cssText = `
        display: none;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin: 20px;
        padding: 15px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        width: calc(100% - 40px);
    `;

    const searchHeader = document.createElement("h3");
    searchHeader.textContent = "Search Results";
    searchHeader.style.cssText = `
        margin: 0 0 15px 0;
        color: #333;
        font-size: 18px;
        border-bottom: 2px solid #007DFC;
        padding-bottom: 8px;
        text-align: center;
    `;

    searchResultsDiv = document.createElement("div");
    searchResultsDiv.id = "searchResults";
    searchResultsDiv.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 400px;
        overflow-y: auto;
    `;

    searchContainer.appendChild(searchHeader);
    searchContainer.appendChild(searchResultsDiv);

    // Insert after the main dashboard content
    const dashboardBottom = document.querySelector(".DashBoardBottom");
    if (dashboardBottom) {
        dashboardBottom.appendChild(searchContainer);
    } else {
        // Fallback: insert after body
        document.body.appendChild(searchContainer);
    }

    return { searchContainer, searchResultsDiv };
}

// Show/hide main containers
function showMainContainers() {
    const todoDiv = document.querySelector(".DashBoardBottomInnerDiv1");
    const doingDiv = document.querySelector(".DashBoardBottomInnerMainDiv2");
    const doneDiv = document.querySelector(".DashBoardBottomInnerMainDiv3");
    
    if (todoDiv) todoDiv.style.display = "flex";
    if (doingDiv) doingDiv.style.display = "flex";
    if (doneDiv) doneDiv.style.display = "flex";
    
    if (searchContainer) searchContainer.style.display = "none";
}

function hideMainContainers() {
    const todoDiv = document.querySelector(".DashBoardBottomInnerDiv1");
    const doingDiv = document.querySelector(".DashBoardBottomInnerMainDiv2");
    const doneDiv = document.querySelector(".DashBoardBottomInnerMainDiv3");
    
    if (todoDiv) todoDiv.style.display = "none";
    if (doingDiv) doingDiv.style.display = "none";
    if (doneDiv) doneDiv.style.display = "none";
    
    if (searchContainer) searchContainer.style.display = "block";
}

// Create task block (same as your existing function)
function createSearchTaskBlock(task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("DashBoardBottomInnerDiv2");
    taskDiv.dataset.id = task.id;
    taskDiv.style.cssText = `
        display: flex;
        align-items: center;
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 8px;
        background: #f9f9f9;
        margin-bottom: 8px;
    `;

    taskDiv.innerHTML = `
        <img class="DashBoardBottomInnerDiv2Innerimg" src="${task.img || ''}" alt="task image" style="transform:translateX(-5px)">
        <p id="DashBoardBottomInnerDiv2Text1" >${task.item || ''}</p>
        <span>${task.status}</span>
    `;
    return taskDiv;
}

// Search functionality
function performSearch(query) {
    if (!query.trim()) {
        showMainContainers();
        return;
    }

    // Filter tasks based on query
    const filteredTasks = allTasks.filter(task => 
        task.item && task.item.toLowerCase().includes(query.toLowerCase())
    );

    // Create search container if it doesn't exist
    createSearchResultsContainer();

    // Clear previous search results
    searchResultsDiv.innerHTML = "";

    if (filteredTasks.length === 0) {
        searchResultsDiv.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <p style="font-size: 16px; margin: 0;">No tasks found matching "${query}"</p>
                <p style="font-size: 14px; margin: 8px 0 0 0;">Try a different search term</p>
            </div>
        `;
    } else {
        filteredTasks.forEach(task => {
            const taskBlock = createSearchTaskBlock(task);
            searchResultsDiv.appendChild(taskBlock);
        });
    }

    hideMainContainers();
}

// Initialize search functionality
function initializeSearch() {
    if (!searchBar) {
        console.error("❌ SearchBar element not found!");
        return;
    }

    // Search on input
    searchBar.addEventListener("input", (e) => {
        const query = e.target.value;
        
        // If search is empty, immediately show main containers
        if (!query.trim()) {
            showMainContainers();
            return;
        }
        
        performSearch(query);
    });

    // Handle escape key and empty search
    searchBar.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            searchBar.value = "";
            showMainContainers();
        }
    });

    // Additional event listener for when search is cleared
    searchBar.addEventListener("change", (e) => {
        if (!e.target.value.trim()) {
            showMainContainers();
        }
    });

    // Handle focus and blur events for better UX
    searchBar.addEventListener("focus", () => {
        searchBar.style.outline = "2px solid #007DFC";
    });

    searchBar.addEventListener("blur", () => {
        searchBar.style.outline = "none";
    });

    console.log("✅ Search functionality initialized");
}

// Update the existing loadTasks function to store tasks for search
function updateLoadTasksForSearch() {
    // Find your existing loadTasks function and add this line:
    // allTasks = tasks; // Add this after fetching tasks from server
    
    // Or if you want to fetch tasks specifically for search:
    async function loadTasksForSearch() {
        try {
            const userId = localStorage.getItem("userId");
            const url = userId
                ? `http://localhost:3000/dashboardData?userId=${userId}`
                : `http://localhost:3000/dashboardData`;

            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const tasks = await res.json();
            allTasks = tasks; // Store for searching
            console.log("✅ Tasks loaded for search:", tasks.length, "tasks");
        } catch (err) {
            console.error("❌ Error loading tasks for search:", err);
        }
    }
    
    return loadTasksForSearch;
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeSearch();
    
    // Load tasks for search (call this after your existing loadTasks)
    const loadTasksForSearch = updateLoadTasksForSearch();
    loadTasksForSearch();
});

// Export functions if needed
window.searchFunctions = {
    performSearch,
    showMainContainers,
    hideMainContainers,
    initializeSearch
};