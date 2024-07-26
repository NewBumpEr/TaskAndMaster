import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../../Components/Navbar";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import "./index.css";
import {
  isLoggedIn,
  getUserTasks,
  editTask,
  completedTask,
  addTask,
  deleteTask,
} from "../../../../../../firebase";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

function DashboardTasksDays() {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [visibleEditDialog, setVisibleEditDialog] = useState(false);
  const [visibleAddDialog, setVisibleAddDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [tasksByDate, setTasksByDate] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const showsSaveMessage = (message) => {
    if (toast.current) {
      toast.current.show({
        severity: "success",
        summary: "Successfully!",
        detail: message,
      });
    }
  };

  const showCompleteMessage = (message) => {
    if (toast.current) {
      toast.current.show({
        severity: "success",
        summary: "Congratulations!",
        detail: message,
      });
    }
  };

  const showDeleteMessage = (message) => {
    if (toast.current) {
      toast.current.show({
        severity: "error",
        summary: "Successfully!",
        detail: message,
      });
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      alert("Please log in to your account to access Task&Master!");
      navigate("/");
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const userId = JSON.parse(sessionStorage.getItem("user-info")).ID;
      const tasks = await getUserTasks(userId);

      const groupedTasks = tasks.reduce((acc, task) => {
        const date = task.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(task);
        return acc;
      }, {});

      setTasksByDate(groupedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    timeStart: null,
    timeEnd: null,
    completed: false,
  });

  const handleEditTask = async () => {
    try {
      const userId = JSON.parse(sessionStorage.getItem("user-info")).ID;
      await editTask(userId, currentTask.id, currentTask);
      setVisibleEditDialog(false);
      fetchTasks();
      showsSaveMessage("Task updated successfully.");
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDeleteTask = async () => {
    if (currentTask) {
      try {
        await deleteTask(
          JSON.parse(sessionStorage.getItem("user-info")).ID,
          currentTask.id
        );
        setVisibleEditDialog(false);
        fetchTasks();
        showDeleteMessage("Task deleted successfully.");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleYesterdayClick = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(previousDay);
  };

  const handleTomorrowClick = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const handleCheckboxChange = async (taskId) => {
    const updatedTasks = { ...tasksByDate };
    let updatedTask;

    Object.keys(updatedTasks).forEach((date) => {
      updatedTasks[date] = updatedTasks[date].map((task) => {
        if (task.id === taskId) {
          updatedTask = { ...task, completed: !task.completed };
          return updatedTask;
        }
        return task;
      });
    });

    setTasksByDate(updatedTasks);

    if (updatedTask) {
      try {
        const userId = JSON.parse(sessionStorage.getItem("user-info")).ID;
        await completedTask(userId, taskId, updatedTask.completed);
        showCompleteMessage("You have successfully completed the task!");
      } catch (error) {
        console.error("Error updating task completion:", error);
      }
    }
  };

  const handleAddTask = () => {
    setNewTask({
      title: "",
      description: "",
      timeStart: null,
      timeEnd: null,
      completed: false,
    });
    setVisibleAddDialog(true);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (currentTask) {
      setCurrentTask({ ...currentTask, [field]: value });
    } else {
      const updatedNewTask = { ...newTask };
      updatedNewTask[field] = value;
      setNewTask(updatedNewTask);
    }
  };

  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const convertTime = (timeString) => {
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  let currentTasks = tasksByDate[formattedDate] || [];

  currentTasks.sort((a, b) => {
    const timeStartA = new Date(a.timeStart);
    const timeStartB = new Date(b.timeStart);
    return timeStartA - timeStartB;
  });

  const handleSaveNewTask = async () => {
    try {
      const userId = JSON.parse(sessionStorage.getItem("user-info")).ID;
      await addTask(userId, { ...newTask, date: formattedDate });
      setVisibleAddDialog(false);
      fetchTasks();
      showsSaveMessage("Task added successfully.");
      setNewTask({
        title: "",
        description: "",
        timeStart: null,
        timeEnd: null,
        completed: false,
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const footerContentEdit = (
    <div>
      <Button
        label="Save"
        icon="pi pi-check"
        iconPos="right"
        onClick={() => {
          handleEditTask();
        }}
        autoFocus
      />
      <Button
        label="Delete"
        severity="danger"
        onClick={() => setConfirmDeleteVisible(true)}
      />
    </div>
  );

  const footerContentAdd = (
    <div>
      <Button
        label="Add"
        icon="pi pi-plus"
        iconPos="right"
        onClick={handleSaveNewTask}
      />
    </div>
  );

  return (
    <div>
      <div className="dashboard-header">
        <Navbar />
        <Toast ref={toast} />
      </div>
      <Card>
        <div className="main-header">
          <div className="header-left">
            <Button
              label="Back"
              icon="pi pi-caret-left"
              onClick={handleYesterdayClick}
            />
          </div>
          <div className="header-text">
            <p>{formattedDate}</p>
          </div>
          <div className="header-right">
            <Button
              label="Next"
              icon="pi pi-caret-right"
              iconPos="right"
              onClick={handleTomorrowClick}
            />
          </div>
        </div>
        <div className="dashboard-container">
          <div className="dashboard-content">
            <div className="dashboard-cards">
              {currentTasks.map((task) => (
                <div className="dashboard-card" key={task.id}>
                  <div className="task-header">
                    <h2>{task.title}</h2>
                    <span
                      className={
                        task.completed ? "task-completed" : "task-pending"
                      }
                    >
                      {task.completed ? "Done" : "Not Done"}
                    </span>
                  </div>

                  <p>{task.description}</p>

                  <div className="task-footer">
                    <span className="task-time">
                      {convertTime(
                        new Date(task.timeStart).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      )}{" "}
                      -{" "}
                      {convertTime(
                        new Date(task.timeEnd).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      )}
                    </span>
                    <Checkbox
                      className="Checkbox"
                      checked={task.completed}
                      onChange={() => handleCheckboxChange(task.id)}
                    />
                    <Button
                      label="Edit"
                      className="edit-button"
                      severity="success"
                      icon="pi pi-pencil"
                      iconPos="right"
                      onClick={() => {
                        setCurrentTask(task);
                        setVisibleEditDialog(true);
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="dashboard-card transparent-card">
                <div className="task-footer add-button">
                  <Button
                    label="Add"
                    icon="pi pi-plus"
                    iconPos="right"
                    className="p-button"
                    severity="help"
                    onClick={() => setVisibleAddDialog(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Dialog
        header="Edit Task"
        visible={visibleEditDialog}
        onHide={() => setVisibleEditDialog(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        footer={footerContentEdit}
        modal
        draggable={false}
      >
        <div className="p-grid p-fluid">
          <div className="p-col-12">
            <label>Title:</label>
            <InputText
              value={currentTask ? currentTask.title : ""}
              onChange={(e) => handleInputChange(e, "title")}
            />
          </div>
          <div className="p-col-12">
            <label>Description:</label>
            <InputText
              value={currentTask ? currentTask.description : ""}
              onChange={(e) => handleInputChange(e, "description")}
            />
          </div>
          <div className="p-col-12">
            <label>Start:</label>
            <Calendar
              value={currentTask ? new Date(currentTask.timeStart) : null}
              onChange={(e) => handleInputChange(e, "timeStart")}
              showIcon
              timeOnly
              readOnlyInput
              icon="pi pi-clock"
            />
          </div>
          <div className="p-col-12">
            <label>End:</label>
            <Calendar
              value={currentTask ? new Date(currentTask.timeEnd) : null}
              onChange={(e) => handleInputChange(e, "timeEnd")}
              showIcon
              timeOnly
              readOnlyInput
              icon="pi pi-clock"
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Add Task"
        visible={visibleAddDialog}
        onHide={() => setVisibleAddDialog(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        footer={footerContentAdd}
        modal
        draggable={false}
      >
        <div className="p-grid p-fluid">
          <div className="p-col-12">
            <label>Title:</label>
            <InputText
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </div>
          <div className="p-col-12">
            <label>Description:</label>
            <InputText
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </div>
          <div className="p-col-12">
            <label>Start:</label>
            <Calendar
              value={newTask.timeStart}
              onChange={(e) => setNewTask({ ...newTask, timeStart: e.value })}
              showIcon
              timeOnly
              readOnlyInput
              icon="pi pi-clock"
            />
          </div>
          <div className="p-col-12">
            <label>End:</label>
            <Calendar
              value={newTask.timeEnd}
              onChange={(e) => setNewTask({ ...newTask, timeEnd: e.value })}
              showIcon
              timeOnly
              readOnlyInput
              icon="pi pi-clock"
            />
          </div>
          <div className="p-col-12">
            <label>Date:</label>
            <Calendar
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.value })}
              showIcon
              dateFormat="yy-mm-dd"
              readOnlyInput
              icon="pi pi-calendar"
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        header="Confirm Delete"
        visible={confirmDeleteVisible}
        onHide={() => setConfirmDeleteVisible(false)}
        modal
        footer={
          <div>
            <Button
              label="Cancel"
              className="p-button-text"
              onClick={() => setConfirmDeleteVisible(false)}
            />
            <Button
              label="Sure"
              className="p-button-danger"
              onClick={() => {
                handleDeleteTask();
                setConfirmDeleteVisible(false);
              }}
              autoFocus
            />
          </div>
        }
      >
        <div>
          <p>Are you sure you want to delete this task?</p>
        </div>
      </Dialog>
    </div>
  );
}

export default DashboardTasksDays;
