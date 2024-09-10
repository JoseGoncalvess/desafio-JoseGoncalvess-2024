import { Gazela } from "../animais_zoo_model/Gazela";
import { Recinto } from "../Recinto";

export class SavanaeRio extends Recinto {
    constructor() {
        super(3, "savana e rio", 7, [
           new Gazela()
        ])
    }
}