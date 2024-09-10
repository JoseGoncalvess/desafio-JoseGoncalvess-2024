import { Recinto } from "../Recinto";
import { Macaco } from "../animais_zoo_model/Macaco.js";


export class Savana extends Recinto {
    constructor() {
        super(1, "savana", 10, [
            new Macaco(),
            new Macaco(),
            new Macaco(),
        ])
    }
}