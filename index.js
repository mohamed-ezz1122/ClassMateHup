
import { config } from "dotenv";
import express from "express";
import db_connection from "./db/conection.js";
import { initiateApp } from "./src/initionate-app.js";
config({path:"./config/dev.config.env"})

const app=express()

initiateApp(express,app)