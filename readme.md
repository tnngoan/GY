> The assignment is to develop a simple to-do list that allows the user to add, edit and delete a to-do task.
This app is built with MERN stack

# API requests
- The API should consists of /GET, /POST, /PUT and /DELETE requests.
- The Task table in the database should consist of TaskID, TaskName, TaskCategory, TaskCompleted.
- The task categories are "education", "recreational", "social", "diy", "charity", "cooking", "relaxation",
"music", "busywork".
- APIs do the following: 
To get all tasks, 
To add/create a new task,
To edit a task,
To delete a task

# Form UI:
The form consists of 2 inputs: the task name and the category. The user must enter the task name and
select a category before submitting the form. The form will not allow users to submit the form if any of
the inputs are not filled. The form should have a confirmation popup before submitting the form. After
submitting the form, the inputs should be cleared, and the task list must show the newly added task.

# Rocket:
Clicking on the Random button will fetch a random task from www.boredapi.com and
fill the task name and category inputs. The API documentation is in the link. The user can then submit
the form to add the fetched task into the task list.

# Task list:
The task list will list all the tasks from the database. The user must be able to see all the tasks. The task
name and category must be shown on each task. Each task must have a Completed status checkbox, an
Edit task button and Delete task button

- Checking the Completed status checkbox will change the ‘TaskCompleted’ from false to true,
showing that the task has been completed. Unchecking the checkbox will revert the status from
true to false.
- Clicking on the Edit button will fill the task form with the information of the selected task. The
user can then edit the information of the selected task and submit the form again. The task
should have the updated information immediately after submitting the form.
- Clicking on the Delete button should show a confirmation popup. After the user confirms to
delete the selected task, the deleted task should no longer appear on the task list.
