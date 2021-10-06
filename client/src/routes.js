import { routes as home } from "pages/home";
import { routes as managementBoard } from "pages/management-board";
import { routes as customerBoard } from "pages/customer-board";

export const routes = [...home, ...managementBoard, ...customerBoard];
