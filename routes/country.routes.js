import { Router  } from "express";
import { add_country, delete_country, get_all_country, update_country } from "../controller/country.controller.js";


const country_router = Router();

// country create 

country_router.post("/" , add_country);

// get all countries 

country_router.get("/" , get_all_country);

// update an country

country_router.put("/" , update_country);

//delete a country 

country_router.delete("/", delete_country);

export default country_router;
