import { localideal } from "./service/zoo_service.js";

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
    return localideal(animal, quantidade)
    }

}

export { RecintosZoo as RecintosZoo };
