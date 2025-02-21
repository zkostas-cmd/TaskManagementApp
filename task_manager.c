#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define MAX_TASKS 100
#define MAX_TASK_LENGTH 100

struct Date {
    int day;
    int month;
    int year;
};

struct Task {
    char description[MAX_TASK_LENGTH];
    int completed;
    int id;
    struct Date date;
};

struct TaskManager {
    struct Task tasks[MAX_TASKS];
    int taskCount;
};

void initializeTaskManager(struct TaskManager* tm) {
    tm->taskCount = 0;
}

void addTask(struct TaskManager* tm, const char* description, int day, int month, int year) {
    if (tm->taskCount >= MAX_TASKS) {
        printf("Task list is full!\n");
        return;
    }

    struct Task* newTask = &tm->tasks[tm->taskCount];
    strncpy(newTask->description, description, MAX_TASK_LENGTH - 1);
    newTask->description[MAX_TASK_LENGTH - 1] = '\0';
    newTask->completed = 0;
    newTask->id = tm->taskCount + 1;
    newTask->date.day = day;
    newTask->date.month = month;
    newTask->date.year = year;
    tm->taskCount++;

    printf("Task added successfully!\n");
}

void listTasks(struct TaskManager* tm) {
    if (tm->taskCount == 0) {
        printf("No tasks available.\n");
        return;
    }

    printf("\nTask List:\n");
    for (int i = 0; i < tm->taskCount; i++) {
        printf("%d. [%s] %s (Date: %02d/%02d/%d)\n", 
            tm->tasks[i].id,
            tm->tasks[i].completed ? "X" : " ",
            tm->tasks[i].description,
            tm->tasks[i].date.day,
            tm->tasks[i].date.month,
            tm->tasks[i].date.year);
    }
}

void markTaskComplete(struct TaskManager* tm, int taskId) {
    for (int i = 0; i < tm->taskCount; i++) {
        if (tm->tasks[i].id == taskId) {
            tm->tasks[i].completed = 1;
            printf("Task marked as complete!\n");
            return;
        }
    }
    printf("Task not found!\n");
}

void removeTask(struct TaskManager* tm, int taskId) {
    int found = -1;
    for (int i = 0; i < tm->taskCount; i++) {
        if (tm->tasks[i].id == taskId) {
            found = i;
            break;
        }
    }

    if (found != -1) {
        for (int i = found; i < tm->taskCount - 1; i++) {
            tm->tasks[i] = tm->tasks[i + 1];
        }
        tm->taskCount--;
        printf("Task removed successfully!\n");
    } else {
        printf("Task not found!\n");
    }
}

int main() {
    struct TaskManager tm;
    initializeTaskManager(&tm);
    char input[MAX_TASK_LENGTH];
    int choice, taskId, day, month, year;

    while (1) {
        printf("\n=== Task Manager ===\n");
        printf("1. Add Task\n");
        printf("2. List Tasks\n");
        printf("3. Mark Task as Complete\n");
        printf("4. Remove Task\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        
        scanf("%d", &choice);
        getchar();

        switch (choice) {
            case 1:
                printf("Enter task description: ");
                fgets(input, MAX_TASK_LENGTH, stdin);
                input[strcspn(input, "\n")] = 0;
                
                printf("Enter date (DD MM YYYY): ");
                scanf("%d %d %d", &day, &month, &year);
                getchar();
                
                addTask(&tm, input, day, month, year);
                break;
            case 2:
                listTasks(&tm);
                break;
            case 3:
                printf("Enter task ID to mark as complete: ");
                scanf("%d", &taskId);
                markTaskComplete(&tm, taskId);
                break;
            case 4:
                printf("Enter task ID to remove: ");
                scanf("%d", &taskId);
                removeTask(&tm, taskId);
                break;
            case 5:
                printf("Goodbye!\n");
                return 0;
            default:
                printf("Invalid choice!\n");
        }
    }

    return 0;
}